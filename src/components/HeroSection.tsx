import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

const emailSchema = z.string().email("Please enter a valid email address");

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
          referral_source: 'hero_section'
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
          description: "We'll notify you as soon as Verity launches.",
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
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.pexels.com/videos/9498057/pexels-photo-9498057.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source 
            src="https://videos.pexels.com/video-files/9498057/9498057-uhd_2732_1440_25fps.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
      </div>

      {/* Floating Phone Mockups - Desktop Only */}
      <div className="hidden lg:block absolute left-[8%] top-1/2 -translate-y-1/2 z-10 animate-float">
        <div className="w-[240px] h-[480px] bg-card rounded-[40px] shadow-2xl border-8 border-foreground/10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=800&fit=crop&q=80&fm=webp" 
            alt="Video profile mockup"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="hidden lg:block absolute right-[8%] top-1/2 -translate-y-1/2 z-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-[240px] h-[480px] bg-card rounded-[40px] shadow-2xl border-8 border-foreground/10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=800&fit=crop&q=80&fm=webp" 
            alt="Video profile mockup"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="text-[64px] md:text-[120px] leading-[0.9] font-black mb-8 text-white drop-shadow-2xl animate-fade-in">
          Date people,<br />not profiles.
        </h1>

        {/* Subheadline */}
        <p className="text-[20px] md:text-[32px] leading-relaxed font-medium text-white/95 mb-12 max-w-4xl mx-auto drop-shadow-lg animate-fade-in-slow" style={{ animationDelay: '0.2s' }}>
          Verity is the only dating app that requires a 30-second video profile. No catfishing. No endless texting. No surprise first dates.
        </p>

        {/* Email Form */}
        <form 
          onSubmit={handleSubmit} 
          className="max-w-2xl mx-auto mb-6 animate-scale-in" 
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 h-16 md:h-20 text-lg md:text-xl px-8 bg-white/95 backdrop-blur-sm border-0 rounded-[16px] shadow-xl focus-visible:ring-primary focus-visible:ring-4"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="h-16 md:h-20 px-10 md:px-14 text-lg md:text-xl whitespace-nowrap font-bold shadow-xl"
            >
              {isSubmitting ? "Joining..." : (isHovered && email.length > 0 ? (
                <>
                  Hell yes <ArrowRight className="ml-2 h-6 w-6" />
                </>
              ) : "Join the Waitlist — Launching Soon")}
            </Button>
          </div>
        </form>

        {/* Subtext */}
        <p className="text-sm md:text-base text-white/90 font-medium animate-fade-in" style={{ animationDelay: '0.6s' }}>
          First 500 get lifetime Premium free
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(-50%) translateY(0px); }
          50% { transform: translateY(-50%) translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
