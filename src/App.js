import React, {useEffect} from 'react';
import './App.css';
import Chat from './Chat';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import useStore from './Store';
import Sidebar from './Sidebar';
import Header from './Header';

function App() {
  const ChatId = useStore(state => state);
  let history = useNavigate();

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
        if (Date.now() - parseInt(localStorage.getItem("accessTime")) > 7200000) {
            localStorage.clear();
            history("/mainpage")
        }
    } else {
      history("/mainpage")
    }
    const interval = setInterval(() => {
        if (token) {
            if (
                Date.now() - parseInt(localStorage.getItem("accessTime")) >
                7200000
            ) {
                localStorage.clear();
                history("/mainpage")
            }
        }
    }, 10000);

    return () => clearInterval(interval);
  }, []);
//
  return (
    <div className='bg-[#f9fafb]'>
      <div className='md:pb-[100px] lg:pb-[100px] xl:pb-[100px]'>
        <div className='relative min-h-screen flex flex-col bg-gray-50'>

          {/* Nav screen start */}
          <Header />
          {/* Nav screen end here */}
          
          {/* Chat layout start here */}
          <div className='flex-grow w-full max-w-5xl mx-auto lg:flex mt-7'>
            <div className='flex-1 min-w-0 bg-[#f9fafb] rounded-[10px] xl:flex mx-2 md:mx-0 lg:mx-0 xl:mx-0'>
              <Sidebar />

              
              {/* Middle content start */}
              <div className={`justify-end top-0 ${ChatId.chatId ? 'flex-1 p:2 sm:pb6 bg-white rounded-[10px] h-auto md:h-[550px] xl:h-[550px] lg:h-[550px] md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col rounded-bl-[10px] rounded-br-[10px]' : 'hidden'}`}>
                <Chat />
              </div>
              
              <div className={ChatId.chatId ? 'hidden' : ''}>
                <div className="hidden container mx-auto py-5 px-[2rem] md:px-[6rem] lg:px-[6rem] xl:px-[6rem] 2xl:px-[6rem] md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col text-center" style={{ fontFamily: 'Poppins,sans-serif' }}>
                    <h2 className="text-[#002a40] text-[48px] line-height-[56px] font-medium">Egold ANFT Miners</h2>
                    <h3 className="text-[#655f7b] text-[30px] font-normal line-height-[45px] my-[25px]">Join the fastest-growing crypto mining network in the world and start collecting Egold instantly.</h3>
                </div>
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
  


export default App;
