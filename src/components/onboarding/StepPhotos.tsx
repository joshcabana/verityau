import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface StepProps {
  data: {
    photo?: File;
  };
  onComplete: (data: { photo?: File }) => void;
}

const StepPhotos = ({ data, onComplete }: StepProps) => {
  const [photo, setPhoto] = useState<File | undefined>(data.photo);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPhoto(undefined);
    setPreview("");
  };

  const handleContinue = () => {
    onComplete({ photo });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Add Your Photo</h2>
        <p className="text-muted-foreground">
          Upload a clear photo of yourself
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="photo">Profile Photo</Label>
        
        {preview ? (
          <div className="relative w-full max-w-sm mx-auto">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="photo"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
            </div>
            <input
              id="photo"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />
          </label>
        )}
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

export default StepPhotos;
