import { ArrowRight, Clock, Users, Award, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import canteenHero from '@/assets/canteen-hero.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const features = [
    {
      icon: Clock,
      title: "Live Queue Tracking",
      description: "See real-time queue status and wait times"
    },
    {
      icon: Smartphone,
      title: "Pre-Order & Pickup",
      description: "Order ahead and skip the line"
    },
    {
      icon: Users,
      title: "Seat Availability",
      description: "Check if tables are free before you arrive"
    },
    {
      icon: Award,
      title: "Smart Rewards",
      description: "Earn points and unlock achievements"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={canteenHero}
          alt="Modern college canteen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-primary/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Smart Campus
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Canteen Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Skip the queues, track nutrition, earn rewards, and enjoy fresh meals designed for student life.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="hero"
              onClick={onGetStarted}
              className="text-lg px-8 py-3"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3"
            >
              View Live Queue
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="glass hover:shadow-strong transition-smooth">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary">2,500+</p>
              <p className="text-sm text-muted-foreground">Students Served Daily</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary">4.8⭐</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-primary">8min</p>
              <p className="text-sm text-muted-foreground">Average Wait Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}