import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Verity
          </h1>
          <p className="text-muted-foreground mb-8">
            Authentication flow coming soon...
          </p>
          <div className="space-y-3">
            <Button asChild size="lg" className="w-full">
              <Link to="/onboarding">Continue to Onboarding</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
