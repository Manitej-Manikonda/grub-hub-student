import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const quickQuestions = [
  "What's today's special?",
  "How long is the current queue?",
  "What are the healthy options?",
  "Show me vegan dishes",
  "What's included in the thali?"
];

const botResponses: Record<string, string> = {
  "What's today's special?": "Today's special is our delicious Chicken Biryani with raita and boiled egg, rated 4.9⭐ by students! It's freshly prepared and ready in 20 minutes.",
  "How long is the current queue?": "Current queue has 23 people with an estimated wait time of 8 minutes. Seat availability: 12/50 tables free.",
  "What are the healthy options?": "Our healthy options include Fresh Fruit Salad (150 cal), Masala Dosa (320 cal, vegan), and North Indian Thali (650 cal, high protein). All dishes show detailed nutrition info!",
  "Show me vegan dishes": "Vegan options available: Masala Dosa (₹45) and Fresh Fruit Salad (₹35). Both are marked with 🌱 vegan tags in our menu.",
  "What's included in the thali?": "North Indian Thali includes: 2 rotis, dal, seasonal sabzi, steamed rice, pickle, and a sweet. It's a complete balanced meal with 18g protein for ₹85."
};

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI canteen assistant 🍽️ How can I help you today? You can ask about menu items, queue status, nutrition info, or anything else!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[text] || "I understand you're asking about that! Our canteen offers fresh, nutritious meals daily. You can check our live menu, queue status, and nutrition info above. Is there anything specific you'd like to know about our food or services?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 shadow-strong z-40 flex flex-col">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                AI Assistant
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 pt-0">
            {/* Messages */}
            <ScrollArea className="flex-1 mb-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.isBot
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-gradient-primary text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="space-y-1">
                  {quickQuestions.slice(0, 3).map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs h-auto py-1 px-2"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask about menu, queue, etc..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                className="text-sm"
              />
              <Button 
                variant="default" 
                size="icon"
                onClick={() => sendMessage(inputText)}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        variant="hero"
        size="icon"
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-strong z-50 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </>
  );
}