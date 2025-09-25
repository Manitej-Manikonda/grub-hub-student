import { ArrowLeft, Trophy, Star, Gift, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const userStats = {
  points: 2450,
  rank: 7,
  nextReward: 500,
  weeklyOrders: 8
};

const leaderboard = [
  { name: 'Arjun Sharma', points: 3890, avatar: '👨‍🎓' },
  { name: 'Priya Patel', points: 3675, avatar: '👩‍🎓' },
  { name: 'Raj Kumar', points: 3420, avatar: '👨‍🎓' },
  { name: 'Sneha Singh', points: 3150, avatar: '👩‍🎓' },
  { name: 'Vikash Gupta', points: 2980, avatar: '👨‍🎓' },
  { name: 'Kavya Reddy', points: 2750, avatar: '👩‍🎓' },
  { name: 'You', points: 2450, avatar: '🎯' },
  { name: 'Rohit Jain', points: 2380, avatar: '👨‍🎓' },
  { name: 'Anita Das', points: 2150, avatar: '👩‍🎓' },
  { name: 'Karan Singh', points: 1920, avatar: '👨‍🎓' }
];

const achievements = [
  { 
    title: 'First Order', 
    description: 'Placed your first order', 
    points: 50, 
    completed: true,
    icon: '🎉'
  },
  { 
    title: 'Weekly Warrior', 
    description: 'Order 7 times in a week', 
    points: 200, 
    completed: true,
    icon: '⚡'
  },
  { 
    title: 'Dosa Lover', 
    description: 'Order 10 different dosas', 
    points: 150, 
    progress: 7,
    total: 10,
    completed: false,
    icon: '🥞'
  },
  { 
    title: 'Early Bird', 
    description: 'Order before 9 AM for 5 days', 
    points: 100, 
    progress: 3,
    total: 5,
    completed: false,
    icon: '🌅'
  }
];

const howToEarnPoints = [
  { action: 'Place an order', points: '10 points', icon: Zap },
  { action: 'Rate a dish', points: '5 points', icon: Star },
  { action: 'Weekly order streak', points: '50 bonus', icon: Trophy },
  { action: 'Refer a friend', points: '200 points', icon: Gift }
];

const Rewards = () => {
  const progressToNext = ((userStats.points % 500) / 500) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Rewards & Points</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">{userStats.points}</CardTitle>
              <CardDescription>Total Points</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-orange-500">#{userStats.rank}</CardTitle>
              <CardDescription>Your Rank</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-green-500">{userStats.weeklyOrders}</CardTitle>
              <CardDescription>This Week's Orders</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Next Reward Level</p>
                <p className="text-lg font-semibold">{userStats.nextReward - (userStats.points % 500)} points to go</p>
              </div>
              <Progress value={progressToNext} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* How to Earn Points */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                How to Earn Points
              </CardTitle>
              <CardDescription>Complete these actions to earn more points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {howToEarnPoints.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-primary" />
                      <span>{item.action}</span>
                    </div>
                    <Badge variant="secondary">{item.points}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Achievements
              </CardTitle>
              <CardDescription>Your progress and unlocked achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      <Badge variant={achievement.completed ? "default" : "outline"}>
                        {achievement.points} pts
                      </Badge>
                    </div>
                    {!achievement.completed && achievement.progress && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.total}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Leaderboard
            </CardTitle>
            <CardDescription>Top canteen enthusiasts this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {index < 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                        }`}>
                          {index + 1}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                      )}
                      <span className="text-2xl">{user.avatar}</span>
                    </div>
                    <span className={`font-medium ${user.name === 'You' ? 'text-primary font-bold' : ''}`}>
                      {user.name}
                    </span>
                  </div>
                  <Badge variant={user.name === 'You' ? "default" : "outline"}>
                    {user.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Rewards;