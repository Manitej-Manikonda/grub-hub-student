import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FoodItem } from './FoodCard';

interface CartItem extends FoodItem {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: CartProps) {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCalories = items.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  const totalProtein = items.reduce((sum, item) => sum + (item.protein * item.quantity), 0);
  const estimatedTime = Math.max(...items.map(item => item.prepTime), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="relative ml-auto w-full max-w-md bg-card shadow-strong h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Your Order</h2>
            <Badge variant="secondary">{items.length} items</Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground">
                Add some delicious items from our menu!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            {/* Nutrition Summary */}
            <Card className="bg-muted">
              <CardContent className="p-3">
                <h4 className="font-medium mb-2">Nutrition Summary</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold">{totalCalories}</p>
                    <p className="text-muted-foreground">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{totalProtein}g</p>
                    <p className="text-muted-foreground">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{estimatedTime}m</p>
                    <p className="text-muted-foreground">Prep Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Service charge</span>
                <span>₹5</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{totalPrice + 5}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to="/payment" className="w-full">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={onCheckout}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Payment
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}