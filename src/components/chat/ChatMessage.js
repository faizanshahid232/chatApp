import React, { useState, useEffect } from "react";
import userprofileIcon from '../../images/userprofile.png';
import { getParticipantsProfilePic, getReplyChat, getTalkId } from "../../api/apiServices";
import ReplyMessage from "./ReplyMessage";
import ConvertTimeStamp from "../../ConvertTimeStamp";
import useStore from "../../Store";
import "../../App.css";
import ReplyDropDownOption from "./ReplyDropDownOption";
import ChatMessageImage from "./ChatMessageImage";

export default function ChatMessage(props) {

    //
    var checkPusherOrDB = props.pusherMessage;
    const [replyTo, setReplyTo] = useState(checkPusherOrDB === 'pusher' ? props.chat.replyto : props.chat.reply_to);
    const [fileUrl, setFileUrl] = useState(checkPusherOrDB === 'pusher' ? `${process.env.REACT_APP_CHATIMGURL}/${props.group_id}/${props.chat.file_url}` : props.chat.file_url);
    const [chatContent, setChatContent] = useState(checkPusherOrDB === 'pusher' ? props.chat.chat_content : props.chat.content);
    const [chatTime, setChatTime] = useState(checkPusherOrDB === 'pusher' ? props.chat.chat_time : props.chat.time_stamp);
    const [sender, setSender] = useState(checkPusherOrDB === 'pusher' ? props.chat.from : props.chat.sender);
    
    //
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [senderId, setSenderId] = useState();
    const ChatId = useStore();
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [isBroken, setIsBroken] = useState(false);

    const toggleReply = () => {
        setIsReplyOpen(!isReplyOpen);
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const formatDateDivider = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const dateDivider = formatDateDivider(chatTime);
    if(props.prevdate)
    {
        var prevdateDivider = formatDateDivider(props.prevdate);
    }

    const getProfilePic = async(talkId) => {
        var targetKey = talkId;
        const resultObj = ChatId.groupParticipantsList.find(obj => obj.hasOwnProperty(targetKey));
        setSenderId(resultObj[targetKey]);
    }
    
    const handleImageError = () => {
        setIsBroken(true);
    };

    useEffect( () => {
        console.log("send: "+ sender);
        getProfilePic(sender);
        props.bottomRef.current.scrollTop = props.bottomRef.current.scrollHeight;
    },[sender]);

    const isCurrentUser = senderId === localStorage.getItem("talkId");
    
    /*const profilePic = localStorage.getItem('profile_pic');
    if(isCurrentUser && profilePic !== null && profilePic !== 'null') {
        profilePic = userpr;
    }*/

    return(
        <>
        <div className='chat-message' key={props.index}>
                {checkPusherOrDB !== 'pusher' && dateDivider !== prevdateDivider  && (
                <div className="text-center text-gray-500 text-xs my-2">
                    {dateDivider}
                </div>
            )}
            <div className={`flex item-end justify-${isCurrentUser ? 'end' : 'start'}`}>
            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-${isCurrentUser ? 'end' : 'start'}`}>
                <div>
                <span className='min-w-[100px] hover_on_chat relative p-[3px] rounded-lg inline-block rounded-bl-none bg-gray-300'>
                <span className="font-semibold">{isCurrentUser ? '' : senderId}</span>
                
                {/* Reply Option */}
                <ReplyDropDownOption handleReply={props.handleReply} setReplyBox={props.setReplyBox} chat={props.chat} setIsReplyOpen={setIsReplyOpen} isReplyOpen={isReplyOpen} isCurrentUser={isCurrentUser} toggleReply={toggleReply} />
                {/* End Reply Option */}
                
                {/**check if msg have reply */}
                {replyTo ? (
                     <ReplyMessage id={replyTo} />
                ): ''}
                {/** end msg reply  */}

                {/* Image */}
                <ChatMessageImage 
                    file_url={props.chat.file_url} 
                    toggleFullScreen={toggleFullScreen}
                    fileUrl={fileUrl}
                    isFullScreen={isFullScreen}
                    bottomRef={props.bottomRef}
                    />
                {/* Image */}

                <div className="inline-block w-full p-[3px]">
                    <div className="text-sm inline-block align-top">{chatContent}</div>
                    <div className={`text-xs text-gray-500 inline-block pt-1 float-${isCurrentUser ? 'right ml-1' : 'right mr-1'} align-top`}><ConvertTimeStamp timestamp={chatTime} /></div>
                </div>
                </span>
                </div>
            </div>
            {isBroken ? (
                <img 
                className='w-6 h-6 rounded-full order-1' 
                src={userprofileIcon} />
            ) : (
                <img 
                className='w-6 h-6 rounded-full order-1' 
                onError={handleImageError}
                src={`${process.env.REACT_APP_PROFILEURL + sender}.png`} />
            )}
            </div>
        </div>
        </>
    )
}