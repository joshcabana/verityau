import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    bio: string | null;
    photos: string[];
    intro_video_url: string | null;
  };
  onLike: () => void;
  onPass: () => void;
}

export const ProfileCard = ({ profile, onLike, onPass }: ProfileCardProps) => {
  const [videoError, setVideoError] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setIsSwiping(true);
      setSwipeOffset({ x: eventData.deltaX, y: eventData.deltaY });
    },
    onSwipedLeft: () => {
      setSwipeOffset({ x: -500, y: 0 });
      setTimeout(() => {
        onPass();
        setSwipeOffset({ x: 0, y: 0 });
        setIsSwiping(false);
      }, 300);
    },
    onSwipedRight: () => {
      setSwipeOffset({ x: 500, y: 0 });
      setTimeout(() => {
        onLike();
        setSwipeOffset({ x: 0, y: 0 });
        setIsSwiping(false);
      }, 300);
    },
    onSwiped: () => {
      if (Math.abs(swipeOffset.x) < 100) {
        setSwipeOffset({ x: 0, y: 0 });
        setIsSwiping(false);
      }
    },
    trackMouse: true,
    trackTouch: true,
  });

  const rotation = swipeOffset.x / 20;
  const opacity = 1 - Math.abs(swipeOffset.x) / 500;

  return (
    <div
      {...handlers}
      className="relative w-full max-w-md mx-auto touch-none"
      style={{
        transform: `translate(${swipeOffset.x}px, ${swipeOffset.y}px) rotate(${rotation}deg)`,
        opacity: opacity,
        transition: isSwiping ? "none" : "all 0.3s ease-out",
        cursor: isSwiping ? "grabbing" : "grab",
      }}
    >
      {/* Swipe Indicators */}
      {isSwiping && (
        <>
          <div
            className="absolute top-20 left-8 z-20 px-6 py-3 rounded-full border-4 border-primary bg-primary/20 backdrop-blur-sm"
            style={{
              opacity: Math.max(0, swipeOffset.x / 150),
              transform: `scale(${1 + Math.max(0, swipeOffset.x / 300)})`,
            }}
          >
            <Heart className="w-12 h-12 text-primary" fill="currentColor" />
          </div>
          <div
            className="absolute top-20 right-8 z-20 px-6 py-3 rounded-full border-4 border-destructive bg-destructive/20 backdrop-blur-sm"
            style={{
              opacity: Math.max(0, -swipeOffset.x / 150),
              transform: `scale(${1 + Math.max(0, -swipeOffset.x / 300)})`,
            }}
          >
            <X className="w-12 h-12 text-destructive" />
          </div>
        </>
      )}

      <Card className="w-full overflow-hidden shadow-coral-glow">
      {/* Media Carousel */}
      <div className="relative aspect-[3/4] bg-muted">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {/* Intro Video (if available) */}
            {profile.intro_video_url && !videoError && (
              <CarouselItem>
                <div className="relative w-full h-full">
                  <video
                    src={profile.intro_video_url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onError={() => setVideoError(true)}
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Intro Video
                  </div>
                </div>
              </CarouselItem>
            )}
            
            {/* Photos */}
            {profile.photos.map((photo, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={photo}
                    alt={`${profile.name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                    <h2 className="text-2xl font-bold text-primary-foreground">
                      {profile.name}, {profile.age}
                    </h2>
                    {profile.bio && (
                      <p className="text-sm text-primary-foreground/90 mt-2 line-clamp-2">
                        {profile.bio}
                      </p>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {(profile.photos.length > 1 || (profile.intro_video_url && profile.photos.length > 0)) && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
      </div>

      {/* Action Buttons */}
      <div className="p-6 flex items-center justify-center gap-6 bg-card">
        <Button
          size="lg"
          variant="outline"
          onClick={onPass}
          className="w-16 h-16 rounded-full border-2 border-muted-foreground hover:border-destructive hover:bg-destructive/10 transition-smooth"
        >
          <X className="w-8 h-8 text-muted-foreground hover:text-destructive" />
        </Button>

        <Button
          size="lg"
          onClick={onLike}
          className="w-20 h-20 rounded-full btn-premium shadow-coral-glow hover:shadow-coral-intense"
        >
          <Heart className="w-10 h-10" fill="currentColor" />
        </Button>
      </div>
    </Card>
    </div>
  );
};
