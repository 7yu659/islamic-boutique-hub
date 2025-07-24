import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import quranImage from "@/assets/quran-book.jpg";
import tasbihImage from "@/assets/tasbih-beads.jpg";
import perfumeImage from "@/assets/islamic-perfume.jpg";
import datesImage from "@/assets/dates-khejur.jpg";

const featuredProducts = [
  {
    id: "1",
    name: "পবিত্র কোরান শরীফ",
    nameArabic: "القرآن الكريم",
    price: 850,
    originalPrice: 1200,
    image: quranImage,
    category: "কোরান শরীফ",
    isHalal: true,
    rating: 4.9
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
    rating: 4.7
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
    rating: 4.8
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
    rating: 4.9
  },
  {
    id: "5",
    name: "তাফসীর ইবনে কাছীর",
    nameArabic: "تفسير ابن كثير",
    price: 2500,
    originalPrice: 3000,
    image: quranImage,
    category: "ইসলামিক বই",
    isHalal: true,
    rating: 4.8
  },
  {
    id: "6",
    name: "স্বর্ণের তসবিহ",
    nameArabic: "السبحة الذهبية",
    price: 1800,
    originalPrice: 2200,
    image: tasbihImage,
    category: "তসবিহ",
    isHalal: true,
    rating: 4.9
  }
];

export const FeaturedProducts = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = (product: any) => {
    setCartItems(prev => [...prev, product]);
    // Here you could add toast notification
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            বিশেষ পণ্যসমূহ
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            আমাদের সবচেয়ে জনপ্রিয় এবং বিশেষ ছাড়ে পাওয়া যাচ্ছে এমন পণ্যগুলো দেখুন
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="islamic" size="lg">
            আরও পণ্য দেখুন
          </Button>
        </div>
      </div>
    </section>
  );
};