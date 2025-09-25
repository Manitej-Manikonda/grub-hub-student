import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FoodCard } from '@/components/FoodCard';
import { useToast } from '@/hooks/use-toast';

// Sample data for different categories
const categoryData = {
  starters: {
    title: 'Starters',
    description: 'Begin your meal with these delicious appetizers',
    items: [
      {
        id: 'starter-1',
        name: 'French Fries',
        price: 45,
        image: '/placeholder.svg',
        rating: 4.3,
        ratingCount: 156,
        calories: 365,
        protein: 4,
        prepTime: 8,
        tags: ['vegan' as const],
        allergens: [],
        description: 'Golden crispy potato fries seasoned with herbs and spices'
      },
      {
        id: 'starter-2',
        name: 'Samosa Chaat',
        price: 35,
        image: '/placeholder.svg',
        rating: 4.7,
        ratingCount: 203,
        calories: 280,
        protein: 6,
        prepTime: 5,
        tags: ['vegan' as const],
        allergens: ['gluten'],
        description: 'Crispy samosas topped with tangy chutneys and spices'
      },
      {
        id: 'starter-3',
        name: 'Paneer Tikka',
        price: 85,
        image: '/placeholder.svg',
        rating: 4.8,
        ratingCount: 189,
        calories: 320,
        protein: 18,
        prepTime: 12,
        tags: ['high-protein' as const],
        allergens: ['dairy'],
        description: 'Marinated cottage cheese cubes grilled to perfection'
      }
    ]
  },
  'main-course': {
    title: 'Main Course',
    description: 'Hearty and filling meals for your satisfaction',
    items: [
      {
        id: 'main-1',
        name: 'Dal Makhani',
        price: 95,
        image: '/placeholder.svg',
        rating: 4.6,
        ratingCount: 234,
        calories: 420,
        protein: 15,
        prepTime: 20,
        tags: ['high-protein' as const],
        allergens: ['dairy'],
        description: 'Rich and creamy black lentils cooked with butter and cream'
      },
      {
        id: 'main-2',
        name: 'Chole Bhature',
        price: 75,
        image: '/placeholder.svg',
        rating: 4.5,
        ratingCount: 189,
        calories: 580,
        protein: 12,
        prepTime: 15,
        tags: ['vegan' as const],
        allergens: ['gluten'],
        description: 'Spicy chickpea curry served with fluffy fried bread'
      }
    ]
  },
  beverages: {
    title: 'Beverages',
    description: 'Refreshing drinks to complement your meal',
    items: [
      {
        id: 'bev-1',
        name: 'Masala Chai',
        price: 15,
        image: '/placeholder.svg',
        rating: 4.9,
        ratingCount: 456,
        calories: 85,
        protein: 2,
        prepTime: 3,
        tags: ['vegan' as const],
        allergens: ['dairy'],
        description: 'Traditional Indian tea brewed with aromatic spices'
      },
      {
        id: 'bev-2',
        name: 'Fresh Lime Water',
        price: 20,
        image: '/placeholder.svg',
        rating: 4.4,
        ratingCount: 123,
        calories: 25,
        protein: 0,
        prepTime: 2,
        tags: ['vegan' as const],
        allergens: [],
        description: 'Fresh lime juice with mint and a hint of black salt'
      }
    ]
  },
  desserts: {
    title: 'Desserts',
    description: 'Sweet endings to your perfect meal',
    items: [
      {
        id: 'dessert-1',
        name: 'Gulab Jamun',
        price: 40,
        image: '/placeholder.svg',
        rating: 4.7,
        ratingCount: 234,
        calories: 380,
        protein: 6,
        prepTime: 5,
        tags: ['vegan' as const],
        allergens: ['dairy', 'gluten'],
        description: 'Soft milk dumplings soaked in rose-flavored sugar syrup'
      },
      {
        id: 'dessert-2',
        name: 'Ice Cream Kulfi',
        price: 30,
        image: '/placeholder.svg',
        rating: 4.5,
        ratingCount: 145,
        calories: 220,
        protein: 4,
        prepTime: 2,
        tags: ['vegan' as const],
        allergens: ['dairy'],
        description: 'Traditional Indian frozen dessert with cardamom and pistachios'
      }
    ]
  }
};

const MenuCategory = () => {
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const category = categoryData[categoryId as keyof typeof categoryData];

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const filteredItems = category.items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: any) => {
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
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
            <div>
              <h1 className="text-2xl font-bold">{category.title}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search in ${category.title}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodCard 
              key={item.id} 
              item={item} 
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found matching your search. Try adjusting your search term!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MenuCategory;