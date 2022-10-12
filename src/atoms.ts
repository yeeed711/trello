import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
interface IToDoState {
  [key: string]: IToDo[];
}

export interface IToDo {
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const BoardState = atom<string[]>({
  key: 'board',
  default: ['TODO', 'DOING', 'DONE'],
  effects_UNSTABLE: [persistAtom],
});

export const isDeleteState = atom<boolean>({
  key: 'delete',
  default: false,
});
