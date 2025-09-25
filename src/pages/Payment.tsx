import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Banknote, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const orderSummary = {
  items: [
    { name: 'Chicken Biryani', price: 120, quantity: 1 },
    { name: 'Masala Chai', price: 15, quantity: 2 }
  ],
  subtotal: 150,
  tax: 15,
  total: 165
};

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully.",
        duration: 3000,
      });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your order #OD{Date.now().toString().slice(-6)} has been placed successfully.
            </p>
            <div className="space-y-3">
              <p className="text-sm">
                <strong>Estimated pickup time:</strong> 15-20 minutes
              </p>
              <p className="text-sm">
                <strong>Amount paid:</strong> ₹{orderSummary.total}
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <Link to="/" className="w-full">
                <Button className="w-full">Back to Home</Button>
              </Link>
              <Link to="/orders" className="w-full">
                <Button variant="outline" className="w-full">Track Order</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">Payment</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Choose Payment Method</CardTitle>
                <CardDescription>Select your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment}>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                    <div className="space-y-4">
                      {/* Card Payment */}
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Card Payment</p>
                            <p className="text-sm text-muted-foreground">Credit/Debit Card</p>
                          </div>
                        </Label>
                      </div>

                      {/* UPI Payment */}
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">UPI Payment</p>
                            <p className="text-sm text-muted-foreground">PhonePe, GPay, Paytm</p>
                          </div>
                        </Label>
                      </div>

                      {/* Cash Payment */}
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Banknote className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Cash Payment</p>
                            <p className="text-sm text-muted-foreground">Pay at pickup</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Payment Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="Your Name" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="yourname@paytm" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cash' && (
                    <div className="p-4 bg-muted/30 rounded-lg mb-6">
                      <p className="text-sm text-muted-foreground">
                        You can pay in cash when you pick up your order from the canteen. 
                        Please have the exact amount ready.
                      </p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isProcessing}
                  >
                    {isProcessing 
                      ? 'Processing...' 
                      : paymentMethod === 'cash' 
                        ? 'Place Order' 
                        : `Pay ₹${orderSummary.total}`
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>₹{orderSummary.subtotal}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Tax & Fees</p>
                      <p>₹{orderSummary.tax}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <p>Total</p>
                      <p>₹{orderSummary.total}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Pickup Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">College Canteen, Ground Floor</p>
                  </div>
                  <div>
                    <p className="font-medium">Estimated Time</p>
                    <p className="text-sm text-muted-foreground">15-20 minutes after payment</p>
                  </div>
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;