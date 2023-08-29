import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store = (set) => ({
    chatId: '',
    owner: '',
    participants: '',
    groupName: '',
    groupIcon: '',

    addChatId: (initalize) => set({
        chatId: initalize.chatId,
    }),

    addOwner: (initalize) => set({
        owner: initalize.owner,
    }),

    addParticipants: (initalize) => set({
        participants: initalize.participants
    }),

    addGroupName: (initalize) => set({
        groupName: initalize.groupName
    }),

    addGroupIcon: (initalize) => set({
        groupIcon: initalize.groupIcon
    }),

});

const useStore = create(store);
export default useStore;