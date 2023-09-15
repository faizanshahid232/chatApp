import React, {useEffect, useState } from "react";
import useStore from "../../Store";
import egoldLogoIcon from '../../images/egold_logo_icon.png';
import closeIcon from '../../images/close.png';
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
                useStore.getState().addChatId(Participants.id);
                //useStore.getState().addParticipants2(Participants.participants);
                useStore.getState().GroupParticipantsList(Participants.participants);
              }
          });
      });
  },[addRemovePartiicpants]);

  useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      setMessage("")
    }, 5000)
  
    return () => clearInterval(intervalId); 
  },[message]);

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
  {ChatId.groupSettingOpen && (
    <div className="container mx-auto mt-6 p-6">
      <div className="bg-white rounded-lg border border-gray-300">
        <div className="px-4 py-3 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Group Info</h2>
            <img src={closeIcon} onClick={() => useStore.getState().GroupSettingOpen(false)} className={`w-6 float-right ${ChatId.groupSettingOpen ? 'block md:hidden xl:hidden lg:hidden' : ''}`} />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-4">
            {selectedImage ? (
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
              />
            ) : (
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={ChatId.groupIcon ? ChatId.groupIcon : egoldLogoIcon}
                alt="Group Icon"
              />
            )}
            <div>
              <span className="text-lg font-semibold">
                {ChatId.groupName}
              </span>
              <p className="text-sm text-gray-600">
                Admin: {localStorage.getItem("talkId")} - {ChatId.participants?.length} Members
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between flex-col">
              <span className="text-sm font-semibold">Group Description</span>
              <span>{ChatId.groupDescription}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Change Group Image</span>
              <div>
                <label
                  htmlFor="upload-button"
                  className="bg-blue-500 p-2 rounded-lg custom-file-upload cursor-pointer text-white"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-button"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Invite Link</span>
              <span>{ChatId.inviteLink}</span>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Participants List:</p>
              <div className="h-40 overflow-y-auto border rounded-lg">
                {ChatId.groupParticipantsList && ChatId.groupParticipantsList.length > 0 
                  ? ChatId.groupParticipantsList.map((participants, index) => {
                      const userId = Object.keys(participants)[0];
                      const value = participants[userId];

                      return (
                        <div
                          key={index}
                          className="border-b p-2"
                        >
                          <span className="font-bold mr-2">{value}</span>
                          <button
                            onClick={() => deleteParticipants(value)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })
                  : ''}
              </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Add Participants</span>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  onChange={(e) => setAddParticipants(e.target.value)}
                  value={addParticipants}
                  className="border rounded-md p-2 w-40"
                  required
                />
                <button
                  onClick={AddParticipants}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="text-red-600 text-center p-2 pt-5">{message}</div>
          </div>
        </div>
      </div>
    </div>
  )}
</>

    );
}