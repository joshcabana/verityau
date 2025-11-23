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
}

export const fetchMatchingProfiles = async (
  userId: string,
  preferences: {
    gender_prefs: string[];
    age_range: [number, number];
    distance_km: number;
  },
  limit: number = 10
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

    // Get users already seen (liked or passed)
    const { data: alreadySeen } = await supabase
      .from("seen_profiles")
      .select("seen_user_id")
      .eq("user_id", userId);

    const excludedUserIds = alreadySeen?.map((seen) => seen.seen_user_id) || [];
    excludedUserIds.push(userId); // Exclude self

    // Query matching profiles with ordering
    let query = supabase
      .from("profiles")
      .select("*")
      .eq("verified", true)
      .not("user_id", "in", `(${excludedUserIds.join(",")})`)
      .gte("age", preferences.age_range[0])
      .lte("age", preferences.age_range[1])
      .order("last_active", { ascending: false })
      .limit(limit);

    // Filter by gender preferences
    if (preferences.gender_prefs.length > 0 && !preferences.gender_prefs.includes("everyone")) {
      query = query.in("gender", preferences.gender_prefs);
    }

    // Note: Distance filtering would require PostGIS functions
    // For now, we'll fetch profiles and can add distance filtering via RPC later

    const { data: profiles, error } = await query;

    if (error) throw error;

    return profiles || [];
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
  userId: string
): Promise<{ success: boolean; profileId?: string }> => {
  try {
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
