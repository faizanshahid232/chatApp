import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store = (set) => ({
    chatId: '',
    owner: '',
    participants: '',

    addChatId: (initalize) => set({
        chatId: initalize.chatId,
    }),

    addOwner: (initalize) => set({
        owner: initalize.owner,
    }),

    addParticipants: (initalize) => set({
        participants: initalize.participants
    }),

});

const useStore = create(store);
export default useStore;