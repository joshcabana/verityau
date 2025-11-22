import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepAgeAndLegal from "@/components/onboarding/StepAgeAndLegal";
import StepBasics from "@/components/onboarding/StepBasics";
import StepPreferences from "@/components/onboarding/StepPreferences";
import StepCameraAndMic from "@/components/onboarding/StepCameraAndMic";
import StepGuidelines from "@/components/onboarding/StepGuidelines";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    dateOfBirth: undefined as Date | undefined,
    agreedToTerms: false,
    name: "",
    gender: "",
    interestedIn: "",
    city: "",
    photo: undefined,
    bio: "",
    lookingFor: "",
    ageRange: [18, 50] as [number, number],
    radius: 25,
    cameraPermission: false,
  });
  const navigate = useNavigate();

  const totalSteps = 5;

  const handleStepComplete = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Onboarding complete, navigate to main screen
      navigate("/main");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12">
          {currentStep === 1 && (
            <StepAgeAndLegal
              data={formData}
              onComplete={handleStepComplete}
            />
          )}
          {currentStep === 2 && (
            <StepBasics
              data={formData}
              onComplete={handleStepComplete}
            />
          )}
          {currentStep === 3 && (
            <StepPreferences
              data={formData}
              onComplete={handleStepComplete}
            />
          )}
          {currentStep === 4 && (
            <StepCameraAndMic
              data={formData}
              onComplete={handleStepComplete}
            />
          )}
          {currentStep === 5 && (
            <StepGuidelines
              onComplete={handleStepComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
