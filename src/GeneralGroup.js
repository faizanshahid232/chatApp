import React, {useEffect, useState} from "react";
import userprofileIcon from './images/userprofile.png';
import useStore from "./Store";
import Loadingspinner from "./Loadingspinner";
import { getGeneralGroupList } from './api/apiServices';

export default function GeneralGroup(props) {
    const addChatId = useStore((state) => state.addChatId);
    const addParticipants = useStore((state) => state.addParticipants);
    const addOwner = useStore((state) => state.addOwner);
    const addGroupName = useStore((state) => state.addGroupName);
    const [generalGroupList, setgeneralGroupList] = useState('');
    const addGroupIcon = useStore((state) => state.addGroupIcon);
    const GroupIsPrivate = useStore((state) => state.GroupIsPrivate);
    const IsParticipant = useStore((state) => state.IsParticipant);
    const [filteredData, setFilteredData] = useState([]);
    const ChatId = useStore(state => state);

    var headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };

    const openChat = (data) => {
        IsParticipant({is_participant: ''});
        GroupIsPrivate({group_is_private: false});
        addChatId({chatId: data.id});
        addParticipants({participants: data.participants});
        addOwner({owner: data.owner});
        addGroupName({groupName: data.name});
        addGroupIcon({groupIcon: data.group_icon});
        IsParticipant({is_participant: data.is_participant});
    }

    useEffect(() => {
        getGeneralGroupList(headers).then((response) => {
            setgeneralGroupList(response.data.data);
          });
    },[]);


    const displayData = () => {
        if(generalGroupList.length > 0) {
            
            if(ChatId.searchTerm) {
                const filteredResults = generalGroupList.filter((item) =>
                item.name.toLowerCase().includes(ChatId.searchTerm.toLowerCase())
            );

            if(filteredResults) {
                return(
                    filteredResults.map((data, index) => {
                        console.log(data);
                        return(
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
                        )
                    })
                )
            }
            } else {
                return(
                    generalGroupList.map((data, index) => {
                        console.log(data);
                        return(
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
                        )
                    })
                )
            }
        } else {
            return (<Loadingspinner />)
        }
    }
    
    return (
        <>
            {displayData()}
        </>
    );
}