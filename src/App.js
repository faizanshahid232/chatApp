import React, {useEffect, useState} from 'react';
import logo from './egold_talk.png';
import './App.css';
import usersettingIcon from './Frame.png';
import userprofileIcon from './userprofile.png';
import composeIcon from './Compose.png';
import PrivateGroup from './PrivateGroup';
import CountryGroup from './CountryGroup';
import GeneralGroup from './GeneralGroup';
import Chat from './Chat';
import Footer from './Footer';
import { Navigate } from "react-router-dom";
import { getPrivateGroupList } from './api/apiServices';
import { getGeneralGroupList } from './api/apiServices';
import { getCountryGroupList } from './api/apiServices';
import useStore from './Store';

function App() {
  const [openTab, setOpenTab] = useState(1);
  const [authenticated, setauthenticated] = useState(null);
  const [privateGroupList, setprivateGroupList] = useState('');
  const [countryGroupList, setcountryGroupList] = useState('');
  const [generalGroupList, setgeneralGroupList] = useState('');
  const ChatId = useStore(state => state);
  console.log("Chat id: " + ChatId.chatId);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(true);
    }
  }, []);

  {/* get private group list */}
  useEffect(() => {
    if(openTab === 1) {
      getGenaralGroup();
    }
    if(openTab === 2) {
      getCountryGroup();
    }
    if(openTab === 3) {
      getPrivateGroup();
    }
  }, [openTab]);

  {/* Header for Groups */}
  var headers = {
    headers: {
      'Accept': 'application/json',
    'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
    },
  };
  {/* End Header */}

  {/* Private Group */}
  async function getPrivateGroup() {
    try {
        const response = await getPrivateGroupList(headers);
        setprivateGroupList(response.data.data);
    } catch(error) {
        console.log(error);
    }
  }

  {/* General Group */}
  async function getGenaralGroup() {
    try {
        const response = await getGeneralGroupList(headers);
        setgeneralGroupList(response.data.data);
    } catch(error) {
        console.log(error);
    }
  }

  {/* Country Group */}
  async function getCountryGroup() {
    try {
        const response = await getCountryGroupList(headers);
        setcountryGroupList(response.data.data);
    } catch(error) {
        console.log(error);
    }
  }

  if(privateGroupList) {
    console.log("private: " + privateGroupList);
  }
  console.log("dashboard: " + authenticated);
  if(false) {
    return <Navigate replace to="/login" />
  } else {

    return (
      <div className='bg-[#f9fafb]'>
        
        {/* Web3 popup start */}
        {/**<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            {/**<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-[#F2F2F7] outline-none focus:outline-none">
              {/*header*/}
              {/**<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl text-center font-semibold">
                  Connect Using
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                  <span className="bg-transparent text-[#aaa] text-[0.75rem] block outline-none focus:outline-none">
                    Close
                  </span>
                </button>
              </div>
              {/*body*/}
              {/**<div className="relative p-6 flex-auto">
                <ul>
                  <li className='popup_wallet_list'><a className='popup_walletconnect popup_wallet_icon cursor-pointer' href="#">Metamask <img src='/metamaxicon.png' /></a></li>
                  <li className='popup_wallet_list'><a href="#" className='popup_walletconnect popup_wallet_icon'>WalletConnect <img src='/walletconnecticon.png' /></a></li>
                  <li className='popup_wallet_list'><a href='#' className='popup_walletconnect popup_wallet_icon'>TrustWallet <img src='/trustwallet.png' /></a></li>
                  <li className='popup_wallet_list'><a href="#" className='popup_walletconnect popup_wallet_icon'>Binance chain Wallet <img src='/binanceicon.png' /></a></li>
                  <li className='popup_wallet_list'><a href='#' className='popup_walletconnect popup_wallet_icon'>SafePal Wallet <img src='/safewallet.png' /></a></li>
                  <li className='popup_wallet_list'><a href='#' className='popup_walletconnect popup_wallet_icon'>TokenPocket <img src='/tokenpocketicon.png' /></a></li>
                  <li className='popup_wallet_list'><a href='#' className='popup_walletconnect popup_wallet_icon'>Other Web3 Wallets <img src='/webwalleticon.png' /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        {/* Web3 popup end */}
  
        <div className='md:pb-[100px] lg:pb-[100px] xl:pb-[100px]'>
          <div className='relative min-h-screen flex flex-col bg-gray-50'>
          
            {/* Nav screen start */}
            <div className='bg-white h-[70px] rounded-lg'>
              <div className='flex justify-between'>
                <div><img className='w-[196px] mt-[20px] ml-[20px]' src={logo} /></div>
                <div><button className='bg-[#4F6B75] text-white rounded-lg w-[150px] mr-[20px] h-[35px] mt-[17.5px] font-bold text-[14px]'>Disconnect</button></div>
              </div>
            </div>
            {/* Nav screen end here */}
            
            {/* Chat layout start here */}
            <div className='flex-grow w-full max-w-5xl mx-auto lg:flex bg-[#F2F2F7] mt-7'>
              <div className='flex-1 min-w-0 bg-white xl:flex mx-2 md:mx-0 lg:mx-0 xl:mx-0'>
                <div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-68 xl:border-r xl:border-gray-200 bg-gray-50'>
                  <div className='h-full pl-2 pr-2 md:pl-4 sm:pl-6 lg:pl-8 xl:pl-0'>
                    <div className={ChatId.chatId ? 'hidden h-[600px] md:block lg:block xl:block md:h-full lg:h-full xl:h-full relative bg-white' : 'h-[600px] md:h-full lg:h-full xl:h-full relative bg-white'}>
                      <div className='bg-[#4F6B75] h-[48px] rounded-tl-lg rounded-tr-lg pt-[10px] flex justify-between'>
                        <div className='flex'>
                          <img className='ml-[9px] h-[30px] ' src={userprofileIcon} />
                          <p className='text-white text-[14px] ml-[5px] mt-[3px]'>@bilalshaikh</p></div>
                        <div>
                          <div><img className='mr-[10px] w-[24px] mt-[3px]' src={usersettingIcon} /></div>
                        </div>
                      </div>
  
  
                    <div className='mt-4'>
                      <div className='relative px-[10px]'>
                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                          <img src={composeIcon} />
                        </div>
                        <input
                          name='search'
                          placeholder='Search' 
                          className='focus:ring-red-500 focus:border-red-500 block w-full pl-4 sm:text-sm border-gray-100 rounded-[4px] p-2 border'
                        />
                      </div>
                    </div>
                    {/* Search Box End */}
                    {/* tabs */}
                    <div className="mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                      <ul className="flex flex-wrap -mb-px">
                          <li className="mr-2">
                              <a href="#" onClick={() => setOpenTab(1)} className={openTab === 1 ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}>General</a>
                          </li>
                          <li className="mr-2">
                              <a href="#" onClick={() => setOpenTab(2)} className={openTab === 2 ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}>Country</a>
                          </li>
                          <li className="mr-2">
                              <a href="#" onClick={() => setOpenTab(3)} className={openTab === 3 ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}>Private</a>
                          </li>
                      </ul>
                    </div>
                    {/* tabs end */}
                    {/* Tab 1 list */}
                    <div className={openTab === 1 ? "block" : "hidden"}>
                      <GeneralGroup data={generalGroupList} />
                    </div>
                    {/* Tab 1 list end */}
  
                    {/* Tab 2 list */}
                    <div className={openTab === 2 ? "block" : "hidden"}>
                      <CountryGroup data={countryGroupList} />
                    </div>
                    {/* Tab 2 list end */}
  
                    {/* Tab 3 list */}
                    <div className={openTab === 3 ? "block" : "hidden"}>
                      <PrivateGroup data={privateGroupList} />
                    </div>
                    {/* Tab 3 list end */}
  
                    
                    {/* Create Group Button */}
                    <div className='absolute inset-x-0 bottom-0 bg-[#E0E7EA] p-[10px] h-[60px] rounded-bl-lg rounded-br-lg'>
                      <a href='' className='bg-[#FFC727] w-full p-[10px] block rounded-lg text-[#253237] text-[14px] text-center font-semibold'>Create group</a>
                    </div>
                    </div>
                  </div>
                </div>
  
                {/* Middle content start */}
                <div className={ChatId.chatId ? 'flex-1 p:2 sm:pb6 justify-between rounded-lg h-screen md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col' : 'hidden'}>
                  <Chat data={privateGroupList} />
                </div>
                {/* Middle content end here */}
                
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <Footer />
        {/* footer end */}
      </div>
    );
  }
  
}

export default App;
