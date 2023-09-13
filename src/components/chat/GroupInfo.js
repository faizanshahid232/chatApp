import React from "react";
import useStore from "../../Store";
import closeIcon from "../../images/close.png";
import egoldLogoIcon from '../../images/egold_logo_icon.png';

export default function GroupInfo({ setShowModal, setGroupInfo }) {
  const ChatId = useStore();

  return (
    <div className="w-full bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Group Info</h2>
        <button
          onClick={() => setGroupInfo(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          <img src={closeIcon} alt="Close" className="w-4 h-4" />
        </button>
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <img
            src={ChatId.groupIcon ? ChatId.groupIcon : egoldLogoIcon}
            alt="Group Icon"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="text-lg font-semibold">{ChatId.groupName}</p>
            <p className="text-gray-600">{ChatId.groupDescription}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Participants List:</p>
        <div className="h-40 overflow-y-auto border rounded-lg">
          {ChatId.groupParticipantsList.map((data, index) => (
            <div key={index} className="border-b p-2">
              {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                  <span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Exit Group
        </button>
      </div>
    </div>
  );
}
