import {create} from 'zustand';

let store = (set) => ({
    chatId: '',
    owner: '',
    is_participant: false,
    group_is_private: false,
    closeMediaPopup: false,
    participants: '',
    groupName: '',
    groupIcon: '',
    removeParticipants: '',
    openProfile: false,
    groupCreatedAt: '',
    groupParticipantsList: [],
    groupDescription: '',
    inviteLink: '',
    searchTerm: '',
    

    addChatId: (initalize) => set({
        chatId: initalize.chatId,
    }),

    addOwner: (initalize) => set({
        owner: initalize.owner,
    }),

    IsParticipant: (initalize) => set({
        is_participant: initalize.is_participant
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

    updateGroup: (initalize) => set({
        removeParticipants: initalize.removeParticipants
    }),

    OpenProfile: (initalize) => set({
        openProfile: initalize.openProfile
    }),

    GroupCreatedAt: (initalize) => set({
        groupCreatedAt: initalize.groupCreatedAt
    }),

    GroupParticipantsList: (initalize) => set({
        groupParticipantsList: initalize.groupParticipantsList
    }),

    GroupDescription: (initalize) => set({
        groupDescription: initalize.groupDescription
    }),

    InviteLink: (initalize) => set({
        inviteLink: initalize.inviteLink
    }),

    GroupIsPrivate: (initalize) => set({
        group_is_private: initalize.group_is_private
    }),

    CloseMediaPopup: (initalize) => set({
        closeMediaPopup: initalize.closeMediaPopup
    }),

    setSearchTerm: (newTerm) => set({ 
        searchTerm: newTerm 
    }),

});

const useStore = create(store);
export default useStore;