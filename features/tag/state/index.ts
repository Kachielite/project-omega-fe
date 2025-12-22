import { ITags } from '@/features/tag/interfaces';
import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import zustandStorage from '@/core/common/utils/zustandStorage';

interface TagsStore {
  tags: ITags[] | null;
  selectedTag: ITags | null;
  setTags: (value: ITags[]) => void;
  getTags: () => ITags[] | null;
  setSelectedTag: (value: ITags) => void;
  getSelectedTag: () => ITags | null;
}

const useTagsStore = create<TagsStore>()(
  persist(
    (set, get) => ({
      tags: null,
      selectedTag: null,

      setTags: (value: ITags[]) => set({ tags: value }),
      getTags: (): ITags[] | null => get().tags,
      setSelectedTag: (value: ITags) => set({ selectedTag: value }),
      getSelectedTag: (): ITags | null => get().selectedTag,
    }),
    {
      name: 'tags-storage-v1',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useTagsStore;
