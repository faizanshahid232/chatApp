import React, {useEffect, useState} from "react";
import userprofileIcon from '../../images/userprofile.png';
import useStore from "../../Store";
import Loadingspinner from "../../Loadingspinner";
import { getGeneralGroupList, getCountryGroupList, getPrivateGroupList, getTalkId } from '../../api/apiServices';

export default function GeneralGroup({openTab}) {
    
    const [groupList, setGroupList] = useState([]);
    const ChatId = useStore(state => state);
    const [loading, setLoading] = useState(true);

    var headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };

    const openChat = (data) => {
        useStore.getState().resetStore();
        openTab === 3 ? useStore.getState().GroupIsPrivate(true) : useStore.getState().GroupIsPrivate(false);
        useStore.getState().addChatId(data.id);
        useStore.getState().addParticipants(data.participants);
        useStore.getState().addOwner(data.owner);
        useStore.getState().addGroupName(data.name);
        useStore.getState().addGroupIcon(data.group_icon);
        useStore.getState().GroupParticipantsList(data.participants);
        openTab != 3 && useStore.getState().IsParticipant(data.is_participant);

        console.log("owner id: "+ ChatId.owner);
            
        getTalkId(ChatId.owner, headers).then((json) => {
            useStore.getState().setTalkId(json.data.data);
        });

    }

    useEffect(() => {
        setLoading(true);
        if(openTab === 1) {
            console.log("Tab 1: "+ openTab);
            getGeneralGroupList(headers).then((response) => {
                console.log("Tab 1 Data: "+ JSON.stringify(response.data.data));
                setGroupList(response.data.data);
                setLoading(false);
            });
        } else if(openTab === 2) {
            console.log("Tab 2: "+ openTab);
            getCountryGroupList(headers).then((response) => {
                setGroupList(response.data.data);
                setLoading(false);
            });
        } else if (openTab === 3) {
            console.log("Tab 3: "+ openTab);
            getPrivateGroupList(headers).then((response) => {
                setGroupList(response.data.data);
                setLoading(false);
            });
        }
    },[openTab]);

    useEffect(() => {
        if (openTab === 3) {
        getPrivateGroupList(headers).then((response) => {
            setGroupList(response.data.data);
          });
        }
    },[ChatId.removeParticipants]);

    const displayData = () => {
        if(loading) {
            return (<Loadingspinner/>)
        } else if(groupList.length > 0) {
            
            if(typeof ChatId.searchTerm === "string") {
                const filteredResults = groupList.filter((item) =>
                item.name.toLowerCase().includes(ChatId.searchTerm.toLowerCase())
            );

            if(filteredResults) {
                return(
                    filteredResults.map((data, index) => {
                        console.log(data);
                        return(
                            <div key={index} onClick={() => openChat(data)} className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200'>
                                <div className='flex-shrink-0'>
                                    <img className='h-10 w-10 rounded-full' src={data.group_icon ? data.group_icon : userprofileIcon} />
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
            }
        } else {
            return <div className="text-center">No Group Found</div>;
        }
    }
    
    return (
        <>
            {displayData()}
        </>
    );
}