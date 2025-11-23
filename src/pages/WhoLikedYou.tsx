import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { ProfileCard } from "@/components/ProfileCard";
import { Loader2, Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile } from "@/utils/matchmaking";

export default function WhoLikedYou() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { hasSubscription, loading: subLoading } = useSubscription();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Get all users who liked the current user
        const { data: likes, error: likesError } = await supabase
          .from("likes")
          .select("from_user")
          .eq("to_user", user.id);

        if (likesError) throw likesError;

        if (!likes || likes.length === 0) {
          setProfiles([]);
          setLoading(false);
          return;
        }

        const likedByUserIds = likes.map(like => like.from_user);

        // Fetch profiles of users who liked the current user
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("*")
          .in("user_id", likedByUserIds);

        if (profilesError) throw profilesError;

        setProfiles(profilesData as Profile[]);
      } catch (error) {
        console.error("Error fetching likes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && !subLoading) {
      fetchLikes();
    }
  }, [user, authLoading, subLoading]);

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasSubscription) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-24">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Lock className="h-24 w-24 text-primary/20" />
                <Crown className="h-12 w-12 text-primary absolute top-0 right-0 transform translate-x-2 -translate-y-2" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">See Who Liked You</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Upgrade to Verity Plus to see everyone who's interested in you. Don't miss out on potential matches!
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/verity-plus")}
              className="gap-2"
            >
              <Crown className="h-5 w-5" />
              Upgrade to Verity Plus
            </Button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Who Liked You</h1>
          <p className="text-muted-foreground mb-8">
            {profiles.length} {profiles.length === 1 ? "person" : "people"} liked your profile
          </p>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No one has liked you yet. Keep swiping to get more matches!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onLike={() => {}}
                  onPass={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
