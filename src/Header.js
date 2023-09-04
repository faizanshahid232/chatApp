import React from "react";
import logo from './images/egold_talk.png';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { useNavigate } from "react-router-dom";
import useStore from './Store';

export default function Header() {
    
    const [metaMask, hooks] = initializeConnector((actions) => new MetaMask(actions));
    const navigate = useNavigate();
    const addChatId = useStore((state) => state.addChatId);
    const addOwner = useStore((state) => state.addOwner);
    const IsParticipant = useStore((state) => state.IsParticipant);
    const addParticipants = useStore((state) => state.addParticipants);
    const addGroupName = useStore((state) => state.addGroupName);
    const addGroupIcon = useStore((state) => state.addGroupIcon);
    const updateGroup = useStore((state) => state.updateGroup);
    const OpenProfile = useStore((state) => state.OpenProfile);
    const GroupCreatedAt = useStore((state) => state.GroupCreatedAt);
    const GroupParticipantsList = useStore((state) => state.GroupParticipantsList);
    const GroupDescription = useStore((state) => state.GroupDescription);
    const InviteLink = useStore((state) => state.InviteLink);
    const GroupIsPrivate = useStore((state) => state.GroupIsPrivate);
    const CloseMediaPopup = useStore((state) => state.CloseMediaPopup);
    const setSearchTerm = useStore((state) => state.setSearchTerm);
    const Web3RandomMsg = useStore((state) => state.Web3RandomMsg);
    const Web3ResponseToken = useStore((state) => state.Web3ResponseToken);

    const logOut = () => {
        if(localStorage.getItem('user_type') === 'web3') {
            metaMask.resetState();
        }
        localStorage.clear();
        addChatId({chatId: ''});
        addOwner({owner: ''});
        IsParticipant({is_participant: false});
        addParticipants({participants: ''});
        addGroupName({groupName: ''});
        addGroupIcon({groupIcon: ''});
        updateGroup({removeParticipants: ''});
        OpenProfile({openProfile: false});
        GroupCreatedAt({groupCreatedAt: ''});
        GroupParticipantsList({groupParticipantsList: []});
        GroupDescription({groupDescription: ''});
        InviteLink({inviteLink: ''});
        GroupIsPrivate({group_is_private: false});
        CloseMediaPopup({closeMediaPopup: false});
        setSearchTerm({searchTerm: ''});
        Web3RandomMsg({web3RandomMsg: ''});
        Web3ResponseToken({web3ResponseToken: ''});
        navigate("/mainpage");
    }

    return(
        <div className='bg-white h-[70px] rounded-lg'>
            <div className='flex justify-between'>
            <div><img className='w-[196px] mt-[20px] ml-[20px]' src={logo} /></div>
            {localStorage.getItem('user_type') &&(
                <div><button className='bg-[#4F6B75] text-white rounded-lg w-[150px] mr-[20px] h-[35px] mt-[17.5px] font-bold text-[14px]' onClick={logOut}>{localStorage.getItem('user_type') === 'web3' ? 'Disconnect' : 'Logout'}</button></div>
            )}
            </div>
      </div>
    );
}