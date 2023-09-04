import React from "react";
import Footer from './Footer';
import roundlogoIcon from './images/roundlogo.png';
import { useNavigate } from "react-router-dom";

function Register() {
    
    const navigate = useNavigate();
    
    return (
        <>
        <div className="bg-white relative h-screen">
            <div className="flex-1">
                <div className="my-[3%]">
                    <div className="m-auto max-w-[600px]">
                        <div className="bg-[#f5f5f5] border rounded-[8px] p-[30px]">
                            <div className="relative cursor-pointer flex items-center text-[#4f6b75] text-[18px] font-medium justify-between">
                                <span className="items-center flex text-[#4f6b75] gap-1 z-1000" style={{ zIndex: '999' }} onClick={()=>navigate("/login")}>Back</span>
                                <div className="flex text-[20px] font-medium gap-1 justify-center left-[50%] absolute w-[100%] translate-x-[-50%]">Sign Up</div>
                                <div></div>
                            </div>
                            <div className="bg-white border rounded-[15px] mt-[20px] p-[20px]">
                                <div className="flex items-center justify-center mt-[10px]">
                                    <img src={roundlogoIcon} />
                                </div>
                                <div>
                                    
                                <div className="mt-[30px] p-[10px]">
                                    <label className="text-[15px]">Name</label>
                                    <div>
                                        <input 
                                            className="inputBox"
                                            type="text"
                                            value="" 
                                            required  />
                                    </div>
                                </div>

                                <div className="p-[10px]">
                                    <label className="text-[15px]">Email address</label>
                                    <div>
                                        <input 
                                            className="inputBox"
                                            type="text"
                                            value="" 
                                            required  />
                                    </div>
                                </div>
                                <div className="p-[10px]">
                                    <label className="text-[15px]">Password</label>
                                        <div>
                                            <input 
                                            className="inputBox"
                                            type="password" 
                                            value="" 
                                            required />
                                        </div>
                                </div>
                                <div className="p-[10px]">
                                    <label className="text-[15px]">Confirm Password</label>
                                        <div>
                                            <input 
                                            className="inputBox"
                                            type="password" 
                                            value="" 
                                            required />
                                        </div>
                                </div>
                                <div className="p-[10px]">
                                    <label className="text-[15px]">Invitation Code</label>
                                    <div>
                                        <input 
                                            className="inputBox"
                                            type="text"
                                            value="" 
                                            required  />
                                    </div>
                                </div>
                                <div className="mt-[30px] p-[10px]">
                                    <button className="btnlogin" type="submit">Sign Up</button>
                                </div>
                            </div>
                            <div className="grid place-content-center my[20px]">
                                <span className="text-[#253237] mt-[20px] font-normal flex gap-2 text-center">Already a user? 
                                <p className="text-[#FFC727] font-bold text-[16px] cursor-pointer" onClick={()=>navigate("/login")}>Sign in</p></span>
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
export default Register;