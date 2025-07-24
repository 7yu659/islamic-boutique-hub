import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const shippingCost = 60; // Fixed shipping cost

  const handleCheckout = () => {
    setIsCheckingOut(true);
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">আপনার কার্ট খালি</h1>
            <p className="text-muted-foreground mb-8">কিছু পণ্য যোগ করুন</p>
            <Button variant="islamic" onClick={() => navigate("/")}>
              কেনাকাটা শুরু করুন
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">শপিং কার্ট</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>আপনার পণ্যসমূহ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.nameArabic && (
                        <p className="text-sm text-muted-foreground font-arabic">
                          {item.nameArabic}
                        </p>
                      )}
                      <p className="text-islamic-green font-semibold">৳{item.price}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>অর্ডার সামারি</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span>৳{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>শিপিং চার্জ:</span>
                  <span>৳{shippingCost}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>মোট:</span>
                  <span className="text-islamic-green">৳{getTotalPrice() + shippingCost}</span>
                </div>
                
                <Button 
                  variant="islamic" 
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "প্রসেসিং..." : "চেকআউট করুন"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};