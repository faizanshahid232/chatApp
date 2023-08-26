import React, {useState} from "react";
import Footer from './Footer';
import egoldbrikIcon from './egoldbrik.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logIn } from "./api/apiServices";

function Login() {

    const [userName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [loginResponse, setLoginResponse] = useState('');
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const [accessToken, setaccessToken] = useState(localStorage.getItem(localStorage.getItem("accessToken")|| false));
    const [createdAt, setcreatedAt] = useState(localStorage.getItem(localStorage.getItem("createdAt")|| false));
    const [channelId, setchannelId] = useState(localStorage.getItem(localStorage.getItem("channelId")|| false));
    const [talkId, settalkId] = useState(localStorage.getItem(localStorage.getItem("talkId")|| false));
    const [walletAddress, setwalletAddress] = useState(localStorage.getItem(localStorage.getItem("walletAddress")|| false));

  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("UserName: "+userName);
        console.log("Password: "+Password);
        
        {/* POST DATA */}
        var postData = {
            email: "testuser1@gmail.com",
            password: "qwertyuiop"
        };
        {/* Header */}
        var headers = {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        };
        {/* Header end */}
        {/* POST DATA */}
        try {
            const response = await logIn(postData, headers);
            setLoginResponse(response.data);
        } catch(error) {
            console.log(error);
        }

        if(loginResponse.code === 200) {
            setauthenticated(true);
            setaccessToken(loginResponse.access_token);
            setcreatedAt(loginResponse.created_at);
            setchannelId(loginResponse.channel_id);
            settalkId(loginResponse.talk_id);
            setwalletAddress(loginResponse.wallet_address);
            localStorage.setItem("authenticated", true);
            localStorage.setItem("accessToken", loginResponse.access_token);
            localStorage.setItem("createdAt", loginResponse.created_at);
            localStorage.setItem("channelId", loginResponse.channel_id);
            localStorage.setItem("talkId", loginResponse.talk_id);
            localStorage.setItem("walletAddress", loginResponse.wallet_address);

            console.log("login Successfully");
            navigate("/");
        } else {
            {/* login fail */}
        }

        console.log(loginResponse.access_token);

    }

    return (
        <div>
            <div className='relative flex items-stretch min-h-screen flex-col bg-[#fff2cc] md:pb-[100px] lg:pb-[100px] xl:pb-[100px]'>
            {/* Login */}
            <div className="w-full flex flex-col items-center justify-cente mt-10">
                <form className="bg-white w-[80%] md:w-[25%] lg:w-[25%] xl:w-[25%] rounded-br rounded-bl pb-16 mb-4">
                    <div className="bg-[#ffc727] flex items-center flex-col pt-4 rounded-tr rounded-tl px-8">
                        <img className='h-[50px] mt-[20px]' src={egoldbrikIcon} />
                        <h4 className="text-center mt-2 font-bold">Log in</h4>
                        <h6 className="text-center text-sm pb-6">with your email address</h6>
                    </div>
                    <div className="mb-4 px-8 mt-10">
                        <div className="relative">
                            <input 
                                type="text" 
                                id="outlined_success" 
                                aria-describedby="outlined_success_help" 
                                className="block px-2.5 pb-1.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-[4px] border border-gray-400 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                                placeholder=" "
                                onChange={event => setUserName(event.target.value)}
                                value={userName} 
                                required />
                            <label htmlFor="outlined_success" className="absolute text-sm text-gray-600 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email Address</label>
                        </div>
                    </div>
                    <div className="mb-6 px-8 pt-4">
                    <div className="relative">
                        <input 
                            type="password" 
                            id="outlined_success2" 
                            aria-describedby="outlined_success_help" 
                            className="block px-2.5 pb-1.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-[4px] border border-gray-400 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                            placeholder=" "
                            onChange={event => setPassword(event.target.value)}
                            value={Password} 
                            required />
                        <label htmlFor="outlined_success2" className="absolute text-sm text-gray-600 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                    </div>
                    </div>
                    <div className="flex items-center justify-between px-8 pt-4">
                    <button onClick={(e)=>handleSubmit(e)} className="bg-[#4F6B75] text-white w-full font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Log in
                    </button>
                    </div>
                </form>
                </div>
            {/* Login End */}
            </div>
            {/* Footer */}
            <Footer />
            {/* Footer end */}
        </div>
    );
}
export default Login;