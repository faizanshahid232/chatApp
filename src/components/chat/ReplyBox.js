import React from "react";
import closeIcon from '../../images/close.png';

export default function ReplyBox({replyBox, setReplyBox, replyuser, replyMessage, replyImage}) {
    return (
        <>
            {replyBox && (
                <div className='relative flex mb-2'>
                    <span className='absolute inset-y-0 flex right-0 items-center'>
                        <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                        <img src={closeIcon} onClick={() => setReplyBox(false)} className='w-[16px] h-[16px]' />
                        </button>
                    </span>
                    <div className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200'>
                        <span>{replyuser === localStorage.getItem("talkId") ? 'You' : replyuser}</span><br/>
                        <span>
                            {replyImage ? (
                                <div className="flex items-center">
                                    <span><img className="w-[50px]" src={replyImage} /></span>
                                    <span className="ml-2">{replyMessage}</span>
                                </div>
                            ) : replyMessage}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}