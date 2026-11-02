export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'coffee' | 'chilled' | 'bakery' | 'brunch';
  price: number;
  image: string;
  description: string;
  tastingNotes: string[];
  origin?: string;
  elevation?: string;
  process?: string;
  calories?: string;
  allergens?: string[];
  badge?: string;
  options?: {
    milk?: string[];
    temperature?: ('Hot' | 'Iced')[];
    sweetness?: string[];
  };
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedMilk?: string;
  selectedTemp?: 'Hot' | 'Iced';
  selectedSweetness?: string;
  specialInstructions?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  quote: string;
  favoriteOrder: string;
  rating: number;
}

export interface RoastProfile {
  id: string;
  name: string;
  origin: string;
  farm: string;
  varietal: string;
  notes: string[];
  altitude: string;
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Velvet Dark';
  acidity: number; // 1-5
  sweetness: number; // 1-5
  body: number; // 1-5
  aroma: number; // 1-5
  description: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  partySize: number;
  seatingArea: 'Espresso Bar' | 'Sunlit Solarium' | 'Quiet Study Nook' | 'Main Hall';
  notes?: string;
}
