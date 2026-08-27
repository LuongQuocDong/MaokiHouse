import { db } from '../config/firebase';

export interface Homestay {
  id: string;
  title: string;
  description: string;
  price: number;
  imageURL?: string;
  imageURLs: string[];
  mainImageURL: string;
  airbnbLink: string;
  phone: string;
  timestamp: number;
  updatedAt?: number;
  updatedBy?: string;
}

const homestaysRef = () => db.ref('homestays');

export const HomestayModel = {
  async list(): Promise<Homestay[]> {
    const snapshot = await homestaysRef().once('value');
    if (!snapshot.exists()) return [];
    const data = snapshot.val() as Record<string, Omit<Homestay, 'id'>>;
    return Object.entries(data)
      .map(([id, value]) => ({ id, ...value }))
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  },

  async get(id: string): Promise<Homestay | null> {
    const snapshot = await homestaysRef().child(id).once('value');
    if (!snapshot.exists()) return null;
    return { id: snapshot.key as string, ...snapshot.val() } as Homestay;
  },

  async create(data: Omit<Homestay, 'id'>): Promise<Homestay> {
    const newRef = homestaysRef().push();
    await newRef.set(data);
    return { id: newRef.key as string, ...data };
  },

  async update(id: string, data: Partial<Omit<Homestay, 'id'>>): Promise<void> {
    await homestaysRef().child(id).update(data);
  },

  async remove(id: string): Promise<void> {
    await homestaysRef().child(id).remove();
  },
};
