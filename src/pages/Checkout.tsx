import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

export const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: ""
  });

  const shippingCost = 60;
  const totalAmount = getTotalPrice() + shippingCost;

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast({
        title: "সব তথ্য পূরণ করুন",
        description: "অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Create order object
    const order = {
      id: `ORDER-${Date.now()}`,
      items: cartItems,
      customerInfo: form,
      totalAmount,
      shippingCost,
      status: "confirmed",
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Save order to localStorage (in real app, this would go to a database)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Simulate processing delay
    setTimeout(() => {
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">কার্ট খালি</h1>
          <Button variant="islamic" onClick={() => navigate("/")}>
            কেনাকাটা শুরু করুন
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">চেকআউট</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <Card>
            <CardHeader>
              <CardTitle>শিপিং তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">পূর্ণ নাম *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="আপনার নাম লিখুন"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="address">সম্পূর্ণ ঠিকানা *</Label>
                  <Textarea
                    id="address"
                    value={form.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="বাড়ি/ফ্ল্যাট নম্বর, রাস্তার নাম, এলাকা"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">শহর *</Label>
                    <Input
                      id="city"
                      value={form.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="ঢাকা"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">পোস্টাল কোড</Label>
                    <Input
                      id="postalCode"
                      value={form.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">অতিরিক্ত নোট</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="বিশেষ নির্দেশনা (যদি থাকে)"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="islamic" 
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "অর্ডার প্রসেসিং..." : `অর্ডার নিশ্চিত করুন (৳${totalAmount})`}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>অর্ডার সামারি</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">পরিমাণ: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">৳{item.price * item.quantity}</p>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
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
                  <span className="text-islamic-green">৳{totalAmount}</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">পেমেন্ট মেথড</h4>
                <p className="text-sm text-muted-foreground">ক্যাশ অন ডেলিভারি (COD)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};