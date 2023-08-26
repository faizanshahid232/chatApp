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

export default function Chat(props) {
    const addChatId = useStore((state) => state.addChatId);
    const ChatId = useStore(state => state);
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState();
    const [message, setMessage] = useState("");
    const [oldChat, setOldChat] = useState([]);
    const [messageCount, setmessageCount] = useState('');
    const [count, setCount] = useState(2);
    const bottomRef = useRef(null);

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
        if(ChatId.chatId) {
            setChats("");
            getChat(ChatId.chatId, 1, headers).then((json) => {
                setmessageCount(json.data.total);
                setOldChat(json.data.data);
            })
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
        if (msg) setChats([...chats, msg]);
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [msg]);

    const backPage = () => {
        addChatId({chatId: ''});
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

    const displayChat = (props) => {
        const {data} = props;
        console.log(data);
        return (
            <>
            <div className='h-[68px] border-b-[1px] py-[10px] rounded-lg border-[#E5E5EA] flex justify-between items-center'>
                <div className='ml-[10px] md:hidden lg:hidden xl:hidden' onClick={() => backPage()}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg></div>
                <div className='ml-[10px] hidden md:block lg:block xl:block'><img className='w-[80px]' src={avatarGroupIcon} /></div>
                <div>
                <div className='flex items-center justify-center'>
                    <img className='w-[32px]' src={egoldLogoIcon} />
                    <img className='ml-[5px] w-[46px]' src={egoldtextIcon} />
                </div>
                <div><p className='text-[#666668] text-[12px] font-normal'>Admin: {ChatId.owner} - {ChatId.participants?.length} Members</p></div>
                </div>
                <div className='mr-[20px]'><img className='w-[20px]' src={optionicon} /></div>
                </div>

                {/* messages start here */}

                <div id='messages' className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
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
                            <div ref={bottomRef} />
                            </div>
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
        );
    }

    return (
        <>
        {displayChat(props)}
        </>
    );
}