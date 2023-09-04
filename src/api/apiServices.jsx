import ApiHelper from "./apiHelper";

export const logIn = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/web2/login`,
        data,
        headers 
    );
};

export const web3LogIn = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/web3/login`,
        data,
        headers 
    );
};

export const getPrivateGroupList = (headers) => {
    return ApiHelper.getwithheaders(
      `${process.env.REACT_APP_APIEND}/getgroups`,
      headers
    );
  };

export const getGeneralGroupList = (headers) => {
    return ApiHelper.getwithheaders(
        `${process.env.REACT_APP_APIEND}/getpublicgroups`,
        headers
    );
};

export const getCountryGroupList = (headers) => {
    return ApiHelper.getwithheaders(
        `${process.env.REACT_APP_APIEND}/getuniversalgroups`,
        headers
    );
};

export const pusherMsg = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/pusher/chat`,
        data,
        headers 
    );
};

export const getChat = (chatId, pageNo, headers) => {
    return ApiHelper.getwithheadersanddata(
      `${process.env.REACT_APP_APIEND}/chats?channelId=` +
      chatId +
      "&page=" +
      pageNo,
      headers
    );
};

export const createGroup = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/group`,
        data,
        headers 
    );
};

export const leftGroup = (data, headers) => {
    return ApiHelper.delete(
        `${process.env.REACT_APP_APIEND}/leftgroup`,
        data,
        headers
         
    );
};

export const addProfilePic = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/addprofilepic`,
        data,
        headers 
    );
};

export const getProfilePic = (headers) => {
    return ApiHelper.getwithheaders(
        `${process.env.REACT_APP_APIEND}/profile`,
        headers
    );
};

export const getOwnGroup = (headers) => {
    return ApiHelper.getwithheaders(
        `${process.env.REACT_APP_APIEND}/getown`,
        headers
    );
};

export const addParticipantsMember = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/addparticiapant`,
        data,
        headers 
    );
};

export const addGroupIcon = (groupId, data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/addgroupicon/${groupId}`,
        data,
        headers
    );
};

export const removeParticipant = (data, headers) => {
    return ApiHelper.delete(
        `${process.env.REACT_APP_APIEND}/removeparticiapant`,
        data,
        headers
         
    );
};

export const generateInviteLink = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/generateInvitelink`,
        data,
        headers 
    );
};

export const joinPublicGroup = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/joinpublicgroup`,
        data,
        headers 
    );
};

export const getParticipantsProfilePic = (talkId, headers) => {
    return ApiHelper.getwithheaders(
        `${process.env.REACT_APP_APIEND}/getprofilepic/${talkId}`,
        headers
    );
};

export const pusherMultimedia = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/pusher/multimediachat`,
        data,
        headers 
    );
};

export const pusherMessageReplyChat = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/pusher/replychat`,
        data,
        headers 
    );
};

export const getReplyChat = (channelId, chatId, headers) => {
    return ApiHelper.getwithheaders(
        `${process.env.REACT_APP_APIEND}/getchat?channelId=${channelId}&chatId=${chatId}`,
        headers
    );
};

export const pusherReplyMultimediaChat = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/pusher/replymultimediachat`,
        data,
        headers 
    );
};