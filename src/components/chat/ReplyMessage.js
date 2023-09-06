import React, { useEffect,useState } from "react";
import { getReplyChat } from "../../api/apiServices";
import useStore from "../../Store";

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
          <div className="flex-1 bg-gray-100 rounded-lg p-[6px] mb-2">
            <span className="font-semibold">{data.sender === localStorage.getItem("talkId") ? 'You' : data.sender}</span><br/>
            <span>
            {data.file_url ? (
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">{data.content}</span>
                    <span><img className="w-[20px] rounded-lg" src={data.file_url} /></span>
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