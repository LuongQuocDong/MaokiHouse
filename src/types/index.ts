export interface Homestay {
  id: string;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  airbnbLink: string;
  phone: string;
  timestamp: number;
  updatedAt?: number;
  updatedBy?: string;
}

export interface WelcomeContent {
  id: string;
  content: string;
  title: string;
  subtitle: string;
  updatedAt?: number;
  updatedBy?: string;
}

export interface User {
  uid: string;
  email: string;
} 