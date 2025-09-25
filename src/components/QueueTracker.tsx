import { Clock, Users, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QueueData {
  current: number;
  average: number;
  waitTime: number;
  trend: 'up' | 'down' | 'stable';
  seats: {
    available: number;
    total: number;
  };
}

interface QueueTrackerProps {
  data?: QueueData;
}

export function QueueTracker({ 
  data = {
    current: 23,
    average: 18,
    waitTime: 8,
    trend: 'down',
    seats: { available: 12, total: 50 }
  }
}: QueueTrackerProps) {
  const { current, average, waitTime, trend, seats } = data;
  
  const seatUtilization = ((seats.total - seats.available) / seats.total) * 100;
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-destructive" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-success" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-warning" />;
    }
  };

  const getQueueStatus = () => {
    if (current <= 10) return { status: 'Low', color: 'bg-success' };
    if (current <= 25) return { status: 'Medium', color: 'bg-warning' };
    return { status: 'High', color: 'bg-destructive' };
  };

  const { status, color } = getQueueStatus();

  return (
    <Card className="w-full shadow-medium hover:shadow-strong transition-smooth">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Live Queue Status
          </span>
          <Badge className={`${color} text-white`}>
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Queue */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">People in queue</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{current}</p>
              {getTrendIcon()}
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-muted-foreground">Est. wait time</p>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <p className="text-lg font-semibold">{waitTime} min</p>
            </div>
          </div>
        </div>

        {/* Seats Availability */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Seat availability</span>
            <span className="font-medium">{seats.available}/{seats.total} free</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-smooth"
              style={{ width: `${seatUtilization}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {seatUtilization.toFixed(0)}% occupied
          </p>
        </div>

        {/* Average comparison */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Average queue: {average} people | 
            <span className={trend === 'down' ? 'text-success' : 'text-destructive'}>
              {' '}{current > average ? '+' : ''}{current - average} from avg
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}