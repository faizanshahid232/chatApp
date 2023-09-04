import React, { useState, useEffect, useRef } from "react";
import optionicon from './images/option.png';
import avatarGroupIcon from './images/avatar-group.png';
import egoldLogoIcon from './images/egold_logo_icon.png';
import closeIcon from './images/close.png';
import smileyIcon from './images/smiley.png';
import addIcon from './images/mention.png';
import sendIcon from './images/Icon.png';
import userprofileIcon from './images/userprofile.png';
import useStore from "./Store";
import Pusher from "pusher-js";
import { pusherMsg } from "./api/apiServices";
import { getChat } from "./api/apiServices";
import { leftGroup, pusherMessageReplyChat } from "./api/apiServices";
import Loadingspinner from "./Loadingspinner";
import GroupSetting from "./GroupSetting";
import ChatMessage from "./ChatMessage";
import JoinPublicGroup from "./JoinPublicGroup";
import HandleChatMedia from "./HandleChatMedia";
import ChatImage from "./ChatImage";
import ReplyMessage from "./ReplyMessage";
import ConvertTimeStamp from "./ConvertTimeStamp";

export default function Chat() {
    const addChatId = useStore((state) => state.addChatId);
    const ChatId = useStore(state => state);
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState('');
    const [message, setMessage] = useState("");
    const [oldChat, setOldChat] = useState([]);
    const [messageCount, setmessageCount] = useState('');
    const [count, setCount] = useState(2);
    const bottomRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const updateGroup = useStore((state) => state.updateGroup);
    const [isOpen, setIsOpen] = useState(false);
    const [media, setMedia] = useState(null);
    const [RenderMedia, setRenderMedia] = useState(null);
    const CloseMediaPopup = useStore((state) => state.CloseMediaPopup);

    const [RenderCount, setRenderCount] = useState(0);
    const [mediaList, setMediaList] = useState([]);
    const [replyBox, setReplyBox] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [replyuser, setReplyuser] = useState('');
    const [replyImage, setReplyImage] = useState('');
    const [msgChatId, setMsgChatId] = useState('');

    // test
    const handleReply = (replyBox, message) => {
        setReplyMessage(message.chat_content ? message.chat_content : message.content);
        setReplyuser(message.from ? message.from : message.sender);
        setMsgChatId(message.chatId ? message.chatId : message.id)
        if(message.file_url) {
            
            if (message.file_url.startsWith("https://") || message.file_url.startsWith("http://")) {
            setReplyImage(message.file_url);
            } else {
                setReplyImage(process.env.REACT_APP_CHATIMGURL +"/"+ ChatId.chatId +"/"+ message.file_url);
            }
        }
         
        //setSelectedReply(message);
        //setMessage(`Replying to: ${message.chat_content}`);
    };
    //end test

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    {/* Header for Groups */}
    var headers = {
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };

    {/* End Header */}

    useEffect(() => {
        setIsLoading(true);
        try{
            if(ChatId.chatId) {
                setChats("");
                getChat(ChatId.chatId, 1, headers).then((json) => {
                    setmessageCount(json.data.total);
                    setOldChat(json.data.data);
                    setIsLoading(false);
                })
            }
        } catch(err) {
            setIsLoading(false);
        }
    },[ChatId.chatId]);

    const checkOldMessage = () => {
        //setChats([]);
        if(messageCount > 0 ) {
            setCount(count + 1);
            getChat(ChatId.chatId, count, headers).then((json) => {
                setmessageCount(messageCount - 10);
                console.log("count value: "+ count);
                setOldChat([...oldChat, ...json.data.data]);
                //console.log("oold Chat Data", oldChat);
                
            })
        }
    }

    useEffect(() => {
        if(ChatId.chatId) {
            setMessage([]);
            setChats([]);
            //Pusher.logToConsole = true;
            const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
                cluster: process.env.REACT_APP_CLUSTER,
                channelAuthorization: {
                    endpoint: process.env.REACT_APP_APIEND +"/pusher/auth",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                },
            });
            const channel = pusher.subscribe("presence-" + ChatId.chatId);
            channel.bind("chat_event", function (data) {
                setMsg(data);
            });
            return () => {
                pusher.unsubscribe("presence-" + ChatId.chatId);
            };
        }
    }, [ChatId.chatId]);

    useEffect(() => {
        if (msg){ 
            console.log("msg: "+JSON.stringify(msg));
            setChats([...chats, msg]);
        //bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        //window.scrollTo(0, bottomRef.current.offsetTop); 
    }
    }, [msg]);

    const backPage = () => {
        addChatId({chatId: ''});
    }

    function leaveGroup() {
        console.log("Leave Group");
        {/* POST DATA */}
        var headers2 = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
            
        };
        var data = {
            "groupID": ChatId.chatId,
        };
        leftGroup(data, headers2).then((json) => {
            //console.log("jjssoonn: "+ChatId.updateGroup);
            updateGroup({removeParticipants: json.data.message});
            setShowModal(false);
            setIsOpen(false);
            //setOldChat(json.data.data);
        })
    }

    const handleMediaChange = (e) => {
        setMedia(null);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setRenderMedia(event.target.result);
                //
                const updatedMediaList = [...mediaList];
                updatedMediaList[RenderCount] = event.target.result
                
                setMediaList(updatedMediaList);
                setRenderCount(RenderCount + 1 );
                //
                setMedia(file);
                CloseMediaPopup({closeMediaPopup: true});
            };
            reader.readAsDataURL(file);
            e.target.value = null;
        }
    }

    const sendMessage = () => {
        if(message.trim().length > 0 ) {
            //setReplyBox(false);
            if(replyBox) {
                var postData = {
                    chatContent: message,
                    chatId: msgChatId,
                    channelId: ChatId.chatId,
                    //replyTo: selectedReply ? selectedReply.id : null, //etst
                };
    
                try {
                    pusherMessageReplyChat(postData, headers)
                    .then((res) => {
                        console.log(res);
                        setMessage("");
                        setReplyBox("");
                        setReplyMessage("");
                        setReplyuser("");
                        //setMsgChatId("");
                        setReplyImage("");
                        //setSelectedReply(null); // etst
                    });
                } catch(error) {
                    console.log(error);
                }
            } else {
                var postData = {
                    chatContent: message,
                    channelId: ChatId.chatId,
                    //replyTo: selectedReply ? selectedReply.id : null, //etst
                };
    
                try {
                    pusherMsg(postData, headers)
                    .then((res) => {
                        console.log(res);
                        setMessage("");
                        //setSelectedReply(null); // etst
                    });
                } catch(error) {
                    console.log(error);
                }
            }
        }
    }

    const displayChat = () => {
        return (
            <>
        {/* Leave Group */}
            {media && ChatId.closeMediaPopup ? (
                <HandleChatMedia media={media} RenderMedia={RenderMedia} msgChatId={msgChatId} />
            ) : ''}
        
        {showModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-[#F2F2F7] outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl text-center font-semibold">
                  Leave Group
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {setShowModal(false); setIsOpen(false);}} >
                  <span className="bg-transparent text-[#aaa] text-[0.75rem] block outline-none focus:outline-none">
                    Close
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative flex-auto">
              <div className="w-full flex flex-col items-center justify-cente my-5">
                    <div>
                        Are you sure you want to leave the group ?
                    </div>
                    <div className="w-full flex flex-row justify-around mt-5">
                    <button onClick={() => leaveGroup()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Yes
                    </button>
                    <button onClick={() => {setShowModal(false); setIsOpen(false);}} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                        No
                    </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}

            {!ChatId.openProfile ?
            ChatId.is_participant || ChatId.group_is_private ? 
             isLoading ? (
            <div className="mt-[200px]"><Loadingspinner  /> </div>// Replace with your loading indicator
            ) : (
            <>
                {/* End Leave Group */}
                <div className='h-[68px] border-b-[1px] py-[10px] rounded-lg border-[#E5E5EA] flex justify-between items-center'>
                <div className='ml-[10px] md:hidden lg:hidden xl:hidden' onClick={() => backPage()}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg></div>
                <div className='ml-[10px] hidden md:block lg:block xl:block'><img className='w-[80px]' src={avatarGroupIcon} /></div>
                <div>
                <div className='flex items-center justify-center'>
                    <img className='w-[32px] h-[32px] rounded-full' src={ChatId.groupIcon ? ChatId.groupIcon : egoldLogoIcon} />
                    <span className="ml-[5px] uppercase text-sm font-semibold">{ChatId.groupName}</span>
                </div>
                <div><p className='text-[#666668] text-[12px] font-normal'>Admin: {ChatId.owner} - {ChatId.participants?.length} Members</p></div>
                </div>
                <div className="relative">
                    <img onClick={toggleMenu} className='w-[20px] mr-[20px]' src={optionicon} />
                    {isOpen && (
                        <div className="absolute mt-2 ml-[-160px] w-[200px] py-2 bg-white border rounded-lg shadow-lg">
                        <a
                            onClick={() => setShowModal(true)}
                            className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Leave Group
                        </a>
                    </div>
                    )}
                </div>
                
            </div>
                {/* messages start here */}
                
                <div id='messages' ref={bottomRef}  className='flex flex-col space-y-4 p-3 overflow-y-auto h-[500px] md:h-auto lg:h-auto xl:h-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                {/* old Chat */}
                {messageCount > 10 ? 
                <div className="text-center">
                    <button onClick={() => checkOldMessage()}>old message</button>
                </div>
                : ''
                }
                {oldChat?
                oldChat.slice(0).reverse().map((chat, index) => {
                    return (
                        <>
                        <div>
                        <ChatMessage key={index} chat={chat} index={index} prevdate={index < oldChat.length -1 ? oldChat.slice(0).reverse()[index + 1].time_stamp : ''}/>
                        <button className={chat.sender === localStorage.getItem("talkId") ? 'float-right mr-3' : 'float-left ml-3'} onClick={() => handleReply(setReplyBox(true), chat)}>Reply</button>
                        </div>
                        </>
                        )
                }): ''} 
                {/* old Chat End */}
                {chats.map((chat, index) => {
                    return( 
                        <div key={index} className='chat-message'>
                            <div className={chat["from"] === localStorage.getItem("talkId") ? 'flex item-end justify-end' : 'flex item-end justify-start'}>
                            <div className={chat["from"] === localStorage.getItem("talkId") ? 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end' : 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'}>
                                
                                <div>
                                    <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#4F6B75] text-white'>
                                    {/* check if its reply chat message */}
                                    {chat.replyto ? 
                                    (
                                        <ReplyMessage id={chat.replyto} />
                                    ) : ''
                                    }
                                    {/* end reply chat message */}
                                    {chat.file_url && (
                                        <ChatImage file_url={chat.file_url} group_id={ChatId.chatId} />
                                    )}
                                    <div className="block">{chat.chat_content}</div>
                                    <div className={chat["from"] === localStorage.getItem("talkId") ? "block text-[10px] float-right" : "block text-[10px]"}><ConvertTimeStamp timestamp={chat.chat_time} /></div>
                                    </span>
                                </div>
                                
                                <button onClick={() => handleReply(setReplyBox(true), chat)}>Reply</button>
                            </div>
                            <img className='w-6 h-6 rounded-full order-1' src={localStorage.getItem('profile_pic') ? localStorage.getItem('profile_pic') : userprofileIcon} />
                            </div>
                            {/* <div /> */}
                        </div> 
                    )
                })}
                
                {/* third message */}
                </div>

            {/* messages end here */}
            <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2'>
            
            {/** reply chat */}
            {replyBox && (
                <div className='relative flex mb-2'>
                    <span className='absolute inset-y-0 flex right-0 items-center'>
                        <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                        <img src={closeIcon} onClick={() => setReplyBox(false)} className='w-[16px] h-[16px]' />
                        </button>
                    </span>
                    <div className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200'>
                        <span>{replyuser === localStorage.getItem("talkId") ? 'You' : replyuser}</span><br/>
                        <span>
                            {replyImage ? (
                                <div className="flex items-center">
                                    <span><img className="w-[50px]" src={replyImage} /></span>
                                    <span className="ml-2">{replyMessage}</span>
                                </div>
                                ) : replyMessage}</span>
                    </div>
                </div>
            )} 
            {/** end reply chat */}

                <div className='relative flex'>
                <span className='absolute inset-y-0 flex items-center'>
                    <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                    <img src={smileyIcon} className='w-[16px] h-[16px]' />
                    </button>
                </span>
                <span className='absolute inset-y-0 flex right-0 items-center'>
                    <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                    <img src={sendIcon} onClick={() => sendMessage()} className='w-[16px] h-[16px]' />
                    </button>
                </span>
                <span className='absolute inset-y-0 right-0 mr-10 flex items-center'>
                    <label htmlFor="upload-button" className="custom-file-upload cursor-pointer">Upload photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="upload-button"
                        onChange={handleMediaChange}
                        style={{ display: 'none' }}
                    />
                    <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                    <img src={addIcon} className='w-[16px] h-[16px]' />
                    </button>
                </span>
                <input 
                    placeholder='Start typing...' 
                    className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' 
                    onChange={event => setMessage(event.target.value)}
                    value={message} 
                />
                </div>
            </div>
            </>
            ) : <JoinPublicGroup /> : <GroupSetting />}
        </>
        );
    }

    return (
        <>
        {displayChat()}
        </>
    );
}