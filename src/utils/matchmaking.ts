import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  age: number;
  bio: string | null;
  photos: string[];
  intro_video_url: string | null;
  location: any;
  gender: string;
  verified: boolean;
  distance_meters?: number;
  last_active?: string;
}

export const fetchMatchingProfiles = async (
  userId: string,
  preferences: {
    gender_prefs: string[];
    age_range: [number, number];
    distance_km: number;
  },
  limit: number = 10,
  filters?: {
    verifiedOnly?: boolean;
    activeRecently?: boolean;
  }
): Promise<Profile[]> => {
  try {
    // Get user's location
    const { data: currentUserProfile } = await supabase
      .from("profiles")
      .select("location")
      .eq("user_id", userId)
      .single();

    if (!currentUserProfile?.location) {
      throw new Error("User location not found");
    }

    // Parse location to extract coordinates
    // Location is stored as "POINT(longitude latitude)"
    const locationStr = String(currentUserProfile.location);
    const locationMatch = locationStr.match(/POINT\(([^ ]+) ([^ ]+)\)/);
    if (!locationMatch) {
      console.error("Invalid location format");
      return [];
    }

    const userLon = parseFloat(locationMatch[1]);
    const userLat = parseFloat(locationMatch[2]);

    // Get users already seen (liked or passed)
    const { data: alreadySeen } = await supabase
      .from("seen_profiles")
      .select("seen_user_id")
      .eq("user_id", userId);

    const excludedUserIds = alreadySeen?.map((seen) => seen.seen_user_id) || [];
    excludedUserIds.push(userId); // Exclude self

    // Use PostGIS RPC function for distance-based filtering
    let { data: profiles, error } = await supabase.rpc("nearby_profiles", {
      user_lat: userLat,
      user_lon: userLon,
      distance_km: preferences.distance_km,
      gender_prefs: preferences.gender_prefs,
      age_min: preferences.age_range[0],
      age_max: preferences.age_range[1],
      excluded_ids: excludedUserIds,
    });

    if (error) {
      console.error("Error fetching nearby profiles:", error);
      return [];
    }

    // Sort profiles to show boosted profiles first
    let filteredProfiles = (profiles || []).sort((a: any, b: any) => {
      const aBoostActive = a.boost_expires_at && new Date(a.boost_expires_at) > new Date();
      const bBoostActive = b.boost_expires_at && new Date(b.boost_expires_at) > new Date();
      
      if (aBoostActive && !bBoostActive) return -1;
      if (!aBoostActive && bBoostActive) return 1;
      return 0;
    });

    // Apply verified only filter
    if (filters?.verifiedOnly) {
      filteredProfiles = filteredProfiles.filter(p => p.verified);
    }

    // Apply active recently filter (last 24 hours)
    if (filters?.activeRecently) {
      const yesterday = new Date();
      yesterday.setHours(yesterday.getHours() - 24);
      filteredProfiles = filteredProfiles.filter(p => {
        const lastActive = (p as any).last_active;
        if (!lastActive) return false;
        return new Date(lastActive) > yesterday;
      });
    }

    return filteredProfiles.slice(0, limit);
  } catch (error) {
    console.error("Error fetching matching profiles:", error);
    return [];
  }
};

