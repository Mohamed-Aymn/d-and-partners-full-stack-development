import { create } from 'zustand'

// 1. Define the shape of your state and actions
interface CountState {
  count: number
  increment: () => void
  decrement: () => void
}

// 2. Pass the interface to create<CountState>()
export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))