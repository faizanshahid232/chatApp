import React from "react";
import downArrowIcon from '../../images/down-arrow.png';
import "../../App.css";

export default function ReplyDropDownOption({isCurrentUser, toggleReply, isReplyOpen, setIsReplyOpen, chat, setReplyBox, handleReply }) {
    return(
        <div className={`hide_reply_button absolute top-0 right-0 px-[5px] m-[0px] float-${isCurrentUser ? 'right' : 'left'}`}>
            <img onClick={toggleReply} className='cursor-pointer w-[18px] mt-[-3px]' src={downArrowIcon} />
            {isReplyOpen && (
                <div className="absolute z-10 ml-[-50px] w-[80px] py-1 bg-white border rounded-lg shadow-lg">
                <a
                    className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleReply(setReplyBox(true), chat, setIsReplyOpen(false))}
                >
                    Reply
                </a>
            </div>
            )}
        </div>
    );
}