import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import userprofileIcon from './images/userprofile.png';
import useStore from "./Store";
import { 
    pusherMsg, 
    getChat, 
    pusherMessageReplyChat, 
    getTalkId
} from "./api/apiServices";
import Loadingspinner from "./Loadingspinner";
import GroupSetting from "./components/sidebar/GroupSetting";
import ChatMessage from "./components/chat/ChatMessage";
import JoinPublicGroup from "./components/sidebar/JoinPublicGroup";
import HandleChatMedia from "./components/chat/HandleChatMedia";
import ChatImage from "./components/chat/ChatImage";
import ReplyMessage from "./components/chat/ReplyMessage";
import ConvertTimeStamp from "./ConvertTimeStamp";
import LeaveGroupModal from "./components/chat/LeaveGroupModal";
import ChatHeader from "./components/chat/ChatHeader";
import MessageInput from "./components/chat/MessageInput";
import ReplyBox from "./components/chat/ReplyBox";
import downArrowIcon from './images/down-arrow.png';

export default function Chat() {
    const ChatId = useStore();
    const addChatId = useStore((state) => state.addChatId);
    //const ChatId = useStore(state => state);
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState('');
    const [message, setMessage] = useState("");
    const [oldChat, setOldChat] = useState([]);
    const [messageCount, setmessageCount] = useState('');
    const [count, setCount] = useState(2);
    const bottomRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [fetchedTalkId, setFetchedTalkId] = useState(null);
    const [pusherTalkId, setPusherTalkId] = useState(null);

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

    const toggleReply = () => {
        setIsReplyOpen(!isReplyOpen);
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
                console.log("chain id: "+ JSON.stringify(ChatId));
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
                //console.log("old and new: "+[...oldChat, ...json.data.data])
                //setOldTalkId([...oldChat, ...json.data.data]);
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
            setPusherTalkId(msg.from);
            setChats([...chats, msg]);
        //bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        //window.scrollTo(0, bottomRef.current.offsetTop); 
    }
    }, [msg]);

    const backPage = () => {
        addChatId({chatId: ''});
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

    useEffect(() => {
        ChatId.groupParticipantsList.map((participants, index) => {
            const userId = Object.keys(participants)[0];
            const value = participants[userId];

            if(pusherTalkId === userId) {
                setFetchedTalkId(value);
            }
        })
    },[pusherTalkId]);
    
    const displayChat = () => {
        return (
            <>
        {/* Leave Group */}
            {media && ChatId.closeMediaPopup ? (
                <HandleChatMedia media={media} RenderMedia={RenderMedia} msgChatId={msgChatId} />
            ) : ''}
        
            <LeaveGroupModal showModal={showModal} setShowModal={setShowModal}/>

            {!ChatId.openProfile ?
            ChatId.is_participant || ChatId.group_is_private ? 
             isLoading ? (
            <div className="mt-[200px]"><Loadingspinner  /> </div>// Replace with your loading indicator
            ) : (
            <>
            {/* End Leave Group */}
            
            {/* Chat Header */}
            <ChatHeader ChatId={ChatId} backPage={backPage} isOpen={isOpen} toggleMenu={toggleMenu} setShowModal={setShowModal} />
            {/* End Chat Header */}
            
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
                        <React.Fragment key={index}>
                        <div>
                            <ChatMessage key={index} handleReply={handleReply} setReplyBox={setReplyBox} chat={chat} index={index} prevdate={index < oldChat.length -1 ? oldChat.slice(0).reverse()[index + 1].time_stamp : ''}/>
                            <button className={chat.sender === localStorage.getItem("talkId") ? 'float-right mr-3' : 'float-left ml-3'} onClick={() => handleReply(setReplyBox(true), chat)}>Reply</button>
                        </div>
                        </React.Fragment>
                        )
                }): ''} 
                {/* old Chat End */}
                {chats.map((chat, index) => {
                    return( 
                        <div key={index} className='chat-message'>
                            <div className={fetchedTalkId === localStorage.getItem("talkId") ? 'flex item-end justify-end' : 'flex item-end justify-start'}>
                            <div className={fetchedTalkId === localStorage.getItem("talkId") ? 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end' : 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'}>
                                <div>
                                    <span className='p-[6px] rounded-lg inline-block rounded-bl-none bg-gray-300'>
                                    <span>{fetchedTalkId === localStorage.getItem("talkId") ? '' : chat.from}</span>
                
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
                                    <div className="text-[13px] leading-[17px]">{chat.chat_content}</div>
                                    <div className="text-end text-[10px]"><ConvertTimeStamp timestamp={chat.chat_time} /></div>
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
            
            {/** reply Box */}
             <ReplyBox replyBox={replyBox} setReplyBox={setReplyBox} replyuser={replyuser} replyMessage={replyMessage} replyImage={replyImage} />
            {/** end reply Box */}

            {/* Message Input Start */}
            <MessageInput sendMessage={sendMessage} setMessage={setMessage} message={message} handleMediaChange={handleMediaChange} />
            {/* Message Input End */}
            
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