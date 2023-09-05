import React, {useState} from "react";
import { pusherMultimedia, pusherReplyMultimediaChat } from "../../api/apiServices";
import useStore from "../../Store";

export default function HandleChatMedia(props) {

    const CloseMediaPopup = useStore((state) => state.CloseMediaPopup);
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
                CloseMediaPopup({closeMediaPopup: false});
            })
        } else {
            pusherMultimedia(data, headers).then((json) => {
                console.log("Response: "+ JSON.stringify(json));
                CloseMediaPopup({closeMediaPopup: false});
            })
        }
    }

    const closePopup = () => {
        CloseMediaPopup({closeMediaPopup: false});
    }

    return(
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-[#F2F2F7] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    >
                    <span onClick={() => closePopup()} className="bg-transparent text-[#aaa] text-[0.75rem] block outline-none focus:outline-none">
                        Close
                    </span>
                    </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                <div className="w-full flex flex-col items-center justify-cente my-5">
                        <div>
                            <img src={props.RenderMedia} className="w-40" />
                        </div>
                        <div className="w-full flex flex-row justify-around mt-5">
                        <input type="text" value={message} onChange={event => setMessage(event.target.value)} />
                        <button onClick={() => sendMessage()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                            Send
                        </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}