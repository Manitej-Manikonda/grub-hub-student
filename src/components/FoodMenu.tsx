import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FoodCard, FoodItem } from './FoodCard';
import dosaImage from '@/assets/dosa.jpg';
import thaliImage from '@/assets/thali.jpg';
import biryaniImage from '@/assets/biryani.jpg';
import fruitSaladImage from '@/assets/fruit-salad.jpg';

const foodItems: FoodItem[] = [
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
    tags: ['vegan', 'high-energy'],
    allergens: ['gluten'],
    description: 'Crispy fermented crepe filled with spiced potato mixture, served with coconut chutney and sambar'
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
    tags: ['high-protein', 'brain-food'],
    allergens: ['dairy', 'gluten'],
    description: 'Complete meal with roti, dal, sabzi, rice, pickle, and sweet - perfect balanced nutrition'
  },
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
    tags: ['high-protein', 'high-energy'],
    allergens: ['dairy'],
    description: 'Aromatic basmati rice cooked with tender chicken pieces, garnished with fried onions and boiled egg'
  },
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
    tags: ['vegan', 'brain-food'],
    allergens: [],
    description: 'Seasonal fresh fruits mixed with a hint of chaat masala and lemon juice for that perfect zing'
  }
];

const categories = ['All', 'South Indian', 'North Indian', 'Snacks', 'Beverages', 'Desserts'];
const filters = ['Vegan', 'High Protein', 'Under ₹50', 'Quick (< 10min)'];

interface FoodMenuProps {
  onAddToCart: (item: FoodItem) => void;
}

export function FoodMenu({ onAddToCart }: FoodMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                           (selectedCategory === 'South Indian' && ['1'].includes(item.id)) ||
                           (selectedCategory === 'North Indian' && ['2', '3'].includes(item.id)) ||
                           (selectedCategory === 'Snacks' && ['4'].includes(item.id));

    const matchesFilters = selectedFilters.every(filter => {
      switch (filter) {
        case 'Vegan':
          return item.tags.includes('vegan');
        case 'High Protein':
          return item.protein >= 15;
        case 'Under ₹50':
          return item.price < 50;
        case 'Quick (< 10min)':
          return item.prepTime < 10;
        default:
          return true;
      }
    });

    return matchesSearch && matchesCategory && matchesFilters;
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <section id="menu" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Today's <span className="text-primary">Fresh Menu</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Delicious, nutritious meals prepared fresh daily with love for our student community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for your favorite dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground mt-2" />
            {filters.map((filter) => (
              <Badge
                key={filter}
                variant={selectedFilters.includes(filter) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodCard 
              key={item.id} 
              item={item} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found matching your criteria. Try adjusting your filters!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}