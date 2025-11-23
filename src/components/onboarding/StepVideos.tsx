import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Video, X } from "lucide-react";

interface StepProps {
  data: {
    introVideo?: File;
    verificationVideo?: File;
  };
  onComplete: (data: { introVideo?: File; verificationVideo?: File }) => void;
}

const StepVideos = ({ data, onComplete }: StepProps) => {
  const [introVideo, setIntroVideo] = useState<File | undefined>(data.introVideo);
  const [verificationVideo, setVerificationVideo] = useState<File | undefined>(data.verificationVideo);

  const handleIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setIntroVideo(file);
  };

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVerificationVideo(file);
  };

  const handleContinue = () => {
    onComplete({ introVideo, verificationVideo });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Add Your Videos</h2>
        <p className="text-muted-foreground">
          Record a short intro and verification video
        </p>
      </div>

      <div className="space-y-6">
        {/* Intro Video */}
        <div className="space-y-2">
          <Label htmlFor="intro">Intro Video (Optional)</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Tell others about yourself in 30 seconds
          </p>
          
          {introVideo ? (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <Video className="h-5 w-5" />
              <span className="flex-1 text-sm">{introVideo.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIntroVideo(undefined)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label
              htmlFor="intro"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload intro video</p>
              <input
                id="intro"
                type="file"
                className="hidden"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleIntroChange}
              />
            </label>
          )}
        </div>

        {/* Verification Video */}
        <div className="space-y-2">
          <Label htmlFor="verification">Verification Video (Recommended)</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Get verified by recording a quick video
          </p>
          
          {verificationVideo ? (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <Video className="h-5 w-5" />
              <span className="flex-1 text-sm">{verificationVideo.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setVerificationVideo(undefined)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label
              htmlFor="verification"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload verification video</p>
              <input
                id="verification"
                type="file"
                className="hidden"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleVerificationChange}
              />
            </label>
          )}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        className="w-full"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );
};

export default StepVideos;
