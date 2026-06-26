import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Calendar, Clock, Globe, MessageCircle, Heart, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSkillCurrency } from '@/hooks/use-skill-currency';
import { Match, ExchangeSession } from '@/types';
import { toast } from 'sonner';

export function Explore() {
  const { matches, addExchange, profile } = useSkillCurrency();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const currentMatch = matches[currentIndex];

  const handleNext = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.info("You've seen all potential matches for now!");
      setCurrentIndex(0);
    }
  };

  const handleMatch = () => {
    setShowSchedule(true);
  };

  const confirmExchange = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    const newExchange: ExchangeSession = {
      id: Math.random().toString(36).substr(2, 9),
      partnerName: currentMatch.name,
      skill: currentMatch.skillsToTeach.find(s => profile.skillsToLearn.includes(s)) || currentMatch.skillsToTeach[0],
      date: `${selectedDate} at ${selectedTime}`,
      type: 'learning',
      status: 'scheduled',
    };

    addExchange(newExchange);
    toast.success(`Session scheduled with ${currentMatch.name}!`);
    setShowSchedule(false);
    handleNext();
  };

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-4">
        <div className="bg-muted p-6 rounded-full">
          <Globe className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold">No Matches Yet</h2>
        <p className="text-muted-foreground text-sm">Try updating your skills in your profile to find more people to exchange with.</p>
      </div>
    );
  }

  if (showSchedule) {
    return (
      <div className="p-6 space-y-6">
        <header className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Schedule Session</h2>
          <p className="text-muted-foreground text-sm">Coordinate your skill exchange with {currentMatch.name}.</p>
        </header>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <input
              type="date"
              className="w-full p-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Time</label>
            <input
              type="time"
              className="w-full p-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          <div className="p-4 bg-accent/30 rounded-xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skill to learn</p>
            <p className="font-semibold text-lg">{currentMatch.skillsToTeach.find(s => profile.skillsToLearn.includes(s)) || currentMatch.skillsToTeach[0]}</p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowSchedule(false)}>Cancel</Button>
          <Button className="flex-1 rounded-xl" onClick={confirmExchange}>Confirm</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-[calc(100vh-64px)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Explore Matches</h1>
        <p className="text-muted-foreground text-sm">Based on your shared interests.</p>
      </header>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMatch.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Card className="h-full border-none shadow-xl overflow-hidden flex flex-col rounded-3xl">
              <div className="relative h-2/3">
                <img
                  src={currentMatch.photo}
                  alt={currentMatch.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h2 className="text-2xl font-bold">{currentMatch.name}</h2>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <MapPin className="w-4 h-4" />
                    <span>2.4 km away • Ikeja</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Can Teach You</p>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.skillsToTeach.map(s => (
                      <span key={s} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Wants to Learn</p>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.skillsToLearn.map(s => (
                      <span key={s} className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 py-8">
        <button
          onClick={handleNext}
          className="w-16 h-16 rounded-full bg-white shadow-lg border border-border flex items-center justify-center text-destructive transition-transform active:scale-90"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={handleMatch}
          className="w-20 h-20 rounded-full bg-primary shadow-xl flex items-center justify-center text-primary-foreground transition-transform active:scale-90"
        >
          <Heart className="w-10 h-10 fill-current" />
        </button>
      </div>
    </div>
  );
}
