import React, {useState} from "react";
import useStore from "../../Store";
import { createGroup } from '../../api/apiServices';

export default function Creategroup() {
    
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [descripton, setDescripton] = useState('');
    const [message, setMessage] = useState('');
    const updateGroup = useStore((state) => state.updateGroup);
  

    // Create Group function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    {/* POST DATA */}
    var postData = {
      groupName: groupName,
      description: descripton
    };
    {/* Header */}
    var headers = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
        },
    };
    {/* Header end */}
    {/* POST DATA */}
    try {
        const response = await createGroup(postData, headers);
        setMessage(response.data);
        updateGroup({removeParticipants: response.data});
        setGroupName('');
        setDescripton('');
        console.log(message);
      } catch(error) {
        console.log(error);
    }
  }

  // End Create Group function

    return (
        <>
        {/* Create Group Popup */}
    {showModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-[#ffffff] outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl text-center font-semibold">
                  Create Group
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)} >
                  <span className="bg-transparent text-[#aaa] text-[0.75rem] block outline-none focus:outline-none">
                    Close
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative flex-auto">
              <div className="w-full flex flex-col items-center justify-cente">
                <form className="rounded-br rounded-bl pb-8">
                    <div className="mb-4 px-8 mt-10">
                        <div className="relative">
                            <input 
                                type="text" 
                                id="outlined_success" 
                                aria-describedby="outlined_success_help" 
                                className="block px-2.5 pb-1.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-[4px] border border-gray-400 appearance-none dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                                placeholder=" "
                                onChange={event => setGroupName(event.target.value)}
                                value={groupName} 
                                required />
                            <label htmlFor="outlined_success" className="absolute text-sm text-gray-600 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#ffffff] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Group Name</label>
                        </div>
                    </div>
                    <div className="mb-6 px-8 pt-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            id="outlined_success2" 
                            aria-describedby="outlined_success_help" 
                            className="block px-2.5 pb-1.5 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-[4px] border border-gray-400 appearance-none dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" 
                            placeholder=" "
                            onChange={event => setDescripton(event.target.value)}
                            value={descripton} 
                            required />
                        <label htmlFor="outlined_success2" className="absolute text-sm text-gray-600 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#ffffff] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Group Description</label>
                    </div>
                    </div>
                    <div className="pt-[20px] flex justify-center">
                      <button className="btn-color-primary w-[200px]" onClick={(e)=>handleSubmit(e)}>Create Group</button>
                    </div>
                </form>
                  {message ? 
                  <div className='mb-5 text-green-600'>
                    Group Created Successfully
                  </div>
                   : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}
        {/* End Create Group */}
        <div className='absolute inset-x-0 bottom-0 bg-[#E0E7EA] p-[10px] h-[60px] rounded-bl-lg rounded-br-lg'>
            <button onClick={() => setShowModal(true)} className='bg-[#FFC727] w-full p-[10px] block rounded-lg text-[#253237] text-[14px] text-center font-semibold'>Create group</button>
        </div>
        </>
    );
}