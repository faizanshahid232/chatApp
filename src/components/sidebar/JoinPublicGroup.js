import React from "react";
import useStore from "../../Store";
import { joinPublicGroup } from "../../api/apiServices";

export default function JoinPublicGroup() {
    
    const ChatId = useStore(state => state);
    const IsParticipant = useStore((state) => state.IsParticipant);
    const ISJoinGroup = useStore((state) => state.ISJoinGroup);
    const addChatId = useStore((state) => state.addChatId);
    
    const JoinGroup = () => {
console.log("join 1111111")
        var headers = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
            },
        };

        var postData = {
            groupID: ChatId.chatId,
        };

        joinPublicGroup(postData, headers).then((json) => {
            console.log(JSON.stringify(json));
            console.log("llll: "+ JSON.stringify(ChatId));
            useStore.getState().IsParticipant(true);
            useStore.getState().ISJoinGroup(true);
        })
    }
    
    return(
        <>
        <div className="pt-[24px] flex justify-center">
            <button className="btn-color-primary w-[200px]" onClick={JoinGroup}>Join Group</button>
        </div>
        </>
    );
}