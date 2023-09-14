import React, {useState} from "react";
import usersettingIcon from './images/Frame.png';
import userprofileIcon from './images/userprofile.png';
import composeIcon from './images/Compose.png';
import GeneralGroup from './components/sidebar/GeneralGroup';
import Creategroup from './components/sidebar/CreateGroup';
import useStore from './Store';

import Userprofile from "./components/sidebar/Userprofile";

export default function Sidebar() {
    
    const [openTab, setOpenTab] = useState(1);
    const ChatId = useStore(state => state);
    const OpenProfile = useStore((state) => state.OpenProfile);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // tets
    const searchTerm = useStore((state) => state.searchTerm);
    //const setSearchTerm = useStore((state) => state.setSearchTerm);
    
    const handleSearchChange = (event) => {
        //setSearchTerm(event.target.value);
        useStore.getState().setSearchTerm(event.target.value);
    };

    const profilePic = localStorage.getItem('profile_pic');
    const imageSource = profilePic !== null && profilePic !== 'null' ? profilePic : userprofileIcon;

    // test end

    return(
        <>
        {isProfileOpen ? (
            <>
            {console.log("Profile open check: "+ JSON.stringify(ChatId.openProfile))}
                <Userprofile setIsProfileOpen={setIsProfileOpen} isProfileOpen={isProfileOpen} />
            </>)
        :
        
        (<div className='h-[0px] border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-68 bg-gray-50'>
            <div className='h-[545px] pl-2 pr-2 md:pl-4 sm:pl-6 lg:pl-8 xl:pl-0'>
            
            
            <div className={ChatId.chatId ? 'hidden h-[545px] md:block lg:block xl:block md:h-full lg:h-full xl:h-full relative bg-white' : 'h-[600px] md:h-full lg:h-full xl:h-full relative bg-white'}>
                <div className='bg-[#4F6B75] h-[48px] rounded-tl-lg rounded-tr-lg pt-[10px] flex justify-between'>
                <div className='flex'>
                    <img className='ml-[9px] h-[30px] w-[30px] rounded-full' src={imageSource} />
                    <p className='text-white text-[14px] ml-[5px] mt-[3px]'>{localStorage.getItem('talkId')}</p></div>
                <div>
                    <div><img className='mr-[10px] w-[24px] mt-[3px] cursor-pointer' onClick={() => {setIsProfileOpen(true); OpenProfile({openProfile: true})}} src={usersettingIcon} /></div>
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
                    value={searchTerm}
                    onChange={handleSearchChange}
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
                <GeneralGroup openTab={1} />
            </div>
            {/* Tab 1 list end */}

            {/* Tab 2 list */}
            <div className={openTab === 2 ? "block" : "hidden"}>
                <GeneralGroup openTab={2} />
            </div>
            {/* Tab 2 list end */}

            {/* Tab 3 list */}
            <div className={openTab === 3 ? "block" : "hidden"}>
                <GeneralGroup openTab={3} />
            </div>
            {/* Tab 3 list end */}

            
            {/* Create Group Button */}
            <div className={openTab === 3 ? "block" : "hidden"}>
                <Creategroup />
            </div>
            </div>
            </div>
        </div>)
        }
        </>
    );
}