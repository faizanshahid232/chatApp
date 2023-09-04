import React, { useState, useEffect } from "react";
import userprofileIcon from './images/userprofile.png';
import { getParticipantsProfilePic, getReplyChat } from "./api/apiServices";
import ReplyMessage from "./ReplyMessage";
import ConvertTimeStamp from "./ConvertTimeStamp";

export default function ChatMessage(props) {
    const [imgsrc, setImgsrc] = useState("...");
    
    const isCurrentUser = props.chat.sender === localStorage.getItem("talkId");

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
        getParticipantsProfilePic(talkId, headers).then((json) => {
            setImgsrc(json.data.data)
        })
    }
    
    useEffect( () => {
        if(props.chat.sender)
        getProfilePic(props.chat.sender)
    },[props.chat]);

    return(
        <>
        <div className='chat-message'>
            {dateDivider != prevdateDivider  && (
                <div className="text-center text-gray-500 text-xs my-2">
                    {dateDivider}
                </div>
            )}
            <div className={`flex item-end justify-${isCurrentUser ? 'end' : 'start'}`}>
            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-${isCurrentUser ? 'end' : 'start'}`}>
                <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#4F6B75] text-white'>
                
                {/**check if msg have reply */}
                
                {props.chat.reply_to ? (
                     <ReplyMessage id={props.chat.reply_to} />
                ): ''}

                {/** end msg reply  */}

                {props.chat.file_url && (
                    <img src={props.chat.file_url} alt="Media" className="media" />
                )}
                <div className="block">{props.chat.content}</div>
                <div className={`block text-[10px] ${isCurrentUser ? 'float-right' : 'block text-[10px]'}`}><ConvertTimeStamp timestamp={props.chat.time_stamp} /></div>
                </span>
                </div>
            </div>
            {imgsrc=="..."? "" :
            <img className='w-6 h-6 rounded-full order-1' src={imgsrc} />}
            </div>
        </div>
        </>
    )
}