import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, Zap, Sparkles } from "lucide-react";

const VerityPlus = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "More daily introductions",
      description: "Get introduced to more people each day to find your perfect match faster."
    },
    {
      icon: Zap,
      title: "Priority introductions",
      description: "Jump to the front of the queue during busy times and never miss out."
    },
    {
      icon: Clock,
      title: "Longer extended calls",
      description: "When you're really connecting, enjoy more time together on extended calls."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/main")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Verity Plus</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Verity Plus
          </h2>
          <p className="text-lg text-muted-foreground">
            For serious members who want more live introductions and longer conversations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Pricing Section */}
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 space-y-8 max-w-2xl mx-auto">
          <div className="text-center space-y-3">
            <div className="text-4xl font-bold text-foreground">
              $19<span className="text-2xl text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground">
              Cancel anytime. No commitments.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => navigate("/checkout")}
              size="lg"
              className="w-full h-14 text-lg font-semibold"
            >
              Upgrade to Verity Plus
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                className="text-muted-foreground"
                onClick={() => {
                  // In production, this could open a modal or navigate to a detailed benefits page
                  console.log("Learn more clicked");
                }}
              >
                Learn more about Plus benefits
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto space-y-2">
          <p>
            Verity Plus is billed monthly and can be cancelled at any time.
          </p>
          <p>
            Your membership will renew automatically unless you cancel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerityPlus;
