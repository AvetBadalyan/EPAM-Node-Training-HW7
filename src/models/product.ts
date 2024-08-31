export interface Stock {
    available: number;
    reserved: number;
    location: string;
  }
  
  export interface Manufacturer {
    name: string;
    address: {
      street: string;
      city: string;
      zip: string;
    };
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    manufacturer: Manufacturer,
    price: number;
    category: string;
    stock: Stock;
    tags: string[];
    rating: number;
    deleted: boolean;
  }
  