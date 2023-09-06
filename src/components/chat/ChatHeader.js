import React from "react";
import optionicon from '../../images/option.png';
import avatarGroupIcon from '../../images/avatar-group.png';
import egoldLogoIcon from '../../images/egold_logo_icon.png';

export default function ChatHeader({ ChatId, backPage, isOpen, toggleMenu, setShowModal }) {
    return(
        <div className='h-[68px] border-b-[1px] py-[10px] rounded-lg border-[#E5E5EA] flex justify-between items-center'>
            <div className='ml-[10px] md:hidden lg:hidden xl:hidden' onClick={() => backPage()}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg></div>
            <div className='ml-[10px] hidden md:block lg:block xl:block'><img className='w-[80px]' src={avatarGroupIcon} /></div>
            <div>
            <div className='flex items-center justify-center'>
                <img className='w-[32px] h-[32px] rounded-full' src={ChatId.groupIcon ? ChatId.groupIcon : egoldLogoIcon} />
                <span className="ml-[5px] uppercase text-sm font-semibold">{ChatId.groupName}</span>
            </div>
            <div><p className='text-[#666668] text-[12px] font-normal'>Admin: {ChatId.talkId} - {ChatId.participants?.length} Members</p></div>
            </div>
            <div className="relative">
                <img onClick={toggleMenu} className='w-[20px] mr-[20px]' src={optionicon} />
                {isOpen && (
                    <div className="absolute mt-2 ml-[-160px] w-[200px] py-2 bg-white border rounded-lg shadow-lg">
                    <a
                        onClick={() => setShowModal(true)}
                        className="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Leave Group
                    </a>
                </div>
                )}
            </div>
        </div>
    );
}