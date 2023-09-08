import React, {useState} from "react";
import { pusherMultimedia, pusherReplyMultimediaChat } from "../../api/apiServices";
import useStore from "../../Store";
import sendIcon from '../../images/Icon.png';
import closeIcon from '../../images/close.png';

export default function HandleChatMedia(props) {

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
    var data = {
        'file': props.media,
        'channelId': ChatId.chatId,
        'chatContent': message ? message : "",
    };
    const sendMessage = () => {
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
                //CloseMediaPopup({closeMediaPopup: false});
            })
        } else {
            pusherMultimedia(data, headers).then((json) => {
                console.log("Response: "+ JSON.stringify(json));
                props.setCloseMediaPopup(false);
            })
        }
    }

    return(
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-[#F2F2F7] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                    <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    >
                    <span onClick={() => props.setCloseMediaPopup(false)} className="bg-transparent text-[#aaa] text-[0.75rem] block outline-none focus:outline-none">
                        <img src={closeIcon} className="w-4" />
                    </span>
                    </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                <div className="w-full flex flex-col items-center justify-cente mb-5">
                        <img src={props.RenderMedia} className="w-40 shadow-lg" />
                </div>
                <div className='relative flex mb-4'>
                    <span className='absolute inset-y-0 flex right-0 items-center'>
                        <button className='inline-flex items-center mx-5 justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                        <img src={sendIcon} onClick={() => sendMessage()} className='w-[16px] h-[16px]' />
                        </button>
                    </span>
                    <input 
                        placeholder='Start typing...' 
                        className='w-full focus:placeholder-gray-400 mx-5 text-gray-600 placeholder-gray-300 pl-5 bg-white rounded-lg py-3 border-gray-200' 
                        onChange={event => setMessage(event.target.value)}
                        value={message} 
                    />
                </div>
                </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}