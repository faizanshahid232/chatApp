import React, { useState, useRef  } from "react";
import smileyIcon from '../../images/smiley.png';
import addIcon from '../../images/mention.png';
import sendIcon from '../../images/Icon.png';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import plusIcon from '../../images/plus.png';

export default function MessageInput({sendMessage, setMessage, message, handleMediaChange}) {
    
    
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleEmojiSelect = (emoji) => {
        setCurrentEmoji(emoji.native);
        setMessage((prevMessage) => prevMessage + emoji.native); // Append the selected emoji to the message
        setPickerVisible(false);
    };

    const openFileInput = () => {
        fileInputRef.current.click();
        //setIsOpen(false);
    };

    return (
        <div className="flex">
            <div className="flex">
            <span className=''>
                    <button 
                        onClick={() => setPickerVisible(!isPickerVisible)}
                        className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                        <img src={smileyIcon} className='w-[16px] h-[16px]' />
                    </button>
                    {isPickerVisible && (
                    <div className="mt-2 d-block absolute bottom-[70px]">
                        <Picker
                            data={data}
                            previewPosition="none"
                            onEmojiSelect={handleEmojiSelect}
                            emojiSize={24}
                        />
                    </div>
                    )}
                </span>
                <span className=''>
                    <label className="custom-file-upload cursor-pointer inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300">
                        <img src={plusIcon} onClick={() => setIsOpen(!isOpen)} className="w-[16px]" />
                    </label>
                    {isOpen && (
                    <div className="absolute mt-[-110px] ml-[-50px] w-[150px] py-2 bg-white border rounded-lg shadow-lg">
                    <a
                        htmlFor="upload-button" 
                        onClick={openFileInput}
                        className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Upload Photo
                    </a>
                    <input
                        type="file"
                        accept="image/*"
                        id="upload-button"
                        onChange={handleMediaChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                )}
                    
                </span>
            </div>
            <div className="w-full">
            <form onSubmit={sendMessage}>
            <div className='relative flex'>
                <span className='absolute inset-y-0 flex right-0 items-center'>
                    <button type="submit" className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                    <img src={sendIcon} className='w-[16px] h-[16px]' />
                    </button>
                </span>
                <input 
                    placeholder='Start typing...' 
                    className='w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-2 pr-[60px] bg-white rounded-lg py-3 border-gray-200' 
                    onChange={event => setMessage(event.target.value)}
                    value={message} 
                />
            </div>
            </form>
            </div>
        </div>
    );
}