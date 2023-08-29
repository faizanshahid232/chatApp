import React, {useState} from "react";
import usersettingIcon from './Frame.png';
import userprofileIcon from './userprofile.png';
import composeIcon from './Compose.png';
import PrivateGroup from './PrivateGroup';
import CountryGroup from './CountryGroup';
import GeneralGroup from './GeneralGroup';
import Creategroup from './CreateGroup';
import useStore from './Store';
import arrow from './arrow.png';

export default function Sidebar() {
    const [openTab, setOpenTab] = useState(1);
    const ChatId = useStore(state => state);
    const [userSetting, setUserSetting] = useState(false);

    return(
        <>
        {userSetting ? 
            <div className='border-b border-white pr-2 xl:border-b-0 xl:flex-shrink-0 xl:w-68 xl:border-r xl:border-gray-200 bg-gray-50'>
                <div className="h-[600px] md:h-full lg:h-full xl:h-full relative bg-white">
                <div className='h-full pl-2 md:pl-4 sm:pl-6 lg:pl-8 xl:pl-0'>
                
                <div className='bg-[#4F6B75] h-[48px] rounded-tl-lg rounded-tr-lg pt-[10px] flex justify-between'>
                <a onClick={() => setUserSetting(false)} className="cursor-pointer ml-2 mt-[6px] col-2 textaligncenter"><img className="w-[15px]" src={arrow} /></a>
                
                </div>
                <div className='relative px-[10px]'>
                    <div className="bg-white pr-4">
                        <div className="h-full pl-6 py-6">
                            <div className='h-full relative'>
                            <div className='m-auto text-center mb-10'>
                                <img className='w-36 h-36 rounded-full m-auto' src={localStorage.getItem('profile_pic')} />
                                <h2 className='m-auto text-2xl mt-2'>{localStorage.getItem('talkId')}</h2>
                            </div>
                            </div>        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        :

        <div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-68 xl:border-r xl:border-gray-200 bg-gray-50'>
            <div className='h-full pl-2 pr-2 md:pl-4 sm:pl-6 lg:pl-8 xl:pl-0'>
            
            
            <div className={ChatId.chatId ? 'hidden h-[600px] md:block lg:block xl:block md:h-full lg:h-full xl:h-full relative bg-white' : 'h-[600px] md:h-full lg:h-full xl:h-full relative bg-white'}>
                <div className='bg-[#4F6B75] h-[48px] rounded-tl-lg rounded-tr-lg pt-[10px] flex justify-between'>
                <div className='flex'>
                    <img className='ml-[9px] h-[30px] w-[30px] rounded-full' src={localStorage.getItem('profile_pic') ? localStorage.getItem('profile_pic'): userprofileIcon} />
                    <p className='text-white text-[14px] ml-[5px] mt-[3px]'>{localStorage.getItem('talkId')}</p></div>
                <div>
                    <div><img className='mr-[10px] w-[24px] mt-[3px] cursor-pointer' onClick={() => setUserSetting(true)} src={usersettingIcon} /></div>
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
                <GeneralGroup />
            </div>
            {/* Tab 1 list end */}

            {/* Tab 2 list */}
            <div className={openTab === 2 ? "block" : "hidden"}>
                <CountryGroup />
            </div>
            {/* Tab 2 list end */}

            {/* Tab 3 list */}
            <div className={openTab === 3 ? "block" : "hidden"}>
                <PrivateGroup />
            </div>
            {/* Tab 3 list end */}

            
            {/* Create Group Button */}
            <div className={openTab === 3 ? "block" : "hidden"}>
                <Creategroup />
            </div>
            </div>
            </div>
        </div>
        }
        </>
    );
}