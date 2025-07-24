import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Search, 
  Heart, 
  User, 
  Menu,
  Phone,
  Mail
} from "lucide-react";

interface HeaderProps {
  cartItemsCount: number;
}

export const Header = ({ cartItemsCount }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-islamic-green text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@islamicstore.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>✨ ফ্রি ডেলিভারি ১০০০ টাকার উপরে অর্ডারে</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-islamic-green">
              ইসলামিক স্টোর
            </h1>
            <span className="text-islamic-gold text-xs mr-2">★</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input 
                placeholder="পণ্য খুঁজুন..." 
                className="pr-10"
              />
              <Button 
                size="icon" 
                variant="ghost"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-islamic-gold text-islamic-dark text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input placeholder="পণ্য খুঁজুন..." className="pr-10" />
            <Button 
              size="icon" 
              variant="ghost"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-muted border-t border-border">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center space-x-8 py-3">
            <Button variant="ghost" className="text-foreground hover:text-islamic-green">
              হোম
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-islamic-green">
              কোরান শরীফ
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-islamic-green">
              ইসলামিক বই
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-islamic-green">
              তসবিহ
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-islamic-green">
              আতর
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-islamic-green">
              খেজুর
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-islamic-green">
              পোশাক
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">হোম</Button>
              <Button variant="ghost" className="w-full justify-start">কোরান শরীফ</Button>
              <Button variant="ghost" className="w-full justify-start">ইসলামিক বই</Button>
              <Button variant="ghost" className="w-full justify-start">তসবিহ</Button>
              <Button variant="ghost" className="w-full justify-start">আতর</Button>
              <Button variant="ghost" className="w-full justify-start">খেজুর</Button>
              <Button variant="ghost" className="w-full justify-start">পোশাক</Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};