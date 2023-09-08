import React, { useState } from "react";
import downArrowIcon from '../../images/down-arrow.png';


function ChatOption(props) {
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    const toggleReply = () => {
        setIsReplyOpen(!isReplyOpen);
    };

    return (
        <div className={`relative float-${props.isCurrentUser ? 'right' : 'left'}`}>
            <img onClick={toggleReply} className='cursor-pointer w-[18px] mt-[-5px]' src={downArrowIcon} />
            {isReplyOpen && (
                <div className="absolute ml-[-50px] w-[80px] py-1 bg-white border rounded-lg shadow-lg">
                    <a
                        className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => props.handleReply(props.chat)}
                    >
                        Reply
                    </a>
                </div>
            )}
        </div>
    );
}

export default ChatOption;
