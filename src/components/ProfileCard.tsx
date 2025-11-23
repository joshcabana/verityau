import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Heart, MapPin, Clock, Flag } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { VerifiedBadge } from "./VerifiedBadge";
import { ReportDialog } from "./ReportDialog";
import { MutualConnections } from "./MutualConnections";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    bio: string | null;
    photos: string[];
    intro_video_url: string | null;
    verified?: boolean;
    distance_meters?: number;
    last_active?: string;
    user_id: string;
  };
  onLike: () => void;
  onPass: () => void;
}

export const ProfileCard = ({ profile, onLike, onPass }: ProfileCardProps) => {
  const { user } = useAuth();
  const [videoError, setVideoError] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  // Format distance
  const formatDistance = (meters?: number) => {
    if (!meters) return null;
    const km = Math.round(meters / 1000);
    return km < 1 ? "< 1 km away" : `${km} km away`;
  };

  // Format last active
  const formatLastActive = (lastActive?: string) => {
    if (!lastActive) return null;
    const date = new Date(lastActive);
    const minutesAgo = Math.floor((Date.now() - date.getTime()) / 60000);
    
    if (minutesAgo < 5) return "Active now";
    if (minutesAgo < 60) return `Active ${minutesAgo}m ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `Active ${hoursAgo}h ago`;
    return `Active ${formatDistanceToNow(date, { addSuffix: true })}`;
  };

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
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-primary-foreground">
                        {profile.name}, {profile.age}
                      </h2>
                      {profile.verified && (
                        <VerifiedBadge size="md" className="text-primary-foreground" />
                      )}
                    </div>
                    
                    {/* Distance, Last Active, and Mutual Connections */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {formatDistance(profile.distance_meters) && (
                          <div className="flex items-center gap-1 text-xs text-primary-foreground/90">
                            <MapPin className="w-3 h-3" />
                            {formatDistance(profile.distance_meters)}
                          </div>
                        )}
                        {formatLastActive(profile.last_active) && (
                          <div className="flex items-center gap-1 text-xs text-primary-foreground/90">
                            <Clock className="w-3 h-3" />
                            {formatLastActive(profile.last_active)}
                          </div>
                        )}
                      </div>
                      
                      {user && (
                        <MutualConnections 
                          userId={user.id} 
                          otherUserId={profile.user_id} 
                        />
                      )}
                    </div>
                    
                    {profile.bio && (
                      <p className="text-sm text-primary-foreground/90 line-clamp-2 mt-2">
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
          size="sm"
          variant="ghost"
          onClick={() => setReportDialogOpen(true)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Flag className="w-4 h-4" />
        </Button>

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
    
    {/* Report Dialog */}
    <ReportDialog
      open={reportDialogOpen}
      onOpenChange={setReportDialogOpen}
      onSubmit={() => {
        setReportDialogOpen(false);
      }}
      userName={profile.name}
      reportedUserId={profile.user_id}
      context="profile"
    />
    </div>
  );
};
