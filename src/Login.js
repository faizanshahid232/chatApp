import React, {useState, useEffect} from "react";
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import { logIn } from "./api/apiServices";
import roundlogoIcon from './images/roundlogo.png';

function Login() {
    const [userName, setUserName] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        //e.preventDefault();
        localStorage.setItem("authenticated", false);
        
        try{
            console.log("UserName: "+userName);
            console.log("Password: "+Password);
            
            {/* POST DATA */}
            var postData = {
                email: userName, //"testuser1@gmail.com",
                password: Password//"qwertyuiop"
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
            await logIn(postData, headers).then((response) => {
                
                if(response.data.code === 200) {
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("accessToken", response.data.access_token);
                    localStorage.setItem("accessTime", Date.now());
                    localStorage.setItem("createdAt", response.data.created_at);
                    localStorage.setItem("channelId", response.data.channel_id);
                    localStorage.setItem("talkId", response.data.talk_id);
                    localStorage.setItem("walletAddress", response.data.wallet_address);
                    localStorage.setItem("user_type", response.data.user_type);
                    localStorage.setItem("profile_pic", response.data.profile_pic);
                    localStorage.setItem("user_type", response.data.user_type);
    
                    console.log("login Successfully");
                    navigate("/");
                } else {
                    localStorage.setItem("authenticated", false);
                }

            }).catch((error) => {
                console.log(error);
            });
        } catch(err) {
            console.log(err.message);
        }

    }

    useEffect(() => {
        if (
          localStorage.getItem("authenticated") === "true") {
            console.log("dashboard");
            navigate("/");
        }
      }, []);

    return (
        <>
        <div className="bg-white relative h-screen">
            <div className="flex-1">
                <div className="my-[3%]">
                    <div className="m-auto max-w-[600px]">
                        <div className="bg-[#f5f5f5] border rounded-[8px] p-[30px]">
                            <div className="relative cursor-pointer flex items-center text-[#4f6b75] text-[18px] font-medium justify-between">
                                <a className="items-center flex text-[#4f6b75] gap-1 z-1000" style={{ zIndex: '999' }} onClick={()=>navigate("/mainpage")}>Back</a>
                                <div className="flex text-[20px] font-medium gap-1 justify-center left-[50%] absolute w-[100%] translate-x-[-50%]">Login</div>
                                <div></div>
                            </div>
                            <div className="bg-white border rounded-[15px] mt-[20px] p-[20px]">
                                <div className="flex items-center justify-center mt-[10px]">
                                    <img src={roundlogoIcon} />
                                </div>
                                <div>
                                    
                                <div className="mt-[30px] p-[10px]">
                                    <label className="text-[15px]">Email address</label>
                                    <div>
                                        <input 
                                            className="inputBox"
                                            type="text"
                                            onChange={event => setUserName(event.target.value)}
                                            value={userName} 
                                            required  />
                                    </div>
                                </div>
                                <div className="p-[10px]">
                                    <label className="text-[15px]">Password</label>
                                        <div>
                                            <input 
                                            className="inputBox"
                                            type="password" 
                                            onChange={event => setPassword(event.target.value)}
                                            value={Password} 
                                            required />
                                        </div>
                                </div>
                                <div className="mt-[30px] p-[10px]">
                                    <button className="btnlogin" onClick={handleSubmit} type="submit">Log in</button>
                                </div>
                            </div>
                            <div className="grid place-content-center my[20px]">
                                <span className="mb-[10px] pt-[10px] font-medium text-center cursor-pointer text-[#253237] text-[18px]">Forgot password?</span>
                                <span className="text-[#253237] font-normal flex gap-2 text-center">Don't have an account? 
                                <p className="text-[#FFC727] font-bold text-[16px] cursor-pointer" onClick={()=>navigate("/register")}>Sign up</p></span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}
export default Login;