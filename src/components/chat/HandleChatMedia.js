import React, {useState} from "react";
import { pusherMultimedia, pusherReplyMultimediaChat } from "../../api/apiServices";
import useStore from "../../Store";
import sendIcon from '../../images/Icon.png';
import smileyIcon from '../../images/smiley.png';
import closeIcon from '../../images/close.png';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export default function HandleChatMedia(props) {

    const [isPickerVisible, setPickerVisible] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //const CloseMediaPopup = useStore((state) => state.CloseMediaPopup);
    const ChatId = useStore(state => state);
    const [message, setMessage] = useState('');
    var headers = {
        headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };
    var data3 = {
        'file': props.media,
        'channelId': ChatId.chatId,
        'chatContent': message ? message : "",
    };
    
    const handleEmojiSelect = (emoji) => {
        setCurrentEmoji(emoji.native);
        setMessage((prevMessage) => prevMessage + emoji.native); // Append the selected emoji to the message
        setPickerVisible(false);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("chat id pp: "+props.msgChatId);
        if(props.msgChatId) {
            var data2 = {
                'file': props.media,
                'channelId': ChatId.chatId,
                'chatId': props.msgChatId,
                'chatContent': message ? message : "",
            };
            pusherReplyMultimediaChat(data2, headers).then((json) => {
                console.log("Reply Multimedia: "+ JSON.stringify(json));
                props.setCloseMediaPopup(false);
                setIsLoading(false);
                //CloseMediaPopup({closeMediaPopup: false});
            })
        } else {
            pusherMultimedia(data3, headers).then((json) => {
                console.log("Response: "+ JSON.stringify(json));
                props.setCloseMediaPopup(false);
                setIsLoading(false);
            })
        }
    }

    return(
        <>
        <div className='bg-white flex flex-col space-y-4 p-3 h-[fill-available]'>
            <div className="">
                {/*content*/}
                <div className="">
                {/*header*/}
                <div className="">
                    <button
                    className=""
                    >
                    <span onClick={() => props.setCloseMediaPopup(false)} className="">
                        <img src={closeIcon} className="w-4" />
                    </span>
                    </button>
                </div>
                {/*body*/}
                <div className="flex flex-col items-center mt-[100px]">
                <div className="mb-[100px]">
                    {isLoading ? (
                    <div>Loading...</div>
                    ) : (
                        <img src={props.RenderMedia} className="h-[180px] shadow-lg" />
                    )}
                </div>
                    <div className='relative flex mb-4 w-full'>
                    <span className='inset-y-0 flex items-center'>
                        <button 
                            onClick={() => setPickerVisible(!isPickerVisible)}
                            className='inline-flex ml-4 items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                            <img src={smileyIcon} className='w-[16px] h-[16px]' />
                        </button>
                        {isPickerVisible && (
                        <div className="mt-2 d-block">
                            <Picker
                                data={data}
                                previewPosition="none"
                                onEmojiSelect={handleEmojiSelect}
                                emojiSize={24}
                            />
                        </div>
                        )}
                    </span>
                    <form onSubmit={sendMessage} className="w-[80%]">
                        <div>
                        <span className='absolute inset-y-0 flex right-0 items-center'>
                            <button type="submit" className='inline-flex items-center mx-5 justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                            <img src={sendIcon} className='w-[16px] h-[16px]' />
                            </button>
                        </span>
                        <input 
                            placeholder='Start typing...' 
                            className='w-full pl-6 bg-gray-100 focus:placeholder-gray-400 mx-5 text-gray-600 placeholder-gray-300 rounded-lg py-3 border-gray-200 m-0' 
                            onChange={event => setMessage(event.target.value)}
                            value={message} 
                        />
                        </div>
                    </form>
                    </div>
                
                </div>
                </div>
            </div>
        </div>
        </>
    );
}