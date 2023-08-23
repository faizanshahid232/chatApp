import React from "react";
import optionicon from './option.png';
import avatarGroupIcon from './avatar-group.png';
import egoldLogoIcon from './egold_logo_icon.png';
import egoldtextIcon from './egoldtext.png';
import smileyIcon from './smiley.png';
import addIcon from './mention.png';
import sendIcon from './Icon.png';
import userprofileIcon from './userprofile.png';
import useStore from "./Store";

export default function Chat(props) {
    const addChatId = useStore((state) => state.addChatId);
    
    const backPage = () => {
        addChatId({chatId: ''});
        console.log("here click");
    }

    const displayChat = (props) => {
        const {data} = props;
        console.log(data);
        return (
            <>
            <div className='h-[68px] border-b-[1px] py-[10px] rounded-lg border-[#E5E5EA] flex justify-between items-center'>
                <div className='ml-[10px] md:hidden lg:hidden xl:hidden' onClick={() => backPage()}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg></div>
                <div className='ml-[10px] hidden md:block lg:block xl:block'><img className='w-[80px]' src={avatarGroupIcon} /></div>
                <div>
                <div className='flex items-center justify-center'>
                    <img className='w-[32px]' src={egoldLogoIcon} />
                    <img className='ml-[5px] w-[46px]' src={egoldtextIcon} />
                </div>
                <div><p className='text-[#666668] text-[12px] font-normal'>Admin: Bilal Shaikh - 56 Members</p></div>
                </div>
                <div className='mr-[20px]'><img className='w-[20px]' src={optionicon} /></div>
                </div>

                {/* messages start here */}

                <div id='messages' className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                {/* first message */}
                <div className='chat-message'>
                    <div className='flex item-end'>
                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                        <div>
                        <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </span>
                        </div>
                    </div>
                    <img className='w-6 h-6 rounded-full order-1' src={userprofileIcon} />
                    </div>
                </div>
                {/* second message */}
                <div className='chat-message'>
                    <div className='flex item-end justify-end'>
                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end'>
                        <div>
                        <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#4F6B75] text-white'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </span>
                        </div>
                    </div>
                    <img className='w-6 h-6 rounded-full order-1' src={userprofileIcon} />
                    </div>
                </div>
                {/* third message */}
                <div className='chat-message'>
                    <div className='flex item-end justify-end'>
                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end'>
                        <div>
                        <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#4F6B75] text-white'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </span>
                        </div>
                    </div>
                    <img className='w-6 h-6 rounded-full order-1' src={userprofileIcon} />
                    </div>
                </div>
                </div>

            {/* messages end here */}
            <div className='border-t-2 border-gray-200 px-4 pt-4 mb-2'>
                <div className='relative flex'>
                <span className='absolute inset-y-0 flex items-center'>
                    <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                    <img src={smileyIcon} className='w-[16px] h-[16px]' />
                    </button>
                </span>
                <span className='absolute inset-y-0 flex right-0 items-center'>
                    <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                    <img src={sendIcon} className='w-[16px] h-[16px]' />
                    </button>
                </span>
                <span className='absolute inset-y-0 right-0 mr-10 flex items-center'>
                    <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                    <img src={addIcon} className='w-[16px] h-[16px]' />
                    </button>
                </span>
                <input placeholder='Start typing...' className='focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' />
                </div>
            </div>
            </>
        );
    }

    return (
        <>
        {displayChat(props)}
        </>
    );
}