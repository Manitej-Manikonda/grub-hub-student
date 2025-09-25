import { Link } from 'react-router-dom';

interface FoodMenuProps {
  onAddToCart: (item: any) => void;
}

export function FoodMenu({ onAddToCart }: FoodMenuProps) {

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


        {/* Food Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/menu/starters" className="group">
            <div className="p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍟</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Starters</h3>
              <p className="text-muted-foreground text-center text-sm">Appetizers & Snacks</p>
              <div className="mt-4 text-center">
                <span className="text-primary font-medium">View Menu →</span>
              </div>
            </div>
          </Link>

          <Link to="/menu/main-course" className="group">
            <div className="p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍛</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Main Course</h3>
              <p className="text-muted-foreground text-center text-sm">Rice, Curry & More</p>
              <div className="mt-4 text-center">
                <span className="text-primary font-medium">View Menu →</span>
              </div>
            </div>
          </Link>

          <Link to="/menu/beverages" className="group">
            <div className="p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥤</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Beverages</h3>
              <p className="text-muted-foreground text-center text-sm">Drinks & Refreshments</p>
              <div className="mt-4 text-center">
                <span className="text-primary font-medium">View Menu →</span>
              </div>
            </div>
          </Link>

          <Link to="/menu/desserts" className="group">
            <div className="p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍮</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Desserts</h3>
              <p className="text-muted-foreground text-center text-sm">Sweet Treats</p>
              <div className="mt-4 text-center">
                <span className="text-primary font-medium">View Menu →</span>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}