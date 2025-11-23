import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface OnboardingData {
  dateOfBirth?: Date;
  name: string;
  gender: string;
  interestedIn: string;
  city: string;
  bio: string;
  lookingFor: string;
  ageRange: [number, number];
  radius: number;
  photo?: File;
  introVideo?: File;
  verificationVideo?: File;
}

export async function uploadFile(
  file: File,
  bucket: string,
  folder: string
): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    toast({
      title: "Upload failed",
      description: error instanceof Error ? error.message : "Failed to upload file",
      variant: "destructive",
    });
    return null;
  }
}

export async function createProfile(data: OnboardingData): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a profile",
        variant: "destructive",
      });
      return false;
    }

    // Calculate age from dateOfBirth
    const age = data.dateOfBirth
      ? new Date().getFullYear() - data.dateOfBirth.getFullYear()
      : null;

    // Upload photo
    let photoUrl: string | null = null;
    if (data.photo) {
      photoUrl = await uploadFile(data.photo, "profile-photos", "main");
      if (!photoUrl) return false;
    }

    // Upload intro video
    let introVideoUrl: string | null = null;
    if (data.introVideo) {
      introVideoUrl = await uploadFile(data.introVideo, "intro-videos", "intro");
      if (!introVideoUrl) return false;
    }

    // Upload verification video (private)
    let verificationVideoUrl: string | null = null;
    if (data.verificationVideo) {
      verificationVideoUrl = await uploadFile(
        data.verificationVideo,
        "verification-videos",
        "verification"
      );
      if (!verificationVideoUrl) return false;
    }

    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: user.id,
      name: data.name,
      age: age,
      gender: data.gender,
      bio: data.bio,
      looking_for: [data.lookingFor],
      photos: photoUrl ? [photoUrl] : [],
      intro_video_url: introVideoUrl,
      verification_video_url: verificationVideoUrl,
      verified: !!verificationVideoUrl, // Set verified if verification video uploaded
      location: `POINT(0 0)`, // Placeholder - should be actual coordinates
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      toast({
        title: "Error",
        description: "Failed to create profile",
        variant: "destructive",
      });
      return false;
    }

    // Create preferences
    const { error: preferencesError } = await supabase.from("preferences").insert({
      user_id: user.id,
      age_range: `[${data.ageRange[0]},${data.ageRange[1]}]`,
      distance_km: data.radius,
      gender_prefs: [data.interestedIn],
    });

    if (preferencesError) {
      console.error("Preferences creation error:", preferencesError);
      toast({
        title: "Error",
        description: "Failed to save preferences",
        variant: "destructive",
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error("Profile creation error:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to create profile",
      variant: "destructive",
    });
    return false;
  }
}
