import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { QueueTracker } from '@/components/QueueTracker';
import { FoodMenu } from '@/components/FoodMenu';
import { Cart } from '@/components/Cart';
import { LoginDialog } from '@/components/LoginDialog';
import { FloatingChatbot } from '@/components/FloatingChatbot';
import { FoodItem } from '@/components/FoodCard';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends FoodItem {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const { toast } = useToast();

  const addToCart = (item: FoodItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    
    toast({
      title: "Order placed!",
      description: "Your order has been placed successfully. You'll receive a confirmation soon.",
      duration: 3000,
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleLogin = (email: string) => {
    setUser(email);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${email}`,
      duration: 3000,
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
      />
      
      <main>
        <HeroSection onGetStarted={() => setIsLoginOpen(true)} />
        
        {/* Live Queue Section */}
        <section id="queue" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Live <span className="text-primary">Queue Status</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real-time updates powered by IoT sensors to help you plan your visit
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <QueueTracker />
            </div>
          </div>
        </section>

        <FoodMenu onAddToCart={addToCart} />
      </main>

      {/* Modals and Overlays */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      <FloatingChatbot />
    </div>
  );
};

export default Index;
