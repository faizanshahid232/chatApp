import React, {useState, useEffect} from "react";
import { addProfilePic, generateInviteLink, getOwnGroup, getProfilePic } from "./api/apiServices";
import userprofileIcon from './images/userprofile.png';
import useStore from "./Store";
import Loadingspinner from "./Loadingspinner";
import arrow from './images/arrow.png';

export default function Userprofile() {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    //
    const addChatId = useStore((state) => state.addChatId);
    const addParticipants = useStore((state) => state.addParticipants);
    const addOwner = useStore((state) => state.addOwner);
    const addGroupName = useStore((state) => state.addGroupName);
    const addGroupIcon = useStore((state) => state.addGroupIcon);
    const [ownGroupList, setOwnGroupList] = useState('');
    const ChatId = useStore(state => state);
    const OpenProfile = useStore((state) => state.OpenProfile);
    const [loading, setLoading] = useState(true);
    
    const GroupCreatedAt = useStore((state) => state.GroupCreatedAt);
    const GroupParticipantsList = useStore((state) => state.GroupParticipantsList);
    const GroupDescription = useStore((state) => state.GroupDescription);
    const InviteLink = useStore((state) => state.InviteLink);

    var headers = {
        headers: {
          'Accept': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
      };

    const openChat = (data) => {
        addChatId({chatId: data.id});
        addParticipants({participants: data.participants});
        addOwner({owner: data.owner});
        addGroupName({groupName: data.name});
        addGroupIcon({groupIcon: data.group_icon});
        GroupCreatedAt({groupCreatedAt: data.created_at});
        GroupDescription({groupDescription: data.description});
        GroupParticipantsList({groupParticipantsList: data.participants});

        var headerInviteLink = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
            },
          };

        var postData = {
            groupId: data.id
        };

        generateInviteLink(postData,headerInviteLink).then((json) => {
            InviteLink({inviteLink: json.data.invite_link});
            //console.log("Invite Link: "+ JSON.stringify(json.data.invite_link));
        })
    }

    useEffect(() => {
        getOwnGroup(headers).then((response) => {
            setOwnGroupList(response.data.data);
            setLoading(false);
          });
    },[]);

    useEffect(() => {
        getOwnGroup(headers).then((response) => {
            setOwnGroupList(response.data.data);
          });
          console.log("reload");
    },[ChatId.groupParticipantsList]);
    //

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    var headers = {
        headers: {
           'Content-Type' : 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };

    var headerProfilePic = {
        headers: {
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            var postData = {
                file: file
            };
            addProfilePic(postData, headers).then((json) => {
                console.log("response: "+ JSON.stringify(json));
                setIsOpen(false);
                getProfilePic(headerProfilePic).then((json) => {
                    console.log("profile Pic: "+ JSON.stringify(json.data.data.profile_pic));
                    localStorage.setItem("profile_pic", json.data.data.profile_pic);
                })
            });
          setSelectedImage(file);
        }
    };

    const displayData = () => {
        if(loading) {
            return (<Loadingspinner/>)
        }
        else if(ownGroupList.length > 0) {
            return(
                ownGroupList.map((data, index) => {
                    return(
                        data.participants.length > 0 ?
                        data.private ? 
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
                        : ''
                        : ''
                    )
                })
            )
        } else {
            return <div className="text-center">No Group Found</div>
        }
    }
    const profilePic = localStorage.getItem('profile_pic');
    const imageSource = profilePic !== null && profilePic !== 'null' ? profilePic : userprofileIcon;


    return(
        <>
        <div className='border-b border-white pr-2 xl:border-b-0 xl:flex-shrink-0 xl:w-68 xl:border-r xl:border-gray-200 bg-gray-50'>
            <div className="h-[600px] md:h-full lg:h-full xl:h-full relative bg-white">
                <div className='h-full pl-2 md:pl-4 sm:pl-6 lg:pl-8 xl:pl-0'>
                    <div className='bg-[#4F6B75] h-[48px] rounded-tl-lg rounded-tr-lg flex justify-between'>
                        <a onClick={() => OpenProfile({OpenProfile: false})} className="cursor-pointer ml-2 mt-[6px] col-2 textaligncenter flex items-center text-white font-medium"><img className="w-[15px] mr-3" src={arrow} />Profile</a>
                    </div>
            <div className='relative'>
                <div className="bg-white">
                    <div className="h-full">
                        <div className='h-full relative'>
                        <div className='m-auto text-center mb-10 bg-[#f0f2f5] p-[35px]'>
                        {selectedImage ? 
                        (
                            <img onClick={toggleMenu} className='cursor-pointer w-36 h-36 rounded-full m-auto relative px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200' src={URL.createObjectURL(selectedImage)} alt="Selected" />
                            
                        ) : <img onClick={toggleMenu} className='cursor-pointer w-36 h-36 rounded-full m-auto relative px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200' src={imageSource} />
                        }
                            {isOpen && (
                                <div className="absolute mt-[-10px] w-[200px] py-2 bg-white border rounded-lg shadow-lg">
                                <a
                                    href="#"
                                    className="block cursor-pointer text-gray-800 hover:bg-gray-100"
                                >
                                    <label htmlFor="upload-button" className="custom-file-upload cursor-pointer">Upload photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="upload-button"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </a>
                                </div>
                            )}
                            <h2 className='m-auto text-2xl mt-2'>{localStorage.getItem('talkId')}</h2>
                        </div>
                        </div>        
                    </div>
                </div>
            </div>
            {displayData()}
            </div>
            </div>
        </div>
        </>
    );
}