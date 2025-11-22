import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Heart, Meh, X, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

const VerityDateFeedback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const verityDateId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [partnerName, setPartnerName] = useState<string>("");
  const [matchId, setMatchId] = useState<string>("");

  useEffect(() => {
    if (!verityDateId) {
      navigate("/main");
      return;
    }

    const loadVerityDate = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: verityDate, error } = await supabase
        .from("verity_dates")
        .select("*, matches!inner(id, user1, user2)")
        .eq("id", verityDateId)
        .single();

      if (error || !verityDate) {
        toast({
          title: "Error",
          description: "Verity date not found",
          variant: "destructive",
        });
        navigate("/main");
        return;
      }

      const match = verityDate.matches;
      setMatchId(match.id);
      const partnerId = match.user1 === user.id ? match.user2 : match.user1;

      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id", partnerId)
        .single();

      if (profile) {
        setPartnerName(profile.name || "your match");
      }
    };

    loadVerityDate();
  }, [verityDateId, navigate, toast]);

  const handleFeedback = async (feedback: "yes" | "maybe" | "no") => {
    if (!verityDateId) return;

    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Get current verity date to determine which feedback field to update
      const { data: verityDate } = await supabase
        .from("verity_dates")
        .select("*, matches!inner(user1, user2)")
        .eq("id", verityDateId)
        .single();

      if (!verityDate) {
        throw new Error("Verity date not found");
      }

      const match = verityDate.matches;
      const isUser1 = match.user1 === user.id;
      const feedbackField = isUser1 ? "user1_feedback" : "user2_feedback";

      // Update feedback
      const { error: updateError } = await supabase
        .from("verity_dates")
        .update({
          [feedbackField]: feedback,
          completed: true,
        })
        .eq("id", verityDateId);

      if (updateError) throw updateError;

      // Check if both users have provided feedback
      const { data: updatedVerityDate } = await supabase
        .from("verity_dates")
        .select("user1_feedback, user2_feedback")
        .eq("id", verityDateId)
        .single();

      if (updatedVerityDate?.user1_feedback && updatedVerityDate?.user2_feedback) {
        // Both provided feedback - check if it's a match
        if (updatedVerityDate.user1_feedback === "yes" && updatedVerityDate.user2_feedback === "yes") {
          // It's a match! Update the match status
          await supabase
            .from("matches")
            .update({ both_interested: true })
            .eq("id", matchId);

          // Celebrate!
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FF6B6B", "#FFE66D", "#FF8E9E"],
          });

          toast({
            title: "🎉 It's a Match!",
            description: "You both felt the connection! Chat is now unlocked.",
          });

          setTimeout(() => {
            navigate(`/matches`);
          }, 2000);
        } else {
          // Not a mutual match
          toast({
            title: "Thank you for your feedback",
            description: "You parted ways respectfully. Keep exploring!",
          });

          setTimeout(() => {
            navigate("/main");
          }, 2000);
        }
      } else {
        // Waiting for other person's feedback
        toast({
          title: "Feedback submitted",
          description: "Waiting for your match to share their thoughts...",
        });

        setTimeout(() => {
          navigate("/main");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse" />
            <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground">
            How did it go?
          </h1>
          <p className="text-xl text-muted-foreground">
            Did you feel a connection with <span className="text-primary font-semibold">{partnerName}</span>?
          </p>
        </div>

        <div className="grid gap-4 max-w-md mx-auto">
          <Button
            size="lg"
            onClick={() => handleFeedback("yes")}
            disabled={submitting}
            className="h-auto py-6 px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <Heart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" />
            <div className="text-left">
              <div className="font-semibold text-lg">Yes! 💕</div>
              <div className="text-sm opacity-90">I felt a real connection</div>
            </div>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => handleFeedback("maybe")}
            disabled={submitting}
            className="h-auto py-6 px-8 border-2 hover:bg-muted/50 transition-all duration-300 group"
          >
            <Meh className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-semibold text-lg">Maybe later</div>
              <div className="text-sm text-muted-foreground">Not sure yet, want to think about it</div>
            </div>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => handleFeedback("no")}
            disabled={submitting}
            className="h-auto py-6 px-8 border-2 hover:bg-muted/50 transition-all duration-300 group"
          >
            <X className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-semibold text-lg">No connection</div>
              <div className="text-sm text-muted-foreground">Didn't feel the spark</div>
            </div>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 max-w-md mx-auto">
          <p>Your honest feedback helps create meaningful connections. If you both say yes, chat will be unlocked! 💬</p>
        </div>
      </div>
    </div>
  );
};

export default VerityDateFeedback;
