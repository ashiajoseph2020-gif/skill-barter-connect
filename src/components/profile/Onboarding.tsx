import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Phone, BookOpen, GraduationCap, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSkillCurrency } from '@/hooks/use-skill-currency';
import { UserProfile } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface OnboardingProps {
  onComplete: () => void;
}

const SKILL_OPTIONS = [
  'React Development', 'UI Design', 'Graphic Design', 'Cooking', 'Photography',
  'Public Speaking', 'Digital Marketing', 'Data Analysis', 'Writing', 'Guitar',
  'Project Management', 'Financial Planning', 'Yoga', 'First Aid', 'Gardening'
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const { profile, updateProfile } = useSkillCurrency();
  const [step, setStep] = useState(1);
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleFinish = () => {
    updateProfile(localProfile);
    onComplete();
    toast.success('Welcome to SkillCurrency!');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalProfile({ ...localProfile, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSkill = (skill: string, type: 'skillsToTeach' | 'skillsToLearn') => {
    const current = localProfile[type];
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    setLocalProfile({ ...localProfile, [type]: updated });
  };

  const steps = [
    (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-primary">Welcome to SkillCurrency</h2>
          <p className="text-muted-foreground">Let's start by getting to know you.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g. John Doe"
              value={localProfile.name}
              onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Tell us a bit about yourself</Label>
            <Textarea
              id="bio"
              placeholder="Your background and why you're here..."
              value={localProfile.bio}
              onChange={(e) => setLocalProfile({ ...localProfile, bio: e.target.value })}
            />
          </div>
        </div>
      </div>
    ),
    (
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Profile Photo</h2>
          <p className="text-muted-foreground text-sm font-medium text-destructive">
            Please upload an original photo of yourself
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-primary/10 shadow-inner">
            {localProfile.photo ? (
              <img src={localProfile.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-10 h-10 text-muted-foreground/40" />
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handlePhotoUpload}
            />
          </div>
          <p className="text-xs text-muted-foreground italic">Tap the icon to upload</p>
        </div>
      </div>
    ),
    (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Your Location</h2>
          <p className="text-muted-foreground">This helps us find matches near you.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="e.g. Lagos"
              value={localProfile.state}
              onChange={(e) => setLocalProfile({ ...localProfile, state: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="town">Town</Label>
            <Input
              id="town"
              placeholder="e.g. Ikeja"
              value={localProfile.town}
              onChange={(e) => setLocalProfile({ ...localProfile, town: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Local Address</Label>
            <Input
              id="address"
              placeholder="e.g. 123 Community Lane"
              value={localProfile.address}
              onChange={(e) => setLocalProfile({ ...localProfile, address: e.target.value })}
            />
          </div>
        </div>
      </div>
    ),
    (
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">WhatsApp Contact</h2>
          <p className="text-muted-foreground">To coordinate your skill exchanges.</p>
        </div>
        <div className="flex justify-center py-4">
          <div className="bg-green-100 p-4 rounded-full">
            <Phone className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="space-y-4 max-w-xs mx-auto text-left">
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="+234..."
            value={localProfile.whatsapp}
            onChange={(e) => setLocalProfile({ ...localProfile, whatsapp: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">Format: +234 followed by your number</p>
        </div>
      </div>
    ),
    (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Skills You Can Teach</h2>
          <p className="text-muted-foreground">What are you passionate about sharing?</p>
        </div>
        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[40vh] p-1">
          {SKILL_OPTIONS.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill, 'skillsToTeach')}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                localProfile.skillsToTeach.includes(skill)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground border-transparent hover:border-border"
              )}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    ),
    (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Skills You Want to Learn</h2>
          <p className="text-muted-foreground">What would you like to explore next?</p>
        </div>
        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[40vh] p-1">
          {SKILL_OPTIONS.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill, 'skillsToLearn')}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                localProfile.skillsToLearn.includes(skill)
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-muted text-muted-foreground border-transparent hover:border-border"
              )}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    ),
  ];

  const canContinue = () => {
    if (step === 1) return localProfile.name.trim().length > 0;
    if (step === 2) return !!localProfile.photo;
    if (step === 3) return localProfile.state && localProfile.town && localProfile.address;
    if (step === 4) return localProfile.whatsapp.trim().length > 8;
    if (step === 5) return localProfile.skillsToTeach.length > 0;
    if (step === 6) return localProfile.skillsToLearn.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-md mx-auto">
      <div className="flex-1 pt-12">
        <div className="mb-8 w-full bg-muted h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / steps.length) * 100}%` }}
            className="bg-primary h-full"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {steps[step - 1]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4 pt-8 pb-12">
        {step > 1 && (
          <Button variant="ghost" onClick={prevStep} className="flex-1">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        )}
        {step < steps.length ? (
          <Button
            onClick={nextStep}
            disabled={!canContinue()}
            className="flex-1 ml-auto"
          >
            Continue <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            disabled={!canContinue()}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Start Exchanging
          </Button>
        )}
      </div>
    </div>
  );
}
