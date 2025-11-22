import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ICEBREAKER_PROMPTS = [
  "What's the best adventure you've been on recently?",
  "If you could have dinner with anyone, living or historical, who would it be?",
  "What's something that always makes you smile?",
  "What's your favorite way to spend a Sunday morning?",
  "If you could learn any skill instantly, what would it be?",
  "What's a movie or book that changed your perspective?",
  "What's your go-to comfort food?",
  "What's something you're passionate about that might surprise people?",
  "If you could travel anywhere tomorrow, where would you go?",
  "What's the best piece of advice you've ever received?",
  "What's something you've always wanted to try but haven't yet?",
  "What makes you feel most alive?",
  "What's a talent or hobby you'd love to develop?",
  "What's your favorite childhood memory?",
  "If you could describe yourself in three words, what would they be?",
  "What's something that always makes you laugh?",
  "What's the most spontaneous thing you've ever done?",
  "What's your ideal way to relax after a long day?",
  "What's a place that feels like home to you?",
  "What's something you're grateful for today?",
];

const VerityDateCall = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const verityDateId = searchParams.get("id");
  const [roomUrl, setRoomUrl] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes
  const [icebreaker, setIcebreaker] = useState<string>("");

  useEffect(() => {
    if (!verityDateId) {
      navigate("/main");
      return;
    }

    // Load room URL
    const loadRoom = async () => {
      const { data, error } = await supabase
        .from("verity_dates")
        .select("room_url, scheduled_at")
        .eq("id", verityDateId)
        .single();

      if (error || !data?.room_url) {
        toast({
          title: "Error",
          description: "Video room not found",
          variant: "destructive",
        });
        navigate("/main");
        return;
      }

      setRoomUrl(data.room_url);

      // Calculate time remaining
      if (data.scheduled_at) {
        const scheduledTime = new Date(data.scheduled_at).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - scheduledTime) / 1000);
        const remaining = Math.max(0, 600 - elapsed);
        setTimeRemaining(remaining);
      }
    };

    loadRoom();

    // Random icebreaker
    const randomPrompt = ICEBREAKER_PROMPTS[Math.floor(Math.random() * ICEBREAKER_PROMPTS.length)];
    setIcebreaker(randomPrompt);

    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/verity-date/feedback?id=${verityDateId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [verityDateId, navigate, toast]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!roomUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading video room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-background">
      {/* Timer overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-card/80 backdrop-blur-md border border-primary/20 rounded-full px-6 py-3 shadow-lg">
        <Clock className="w-5 h-5 text-primary" />
        <span className="font-mono text-lg font-semibold text-foreground">{formatTime(timeRemaining)}</span>
      </div>

      {/* Icebreaker prompt overlay */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-md border border-primary/30 rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top duration-500">
        <div className="flex items-start gap-3">
          <Heart className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="white" />
          <div>
            <h3 className="text-white font-semibold mb-2">Conversation Starter</h3>
            <p className="text-white/90 text-sm leading-relaxed">{icebreaker}</p>
          </div>
        </div>
      </div>

      {/* Daily.co iframe */}
      <iframe
        src={roomUrl}
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        className="w-full h-full border-0"
        title="Verity Date Video Call"
      />

      {/* Decorative elements */}
      <div className="absolute bottom-4 right-4 z-50 opacity-20 pointer-events-none">
        <Heart className="w-12 h-12 text-primary animate-pulse" fill="currentColor" />
      </div>
    </div>
  );
};

export default VerityDateCall;
