import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Clock } from "lucide-react";

interface PreferencesDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: {
    verifiedOnly: boolean;
    activeRecently: boolean;
  };
  onFiltersChange: (filters: { verifiedOnly: boolean; activeRecently: boolean }) => void;
}

export const PreferencesDrawer = ({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
}: PreferencesDrawerProps) => {
  const handleToggle = (key: keyof typeof filters) => {
    onFiltersChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[400px]">
        <SheetHeader>
          <SheetTitle>Discovery Filters</SheetTitle>
          <SheetDescription>
            Refine your match preferences
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Verified Only Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="verified-only" className="text-base font-medium">
                  Verified Only
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show only verified profiles
                </p>
              </div>
            </div>
            <Switch
              id="verified-only"
              checked={filters.verifiedOnly}
              onCheckedChange={() => handleToggle("verifiedOnly")}
            />
          </div>

          <Separator />

          {/* Active Recently Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="active-recently" className="text-base font-medium">
                  Active Recently
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show users active in the last 24 hours
                </p>
              </div>
            </div>
            <Switch
              id="active-recently"
              checked={filters.activeRecently}
              onCheckedChange={() => handleToggle("activeRecently")}
            />
          </div>

          <Separator />

          <p className="text-xs text-muted-foreground text-center pt-4">
            More filters will be added based on your preferences
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
