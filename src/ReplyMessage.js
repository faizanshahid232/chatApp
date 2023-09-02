import React, { useEffect,useState } from "react";
import { getReplyChat } from "./api/apiServices";
import useStore from "./Store";

export default function ReplyMessage(props) {

    const ChatId = useStore(state => state);
    const [data, setData] = useState(null);

    var headers = {
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };
    

    useEffect(() => {

        async function fetchData() {
            getReplyChat(ChatId.chatId, props.id, headers).then((jsonData) => {
            setData(jsonData.data.data);
            });
          }
      
          fetchData();

    }, []);
    

    return (
        <div>
        {data !== null ? (
          <div className="bg-slate-400">
            <span>{data.sender === localStorage.getItem("talkId") ? 'You' : data.sender}</span><br/>
            <span>
            {data.file_url ? (
                <div className="flex items-center">
                    <span><img className="w-[50px]" src={data.file_url} /></span>
                    <span className="ml-2">{data.content}</span>
                </div>
            ) : data.content}
            </span>

        </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
}