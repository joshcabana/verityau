import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MapPin } from "lucide-react";

const MatchSuccess = () => {
  const navigate = useNavigate();

  // Mock match data - in production this would come from the call state/backend
  const match = {
    id: "1",
    name: "Sarah",
    age: 28,
    city: "London",
    photo: null,
    matchedDate: new Date().toLocaleDateString("en-GB", { 
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-10 w-10 text-primary fill-primary" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              You matched!
            </h1>
          </div>

          {/* Match Card */}
          <div className="bg-muted rounded-xl p-6 space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {match.name[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                {match.name}, {match.age}
              </h2>
              
              <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{match.city}</span>
              </div>

              <p className="text-sm text-muted-foreground pt-2">
                Matched on {match.matchedDate}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate(`/match/${match.id}`)}
              size="lg"
              className="w-full h-12 text-base font-semibold"
            >
              View their profile
            </Button>
            
            <Button
              onClick={() => navigate("/main")}
              variant="secondary"
              size="lg"
              className="w-full h-12 text-base"
            >
              Back to main screen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchSuccess;
