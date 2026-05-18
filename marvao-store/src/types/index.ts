export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  colors: string[];
  colorHex: string[];
  sizes: string[];
  category: 'camisa' | 'bermuda';
  images: string[];
  tag?: 'novo' | 'sale';
  description: string;
  material: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  bg: string;
  filter: string;
}
