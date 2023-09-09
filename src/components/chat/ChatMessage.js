import React, { useState, useEffect } from "react";
import userprofileIcon from '../../images/userprofile.png';
import { getParticipantsProfilePic, getReplyChat, getTalkId } from "../../api/apiServices";
import ReplyMessage from "./ReplyMessage";
import ConvertTimeStamp from "../../ConvertTimeStamp";
import useStore from "../../Store";
import downArrowIcon from '../../images/down-arrow.png';
import "../../App.css";

export default function ChatMessage(props) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [senderId, setSenderId] = useState();
    const ChatId = useStore();
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [cachedImages, setCachedImages] = useState({});
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

    const dateDivider = formatDateDivider(props.chat.time_stamp);
    if(props.prevdate)
    {
        var prevdateDivider = formatDateDivider(props.prevdate);
    }

    const getProfilePic = async(talkId) => {
        var targetKey = talkId;
        const resultObj = ChatId.groupParticipantsList.find(obj => obj.hasOwnProperty(targetKey));
        setSenderId(resultObj[targetKey]);

    }
    
    useEffect( () => {
        getProfilePic(props.chat.sender);
    },[props.chat.sender]);

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
                <span className='min-w-[100px] hover_on_chat relative p-[3px] rounded-lg inline-block rounded-bl-none bg-gray-300'>
                <span className="font-semibold">{isCurrentUser ? '' : senderId}</span>
                {/* Reply Option */}
                <div className={`hide_reply_button absolute top-0 right-0 px-[5px] float-${isCurrentUser ? 'right' : 'left'}`}>
                <img onClick={toggleReply} className='cursor-pointer w-[18px] mt-[-3px]' src={downArrowIcon} />
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
                    <div
                    className={`cursor-pointer ${
                        isFullScreen
                        ? "fixed inset-0 w-full h-full object-contain z-[9999]"
                        : "object-cover"
                    }`}
                    onClick={toggleFullScreen}
                    >
                    <img
                        src={props.chat.file_url}
                        alt="Media"
                        className={`media h-[200px] w-auto ${
                        isFullScreen ? "w-full h-full" : ""
                        }`}
                    />
                    {isFullScreen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                        <img
                            src={props.chat.file_url}
                            alt="Media"
                            className="max-h-full max-w-full"
                        />
                        </div>
                    )}
                    </div>
                )}

                <div className="inline-block w-full p-[3px]">
                    <div className="text-sm inline-block align-top">{props.chat.content}</div>
                    <div className={`text-xs text-gray-500 inline-block pt-1 float-${isCurrentUser ? 'right' : 'left'} align-top`}><ConvertTimeStamp timestamp={props.chat.time_stamp} /></div>
                </div>
                </span>
                </div>
            </div>
            <img className='w-6 h-6 rounded-full order-1' src={`${process.env.REACT_APP_PROFILEURL + props.chat.sender}.png`} />
              </div>
        </div>
        </>
    )
}