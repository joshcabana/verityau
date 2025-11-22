import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/upgrade")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8 md:p-12 space-y-8 text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              Checkout Page
            </h2>
            <p className="text-muted-foreground">
              Payment integration coming soon. This is a placeholder for the checkout flow.
            </p>
          </div>

          <div className="bg-muted rounded-xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-foreground font-medium">Verity Plus</span>
              <span className="text-foreground font-semibold">$19/month</span>
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Billed monthly • Cancel anytime
            </p>
          </div>

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full h-12"
              onClick={() => {
                // Mock successful upgrade
                navigate("/main");
              }}
            >
              Complete upgrade
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => navigate("/upgrade")}
            >
              Back to details
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
