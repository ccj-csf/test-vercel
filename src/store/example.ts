import { create } from 'zustand';

interface State {
  example: string;
}

interface Action {
  setExample: (theme: string) => void;
}

const useExampleStore = create<State & Action>((set) => ({
  example: 'example',
  setExample: (example: string) => set({ example }),
}));

export { useExampleStore };
