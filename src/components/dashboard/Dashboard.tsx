import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Users, CheckCircle, TrendingUp, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSkillCurrency } from '@/hooks/use-skill-currency';

export function Dashboard() {
  const { profile, exchanges } = useSkillCurrency();
  
  const completedCount = exchanges.filter(e => e.status === 'completed').length;
  const skillsLearnedCount = new Set(exchanges.filter(e => e.type === 'learning' && e.status === 'completed').map(e => e.skill)).size;

  const stats = [
    { label: 'Exchanges', value: completedCount, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Skills Learned', value: skillsLearnedCount, icon: Award, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Impact', value: completedCount * 10, icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {profile.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground text-xs">You're empowering your community today.</p>
        </div>
        <div className="relative p-2 bg-muted/50 rounded-full cursor-pointer hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-destructive border-2 border-background rounded-full" />
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${stat.bg} p-3 rounded-2xl flex flex-col items-center justify-center text-center gap-1 shadow-sm`}
          >
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <span className="text-xl font-bold">{stat.value}</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <Card className="border-none bg-primary text-primary-foreground overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="space-y-4 relative z-10">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Next Milestone</h3>
              <p className="text-primary-foreground/80 text-sm">Complete 2 more exchanges to reach "Expert Sharer" status!</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span>Progress</span>
                <span>{Math.min(100, (completedCount / 5) * 100)}%</span>
              </div>
              <Progress value={(completedCount / 5) * 100} className="bg-primary-foreground/20 h-2" />
            </div>
          </div>
          <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <div className="space-y-3">
          <div className="flex gap-3 p-3 bg-muted/20 rounded-xl border border-border/50">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium">New match found!</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Sarah Johnson teaches React Development which you want to learn.</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-muted/20 rounded-xl border border-border/50">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <p className="text-xs font-medium">Session reminder</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Your session with Michael Chen is scheduled for tomorrow at 2:00 PM.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Upcoming Exchanges</h3>
          <button className="text-primary text-xs font-medium">View All</button>
        </div>
        
        {exchanges.filter(e => e.status === 'scheduled').length > 0 ? (
          <div className="space-y-3">
            {exchanges.filter(e => e.status === 'scheduled').map((ex) => (
              <div key={ex.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border shadow-sm">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{ex.skill}</p>
                  <p className="text-xs text-muted-foreground truncate">with {ex.partnerName} • {ex.date}</p>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 bg-muted rounded">
                  {ex.type}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 bg-muted/30 rounded-2xl border border-dashed border-muted-foreground/20">
            <p className="text-sm text-muted-foreground mb-4">No exchanges scheduled yet. Start exploring to find matches!</p>
          </div>
        )}
      </div>
    </div>
  );
}
