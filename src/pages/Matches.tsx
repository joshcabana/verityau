import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ArrowLeft, Sparkles } from "lucide-react";
import { MatchCard } from "@/components/MatchCard";
import { Chat } from "@/components/Chat";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchUserMatches, 
  unmatchUser, 
  acceptVerityDate,
  Match 
} from "@/utils/matchHelpers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Matches = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [unmatchDialogOpen, setUnmatchDialogOpen] = useState(false);
  const [matchToUnmatch, setMatchToUnmatch] = useState<Match | null>(null);

  // Load matches
  useEffect(() => {
    const loadMatches = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const userMatches = await fetchUserMatches(user.id);
        setMatches(userMatches);
      } catch (error) {
        console.error("Error loading matches:", error);
        toast({
          title: "Error",
          description: "Failed to load matches. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, [user, toast]);

  const handleOpenChat = (match: Match) => {
    setSelectedMatch(match);
    setChatOpen(true);
  };

  const handleAcceptVerityDate = async (match: Match) => {
    if (!match.verity_date || !user) return;

    const partnerId = match.user1 === user.id ? match.user2 : match.user1;
    const success = await acceptVerityDate(match.verity_date.id, user.id, partnerId);

    if (success) {
      toast({
        title: "🎉 Verity Date Accepted!",
        description: "Redirecting to waiting room...",
        duration: 3000,
      });

      // Navigate to waiting page
      navigate(`/verity-date/waiting?id=${match.verity_date.id}`);
    } else {
      toast({
        title: "Error",
        description: "Failed to accept Verity Date. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUnmatchClick = (match: Match) => {
    setMatchToUnmatch(match);
    setUnmatchDialogOpen(true);
  };

  const handleConfirmUnmatch = async () => {
    if (!matchToUnmatch) return;

    const success = await unmatchUser(matchToUnmatch.id);

    if (success) {
      toast({
        title: "Unmatched",
        description: `You've unmatched with ${matchToUnmatch.profile.name}.`,
      });

      // Remove from local state
      setMatches(matches.filter((m) => m.id !== matchToUnmatch.id));
    } else {
      toast({
        title: "Error",
        description: "Failed to unmatch. Please try again.",
        variant: "destructive",
      });
    }

    setUnmatchDialogOpen(false);
    setMatchToUnmatch(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/main")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Matches</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/verity-plus")}
          >
            <Sparkles className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No matches yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Keep swiping to find your connection!
            </p>
            <Button onClick={() => navigate("/main")} className="btn-premium">
              Start Discovering
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onOpenChat={() => handleOpenChat(match)}
                onAcceptVerityDate={
                  match.verity_date && !match.verity_date.scheduled_at
                    ? () => handleAcceptVerityDate(match)
                    : undefined
                }
                onUnmatch={() => handleUnmatchClick(match)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Chat Dialog */}
      {selectedMatch && (
        <Chat
          open={chatOpen}
          onOpenChange={setChatOpen}
          matchId={selectedMatch.id}
          matchName={selectedMatch.profile.name}
          matchPhoto={selectedMatch.profile.photos?.[0]}
          currentUserId={user?.id || ""}
          chatUnlocked={selectedMatch.chat_unlocked}
        />
      )}

      {/* Unmatch Confirmation Dialog */}
      <AlertDialog open={unmatchDialogOpen} onOpenChange={setUnmatchDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unmatch with {matchToUnmatch?.profile.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove them from your matches and you won't be able to message them anymore.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmUnmatch}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Unmatch
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Matches;
