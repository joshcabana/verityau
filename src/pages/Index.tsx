import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import phoneMockupLeft from "@/assets/phone-mockup-left.png";
import phoneMockupRight from "@/assets/phone-mockup-right.png";

const emailSchema = z.string().email("Please enter a valid email address");

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ 
          email: email.toLowerCase().trim(),
          city: 'Canberra',
          referral_code: null
        }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already on the list!",
            description: "This email is already registered for the waitlist.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "You're on the list! 🎉",
          description: "We'll notify you when Verity launches in Canberra.",
        });
        setEmail("");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Full-bleed Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/hero-background.jpg)',
              filter: 'brightness(0.6)'
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Floating Phone Mockups */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Phone - Hidden on mobile */}
          <div className="hidden lg:block absolute left-[8%] top-1/2 -translate-y-1/2 animate-float">
            <img 
              src={phoneMockupLeft}
              alt="Video date in progress"
              className="w-[280px] drop-shadow-2xl transform -rotate-6 opacity-90"
            />
          </div>
          
          {/* Right Phone - Hidden on mobile */}
          <div className="hidden lg:block absolute right-[8%] top-1/2 -translate-y-1/2 animate-float-delayed">
            <img 
              src={phoneMockupRight}
              alt="Video date conversation"
              className="w-[280px] drop-shadow-2xl transform rotate-6 opacity-90"
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Headline */}
            <h1 
              className="text-[64px] md:text-[120px] font-bold text-white mb-6 md:mb-8 leading-[0.95] tracking-tight"
              style={{ fontFamily: 'Obviously, Recoleta, Satchel, sans-serif' }}
            >
              Date people, not profiles.
            </h1>

            {/* Subheadline */}
            <p className="text-[22px] md:text-[32px] text-white/95 mb-10 md:mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
              The only dating app where your first conversation is a 10-minute video date.<br />
              <span className="text-white/90">No endless chatting. No catfishing. No disappointment.</span>
            </p>

            {/* Email Input Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 h-16 md:h-[72px] text-lg md:text-xl px-6 md:px-8 bg-white/95 backdrop-blur-sm border-2 border-white/40 rounded-[20px] shadow-xl focus-visible:ring-primary focus-visible:ring-4 focus-visible:border-primary transition-all placeholder:text-foreground/40"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-16 md:h-[72px] px-8 md:px-12 text-base md:text-xl font-bold shadow-2xl hover:shadow-primary/50 transition-all"
                >
                  <span className="hidden md:inline">
                    {isSubmitting ? "Joining..." : "Join the Waitlist — Canberra launching January 2026"}
                  </span>
                  <span className="md:hidden">
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </span>
                </Button>
              </div>
            </form>

            {/* Small text under button */}
            <p className="text-white/80 text-base md:text-lg font-medium">
              First 1,000 Canberrans get unlimited Verity Dates for life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
