import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  nameArabic?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isHalal?: boolean;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 bg-card border-border">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isHalal && (
            <Badge className="absolute top-2 left-2 bg-islamic-green text-white">
              হালাল
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
        </div>
      </Link>
      
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 bg-white/80 hover:bg-white z-10"
      >
        <Heart className="w-4 h-4" />
      </Button>
      
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground group-hover:text-islamic-green transition-colors">
              {product.name}
            </h3>
            {product.nameArabic && (
              <p className="text-sm text-muted-foreground font-arabic">
                {product.nameArabic}
              </p>
            )}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-islamic-green">
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>
        </Link>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="islamic" 
          className="w-full"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          কার্টে যোগ করুন
        </Button>
      </CardFooter>
    </Card>
  );
};