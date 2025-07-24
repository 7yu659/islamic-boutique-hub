import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import quranImage from "@/assets/quran-book.jpg";
import tasbihImage from "@/assets/tasbih-beads.jpg";
import perfumeImage from "@/assets/islamic-perfume.jpg";
import datesImage from "@/assets/dates-khejur.jpg";

const allProducts = [
  {
    id: "1",
    name: "পবিত্র কোরান শরীফ",
    nameArabic: "القرآن الكريم",
    price: 850,
    originalPrice: 1200,
    image: quranImage,
    category: "কোরান শরীফ",
    isHalal: true,
    rating: 4.9,
    description: "সুন্দর বাঁধাই এবং স্পষ্ট আরবি হরফ সহ পবিত্র কোরান শরীফ। বাংলা অনুবাদ ও তাফসীর সহ।",
    features: ["উন্নত কাগজ", "টেকসই বাঁধাই", "বাংলা অনুবাদ", "তাফসীর সহ"],
    inStock: true,
    weight: "500g",
    dimensions: "15cm x 22cm"
  },
  {
    id: "2",
    name: "কাঠের তসবিহ",
    nameArabic: "السبحة الخشبية",
    price: 320,
    originalPrice: 450,
    image: tasbihImage,
    category: "তসবিহ",
    isHalal: true,
    rating: 4.7,
    description: "উন্নত মানের কাঠ দিয়ে তৈরি সুন্দর তসবিহ। জিকির ও তাসবিহ পড়ার জন্য আদর্শ।",
    features: ["প্রাকৃতিক কাঠ", "৯৯টি দানা", "টেকসই তার", "হালকা ওজন"],
    inStock: true,
    weight: "50g",
    dimensions: "30cm দৈর্ঘ্য"
  },
  {
    id: "3",
    name: "আরবীয় আতর",
    nameArabic: "العطر العربي",
    price: 1200,
    originalPrice: 1500,
    image: perfumeImage,
    category: "আতর",
    isHalal: true,
    rating: 4.8,
    description: "মক্কা-মদিনার বিশেষ আতর। দীর্ঘস্থায়ী সুগন্ধ এবং ১০০% হালাল উপাদান।",
    features: ["আলকোহল মুক্ত", "দীর্ঘস্থায়ী", "প্রাকৃতিক উপাদান", "সুন্দর বোতল"],
    inStock: true,
    weight: "12ml",
    dimensions: "8cm উচ্চতা"
  },
  {
    id: "4",
    name: "মদিনার খেজুর",
    nameArabic: "تمر المدينة",
    price: 750,
    originalPrice: 900,
    image: datesImage,
    category: "খেজুর",
    isHalal: true,
    rating: 4.9,
    description: "সরাসরি মদিনা শরীফ থেকে আনা প্রিমিয়াম খেজুর। সুস্বাদু এবং পুষ্টিকর।",
    features: ["মদিনা শরীফের", "প্রাকৃতিক মিষ্টি", "উচ্চ পুষ্টিগুণ", "টাটকা"],
    inStock: true,
    weight: "500g",
    dimensions: "প্যাকেট"
  }
];

export const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">পণ্য পাওয়া যায়নি</h1>
          <Button variant="islamic" onClick={() => window.history.back()}>
            ফিরে যান
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "কার্টে যোগ হয়েছে!",
      description: `${product.name} (${quantity}টি) কার্টে যোগ করা হয়েছে`,
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {product.isHalal && (
                <Badge className="absolute top-4 left-4 bg-islamic-green text-white">
                  হালাল ✓
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-destructive text-white">
                  -{discount}% ছাড়
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              {product.nameArabic && (
                <p className="text-xl text-muted-foreground font-arabic mb-4">
                  {product.nameArabic}
                </p>
              )}
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-islamic-gold fill-islamic-gold' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating}) রেটিং
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-islamic-green">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
                {discount > 0 && (
                  <Badge className="bg-destructive text-white">
                    {discount}% সাশ্রয়
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <Badge className="bg-islamic-green text-white">স্টকে আছে</Badge>
                ) : (
                  <Badge variant="destructive">স্টক নেই</Badge>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">পরিমাণ:</Label>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  variant="islamic" 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  কার্টে যোগ করুন
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">পণ্যের বিবরণ</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h4 className="font-semibold">বৈশিষ্ট্য:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-islamic-green rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">ওজন:</span> {product.weight}
                  </div>
                  <div>
                    <span className="font-medium">মাপ:</span> {product.dimensions}
                  </div>
                  <div>
                    <span className="font-medium">ক্যাটাগরি:</span> {product.category}
                  </div>
                  <div>
                    <span className="font-medium">স্ট্যাটাস:</span> 
                    <span className="text-islamic-green ml-1">
                      {product.inStock ? "স্টকে আছে" : "স্টক নেই"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">শিপিং তথ্য</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ঢাকার ভিতরে:</span>
                    <span>৬০ টাকা</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ঢাকার বাইরে:</span>
                    <span>১২০ টাকা</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ডেলিভারি সময়:</span>
                    <span>২-৩ দিন</span>
                  </div>
                  <div className="text-islamic-green text-xs mt-2">
                    ১০০০ টাকার উপরে অর্ডারে ফ্রি ডেলিভারি!
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};