import { useState } from "react";
import { Header } from "@/components/UpdatedHeader";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;
