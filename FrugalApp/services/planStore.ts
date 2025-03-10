import { create as createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { singleItem } from "@/constants/Types";
import { v4 as uuidv4 } from "uuid";

type PlanState = {
  plan: singleItem[];
  addToPlan: (item: singleItem) => void;
  addToPlanMany: (items: singleItem[]) => void;
  removeFromPlan: (key: string) => void;
  clearPlan: () => void;
};

const usePlanStore = createStore<PlanState>()(
  persist(
    (set) => ({
      plan: [],
      addToPlan: (item: singleItem) => set((state) => ({ plan: [...state.plan, genUniqueKey(item)] })),
      addToPlanMany: (items: singleItem[]) => set((state) => ({ plan: [...state.plan, ...items.map(genUniqueKey)] })),
      removeFromPlan: (key: string) =>
        set((state) => ({
          plan: state.plan.filter((item) => item.key !== key),
        })),
      clearPlan: () => set({ plan: [] }),
    }),
    {
      name: "plan-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

const genUniqueKey = (item: singleItem) => {
  const key = uuidv4();
  return { ...item, key: key };
};

export default usePlanStore;
