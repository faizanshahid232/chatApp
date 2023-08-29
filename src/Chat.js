import React, { useState, useEffect, useRef } from "react";
import optionicon from './option.png';
import avatarGroupIcon from './avatar-group.png';
import egoldLogoIcon from './egold_logo_icon.png';
import egoldtextIcon from './egoldtext.png';
import smileyIcon from './smiley.png';
import addIcon from './mention.png';
import sendIcon from './Icon.png';
import userprofileIcon from './userprofile.png';
import useStore from "./Store";
import Pusher from "pusher-js";
import { pusherMsg } from "./api/apiServices";
import { getChat } from "./api/apiServices";
import { leftGroup } from "./api/apiServices";
import Loadingspinner from "./Loadingspinner";

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

    // tets
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    // end tets
    
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
        if (msg){ setChats([...chats, msg]);
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
            setShowModal(false);
            setIsOpen(false);
            //setOldChat(json.data.data);
        })
    }

    const sendMessage = () => {
        if(message.trim().length > 0 ) {
            var postData = {
                chatContent: message,
                channelId: ChatId.chatId
            };

            try {
                pusherMsg(postData, headers)
                .then((res) => {
                    console.log(res);
                    setMessage("");
                });
            } catch(error) {
                console.log(error);
            }

        }
    }

    const displayChat = () => {
        return (
            <>
        {/* Leave Group */}
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
            {isLoading ? (
            <Loadingspinner/> // Replace with your loading indicator
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
                {oldChat.slice(0).reverse().map((chat, index) => {
                    return(
                        <div key={index} className='chat-message'>
                            <div className='flex item-end justify-end'>
                            <div className={chat.sender === localStorage.getItem("talkId") ? 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end' : 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'}>
                                <div>
                                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#4F6B75] text-white'>
                                <div className="block">{chat.content}</div>
                                </span>
                                </div>
                            </div>
                            <img className='w-6 h-6 rounded-full order-1' src={userprofileIcon} />
                            </div>
                        </div>
                    )
                })}
                {/* old Chat End */}
                {chats.map((chat, index) => {
                    return( 
                        <div key={index} className='chat-message'>
                            <div className='flex item-end justify-end'>
                            <div className={chat["from"] === localStorage.getItem("talkId") ? 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end' : 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'}>
                                <div>
                                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#4F6B75] text-white'>
                                <div className="block">{chat["chat_content"]}</div>
                                {console.log("div message: "+ chat["chat_content"])}
                                </span>
                                </div>
                            </div>
                            <img className='w-6 h-6 rounded-full order-1' src={userprofileIcon} />
                            </div>
                            {/* <div /> */}
                        </div> 
                    )
                })}
                
                {/* third message */}
                </div>

            {/* messages end here */}
            <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2'>
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
            )}
        </>
        );
    }

    return (
        <>
        {displayChat()}
        </>
    );
}