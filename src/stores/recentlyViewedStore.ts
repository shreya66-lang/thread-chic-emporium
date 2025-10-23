import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RecentlyViewedStore {
  productHandles: string[];
  addProduct: (handle: string) => void;
  clearHistory: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      productHandles: [],

      addProduct: (handle) => {
        const { productHandles } = get();
        const filtered = productHandles.filter(h => h !== handle);
        const updated = [handle, ...filtered].slice(0, 8);
        set({ productHandles: updated });
      },

      clearHistory: () => {
        set({ productHandles: [] });
      }
    }),
    {
      name: 'preyasi-recently-viewed',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
