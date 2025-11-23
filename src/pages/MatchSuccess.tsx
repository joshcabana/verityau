import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";

const MatchSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get("matchId");
  
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadMatchData = async () => {
      if (!matchId) {
        setLoading(false);
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch match details
        const { data: matchData } = await supabase
          .from("matches")
          .select("user1, user2, created_at")
          .eq("id", matchId)
          .single();

        if (matchData) {
          const partnerId = matchData.user1 === user.id ? matchData.user2 : matchData.user1;

          // Fetch partner's profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("name, age, photos, bio")
            .eq("user_id", partnerId)
            .single();

          setMatch({
            id: matchId,
            name: profile?.name || "Unknown",
            age: profile?.age || 0,
            photo: profile?.photos?.[0] || null,
            matchedDate: new Date(matchData.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })
          });
        }
      } catch (error) {
        console.error("Error loading match:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMatchData();
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Match not found</h1>
          <Button onClick={() => navigate("/main")}>Go to Main</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in duration-700">
              <Heart className="h-10 w-10 text-primary fill-primary animate-pulse" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              🎉 It's a Match!
            </h1>
            <p className="text-muted-foreground">
              You and {match.name} liked each other
            </p>
          </div>

          {/* Match Card */}
          <div className="bg-muted rounded-xl p-6 space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                <AvatarImage src={match.photo} alt={match.name} />
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {match.name[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                {match.name}, {match.age}
              </h2>

              <p className="text-sm text-muted-foreground pt-2">
                Matched on {match.matchedDate}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="bg-primary/5 rounded-lg p-4 text-sm text-muted-foreground">
            <p>
              Complete a Verity Date to unlock chat and get to know each other better!
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/matches")}
              size="lg"
              className="w-full h-12 text-base font-semibold"
            >
              View Match
            </Button>
            
            <Button
              onClick={() => navigate("/main")}
              variant="outline"
              size="lg"
              className="w-full h-12 text-base"
            >
              Keep Discovering
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchSuccess;
