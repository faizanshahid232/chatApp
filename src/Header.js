import React from "react";
import logo from './images/egold_talk.png';
import { useNavigate } from "react-router-dom";

export default function Header() {
    
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    return(
        <div className='bg-white h-[70px] rounded-lg'>
            <div className='flex justify-between'>
            <div><img className='w-[196px] mt-[20px] ml-[20px]' src={logo} /></div>
            <div><button className='bg-[#4F6B75] text-white rounded-lg w-[150px] mr-[20px] h-[35px] mt-[17.5px] font-bold text-[14px]' onClick={logOut}>{localStorage.getItem('user_type') ? 'Disconnect' : 'Logout'}</button></div>
            </div>
      </div>
    );
}