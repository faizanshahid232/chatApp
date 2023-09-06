import React from "react";
import logo from './images/egold_talk.png';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { useNavigate } from "react-router-dom";
import useStore from './Store';

export default function Header() {
    
    const [metaMask, hooks] = initializeConnector((actions) => new MetaMask(actions));
    const navigate = useNavigate();

    const logOut = () => {
        if(localStorage.getItem('user_type') === 'web3') {
            metaMask.resetState();
        }
        localStorage.clear();
        useStore.getState().resetStore();
        navigate("/mainpage");
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