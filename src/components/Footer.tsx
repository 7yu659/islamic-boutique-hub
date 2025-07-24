import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-islamic-dark text-white">
      {/* Newsletter Section */}
      <div className="bg-islamic-green py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              নিউজলেটার সাবস্ক্রাইব করুন
            </h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              নতুন পণ্য ও বিশেষ অফারের খবর সবার আগে পেতে সাবস্ক্রাইব করুন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="আপনার ইমেইল ঠিকানা" 
                className="bg-white text-black"
              />
              <Button variant="gold" className="whitespace-nowrap">
                সাবস্ক্রাইব করুন
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-islamic-gold">
                ইসলামিক স্টোর
              </h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                বাংলাদেশের সবচেয়ে বিশ্বস্ত ইসলামিক পণ্যের অনলাইন শপ। 
                আমরা ১০০% হালাল এবং মানসম্পন্ন পণ্য সরবরাহ করি।
              </p>
              <div className="flex space-x-4">
                <Button size="icon" variant="ghost" className="text-white hover:text-islamic-gold">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:text-islamic-gold">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:text-islamic-gold">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:text-islamic-gold">
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-islamic-gold">
                দ্রুত লিংক
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">আমাদের সম্পর্কে</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">যোগাযোগ</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">শিপিং নীতি</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">রিটার্ন নীতি</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">গোপনীয়তা নীতি</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">শর্তাবলী</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-islamic-gold">
                পণ্যের ক্যাটাগরি
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">কোরান শরীফ</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">ইসলামিক বই</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">তসবিহ</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">আতর</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">খেজুর</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">ইসলামিক পোশাক</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-islamic-gold">
                যোগাযোগের তথ্য
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-islamic-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">
                      ১২৩ মতিঝিল, ঢাকা-১০০০<br />
                      বাংলাদেশ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-islamic-gold" />
                  <span className="text-white/80">+880 1234-567890</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-islamic-gold" />
                  <span className="text-white/80">info@islamicstore.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-islamic-gold mt-0.5" />
                  <div className="text-white/80">
                    <p>সাত দিন খোলা</p>
                    <p>সকাল ৯টা - রাত ১০টা</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <Separator className="bg-white/20" />
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm mb-4 md:mb-0">
              © ২০২৪ ইসলামিক স্টোর। সকল অধিকার সংরক্ষিত।
            </p>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span>পেমেন্ট মেথড:</span>
              <div className="flex gap-2">
                <div className="bg-white px-2 py-1 rounded text-xs text-black">bKash</div>
                <div className="bg-white px-2 py-1 rounded text-xs text-black">Nagad</div>
                <div className="bg-white px-2 py-1 rounded text-xs text-black">VISA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Islamic Quote */}
      <div className="text-center py-4 bg-islamic-green/20">
        <p className="text-islamic-gold text-sm font-arabic">
          "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا" - আল্লাহকে ভয় করলে তিনি তার জন্য পথ করে দেবেন
        </p>
      </div>
    </footer>
  );
};