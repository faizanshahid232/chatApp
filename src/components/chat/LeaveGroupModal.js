import React, {useState} from "react";
import useStore from "../../Store";
import { 
    leftGroup, 
} from "../../api/apiServices";

const LeaveGroupModal = ({ showModal, setShowModal }) => {

    const ChatId = useStore(state => state);
    const resetStore = useStore((state) => state.resetStore);
    //const updateGroup = useStore((state) => state.updateGroup);

    function leaveGroup() {
        console.log("Leave Group");
        {/* POST DATA */}
        var headers2 = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('accessToken'),
            
        };
        var data = {
            "groupID": ChatId.chatId,
        };
        leftGroup(data, headers2).then((json) => {
          useStore.getState().resetStore();  
          useStore.getState().updateGroup(true);
            //({removeParticipants: json.data.message});
            setShowModal(false);
            //useStore.getState().resetStore();
          })
    }

    return showModal ? (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-[#ffffff] outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl text-center font-semibold">
                  Leave Group
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {setShowModal(false);}} >
                  <span className="bg-transparent text-[#aaa] text-[0.75rem] block outline-none focus:outline-none">
                    Close
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative flex-auto">
              <div className="w-full flex flex-col items-center justify-cente my-5">
                    <div>
                        Are you sure you want to leave the group ?
                    </div>

                    <div className="selectcurbtnsec pt-[24px]">
                      <a className="btn-color-primary">
                        <button onClick={() => leaveGroup()} className="w-[100px]">
                          Yes
                        </button>
                      </a>
                      <a className="btn-outline-color-secondary ">
                        <button onClick={() => {setShowModal(false);}} className="w-[100px]">
                          No
                        </button>
                      </a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null;
  };
  
  export default LeaveGroupModal;