export const likeProfile = async (
  fromUserId: string,
  toUserId: string
): Promise<{ isMatch: boolean; matchId?: string }> => {
  try {
    // Track seen profile
    await supabase
      .from("seen_profiles")
      .upsert({ 
        user_id: fromUserId, 
        seen_user_id: toUserId, 
        action: "like",
        seen_at: new Date().toISOString()
      });

    // Insert like
    const { error: likeError } = await supabase
      .from("likes")
      .insert({ from_user: fromUserId, to_user: toUserId });

    if (likeError) throw likeError;

    // Check if it's a mutual like
    const { data: mutualLike } = await supabase
      .from("likes")
      .select("*")
      .eq("from_user", toUserId)
      .eq("to_user", fromUserId)
      .single();

    if (mutualLike) {
      // Create match
      const { data: match, error: matchError } = await supabase
        .from("matches")
        .insert({
          user1: fromUserId,
          user2: toUserId,
          both_interested: true,
          chat_unlocked: false, // Chat locked until Verity Date
        })
        .select()
        .single();

      if (matchError) throw matchError;

      // Create Verity Date request
      if (match) {
        const { error: verityDateError } = await supabase
          .from("verity_dates")
          .insert({
            match_id: match.id,
          });

        if (verityDateError) throw verityDateError;

        // Send notifications to both users
        const { createNotification } = await import("./notifications");
        
        // Get both users' profiles for notification
        const { data: fromProfile } = await supabase
          .from("profiles")
          .select("name")
          .eq("user_id", fromUserId)
          .single();
        
        const { data: toProfile } = await supabase
          .from("profiles")
          .select("name")
          .eq("user_id", toUserId)
          .single();

        // Notify the user who was liked
        await createNotification({
          userId: toUserId,
          type: "match",
          title: "🎉 New Match!",
          message: `You matched with ${fromProfile?.name || "someone"}!`,
          relatedId: match.id,
        });

        // Notify the user who liked (they'll see it on success page)
        await createNotification({
          userId: fromUserId,
          type: "match",
          title: "🎉 It's a Match!",
          message: `You matched with ${toProfile?.name || "someone"}!`,
          relatedId: match.id,
        });

        return { isMatch: true, matchId: match.id };
      }
    }

    return { isMatch: false };
  } catch (error) {
    console.error("Error liking profile:", error);
    throw error;
  }
};

export const passProfile = async (
  fromUserId: string,
  toUserId: string
): Promise<void> => {
  try {
    // Track seen profile as pass
    const { error } = await supabase
      .from("seen_profiles")
      .upsert({ 
        user_id: fromUserId, 
        seen_user_id: toUserId, 
        action: "pass",
        seen_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error("Error passing profile:", error);
    throw error;
  }
};

export const undoLastPass = async (
  userId: string,
  isPremium: boolean = false
): Promise<{ success: boolean; profileId?: string; requiresPremium?: boolean }> => {
  try {
    // Check if user has premium
    if (!isPremium) {
      return { success: false, requiresPremium: true };
    }

    // Get the most recent pass
    const { data: lastPass } = await supabase
      .from("seen_profiles")
      .select("*")
      .eq("user_id", userId)
      .eq("action", "pass")
      .order("seen_at", { ascending: false })
      .limit(1)
      .single();

    if (!lastPass) {
      return { success: false };
    }

    // Delete the pass record to make profile visible again
    const { error } = await supabase
      .from("seen_profiles")
      .delete()
      .eq("id", lastPass.id);

    if (error) throw error;

    return { success: true, profileId: lastPass.seen_user_id };
  } catch (error) {
    console.error("Error undoing pass:", error);
    return { success: false };
  }
};

// Boost profile - makes profile appear first in discovery (PREMIUM ONLY)
export async function boostProfile(userId: string, isPremium: boolean = false): Promise<boolean> {
  try {
    if (!isPremium) {
      return false;
    }

    // Set boost expiration to 30 minutes from now
    const boostExpiry = new Date();
    boostExpiry.setMinutes(boostExpiry.getMinutes() + 30);

    // Get current boost count
    const { data: profile } = await supabase
      .from("profiles")
      .select("boost_count")
      .eq("user_id", userId)
      .single();

    const newBoostCount = (profile?.boost_count || 0) + 1;

    const { error } = await supabase
      .from("profiles")
      .update({
        boost_expires_at: boostExpiry.toISOString(),
        boost_count: newBoostCount,
      })
      .eq("user_id", userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error boosting profile:", error);
    return false;
  }
}
