import React, {useEffect, useState } from "react";
import useStore from "../../Store";
import egoldLogoIcon from '../../images/egold_logo_icon.png';
import { addGroupIcon, getOwnGroup, addParticipantsMember, removeParticipant } from "../../api/apiServices";



export default function GroupSetting() {
    const ChatId = useStore(state => state);
    const [selectedImage, setSelectedImage] = useState(null);
    const [addParticipants, setAddParticipants] = useState('');
    const [message, setMessage] = useState('');
    const [addRemovePartiicpants, setAddRemovePartiicpants] = useState('');

    //
    const addChatId = useStore((state) => state.addChatId);
    const addParticipants2 = useStore((state) => state.addParticipants);
    const addOwner = useStore((state) => state.addOwner);
    const addGroupName = useStore((state) => state.addGroupName);
    const GroupCreatedAt = useStore((state) => state.GroupCreatedAt);
    const GroupParticipantsList = useStore((state) => state.GroupParticipantsList);
    const GroupDescription = useStore((state) => state.GroupDescription);

    useEffect(() => {
        var headers2 = {
            headers: {
              'Accept': 'application/json',
              'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
            },
        };

        getOwnGroup(headers2).then((response) => {
            response.data.data.map((Participants) => {
                if(ChatId.chatId === Participants.id) {
                    addChatId({chatId: Participants.id});
                    addParticipants2({participants: Participants.participants});
                    GroupParticipantsList({groupParticipantsList: Participants.participants});
                }
            });
        });
    },[addRemovePartiicpants]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            var headers = {
                headers: {
                   'Content-Type' : 'multipart/form-data',
                  'Accept': 'application/json',
                  'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
                },
            };
            var postData = {
                file: file,
                channelId: ChatId.chatId
            };

            addGroupIcon(ChatId.chatId, postData , headers).then((json) => {
                //console.log("group icon: "+ JSON.stringify(json))
                console.log(json);
                setSelectedImage(file);
            });
        }
    };

    const deleteParticipants = (Participants) => {
        var postData = {
            groupID: ChatId.chatId,
            uid: Participants
        };
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
            
        };
        removeParticipant(postData,headers).then((json) => {
            setAddRemovePartiicpants('remove');
            //console.log("remove participants: "+ JSON.stringify(json));
        });
        setAddRemovePartiicpants('');
    }

    const  AddParticipants = () => {
        if(addParticipants.trim().length > 0 ) {
            
            var postData = {
                groupID: ChatId.chatId,
                uid: addParticipants
            };

            var headers = {
                headers: {
                   'Content-Type' : 'application/json',
                  'Accept': 'application/json',
                  'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
                },
            };

            addParticipantsMember(postData, headers).then((json) => {
                setMessage(json.data.message);
                setAddRemovePartiicpants('add');
                setAddParticipants('');
            })
            setAddRemovePartiicpants('');
        
        }
    }

    return(
        <>
            {ChatId.groupSettingOpen &&(
                <>
                    <div className='h-[68px] border-b-[1px] py-[10px] rounded-lg border-[#E5E5EA] flex justify-center items-center'>
                <div className='ml-[10px] md:hidden lg:hidden xl:hidden' ><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg></div>
                <div>
                <div className='flex items-center justify-center'>
                {selectedImage ? 
                    (
                        <img className='w-[32px] h-[32px] rounded-full' src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        
                    ) :
                    <img className='w-[32px] h-[32px] rounded-full' src={ChatId.groupIcon ? ChatId.groupIcon : egoldLogoIcon} />
                }
                <span className="ml-[5px] uppercase text-sm font-semibold">{ChatId.groupName}</span>
                </div>
                <div><p className='text-[#666668] text-[12px] font-normal'>Admin: {ChatId.owner} - {ChatId.participants?.length} Members</p></div>
                </div>
                
                </div>
                <div className="border-[#E5E5EA] border-b-[1px] flex justify-between mx-4">
                    <div>Group Description</div>
                    <div>{ChatId.groupDescription}</div>
                </div>
                <div className="border-[#E5E5EA] border-b-[1px] flex justify-between mx-4">
                    <div>Change Group Image</div>
                    <div>
                    <label htmlFor="upload-button" className="custom-file-upload">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="upload-button"
                        onChange={handleImageChange}
                        style={{ display: 'none', backgroundColor: 'gray' }}
                    />
                    </div>
                </div>
                <div className="border-[#E5E5EA] border-b-[1px] flex justify-between mx-4">
                    <div>Invie Link</div>
                    <div>{ChatId.inviteLink}</div>
                </div>
                <div className="border-[#E5E5EA] border-b-[1px] flex justify-between mx-4">
                    <div>Participants List</div>
                    <div>
                    {ChatId.groupParticipantsList?
                        ChatId.groupParticipantsList.map((participants, index) => {
                            const userId = Object.keys(participants)[0];
                            const value = participants[userId];

                            return(
                                <div key={index} className='chat-message'>
                                    <div onClick={() =>deleteParticipants(userId)}>{value} Remove</div>
                                </div>
                            )
                    }): ''}
                    </div>
                </div>
                <div className="border-[#E5E5EA] border-b-[1px] flex justify-between mx-4">
                    <div>Add Participants</div>
                    <div>
                        <input type="text" 
                        onChange={e => setAddParticipants(e.target.value)}
                        value={addParticipants}
                        required
                        
                        />
                        <button onClick={AddParticipants}>Add Participants</button>
                        {message}
                    </div>
                </div>
                </>
            ) }
        </>
    );
}