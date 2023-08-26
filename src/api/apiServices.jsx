import ApiHelper from "./apiHelper";

export const logIn = (data, headers) => {
    return ApiHelper.postwithheaders(
        `${process.env.REACT_APP_APIEND}/web2/login`,
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