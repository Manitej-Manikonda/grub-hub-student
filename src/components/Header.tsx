import { useState } from 'react';
import { Bell, User, ShoppingCart, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
  onLoginClick?: () => void;
}

export function Header({ cartCount = 0, onCartClick, onLoginClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-card shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Campus Canteen</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#menu" className="text-muted-foreground hover:text-primary transition-smooth">
              Menu
            </a>
            <a href="#queue" className="text-muted-foreground hover:text-primary transition-smooth">
              Live Queue
            </a>
            <a href="#planner" className="text-muted-foreground hover:text-primary transition-smooth">
              Meal Planner
            </a>
            <a href="#rewards" className="text-muted-foreground hover:text-primary transition-smooth">
              Rewards
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs p-0 flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Login */}
            <Button 
              variant="hero" 
              size="sm"
              onClick={onLoginClick}
              className="hidden sm:flex"
            >
              <User className="h-4 w-4" />
              Login
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-2">
              <a href="#menu" className="p-2 text-muted-foreground hover:text-primary transition-smooth">
                Menu
              </a>
              <a href="#queue" className="p-2 text-muted-foreground hover:text-primary transition-smooth">
                Live Queue
              </a>
              <a href="#planner" className="p-2 text-muted-foreground hover:text-primary transition-smooth">
                Meal Planner
              </a>
              <a href="#rewards" className="p-2 text-muted-foreground hover:text-primary transition-smooth">
                Rewards
              </a>
              <Button 
                variant="hero" 
                size="sm"
                onClick={onLoginClick}
                className="mx-2 mt-2"
              >
                <User className="h-4 w-4" />
                Login
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}