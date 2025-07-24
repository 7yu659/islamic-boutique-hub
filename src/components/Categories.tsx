import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "কোরান শরীফ",
    nameArabic: "القرآن الكريم",
    icon: "📖",
    itemCount: 45,
    color: "bg-islamic-green/10 hover:bg-islamic-green/20"
  },
  {
    id: 2,
    name: "ইসলামিক বই",
    nameArabic: "الكتب الإسلامية",
    icon: "📚",
    itemCount: 128,
    color: "bg-islamic-gold/10 hover:bg-islamic-gold/20"
  },
  {
    id: 3,
    name: "তসবিহ",
    nameArabic: "السبحة",
    icon: "📿",
    itemCount: 32,
    color: "bg-islamic-green/10 hover:bg-islamic-green/20"
  },
  {
    id: 4,
    name: "আতর",
    nameArabic: "العطر",
    icon: "🌹",
    itemCount: 67,
    color: "bg-islamic-gold/10 hover:bg-islamic-gold/20"
  },
  {
    id: 5,
    name: "খেজুর",
    nameArabic: "التمر",
    icon: "🌴",
    itemCount: 24,
    color: "bg-islamic-green/10 hover:bg-islamic-green/20"
  },
  {
    id: 6,
    name: "ইসলামিক পোশাক",
    nameArabic: "الملابس الإسلامية",
    icon: "👕",
    itemCount: 89,
    color: "bg-islamic-gold/10 hover:bg-islamic-gold/20"
  }
];

export const Categories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            পণ্যের ক্যাটাগরি
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            আমাদের বিভিন্ন ধরনের ইসলামিক পণ্য দেখুন এবং আপনার পছন্দের পণ্য বেছে নিন
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className={`group cursor-pointer transition-all duration-300 hover:shadow-lg border-border ${category.color}`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-islamic-green transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 font-arabic">
                  {category.nameArabic}
                </p>
                <p className="text-sm text-muted-foreground">
                  {category.itemCount} পণ্য
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="islamic" size="lg">
            সব ক্যাটাগরি দেখুন
          </Button>
        </div>
      </div>
    </section>
  );
};