import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, Clock } from "lucide-react";

interface Order {
  id: string;
  items: any[];
  customerInfo: any;
  totalAmount: number;
  shippingCost: number;
  status: string;
  orderDate: string;
  estimatedDelivery: string;
}

export const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o: Order) => o.id === orderId);
    setOrder(foundOrder || null);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">অর্ডার পাওয়া যায়নি</h1>
          <Button variant="islamic" onClick={() => navigate("/")}>
            হোমে ফিরুন
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-islamic-green rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-islamic-green mb-4">
            ধন্যবাদ! 🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে
          </p>
          <p className="text-lg">
            অর্ডার নম্বর: <span className="font-bold text-islamic-green">{order.id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                অর্ডার ডিটেইলস
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
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
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-muted-foreground">
                        পরিমাণ: {item.quantity}
                      </span>
                      <span className="font-semibold text-islamic-green">
                        ৳{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span>৳{order.totalAmount - order.shippingCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>শিপিং চার্জ:</span>
                  <span>৳{order.shippingCost}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>মোট পরিমাণ:</span>
                  <span className="text-islamic-green">৳{order.totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info & Status */}
          <div className="space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  অর্ডার স্ট্যাটাস
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-islamic-green text-white">
                    {order.status === 'confirmed' ? 'নিশ্চিত' : order.status}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      আনুমানিক ডেলিভারি: {new Date(order.estimatedDelivery).toLocaleDateString('bn-BD')}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 bg-islamic-green rounded-full"></div>
                    <span>অর্ডার নিশ্চিত</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span>প্যাকেজিং</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span>শিপিং</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span>ডেলিভারি</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>শিপিং ঠিকানা</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">{order.customerInfo.name}</p>
                  <p>{order.customerInfo.phone}</p>
                  {order.customerInfo.email && <p>{order.customerInfo.email}</p>}
                  <p>{order.customerInfo.address}</p>
                  <p>{order.customerInfo.city} {order.customerInfo.postalCode}</p>
                  {order.customerInfo.notes && (
                    <div className="mt-3 p-2 bg-muted rounded">
                      <p className="text-sm">
                        <strong>নোট:</strong> {order.customerInfo.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button variant="islamic" onClick={() => navigate("/order-tracking")}>
            অর্ডার ট্র্যাক করুন
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            আরও কেনাকাটা করুন
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-islamic-green/10 to-islamic-gold/10 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-islamic-green">
            আপনার বিশ্বাসের জন্য ধন্যবাদ! 
          </h2>
          <p className="text-muted-foreground mb-4">
            আমরা আপনার অর্ডার যত্নসহকারে প্রস্তুত করে দ্রুততম সময়ে পৌঁছে দেব।
            আল্লাহ হাফেজ! 🤲
          </p>
          <p className="text-sm text-islamic-gold font-arabic">
            بارك الله فيكم - আল্লাহ আপনাদের বরকত দিন
          </p>
        </div>
      </div>
    </div>
  );
};