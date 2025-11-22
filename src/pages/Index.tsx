import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Heart, Video, CheckCircle2, MessageCircle } from "lucide-react";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import phoneMockupLeft from "@/assets/phone-mockup-left.png";
import phoneMockupRight from "@/assets/phone-mockup-right.png";
import step1Profile from "@/assets/step-1-profile.png";
import step2Video from "@/assets/step-2-video.png";
import step3Decision from "@/assets/step-3-decision.png";
import step4Chat from "@/assets/step-4-chat.png";

const emailSchema = z.string().email("Please enter a valid email address");

const WaitlistForm = () => {
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
          title: "Hell yes → you're in!",
          description: "Tell your friends.",
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="email"
          placeholder="your@email.com →"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="flex-1 h-14 md:h-16 text-base md:text-lg px-6 bg-white border-2 border-border rounded-[20px] shadow-md focus-visible:ring-primary focus-visible:ring-4 focus-visible:border-primary transition-all placeholder:text-foreground/40"
        />
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-14 md:h-16 px-8 md:px-12 text-base md:text-lg font-bold shadow-xl hover:shadow-primary/50 transition-all"
        >
          {isSubmitting ? "Joining..." : "Join Waitlist — Lifetime Unlimited"}
        </Button>
      </div>
    </form>
  );
};

const AnimatedCounter = ({ target }: { target: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  const count = useCountAnimation(target, 2000, isVisible);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
    </span>
  );
};

