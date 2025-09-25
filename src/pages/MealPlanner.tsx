import { useState } from 'react';
import { ArrowLeft, Utensils, Zap, Flame, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FoodCard } from '@/components/FoodCard';
import dosaImage from '@/assets/dosa.jpg';
import thaliImage from '@/assets/thali.jpg';
import biryaniImage from '@/assets/biryani.jpg';
import fruitSaladImage from '@/assets/fruit-salad.jpg';

const mealOptions = [
  {
    id: 'high-protein',
    title: 'High in Protein',
    description: 'Perfect for muscle building and recovery',
    icon: Zap,
    color: 'bg-orange-500',
    foods: [
      {
        id: '3',
        name: 'Chicken Biryani',
        price: 120,
        image: biryaniImage,
        rating: 4.9,
        ratingCount: 567,
        calories: 580,
        protein: 35,
        prepTime: 20,
        tags: ['high-protein' as const, 'high-energy' as const],
        allergens: ['dairy'],
        description: 'Aromatic basmati rice cooked with tender chicken pieces'
      },
      {
        id: '2',
        name: 'North Indian Thali',
        price: 85,
        image: thaliImage,
        rating: 4.6,
        ratingCount: 189,
        calories: 650,
        protein: 18,
        prepTime: 15,
        tags: ['high-protein' as const, 'brain-food' as const],
        allergens: ['dairy', 'gluten'],
        description: 'Complete meal with roti, dal, sabzi, rice, pickle, and sweet'
      }
    ]
  },
  {
    id: 'low-calorie',
    title: 'Low Calorie',
    description: 'Light and healthy options',
    icon: Leaf,
    color: 'bg-green-500',
    foods: [
      {
        id: '4',
        name: 'Fresh Fruit Salad',
        price: 35,
        image: fruitSaladImage,
        rating: 4.5,
        ratingCount: 123,
        calories: 150,
        protein: 3,
        prepTime: 5,
        tags: ['vegan' as const, 'brain-food' as const],
        allergens: [],
        description: 'Seasonal fresh fruits mixed with chaat masala and lemon juice'
      }
    ]
  },
  {
    id: 'light-food',
    title: 'Light Food',
    description: 'Easy to digest, perfect for evening',
    icon: Utensils,
    color: 'bg-blue-500',
    foods: [
      {
        id: '1',
        name: 'Masala Dosa',
        price: 45,
        image: dosaImage,
        rating: 4.8,
        ratingCount: 234,
        calories: 320,
        protein: 8,
        prepTime: 12,
        tags: ['vegan' as const, 'high-energy' as const],
        allergens: ['gluten'],
        description: 'Crispy fermented crepe filled with spiced potato mixture'
      }
    ]
  },
  {
    id: 'spicy',
    title: 'Spicy',
    description: 'For those who love heat',
    icon: Flame,
    color: 'bg-red-500',
    foods: [
      {
        id: '3',
        name: 'Chicken Biryani',
        price: 120,
        image: biryaniImage,
        rating: 4.9,
        ratingCount: 567,
        calories: 580,
        protein: 35,
        prepTime: 20,
        tags: ['high-protein' as const, 'high-energy' as const],
        allergens: ['dairy'],
        description: 'Aromatic basmati rice cooked with tender chicken pieces'
      }
    ]
  }
];

const MealPlanner = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAddToCart = (item: any) => {
    // This would integrate with the main cart system
    console.log('Added to cart:', item);
  };

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
            <h1 className="text-2xl font-bold">Smart Meal Planner</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!selectedOption ? (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your <span className="text-primary">Meal Preference</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get personalized food suggestions based on your dietary goals and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mealOptions.map((option) => (
                <Card 
                  key={option.id}
                  className="cursor-pointer hover-scale transition-all duration-300 hover:shadow-lg"
                  onClick={() => setSelectedOption(option.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="w-full justify-center">
                      {option.foods.length} suggestions
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {(() => {
              const option = mealOptions.find(opt => opt.id === selectedOption);
              if (!option) return null;

              return (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedOption(null)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Options
                    </Button>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center`}>
                        <option.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{option.title}</h2>
                        <p className="text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {option.foods.map((food) => (
                      <FoodCard 
                        key={food.id}
                        item={food}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
};

export default MealPlanner;