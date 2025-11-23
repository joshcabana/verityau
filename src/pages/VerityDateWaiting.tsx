import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Loader2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VerityDateReschedule } from "@/components/VerityDateReschedule";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/analytics";

const VerityDateWaiting = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const verityDateId = searchParams.get("id");
  const [partnerName, setPartnerName] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(60);
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    if (!verityDateId) {
      toast({
        title: "Error",
        description: "Invalid verity date ID",
        variant: "destructive",
      });
      navigate("/main");
      return;
    }

    const loadVerityDate = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      setCurrentUserId(user.id);

      // Get verity date and partner info
      const { data: verityDate, error } = await supabase
        .from("verity_dates")
        .select("*, matches!inner(user1, user2)")
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
      const partnerId = match.user1 === user.id ? match.user2 : match.user1;

      // Get partner profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id", partnerId)
        .single();

      if (profile) {
        setPartnerName(profile.name || "your match");
      }

      // If room already exists, redirect
      if (verityDate.room_url) {
        setRoomUrl(verityDate.room_url);
        setTimeout(() => {
          navigate(`/verity-date/call?id=${verityDateId}`);
        }, 2000);
      } else {
        // Create room
        createRoom();
      }
    };

    const createRoom = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke("create-daily-room", {
        body: { verityDateId },
      });

      if (error || !data?.room_url) {
        toast({
          title: "Error",
          description: "Failed to create video room",
          variant: "destructive",
        });
        navigate("/main");
        return;
      }

      setRoomUrl(data.room_url);
      setTimeout(() => {
        navigate(`/verity-date/call?id=${verityDateId}`);
      }, 2000);
    };

    loadVerityDate();

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [verityDateId, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full animate-pulse" />
          <Heart className="w-24 h-24 mx-auto text-primary relative animate-pulse" fill="currentColor" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Getting Ready...
          </h1>
          <p className="text-xl text-muted-foreground">
            Waiting for <span className="text-primary font-semibold">{partnerName}</span> to join your Verity Date
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Finding humans who are ready to be real...</span>
        </div>

        {roomUrl && (
          <div className="text-sm text-primary animate-in fade-in">
            Room created! Joining in a moment...
          </div>
        )}

        <div className="text-2xl font-mono text-primary">
          {countdown}s
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-foreground">Remember:</h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li>✨ Be authentic and present</li>
            <li>💬 Let the conversation flow naturally</li>
            <li>⏱️ You'll have 10 minutes together</li>
            <li>❤️ After the call, share if you felt a connection</li>
          </ul>
        </div>

        <Button
          variant="outline"
          onClick={() => setRescheduleOpen(true)}
          className="w-full"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Maybe Later - Reschedule
        </Button>
      </div>

      {verityDateId && currentUserId && (
        <VerityDateReschedule
          verityDateId={verityDateId}
          currentUserId={currentUserId}
          open={rescheduleOpen}
          onOpenChange={setRescheduleOpen}
          onRescheduled={() => {
            trackEvent("verity_date_scheduled", { 
              verity_date_id: verityDateId,
              action: "rescheduled" 
            });
            toast({
              title: "Preferences saved",
              description: "We'll help coordinate a better time with your match.",
            });
            navigate("/matches");
          }}
        />
      )}
    </div>
  );
};

export default VerityDateWaiting;
