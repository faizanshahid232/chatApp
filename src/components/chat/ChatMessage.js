import React, { useState, useEffect } from "react";
import userprofileIcon from '../../images/userprofile.png';
import { getParticipantsProfilePic, getReplyChat, getTalkId } from "../../api/apiServices";
import ReplyMessage from "./ReplyMessage";
import ConvertTimeStamp from "../../ConvertTimeStamp";
import useStore from "../../Store";
import downArrowIcon from '../../images/down-arrow.png';

export default function ChatMessage(props) {
    const [imgsrc, setImgsrc] = useState();
    const [senderId, setSenderId] = useState();
    const ChatId = useStore();
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const toggleReply = () => {
        setIsReplyOpen(!isReplyOpen);
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

    const dateDivider = formatDateDivider(props.chat.time_stamp);
    if(props.prevdate)
    {
        var prevdateDivider = formatDateDivider(props.prevdate);
    }

    const getProfilePic = async(talkId) => {
        var headers = {
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
            },
        };
        try{
            // write code
            ChatId.groupParticipantsList.map((participants, index) => {
                const userId = Object.keys(participants)[0];
                const value = participants[userId];

                if(talkId === userId) {
                    setSenderId(value);
                    getParticipantsProfilePic(value, headers).then((json) => {
                        console.log("img: "+ json.data.data);
                        setImgsrc(json.data.data)
                    })
                }
            })
        
        } catch (err) {
            
        }
    }
    
    useEffect( () => {
        if(props.chat.sender)
        getProfilePic(props.chat.sender)
    },[props.chat]);

    const isCurrentUser = senderId === localStorage.getItem("talkId");

    return(
        <>
        <div className='chat-message' key={props.index}>
            {dateDivider != prevdateDivider  && (
                <div className="text-center text-gray-500 text-xs my-2">
                    {dateDivider}
                </div>
            )}
            <div className={`flex item-end justify-${isCurrentUser ? 'end' : 'start'}`}>
            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-${isCurrentUser ? 'end' : 'start'}`}>
                <div>
                <span className='min-w-[100px] p-[6px] rounded-lg inline-block rounded-bl-none bg-gray-300'>
                <span className="font-semibold">{senderId === localStorage.getItem("talkId") ? '' : senderId}</span>
                {/* Reply Option */}
                <div className={`relative float-${senderId === localStorage.getItem("talkId") ? 'right' : 'left'}`}>
                <img onClick={toggleReply} className='cursor-pointer w-[20px]' src={downArrowIcon} />
                {isReplyOpen && (
                    <div className="absolute ml-[-50px] w-[80px] py-1 bg-white border rounded-lg shadow-lg">
                    <a
                        className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => props.handleReply(props.setReplyBox(true), props.chat, setIsReplyOpen(false))}
                    >
                        Reply
                    </a>
                </div>
                )}
                </div>
                {/* End Reply Option */}
                {/**check if msg have reply */}
                {props.chat.reply_to ? (
                     <ReplyMessage id={props.chat.reply_to} />
                ): ''}
                {/** end msg reply  */}

                {props.chat.file_url && (
                    <img src={props.chat.file_url} alt="Media" className="media w-16" />
                )}
                <div className="text-[13px] leading-[17px]">{props.chat.content}</div>
                <div className={`text-end text-[10px]`}><ConvertTimeStamp timestamp={props.chat.time_stamp} /></div>
                </span>
                </div>
            </div>
            <img className='w-6 h-6 rounded-full order-1' src={imgsrc ? imgsrc : userprofileIcon} />
            </div>
        </div>
        </>
    )
}