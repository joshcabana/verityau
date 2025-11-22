import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";

const Matches = () => {
  const navigate = useNavigate();

  // Mock matches data - in production this would come from backend
  const matches = [
    {
      id: "1",
      name: "Sarah",
      age: 28,
      city: "London",
      photo: null,
      matchedDate: "21 November 2025"
    },
    {
      id: "2",
      name: "Emily",
      age: 26,
      city: "Manchester",
      photo: null,
      matchedDate: "20 November 2025"
    },
    {
      id: "3",
      name: "Jessica",
      age: 30,
      city: "Bristol",
      photo: null,
      matchedDate: "19 November 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/main")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Matches</h1>
        </div>
      </div>

      {/* Matches List */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No matches yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Start a call to meet someone new!
            </p>
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              onClick={() => navigate(`/match/${match.id}`)}
              className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl bg-primary/10 text-primary">
                    {match.name[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-lg">
                    {match.name}, {match.age}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{match.city}</span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    Matched on {match.matchedDate}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Matches;
