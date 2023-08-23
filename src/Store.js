import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store = (set) => ({
    chatId: '',

    addChatId: (initalize) => set({
        chatId: initalize.chatId
    }),
});

const useStore = create(store);
export default useStore;