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