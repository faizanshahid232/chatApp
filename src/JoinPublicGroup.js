import React from "react";
import useStore from "./Store";
import { joinPublicGroup } from "./api/apiServices";

export default function JoinPublicGroup() {
    
    const ChatId = useStore(state => state);
    const IsParticipant = useStore((state) => state.IsParticipant);
    
    const JoinGroup = () => {

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
            IsParticipant({is_participant: true});
        })
    }
    
    return(
        <button onClick={JoinGroup}>Join Group</button>
    );
}