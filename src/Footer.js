import React from "react";
import barIcon from './images/bar.png';
import miningCalculatorIcon from './images/calculator.png';
import informationIcon from './images/information.png';
import youtubeIcon from './images/youtubeIcon.png';
import twitterIcon from './images/twitterIcon.png';
import telegramIcon from './images/telegramIcon.png';
import gitbookIcon from './images/gitbookIcon.png';

function Footer() {
    return(
        <>
        {/* Footer */}
        <footer>
        <div className='bg-[#4F6B75] pb-[20px]'>
        <div className="flex flex-wrap justify-around items-center pt-[50px]">
        <div></div>
        <div>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4 flex">
              <img className='w-[31px] h-[18px]' src={barIcon} /> <a href="#" className="text-white ml-[5px] text-[16px] font-normal"> Project Website</a>
            </li>
            <li className="mb-4 flex">
              <img className='w-[20px] h-[20px]' src={miningCalculatorIcon} /> <a href="#" className="text-white ml-[5px] text-[16px] font-normal"> Mining Calculator</a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4 flex">
                <img className='w-[20px] h-[20px]' src={informationIcon} /> <a href="#" className="text-white ml-[5px] text-[16px] font-normal"> Project Information</a>
              </li>
              <li className="mb-4 flex">
                <img className='w-[20px] h-[20px]' src={miningCalculatorIcon} /> <a href="#" className="text-white ml-[5px] text-[16px] font-normal"> Referral Calculator</a>
              </li>
          </ul>
        </div>
        <div></div>
        <div>
          <ul className="text-gray-500 dark:text-gray-400 font-medium flex pt-[15px]">
            <li className="mb-4 flex">
              <img className='w-[40px] h-[40px] mr-[15px] ml-[15px]' src={youtubeIcon} />
            </li>
            <li className="mb-4 flex">
              <img className='w-[40px] h-[40px] mr-[15px] ml-[15px]' src={twitterIcon} />
            </li>
            <li className="mb-4 flex">
              <img className='w-[40px] h-[40px] mr-[15px] ml-[15px]' src={telegramIcon} />
            </li>
            <li className="mb-4 flex">
              <img className='w-[40px] h-[40px] mr-[15px] ml-[15px]' src={gitbookIcon} />
            </li>
          </ul>
        </div>
        </div>
        </div>
        <div className="h-[52px] bg-[#253237] text-[#A0AEC0] text-[12px] font-normal pt-[17px] text-center">© Egold project 2023 </div>
      </footer>
      {/* Footer End */}
      </>
    );
}
export default Footer;