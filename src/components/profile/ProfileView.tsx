import React from 'react';
import { Settings, LogOut, MapPin, Phone, Award, Edit2, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSkillCurrency } from '@/hooks/use-skill-currency';
import { toast } from 'sonner';

export function ProfileView() {
  const { profile } = useSkillCurrency();

  const handleShare = () => {
    const text = `Check out my profile on SkillCurrency! I can teach ${profile.skillsToTeach.join(', ')}. Let's exchange!`;
    if (navigator.share) {
      navigator.share({
        title: 'SkillCurrency Profile',
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Profile summary copied to clipboard!');
    }
  };

  return (
    <div className="pb-8 overflow-y-auto h-[calc(100vh-64px)]">
      <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
        <div className="absolute -bottom-14 left-6">
          <div className="relative group">
            <Avatar className="w-28 h-28 border-4 border-background shadow-2xl">
              <AvatarImage src={profile.photo} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-muted">{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 shadow-lg bg-background/80 backdrop-blur-sm">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 shadow-lg bg-background/80 backdrop-blur-sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mt-16 px-6 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">{profile.name}</h2>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
              <Award className="w-3 h-3" />
              Expert Sharer
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0 text-primary" />
            <span className="truncate">{profile.town}, {profile.state}</span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground bg-muted/20 p-4 rounded-2xl border border-border/50 italic">
          "{profile.bio || "Passionate learner and teacher. Excited to exchange skills and grow together with the community!"}"
        </p>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-none bg-muted/30 rounded-2xl">
            <CardContent className="p-4 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Phone className="w-3 h-3 text-green-600" />
                </div>
                <span className="font-medium truncate text-xs">{profile.whatsapp}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none bg-muted/30 rounded-2xl">
            <CardContent className="p-4 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Address</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <MapPin className="w-3 h-3 text-primary" />
                </div>
                <span className="font-medium truncate text-xs">{profile.address}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            Skills to Teach
            <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
              {profile.skillsToTeach.length}
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skillsToTeach.map(s => (
              <span key={s} className="px-4 py-2 bg-primary/5 text-primary border border-primary/10 rounded-xl text-xs font-medium shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            Skills to Learn
            <span className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
              {profile.skillsToLearn.length}
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skillsToLearn.map(s => (
              <span key={s} className="px-4 py-2 bg-secondary/5 text-secondary-foreground border border-secondary/10 rounded-xl text-xs font-medium shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        <Button className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all" variant="outline" onClick={handleShare}>
          <Share2 className="w-4 h-4" />
          Share My Skills
        </Button>

        <button className="w-full py-4 text-sm font-medium text-destructive flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}

import { Camera } from 'lucide-react';
