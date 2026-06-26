import React, { useState } from 'react';
import { Search, ChevronLeft, Send, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSkillCurrency } from '@/hooks/use-skill-currency';

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export function ChatList() {
  const { matches } = useSkillCurrency();
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'them', text: 'Hey! I saw you want to learn UI Design. I can definitely help with that!', time: '10:30 AM' },
    { id: '2', sender: 'me', text: 'That would be awesome! I can teach you React in return.', time: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  if (selectedMatch) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <header className="p-4 border-b border-border flex items-center gap-3 bg-card sticky top-0 z-10">
          <button onClick={() => setSelectedMatch(null)}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <Avatar className="w-10 h-10">
            <AvatarImage src={selectedMatch.photo} />
            <AvatarFallback>{selectedMatch.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-bold text-sm">{selectedMatch.name}</h2>
            <p className="text-[10px] text-green-500 font-medium">Online</p>
          </div>
          <a
            href={`https://wa.me/${selectedMatch.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground rounded-tr-none shadow-sm'
                    : 'bg-card text-card-foreground border border-border rounded-tl-none shadow-sm'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`text-[10px] block mt-1 opacity-60 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-background border-t border-border flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="rounded-full bg-muted/30 border-none h-10"
          />
          <Button size="icon" onClick={handleSendMessage} className="rounded-full shrink-0 h-10 w-10">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <header className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-10 bg-muted/30 border-none rounded-xl h-12" />
        </div>
      </header>

      <div className="space-y-1">
        {matches.map((match) => (
          <button
            key={match.id}
            onClick={() => setSelectedMatch(match)}
            className="w-full flex items-center gap-4 p-4 hover:bg-muted/30 rounded-2xl transition-all text-left group"
          >
            <div className="relative">
              <Avatar className="w-14 h-14 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                <AvatarImage src={match.photo} />
                <AvatarFallback>{match.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-sm truncate">{match.name}</h3>
                <span className="text-[10px] text-muted-foreground">10:32 AM</span>
              </div>
              <p className="text-xs text-muted-foreground truncate leading-snug">
                That would be awesome! I can teach you React in return.
              </p>
            </div>
          </button>
        ))}
        {matches.length === 0 && (
          <div className="text-center py-20 px-6 text-muted-foreground bg-muted/10 rounded-3xl border border-dashed border-border">
            <p className="text-sm">No messages yet. Match with someone to start chatting!</p>
          </div>
        )}
      </div>
    </div>
  );
}
