import React, { useState } from "react";
import userprofileIcon from './userprofile.png';
import useStore from "./Store";

export default function PrivateGroup(props) {
    const [ChatID, setChatID] = useState();
    const addChatId = useStore((state) => state.addChatId);
    const [Participants, setParticipants] = useState();
    const addParticipants = useStore((state) => state.addParticipants);
    const [Owner, setOwner] = useState();
    const addOwner = useStore((state) => state.addOwner);
    
    const openChat = (data) => {
        setChatID(data.id);
        setParticipants(data.participants);
        setOwner(data.owner);
        addChatId({chatId: ChatID});
        addParticipants({participants: Participants});
        addOwner({owner: Owner});
    }

    const displayData = (props) => {
        const {data} = props;
        if(data.length > 0) {
            return(
                data.map((data, index) => {
                    return(
                        data.private ? 
                        <div key={index} onClick={() => openChat(data)} className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200'>
                            <div className='flex-shrink-0'>
                                <img className='h-10 w-10 rounded-full' src={userprofileIcon} />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <a href="#" className='focus:outline-none'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-sm font-medium text-black'>
                                    {data.name}
                                    </p>
                                    <div className='text-gray-400 text-xs'>
                                    12:35 AM
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-sm text-gray-400 truncate'>{data.description}</p>
                                    <div className='text-white text-xs bg-red-400 rounded-full px-1 py-0'>
                                    2
                                    </div>
                                </div>
                                </a>
                            </div>
                        </div>
                        : ''
                    )
                })
            )
        } else {
            return (<h3 className="text-center">No Group Found</h3>)
        }
    }
    
    return (
        <>
            {displayData(props)}
        </>
    );
}