import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Sparkles, Shield, ShieldCheck, Ban, Camera, AlertCircle, Eye, Crown } from "lucide-react";
import { VerityDateNotification } from "@/components/VerityDateNotification";
import { useToast } from "@/hooks/use-toast";

const guidelines = [
  {
    icon: ShieldCheck,
    text: "Be respectful and kind to everyone you meet",
  },
  {
    icon: Ban,
    text: "No nudity, sexual content, or inappropriate behavior",
  },
  {
    icon: AlertCircle,
    text: "No hate speech, harassment, or bullying of any kind",
  },
  {
    icon: Eye,
    text: "You must be 18 or over to use Verity",
  },
  {
    icon: Camera,
    text: "No recording or screenshotting video calls without consent",
  },
];

const Main = () => {
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const [showMe, setShowMe] = useState<"men" | "women" | "everyone">("everyone");
  const [radius, setRadius] = useState(25);
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);
  
  // Mock user name - in production this would come from auth/state
  const userName = "Alex";

  // Demo notification system - in production this would use realtime subscriptions
  useEffect(() => {
    // Simulate notifications for demo purposes
    const notifyTimers: NodeJS.Timeout[] = [];

    // Random like notification after 30 seconds
    const likeTimer = setTimeout(() => {
      toast({
        title: "💕 New Like!",
        description: "Someone is interested in your profile",
        duration: 4000,
      });
    }, 30000);
    notifyTimers.push(likeTimer);

    return () => {
      notifyTimers.forEach(timer => clearTimeout(timer));
    };
  }, [toast]);
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleFindSomeone = () => {
    setIsSearching(true);
    // Mock search - in production this would trigger matchmaking
    setTimeout(() => {
      setIsSearching(false);
      // Navigate to intro call
    }, 2000);
  };

  const radiusOptions = [5, 10, 25, 50, 100];
  const getRadiusLabel = (value: number) => {
    if (value >= 100) return "Anywhere";
    return `${value}km`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
      {/* Verity Date Notification */}
      <VerityDateNotification />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-12">
          {/* Greeting */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">
              {getGreeting()}, {userName}.
            </h1>
          </div>

          {/* Verity Plus Teaser Banner */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-6 border border-primary/20 shadow-premium">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Verity Plus</h3>
                  <p className="text-sm text-muted-foreground">Unlimited dates • Priority matching</p>
                </div>
              </div>
              <Link to="/verity-plus">
                <Button variant="default" size="sm" className="btn-premium">
                  $24.99/mo
                </Button>
              </Link>
            </div>
          </div>

          {/* Primary CTA Card */}
          <div className="bg-card rounded-2xl shadow-lg p-12">
            <div className="text-center space-y-6">
              <Button
                onClick={handleFindSomeone}
                disabled={isSearching}
                size="lg"
                className="h-16 px-12 text-lg font-semibold btn-premium shadow-premium"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5 animate-heartbeat" fill="currentColor" />
                    Finding someone real...
                  </span>
                ) : (
                  "Find someone now"
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                {isSearching 
                  ? "Finding humans who are ready to be real..." 
                  : "Ready when you are."}
              </p>
            </div>

            {/* Controls */}
            <div className="mt-10 pt-8 border-t border-border space-y-6">
              {/* Show Me Toggle */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Show me</Label>
                <div className="flex gap-2">
                  <Button
                    variant={showMe === "women" ? "default" : "outline"}
                    onClick={() => setShowMe("women")}
                    className="flex-1"
                  >
                    Women
                  </Button>
                  <Button
                    variant={showMe === "men" ? "default" : "outline"}
                    onClick={() => setShowMe("men")}
                    className="flex-1"
                  >
                    Men
                  </Button>
                  <Button
                    variant={showMe === "everyone" ? "default" : "outline"}
                    onClick={() => setShowMe("everyone")}
                    className="flex-1"
                  >
                    Everyone
                  </Button>
                </div>
              </div>

              {/* Radius Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">Search radius</Label>
                  <span className="text-sm font-medium text-primary">
                    {getRadiusLabel(radius)}
                  </span>
                </div>
                <Slider
                  value={[radiusOptions.indexOf(radius)]}
                  onValueChange={(value) => setRadius(radiusOptions[value[0]])}
                  min={0}
                  max={radiusOptions.length - 1}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5km</span>
                  <span>Anywhere</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-t border-border bg-card/50 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-around gap-4">
            <Link to="/matches">
              <Button variant="ghost" className="flex-col h-auto py-3 px-6">
                <Heart className="h-5 w-5 mb-1" />
                <span className="text-xs">Matches</span>
              </Button>
            </Link>
            <Link to="/upgrade">
              <Button variant="ghost" className="flex-col h-auto py-3 px-6">
                <Sparkles className="h-5 w-5 mb-1" />
                <span className="text-xs">Verity Plus</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="flex-col h-auto py-3 px-6"
              onClick={() => setGuidelinesOpen(true)}
            >
              <Shield className="h-5 w-5 mb-1" />
              <span className="text-xs">Guidelines</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Guidelines Dialog */}
      <Dialog open={guidelinesOpen} onOpenChange={setGuidelinesOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-center mb-2">
              Community Guidelines
            </DialogTitle>
            <p className="text-muted-foreground text-center">
              Verity is a safe space for genuine connections
            </p>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50"
                >
                  <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">
                    {guideline.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mt-6">
            <p className="text-sm text-foreground text-center">
              Breaking these guidelines will result in immediate account suspension or permanent ban.
              We take safety seriously.
            </p>
          </div>

          <Button
            onClick={() => setGuidelinesOpen(false)}
            size="lg"
            className="w-full mt-6"
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Main;
