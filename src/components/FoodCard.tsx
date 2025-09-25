import { Star, Plus, Clock, Leaf, Zap, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  ratingCount: number;
  calories: number;
  protein: number;
  prepTime: number;
  tags: Array<'vegan' | 'high-energy' | 'brain-food' | 'high-protein'>;
  allergens: string[];
  description: string;
}

interface FoodCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
}

export function FoodCard({ item, onAddToCart }: FoodCardProps) {
  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'vegan':
        return <Leaf className="h-3 w-3" />;
      case 'high-energy':
        return <Zap className="h-3 w-3" />;
      case 'brain-food':
        return <Brain className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'vegan':
        return 'bg-success text-success-foreground';
      case 'high-energy':
        return 'bg-warning text-warning-foreground';
      case 'brain-food':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="group hover:shadow-strong transition-smooth cursor-pointer overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-card text-card-foreground shadow-soft">
            <Clock className="h-3 w-3 mr-1" />
            {item.prepTime}m
          </Badge>
        </div>
        <div className="absolute top-2 left-2 space-y-1">
          {item.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} className={`${getTagColor(tag)} text-xs`}>
              {getTagIcon(tag)}
              <span className="ml-1 capitalize">{tag.replace('-', ' ')}</span>
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
            <p className="text-lg font-bold text-primary">₹{item.price}</p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-medium">{item.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({item.ratingCount} reviews)
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {item.description}
        </p>

        {/* Nutrition Info */}
        <div className="flex justify-between items-center mt-3 py-2 px-3 bg-muted rounded-lg">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Calories</p>
            <p className="font-semibold text-sm">{item.calories}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Protein</p>
            <p className="font-semibold text-sm">{item.protein}g</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="font-semibold text-sm">{item.prepTime}m</p>
          </div>
        </div>

        {/* Allergen Info */}
        {item.allergens.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">Contains:</p>
            <div className="flex flex-wrap gap-1">
              {item.allergens.map((allergen) => (
                <Badge key={allergen} variant="outline" className="text-xs">
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button 
          onClick={() => onAddToCart(item)}
          className="w-full mt-4 group-hover:shadow-orange"
          variant="hero"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}