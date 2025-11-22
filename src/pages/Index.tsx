import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, 
  Shield, 
  Sparkles, 
  Clock, 
  Heart, 
  Users, 
  CheckCircle2,
  Star,
  Play,
  Lock,
  Flag,
  Ban,
  ArrowRight,
  MessageCircle,
  HeartCrack,
  Ghost,
  Fish,
  Frown
} from "lucide-react";

const AnimatedSection = ({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isMobile ? "duration-300" : "duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      style={{ transitionDelay: isMobile ? "0ms" : `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const parallaxOffset = useParallax(0.3);
  const [isMobile, setIsMobile] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [newWaitlistEmail, setNewWaitlistEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail && waitlistEmail.includes("@")) {
      setWaitlistSubmitted(true);
      setWaitlistEmail("");
    }
  };

  const handleNewWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWaitlistEmail && newWaitlistEmail.includes("@")) {
      console.log("Waitlist email submitted:", newWaitlistEmail);
      toast({
        title: "Thanks, you're on the list!",
        description: "We'll notify you when Verity launches in your area.",
      });
      setNewWaitlistEmail("");
    }
  };

  const features = [
    {
      icon: Video,
      title: "Video-First Matching",
      description: "Connect through authentic video conversations, not text messages."
    },
    {
      icon: CheckCircle2,
      title: "Verified Profiles",
      description: "Every member is verified for authenticity and safety."
    },
    {
      icon: Shield,
      title: "AI-Powered Safety",
      description: "Advanced AI monitors for inappropriate behavior in real-time."
    },
    {
      icon: Sparkles,
      title: "Smart Compatibility",
      description: "Intelligent matching based on shared interests and values."
    },
    {
      icon: Ban,
      title: "Zero Fake Accounts",
      description: "Strict verification ensures everyone is real and genuine."
    },
    {
      icon: Heart,
      title: "Designed for Meaningful Dating",
      description: "Built from the ground up for authentic, lasting connections."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Quick setup with optional verification for added trust."
    },
    {
      number: "2",
      title: "Match on Video",
      description: "Meet through authentic short videos and real-time conversations."
    },
    {
      number: "3",
      title: "Build Real Connections",
      description: "Experience dating that feels genuine, human, and effortless."
    }
  ];

  const testimonials = [
    {
      name: "Emma",
      age: 29,
      text: "I was skeptical at first, but video calls immediately show if there's real chemistry. No more endless texting that leads nowhere.",
      rating: 5
    },
    {
      name: "James",
      age: 32,
      text: "The 45-second intro is genius. You can tell in seconds if you vibe with someone. So much better than swiping.",
      rating: 5
    },
    {
      name: "Priya",
      age: 26,
      text: "Finally feels like authentic dating. Seeing someone's actual personality on video is completely different from photos.",
      rating: 5
    },
    {
      name: "Marcus",
      age: 34,
      text: "This is what dating apps should have been from the start. Real faces, real conversations, real connections.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How does the 45-second intro work?",
      answer:
        "When you're matched, you start with a 45-second live video introduction. At the end, you both choose privately whether you'd like to keep going. If you both say yes, you unlock a longer 3-minute call to see if the connection deepens.",
    },
    {
      question: "Is Verity safe?",
      answer:
        "Yes. We require age verification, provide in-call reporting, and enforce a strict zero-tolerance policy for harassment, hate, and abuse. You're always in control and can leave or report a call at any time.",
    },
    {
      question: "What if someone is inappropriate?",
      answer:
        "Use the in-call report button straight away. Our team reviews reports quickly and takes action against anyone who violates our community guidelines. You can also block users so you never see them again.",
    },
    {
      question: "Can I skip introductions?",
      answer:
        "Absolutely. If there's no vibe, you can politely end the call and move on. We encourage honesty and respect on both sides—Verity is designed to feel human, not like a performance.",
    },
    {
      question: "What's Verity Plus?",
      answer:
        "Verity Plus is our premium membership for people who want more from Verity. You get extra daily introductions, priority in the matching queue, advanced filters, and longer extended calls with the people you click with.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Problems Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-center mb-12 sm:mb-16 md:mb-20 leading-tight">
              We're all exhausted by the same bullshit
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-3 md:gap-12 mb-12 md:mb-16">
            <AnimatedSection delay={0}>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <HeartCrack className="h-12 w-12 text-foreground/70" strokeWidth={1.5} />
                  <Ghost className="h-12 w-12 text-foreground/70" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Ghosting & endless texting
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Weeks of chatting → date shows up looking nothing like photos → instant disappointment.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <Fish className="h-12 w-12 text-foreground/70" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Catfishing & fake profiles
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  54% of people lie on dating apps. You waste hours on someone who doesn't exist.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <Frown className="h-12 w-12 text-foreground/70" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Dead conversations
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  "Hey" → "Hey" → "How's your week?" → dies. Zero personality in text.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={300}>
            <p className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary">
              Verity fixes all three in one move.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* How Verity Works - Detailed Steps */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4" style={{ backgroundColor: '#F5F1ED' }}>
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 md:mb-24 leading-tight">
              How Verity works — 30 seconds to real connection
            </h2>
          </AnimatedSection>

          {/* Step 1 - Image Right on Desktop */}
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24">
              <div className="order-2 md:order-1">
                <div className="text-6xl sm:text-7xl md:text-8xl font-black text-primary mb-6">1</div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Record your 30-second intro
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  We guide you with 3 simple prompts. Just be yourself — smile, talk, laugh.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative aspect-[9/16] max-w-[300px] mx-auto bg-card rounded-[40px] shadow-2xl border-8 border-foreground/10 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=800&fit=crop&q=80" 
                    alt="Recording video intro"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      Recording
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Step 2 - Image Left on Desktop */}
          <AnimatedSection delay={100}>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24">
              <div className="order-1">
                <div className="relative aspect-[9/16] max-w-[300px] mx-auto bg-card rounded-[40px] shadow-2xl border-8 border-foreground/10 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-sm text-foreground/70 font-medium">Match Preview</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-2">
                <div className="text-6xl sm:text-7xl md:text-8xl font-black text-primary mb-6">2</div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  We match you with real humans
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Everyone has a video → you see energy, voice, mannerisms before you match.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Step 3 - Image Right on Desktop */}
          <AnimatedSection delay={200}>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24">
              <div className="order-2 md:order-1">
                <div className="text-6xl sm:text-7xl md:text-8xl font-black text-primary mb-6">3</div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Video Speed Dates (our secret weapon)
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Optional 3-minute live video calls before meeting IRL. 94% say it feels like you've known them forever.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative aspect-[9/16] max-w-[300px] mx-auto bg-card rounded-[40px] shadow-2xl border-8 border-foreground/10 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=800&fit=crop&q=80" 
                    alt="Video speed date"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-8 left-0 right-0 text-center">
                    <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      <Video className="h-4 w-4" />
                      2:47 remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Step 4 - Image Left on Desktop */}
          <AnimatedSection delay={300}>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="order-1">
                <div className="relative aspect-[9/16] max-w-[300px] mx-auto bg-card rounded-[40px] shadow-2xl border-8 border-foreground/10 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=800&fit=crop&q=80" 
                    alt="Meeting in real life"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                      <Heart className="h-5 w-5" />
                      Natural Connection
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-2">
                <div className="text-6xl sm:text-7xl md:text-8xl font-black text-primary mb-6">4</div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Meet in real life, zero surprises
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  You already know what they sound like, how they laugh, their vibe. Dates actually feel natural.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-secondary/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">How It Works</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Three simple steps to meaningful connections
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 100}>
                <Card className="border-0 shadow-glass backdrop-blur-sm h-full hover:shadow-lg md:hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="pt-6 pb-6 sm:pt-8 sm:pb-8 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-transform hover:scale-110">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">{step.number}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">{step.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Verity is Different */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">Why Verity is Different</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Built for real, face-to-face chemistry — not endless swiping.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            <AnimatedSection delay={0}>
              <Card className="border-0 shadow-glass backdrop-blur-sm h-full hover:shadow-lg md:hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6 pb-6 sm:pt-8 sm:pb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 transition-transform hover:scale-110">
                    <Video className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Video-first, not photo-first</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    You see and hear people in real time, so there's less guesswork and fewer surprises.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <Card className="border-0 shadow-glass backdrop-blur-sm h-full hover:shadow-lg md:hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6 pb-6 sm:pt-8 sm:pb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 transition-transform hover:scale-110">
                    <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Focused on real conversations</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Short intros that can turn into longer calls when the chemistry is mutual.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Card className="border-0 shadow-glass backdrop-blur-sm h-full hover:shadow-lg md:hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6 pb-6 sm:pt-8 sm:pb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 transition-transform hover:scale-110">
                    <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Safety built-in</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Verification options, reporting tools, and zero-tolerance moderation to keep the community respectful.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">Key Features</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Everything you need for authentic connections
              </p>
            </div>
          </AnimatedSection>

          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {features.map((feature, index) => (
                <AnimatedSection key={feature.title} delay={index * 50} className="min-w-[280px] snap-center">
                  <Card className="border border-border hover:border-primary/50 transition-all duration-300 shadow-premium h-full">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex flex-col gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 100}>
                <Card className="border border-border hover:border-primary/50 transition-all duration-300 shadow-premium h-full hover:shadow-lg hover:scale-[1.02]">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-transform hover:scale-110">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video Preview Mockup */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">The video-first experience</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                See chemistry instantly. No guessing, no waiting.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <Card className="border-0 shadow-premium overflow-hidden md:hover:shadow-xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItMmgtMnYyaDJ6TTM0IDM0djJoLTJ2LTJoMnptMCAydi0yaDJ2MmgtMnptMi0ydjJoMnYtMmgtMnptMCAwdi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
                  
                  <div className="relative z-10 text-center px-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 backdrop-blur-sm hover:bg-primary/30 transition-all cursor-pointer hover:scale-110">
                      <Play className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Live video preview coming soon</p>
                  </div>

                  {/* Mock video tiles */}
                  <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="aspect-video rounded-lg sm:rounded-xl bg-muted/80 backdrop-blur-sm border border-border/50 animate-pulse" style={{ animationDuration: "2s" }} />
                    <div className="aspect-video rounded-lg sm:rounded-xl bg-muted/80 backdrop-blur-sm border border-border/50 animate-pulse" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust & Safety */}
      <section id="safety" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 scroll-mt-20">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 mb-4 sm:mb-6">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4">Real People. Real Voices. Real Connections.</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              We maintain a safe, respectful community through strict verification, 
              active monitoring, and zero tolerance for abuse.
            </p>

            {/* Safety Bullet Points */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 px-4 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="font-medium">18+ only community</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="font-medium">Optional verification for extra trust</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="font-medium">In-call reporting and zero-tolerance moderation</span>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: Shield, label: "Age verified" },
              { icon: Video, label: "Live camera check" },
              { icon: Flag, label: "In-call reporting" },
              { icon: Ban, label: "Instant bans" }
            ].map((item, index) => (
              <AnimatedSection key={item.label} delay={index * 100}>
                <Card className="border border-border hover:border-primary/50 transition-all duration-300 md:hover:shadow-lg md:hover:scale-[1.05]">
                  <CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6 md:pt-8 md:pb-8 text-center">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary mx-auto mb-2 sm:mb-3" />
                    <p className="font-medium text-xs sm:text-sm md:text-base">{item.label}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">What early members are saying</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
                Verity is still in early access, but members are already finding more genuine connections.
              </p>
            </div>
          </AnimatedSection>

          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection key={testimonial.name} delay={index * 50} className="min-w-[280px] snap-center">
                  <Card className="border-0 shadow-glass h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-primary/80 text-primary/80" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                      <p className="text-sm font-medium text-muted-foreground">{testimonial.name}, {testimonial.age}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 100}>
                <Card className="border-0 shadow-glass h-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary/80 text-primary/80" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                    <p className="text-sm font-medium text-muted-foreground">{testimonial.name}, {testimonial.age}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 scroll-mt-20 pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">Frequently asked questions</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
                Everything you need to know about Verity
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border border-border rounded-xl px-4 sm:px-6 hover:border-primary/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-4 sm:py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <Card className="border-0 shadow-premium overflow-hidden relative md:hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,80%,25%)] via-[hsl(270,60%,35%)] to-[hsl(220,20%,25%)] opacity-[0.03]" />
              
              <CardContent className="pt-10 pb-10 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 text-center relative z-10 px-6">
                <Heart className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-primary mx-auto mb-4 sm:mb-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Ready to Date Differently?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Experience dating built for authenticity.
                </p>
                <Button asChild size="lg" className="text-base sm:text-lg px-8 py-6 sm:py-7 h-auto rounded-xl shadow-premium font-bold w-full sm:w-auto">
                  <Link to="/auth">
                    Join Verity
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-secondary/30">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4">
                Be the First to Join Verity
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-4">
                We're launching soon. Get early access to video-first dating and be notified the moment Verity goes live in your area.
              </p>

              {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4 px-4">
                  <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      required
                      className="flex-1 h-12 sm:h-14 text-base rounded-xl border-border focus-visible:ring-primary px-4"
                    />
                    <Button 
                      type="submit"
                      size="lg" 
                      className="h-12 sm:h-14 text-base px-6 sm:px-8 rounded-xl shadow-premium font-bold whitespace-nowrap"
                    >
                      Join the waitlist
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    We'll only email you about Verity updates. No spam.
                  </p>
                </form>
              ) : (
                <div className="space-y-4 px-4">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" />
                    <p className="text-base sm:text-lg font-semibold">
                      Thanks, you're on the list!
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                    We'll notify you as soon as Verity launches in your area.
                  </p>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setWaitlistSubmitted(false)}
                    className="mx-auto"
                  >
                    Submit another email
                  </Button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Join the Waitlist Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
                Be the First to Join Verity
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                We're launching soon. Get early access and be notified when Verity goes live in your area.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <form onSubmit={handleNewWaitlistSubmit} className="space-y-4 px-4">
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newWaitlistEmail}
                  onChange={(e) => setNewWaitlistEmail(e.target.value)}
                  required
                  className="flex-1 h-12 sm:h-14 text-base rounded-xl border-border focus-visible:ring-primary px-4"
                />
                <Button 
                  type="submit"
                  size="lg" 
                  className="h-12 sm:h-14 text-base px-6 sm:px-8 rounded-xl shadow-premium font-bold whitespace-nowrap"
                >
                  Join the waitlist
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                We'll only email you about Verity. No spam.
              </p>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/30 py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">Verity</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Real connections through authentic video conversations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">Get Started</Link></li>
                <li><Link to="/verity-plus" className="text-muted-foreground hover:text-foreground transition-colors">Verity Plus</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Safety</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('safety');
                      if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Community Guidelines
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('safety');
                      if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Safety Tips
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('safety');
                      if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Report Abuse
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('how-it-works');
                      if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('faq');
                      if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
                <li><a href="mailto:hello@verity.app" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 Verity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
