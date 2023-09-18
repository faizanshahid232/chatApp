import React from "react";
import logo from './images/egold_talk.png';
import { useNavigate } from "react-router-dom";
import { metaMask } from "../src/connectors/metaMask";
import useStore from './Store';
import { useWeb3React } from "@web3-react/core";

export default function Header() {
    const { connector } = useWeb3React();
    const navigate = useNavigate();

    const logOut = () => {
        if(localStorage.getItem('user_type') === 'web3') {
            metaMask.resetState();
            if (connector?.deactivate) {
                connector.deactivate();
            } else {
                connector.resetState();
            }
            localStorage.clear();
            useStore.getState().resetStore();
            navigate("/mainpage");
        } else {
            localStorage.clear();
            useStore.getState().resetStore();
            navigate("/mainpage");
        }
        
    }

    return(
        <div className='bg-white h-[70px] rounded-lg'>
            <div className='flex justify-between'>
            <div><img className='w-[196px] mt-[20px] ml-[20px]' src={logo} /></div>
            {localStorage.getItem('user_type') &&(
                <div><button className='bg-[#4F6B75] text-white rounded-lg w-[150px] mr-[20px] h-[35px] mt-[17.5px] font-bold text-[14px]' onClick={logOut}>{localStorage.getItem('user_type') === 'web3' ? 'Disconnect' : 'Logout'}</button></div>
            )}
            </div>
      </div>
    );
}