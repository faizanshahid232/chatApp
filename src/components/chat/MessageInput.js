import React from "react";
import smileyIcon from '../../images/smiley.png';
import addIcon from '../../images/mention.png';
import sendIcon from '../../images/Icon.png';

export default function MessageInput({sendMessage, setMessage, message, handleMediaChange}) {
    return (
        <div className='relative flex'>
            <span className='absolute inset-y-0 flex items-center'>
                <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                <img src={smileyIcon} className='w-[16px] h-[16px]' />
                </button>
            </span>
            <span className='absolute inset-y-0 flex right-0 items-center'>
                <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                <img src={sendIcon} onClick={() => sendMessage()} className='w-[16px] h-[16px]' />
                </button>
            </span>
            <span className='absolute inset-y-0 right-0 mr-10 flex items-center'>
                <label htmlFor="upload-button" className="custom-file-upload cursor-pointer">Upload photo</label>
                <input
                    type="file"
                    accept="image/*"
                    id="upload-button"
                    onChange={handleMediaChange}
                    style={{ display: 'none' }}
                />
                <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                <img src={addIcon} className='w-[16px] h-[16px]' />
                </button>
            </span>
            <input 
                placeholder='Start typing...' 
                className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' 
                onChange={event => setMessage(event.target.value)}
                value={message} 
            />
        </div>
    );
}