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
import ReplyDropDownOption from "./components/chat/ReplyDropDownOption";
import "./App.css";

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
    //const CloseMediaPopup = useStore((state) => state.CloseMediaPopup);
    const [closeMediaPopup, setCloseMediaPopup] = useState(false);

    const [RenderCount, setRenderCount] = useState(0);
    const [mediaList, setMediaList] = useState([]);
    const [replyBox, setReplyBox] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [replyuser, setReplyuser] = useState('');
    const [replyImage, setReplyImage] = useState('');
    const [msgChatId, setMsgChatId] = useState('');
    
    const [fetchedTalkId, setFetchedTalkId] = useState(null);
    const [pusherTalkId, setPusherTalkId] = useState(null);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    // test

    const toggleReply = () => {
        setIsReplyOpen(!isReplyOpen);
    };
      
    const handleReply = (replyBox, message) => {
        setReplyImage("");
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


    useEffect(() => {
        // When oldChat updates, scroll to the bottom
        if(!closeMediaPopup) {
            if (oldChat.length > 0) {
                bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
            }
        }
    }, [oldChat]);

    useEffect(() => {
        // When oldChat updates, scroll to the bottom
        if(!closeMediaPopup) {
            if (message.length > 0) {
                console.log("scroll");
                bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
            }
        }
    }, [message]);

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
        //bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        if(!closeMediaPopup) {
            console.log("after msg");
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        }
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
                setCloseMediaPopup(true);
                //CloseMediaPopup({closeMediaPopup: true});
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

        if(pusherTalkId) {
            var targetKey = pusherTalkId;
              const resultObj = ChatId.groupParticipantsList.find(obj => obj.hasOwnProperty(targetKey));
              setFetchedTalkId(resultObj[targetKey]);
        }
    },[pusherTalkId]);
    
    const displayChat = () => {
        return (
            <>
            
            {/* Leave Group */}
            <LeaveGroupModal showModal={showModal} setShowModal={setShowModal}/>
            {/* End Leave Group */}

            {/* Chat Header */}
            <ChatHeader ChatId={ChatId} backPage={backPage} isOpen={isOpen} toggleMenu={toggleMenu} setShowModal={setShowModal} />
            {/* End Chat Header */}
            
            {/* messages start here */}
                
                {/* Chat Media Upload */}
                {media && closeMediaPopup ? (
                <HandleChatMedia media={media} setCloseMediaPopup={setCloseMediaPopup} RenderMedia={RenderMedia} msgChatId={msgChatId} />
            ) : 
            
            <>
            {!ChatId.openProfile ?
            ChatId.is_participant || ChatId.group_is_private ? 
             isLoading ? (
            <div className="mb-[400px]"><Loadingspinner  /> </div>// Replace with your loading indicator
            ) : (
            <>
                <div id='messages' ref={bottomRef}  className='bg-white flex flex-col space-y-4 p-3 overflow-y-auto h-[500px] md:h-auto lg:h-auto xl:h-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                
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
                            <ChatMessage 
                                key={index} 
                                pusherMessage={"database"}
                                handleReply={handleReply} 
                                setReplyBox={setReplyBox} 
                                chat={chat} 
                                bottomRef={bottomRef}
                                index={index} 
                                prevdate={index < oldChat.length -1 ? oldChat.slice(0).reverse()[index + 1].time_stamp : ''}/>
                        </div>
                        </React.Fragment>
                        )
                }): ''} 
                {/* old Chat End */}
                {chats.map((chat, index) => {
                    return( 
                        <ChatMessage 
                            key={index} 
                            pusherMessage={"pusher"}
                            bottomRef={bottomRef}
                            group_id={ChatId.chatId}
                            handleReply={handleReply} 
                            toggleReply={toggleReply}
                            setReplyBox={setReplyBox}
                            chat={chat} />
                    )
                })}
                
                {/* third message */}
                </div>

            {/* messages end here */}
            <div className='border-t-2 border-gray-200 px-4 py-4 bg-white'>
            
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
            }
        
        </>
        );
    }

    return (
        <>
        {displayChat()}
        </>
    );
}