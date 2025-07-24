import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, CheckCircle } from "lucide-react";

interface Order {
  id: string;
  items: any[];
  customerInfo: any;
  totalAmount: number;
  status: string;
  orderDate: string;
  estimatedDelivery: string;
}

export const OrderTracking = () => {
  const [searchId, setSearchId] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    
    const order = orders.find(o => o.id.toLowerCase().includes(searchId.toLowerCase()));
    setFoundOrder(order || null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Package className="w-5 h-5" />;
      case "shipping":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "নিশ্চিত";
      case "processing":
        return "প্রসেসিং";
      case "shipping":
        return "শিপিং";
      case "delivered":
        return "ডেলিভারি সম্পন্ন";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-islamic-green";
      case "processing":
        return "bg-islamic-gold";
      case "shipping":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">অর্ডার ট্র্যাকিং</h1>
        
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              আপনার অর্ডার খুঁজুন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="অর্ডার নম্বর লিখুন (যেমন: ORDER-1234567890)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="islamic" onClick={handleSearch}>
                খুঁজুন
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Result */}
        {foundOrder && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>অর্ডার ডিটেইলস</span>
                <Badge className={`text-white ${getStatusColor(foundOrder.status)}`}>
                  {getStatusIcon(foundOrder.status)}
                  <span className="ml-2">{getStatusText(foundOrder.status)}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Info */}
                <div>
                  <h3 className="font-semibold mb-3">অর্ডার তথ্য</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>অর্ডার নম্বর:</strong> {foundOrder.id}</p>
                    <p><strong>অর্ডারের তারিখ:</strong> {new Date(foundOrder.orderDate).toLocaleDateString('bn-BD')}</p>
                    <p><strong>মোট পরিমাণ:</strong> ৳{foundOrder.totalAmount}</p>
                    <p><strong>আনুমানিক ডেলিভারি:</strong> {new Date(foundOrder.estimatedDelivery).toLocaleDateString('bn-BD')}</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-3">গ্রাহক তথ্য</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>নাম:</strong> {foundOrder.customerInfo.name}</p>
                    <p><strong>ফোন:</strong> {foundOrder.customerInfo.phone}</p>
                    <p><strong>ঠিকানা:</strong> {foundOrder.customerInfo.address}</p>
                    <p><strong>শহর:</strong> {foundOrder.customerInfo.city}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">অর্ডারকৃত পণ্য</h3>
                <div className="space-y-3">
                  {foundOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            পরিমাণ: {item.quantity}
                          </span>
                          <span className="font-semibold">৳{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Timeline */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">অর্ডার স্ট্যাটাস</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-islamic-green rounded-full"></div>
                    <span className="text-sm">অর্ডার নিশ্চিত</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(foundOrder.orderDate).toLocaleDateString('bn-BD')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${foundOrder.status === 'processing' || foundOrder.status === 'shipping' || foundOrder.status === 'delivered' ? 'bg-islamic-green' : 'bg-muted'}`}></div>
                    <span className="text-sm">প্যাকেজিং</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${foundOrder.status === 'shipping' || foundOrder.status === 'delivered' ? 'bg-islamic-green' : 'bg-muted'}`}></div>
                    <span className="text-sm">শিপিং</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${foundOrder.status === 'delivered' ? 'bg-islamic-green' : 'bg-muted'}`}></div>
                    <span className="text-sm">ডেলিভারি সম্পন্ন</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* If searched but not found */}
        {searchId && !foundOrder && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                এই নম্বরের কোনো অর্ডার পাওয়া যায়নি। অনুগ্রহ করে সঠিক অর্ডার নম্বর দিন।
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recent Orders */}
        {orders.length > 0 && !searchId && (
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক অর্ডারসমূহ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(-5).reverse().map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.orderDate).toLocaleDateString('bn-BD')} • ৳{order.totalAmount}
                      </p>
                    </div>
                    <Badge className={`text-white ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};