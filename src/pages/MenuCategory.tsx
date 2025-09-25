import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FoodCard } from '@/components/FoodCard';
import { useToast } from '@/hooks/use-toast';

// Import images
import springRollsImage from '@/assets/spring-rolls.jpg';
import alooTikkiImage from '@/assets/aloo-tikki.jpg';
import chickenWingsImage from '@/assets/chicken-wings.jpg';
import rajmaRiceImage from '@/assets/rajma-rice.jpg';
import pastaImage from '@/assets/pasta.jpg';
import friedRiceImage from '@/assets/fried-rice.jpg';
import butterChickenImage from '@/assets/butter-chicken.jpg';
import coldCoffeeImage from '@/assets/cold-coffee.jpg';
import mangoLassiImage from '@/assets/mango-lassi.jpg';
import orangeJuiceImage from '@/assets/orange-juice.jpg';
import chocolateBrownieImage from '@/assets/chocolate-brownie.jpg';
import rasGullaImage from '@/assets/rasgulla.jpg';

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
      },
      {
        id: 'starter-4',
        name: 'Spring Rolls',
        price: 55,
        image: springRollsImage,
        rating: 4.5,
        ratingCount: 142,
        calories: 200,
        protein: 5,
        prepTime: 10,
        tags: ['vegan' as const],
        allergens: ['gluten'],
        description: 'Crispy vegetable spring rolls served with sweet and sour sauce'
      },
      {
        id: 'starter-5',
        name: 'Aloo Tikki',
        price: 40,
        image: alooTikkiImage,
        rating: 4.6,
        ratingCount: 178,
        calories: 250,
        protein: 4,
        prepTime: 8,
        tags: ['vegan' as const],
        allergens: [],
        description: 'Crispy potato cutlets served with mint and tamarind chutney'
      },
      {
        id: 'starter-6',
        name: 'Chicken Wings',
        price: 120,
        image: chickenWingsImage,
        rating: 4.7,
        ratingCount: 234,
        calories: 380,
        protein: 25,
        prepTime: 15,
        tags: ['high-protein' as const],
        allergens: [],
        description: 'Spicy buffalo chicken wings with celery sticks'
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
      },
      {
        id: 'main-3',
        name: 'Rajma Rice',
        price: 85,
        image: rajmaRiceImage,
        rating: 4.4,
        ratingCount: 167,
        calories: 450,
        protein: 14,
        prepTime: 18,
        tags: ['high-protein' as const],
        allergens: [],
        description: 'Kidney bean curry served with steamed basmati rice'
      },
      {
        id: 'main-4',
        name: 'Penne Pasta',
        price: 110,
        image: pastaImage,
        rating: 4.6,
        ratingCount: 198,
        calories: 520,
        protein: 16,
        prepTime: 12,
        tags: ['vegan' as const],
        allergens: ['gluten'],
        description: 'Penne pasta in rich marinara sauce with fresh basil'
      },
      {
        id: 'main-5',
        name: 'Vegetable Fried Rice',
        price: 70,
        image: friedRiceImage,
        rating: 4.3,
        ratingCount: 145,
        calories: 380,
        protein: 8,
        prepTime: 10,
        tags: ['vegan' as const],
        allergens: [],
        description: 'Colorful fried rice with fresh vegetables and soy sauce'
      },
      {
        id: 'main-6',
        name: 'Butter Chicken',
        price: 140,
        image: butterChickenImage,
        rating: 4.8,
        ratingCount: 287,
        calories: 620,
        protein: 32,
        prepTime: 25,
        tags: ['high-protein' as const],
        allergens: ['dairy'],
        description: 'Tender chicken in rich, creamy tomato butter sauce'
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
      },
      {
        id: 'bev-3',
        name: 'Cold Coffee',
        price: 50,
        image: coldCoffeeImage,
        rating: 4.7,
        ratingCount: 189,
        calories: 180,
        protein: 6,
        prepTime: 5,
        tags: ['vegan' as const],
        allergens: ['dairy'],
        description: 'Iced coffee with whipped cream and chocolate drizzle'
      },
      {
        id: 'bev-4',
        name: 'Mango Lassi',
        price: 45,
        image: mangoLassiImage,
        rating: 4.8,
        ratingCount: 234,
        calories: 150,
        protein: 5,
        prepTime: 3,
        tags: ['vegan' as const],
        allergens: ['dairy'],
        description: 'Sweet mango yogurt drink, traditional and refreshing'
      },
      {
        id: 'bev-5',
        name: 'Fresh Orange Juice',
        price: 35,
        image: orangeJuiceImage,
        rating: 4.5,
        ratingCount: 167,
        calories: 110,
        protein: 2,
        prepTime: 2,
        tags: ['vegan' as const],
        allergens: [],
        description: 'Freshly squeezed orange juice packed with vitamin C'
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
      },
      {
        id: 'dessert-3',
        name: 'Chocolate Brownie',
        price: 65,
        image: chocolateBrownieImage,
        rating: 4.8,
        ratingCount: 198,
        calories: 450,
        protein: 6,
        prepTime: 5,
        tags: ['vegan' as const],
        allergens: ['gluten', 'dairy'],
        description: 'Rich chocolate brownie served warm with vanilla ice cream'
      },
      {
        id: 'dessert-4',
        name: 'Rasgulla',
        price: 35,
        image: rasGullaImage,
        rating: 4.6,
        ratingCount: 156,
        calories: 180,
        protein: 4,
        prepTime: 2,
        tags: ['vegan' as const],
        allergens: ['dairy'],
        description: 'Spongy cottage cheese balls in sweet sugar syrup'
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