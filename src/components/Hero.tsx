import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/islamic-hero-banner.jpg";

export const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-islamic-dark/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          {/* Badge */}
          <Badge className="mb-4 bg-islamic-gold text-islamic-dark">
            ✨ হালাল পণ্যের বিশ্বস্ত দোকান
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            আপনার ধর্মীয় 
            <span className="text-islamic-gold"> প্রয়োজন </span>
            পূরণ করুন
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
            সব ধরনের ইসলামিক পণ্য পাবেন এক জায়গায়। কোরান শরীফ থেকে শুরু করে 
            দৈনন্দিন ব্যবহারের সকল হালাল পণ্য।
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-islamic-gold rounded-full"></span>
              ১০০% হালাল পণ্য
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-islamic-gold rounded-full"></span>
              দ্রুত ডেলিভারি
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-islamic-gold rounded-full"></span>
              সাশ্রয়ী মূল্য
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="gold" size="lg" className="font-semibold">
              এখনই কিনুন
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-islamic-dark">
              পণ্য দেখুন
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 right-4 text-white/30 text-sm">
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
      </div>
    </section>
  );
};