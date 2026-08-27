import { firestore } from '../config/firebase';

/**
 * Generic hostId-scoped Firestore CRUD helper. Every collection created via
 * this factory is implicitly multi-tenant-ready: all reads are filtered by
 * hostId, and hostId is stamped onto every write.
 */
export function createHostScopedModel<T extends { id: string; hostId: string }>(
  collectionName: string
) {
  const collection = () => firestore.collection(collectionName);

  return {
    async list(hostId: string): Promise<T[]> {
      const snapshot = await collection().where('hostId', '==', hostId).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
    },

    async get(hostId: string, id: string): Promise<T | null> {
      const doc = await collection().doc(id).get();
      if (!doc.exists) return null;
      const data = { id: doc.id, ...doc.data() } as T;
      if (data.hostId !== hostId) return null;
      return data;
    },

    async create(hostId: string, data: Omit<T, 'id' | 'hostId'>): Promise<T> {
      const payload = { ...data, hostId } as Omit<T, 'id'>;
      const ref = await collection().add(payload);
      return { id: ref.id, ...payload } as T;
    },

    async update(hostId: string, id: string, data: Partial<Omit<T, 'id' | 'hostId'>>): Promise<void> {
      const doc = await collection().doc(id).get();
      if (!doc.exists || doc.data()?.hostId !== hostId) {
        throw new Error('NOT_FOUND');
      }
      await collection().doc(id).update(data as Record<string, unknown>);
    },

    async remove(hostId: string, id: string): Promise<void> {
      const doc = await collection().doc(id).get();
      if (!doc.exists || doc.data()?.hostId !== hostId) {
        throw new Error('NOT_FOUND');
      }
      await collection().doc(id).delete();
    },

    // For collections keyed by a fixed id (e.g. ChannelConnection per platform).
    async upsert(hostId: string, id: string, data: Omit<T, 'id'>): Promise<T> {
      await collection().doc(id).set({ ...data, hostId }, { merge: true });
      return { id, ...data } as T;
    },
  };
}