const Index = () => {
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
            <div className="mb-6">
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email') as string;
                
                const validation = emailSchema.safeParse(email);
                if (!validation.success) {
                  return;
                }

                try {
                  const { error } = await supabase.from('waitlist').insert([{ 
                    email: email.toLowerCase().trim(),
                    city: 'Canberra',
                    referral_code: null
                  }]);
                  
                  if (error && error.code !== '23505') {
                    throw error;
                  }
                } catch (error) {
                  console.error(error);
                }
              }} className="max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com →"
                    required
                    className="flex-1 h-16 md:h-[72px] text-lg md:text-xl px-6 md:px-8 bg-white/95 backdrop-blur-sm border-2 border-white/40 rounded-[20px] shadow-xl focus-visible:ring-primary focus-visible:ring-4 focus-visible:border-primary transition-all placeholder:text-foreground/40"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="h-16 md:h-[72px] px-8 md:px-12 text-base md:text-xl font-bold shadow-2xl hover:shadow-primary/50 transition-all"
                  >
                    Join Waitlist — Lifetime Unlimited
                  </Button>
                </div>
              </form>
            </div>

            {/* Small text under button */}
            <p className="text-white/80 text-base md:text-lg font-medium">
              First 1,000 Canberrans get unlimited Verity Dates for life.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <h2 
            className="text-4xl md:text-[64px] font-bold text-center mb-16 md:mb-20 leading-tight"
            style={{ fontFamily: 'Obviously, Recoleta, Satchel, sans-serif' }}
          >
            Canberra, we're done with the games.
          </h2>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="bg-card border-2 border-border rounded-[24px] p-8 md:p-10 shadow-glass hover:shadow-premium transition-all duration-300 hover:scale-[1.02]">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                You spend weeks texting someone who looks nothing like their photos.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-[24px] p-8 md:p-10 shadow-glass hover:shadow-premium transition-all duration-300 hover:scale-[1.02]">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                You finally meet and there's zero chemistry.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-[24px] p-8 md:p-10 shadow-glass hover:shadow-premium transition-all duration-300 hover:scale-[1.02]">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                You waste another night on someone who ghosts after three days.
              </p>
            </div>
          </div>

          {/* Coral Bold Text */}
          <p className="text-center text-2xl md:text-3xl font-bold text-primary leading-relaxed">
            Verity forces a 10-minute video date first. Spark or move on. Simple.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <h2 
            className="text-4xl md:text-[64px] font-bold text-center mb-20 md:mb-32 leading-tight"
            style={{ fontFamily: 'Obviously, Recoleta, Satchel, sans-serif' }}
          >
            One video date changes everything
          </h2>

          {/* Steps */}
          <div className="space-y-24 md:space-y-32">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" fill="white" />
                  </div>
                  <span className="text-6xl md:text-7xl font-black text-primary">1</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  See someone's profile → both say Interested
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Browse profiles with photos and videos. If you both swipe right, it's time for a date.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src={step1Profile}
                  alt="Profile screen"
                  className="w-full max-w-[320px] mx-auto drop-shadow-2xl rounded-[40px]"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="order-1">
                <img 
                  src={step2Video}
                  alt="Video date screen"
                  className="w-full max-w-[320px] mx-auto drop-shadow-2xl rounded-[40px]"
                />
              </div>
              <div className="order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-6xl md:text-7xl font-black text-primary">2</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Jump on a 10-minute Verity Date
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Split-screen video call with a timer and icebreaker prompts. See the real person, not a curated profile.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-6xl md:text-7xl font-black text-primary">3</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Both say "Yes" → unlock chat + keep talking
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Mutual interest? Start chatting and plan to meet IRL.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src={step3Decision}
                  alt="Decision screen"
                  className="w-full max-w-[320px] mx-auto drop-shadow-2xl rounded-[40px]"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-6xl md:text-7xl font-black text-primary">4</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  One or both "No" → part ways respectfully
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  No awkwardness. No ghosting. Just a clean, respectful exit. Move on to your next match.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src={step4Chat}
                  alt="No match screen"
                  className="w-full max-w-[320px] mx-auto drop-shadow-2xl rounded-[40px]"
                />
              </div>
            </div>
          </div>

          {/* Animated Counter */}
          <div className="mt-24 md:mt-32 text-center">
            <p className="text-2xl md:text-4xl font-bold mb-8">
              Join <AnimatedCounter target={11337} /> Australians already waiting
            </p>

            {/* Email Form */}
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Final CTA Section - Full Bleed Coral */}
      <section className="relative py-24 md:py-40 px-4 bg-primary overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Massive Headline */}
          <h2 
            className="text-5xl md:text-[80px] font-bold text-white mb-12 md:mb-16 leading-tight"
            style={{ fontFamily: 'Obviously, Recoleta, Satchel, sans-serif' }}
          >
            Be the first in Canberra to date like a human again.
          </h2>

          {/* Email Form */}
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email') as string;
            
            const validation = emailSchema.safeParse(email);
            if (!validation.success) {
              return;
            }

            try {
              const { error } = await supabase.from('waitlist').insert([{ 
                email: email.toLowerCase().trim(),
                city: 'Canberra',
                referral_code: null
              }]);
              
              if (error && error.code !== '23505') {
                throw error;
              }
            } catch (error) {
              console.error(error);
            }
          }} className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="email"
                name="email"
                placeholder="your@email.com →"
                required
                className="flex-1 h-16 md:h-20 text-lg md:text-xl px-6 md:px-8 bg-white text-foreground border-2 border-white rounded-[20px] shadow-xl focus-visible:ring-white focus-visible:ring-4 transition-all placeholder:text-foreground/40"
              />
              <Button
                type="submit"
                size="lg"
                variant="outline"
                className="h-16 md:h-20 px-8 md:px-12 text-base md:text-xl font-bold bg-white text-primary border-2 border-white hover:bg-white/90 hover:scale-105 shadow-2xl transition-all"
              >
                Join Waitlist — Lifetime Unlimited
              </Button>
            </div>
          </form>

          {/* Small Launch Text */}
          <p className="text-white/90 text-lg md:text-xl font-medium">
            Launching Canberra January 2026 → then Sydney/Melbourne
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <span 
                className="text-3xl md:text-4xl font-bold text-primary"
                style={{ fontFamily: 'Obviously, Recoleta, Satchel, sans-serif' }}
              >
                Verity
              </span>
            </div>

            {/* Center: Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/80 text-sm md:text-base">
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <span className="text-white/40">·</span>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms
              </a>
              <span className="text-white/40">·</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <span className="text-white/40">·</span>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                TikTok
              </a>
              <span className="text-white/40">·</span>
              <a href="mailto:hello@verity.au" className="hover:text-primary transition-colors">
                hello@verity.au
              </a>
            </div>

            {/* Right: Copyright */}
            <div className="flex-shrink-0 text-white/60 text-sm md:text-base text-center md:text-right">
              Made with frustration and love in Canberra © 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
