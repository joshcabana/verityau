import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatStubProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchName: string;
  matchPhoto?: string;
}

export const ChatStub = ({ open, onOpenChange, matchName, matchPhoto }: ChatStubProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hey! Great to match with you! 👋",
      sender: "them",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        content: message,
        sender: "me",
        timestamp: new Date().toISOString(),
      },
    ]);
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] p-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="border-b border-border p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={matchPhoto} alt={matchName} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {matchName?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <DialogTitle>{matchName}</DialogTitle>
          </div>
        </DialogHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-muted rounded-lg px-6 py-4">
              <p className="text-sm text-muted-foreground">
                💬 <strong>Full chat coming soon!</strong>
                <br />
                This is a preview. Real-time messaging will be available in the next update.
              </p>
            </div>
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              size="icon"
              disabled={!message.trim()}
              className="btn-premium"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
