import { useParams } from "react-router-dom";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
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
  },
  {
    id: "7",
    name: "হাদিস শরীফ",
    nameArabic: "الحديث الشريف",
    price: 1200,
    originalPrice: 1500,
    image: quranImage,
    category: "ইসলামিক বই",
    isHalal: true,
    rating: 4.7
  },
  {
    id: "8",
    name: "মিসক আতর",
    nameArabic: "عطر المسك",
    price: 1500,
    originalPrice: 1800,
    image: perfumeImage,
    category: "আতর",
    isHalal: true,
    rating: 4.8
  },
  {
    id: "9",
    name: "আজওয়া খেজুর",
    nameArabic: "تمر العجوة",
    price: 1200,
    originalPrice: 1400,
    image: datesImage,
    category: "খেজুর",
    isHalal: true,
    rating: 4.9
  }
];

const categoryMap: { [key: string]: string } = {
  "quran": "কোরান শরীফ",
  "books": "ইসলামিক বই", 
  "tasbih": "তসবিহ",
  "perfume": "আতর",
  "dates": "খেজুর",
  "clothing": "ইসলামিক পোশাক"
};

export const CategoryPage = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  
  const categoryName = categoryMap[category || ""] || "সব পণ্য";
  
  // Filter products by category
  let filteredProducts = category 
    ? allProducts.filter(product => product.category === categoryName)
    : allProducts;

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.nameArabic && product.nameArabic.includes(searchTerm))
    );
  }

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
          <p className="text-muted-foreground">
            {sortedProducts.length} টি পণ্য পাওয়া গেছে
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="পণ্য খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="সাজান" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">ফিচার্ড</SelectItem>
              <SelectItem value="name">নাম অনুযায়ী</SelectItem>
              <SelectItem value="price-low">দাম কম থেকে বেশি</SelectItem>
              <SelectItem value="price-high">দাম বেশি থেকে কম</SelectItem>
              <SelectItem value="rating">রেটিং অনুযায়ী</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              কোনো পণ্য পাওয়া যায়নি
            </p>
            <Button variant="islamic" onClick={() => setSearchTerm("")}>
              সব পণ্য দেখুন
            </Button>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {sortedProducts.length > 12 && (
          <div className="text-center mt-12">
            <Button variant="outline">
              আরও পণ্য লোড করুন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};