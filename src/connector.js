import React from 'react';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import Web3 from 'web3';
import { web3LogIn } from './api/apiServices';
import { useNavigate } from "react-router-dom";
import metamaskIcon from './images/MetaMask_Fox.svg';
import trustwalletIcon from './images/true_wallet.svg';
import tokenpocketIcon from './images/TokenPocket.svg';

const [metaMask, hooks] = initializeConnector((actions) => new MetaMask(actions));
const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

function Connect({ isActivating, error, isActive, onConnect, onDisconnect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {error ? (
        <button onClick={onConnect}>Try Again?</button>
      ) : isActive ? (
        <button onClick={onDisconnect}>Disconnect</button>
      ) : (
        <button
          onClick={isActivating ? undefined : onConnect}
          disabled={isActivating}
        >
          Login with web3
        </button>
      )}
    </div>
  );
}

function Status({ isActivating, error, isActive }) {
  return (
    <div>
      {error ? (
        <>
          🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  );
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export default function Connector() {
  const navigate = useNavigate();
  const chainId = useChainId();
  const accounts = useAccounts();
  //const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const handleConnect = async() => {
    
    localStorage.setItem("authenticated", false);
    await window.ethereum.enable();
    const message = makeid(10) + "__" +Date.now();
    const web3 = new Web3(window.ethereum);
    console.log("web3 console: "+web3);
    const signature = await web3.eth.personal.sign(
        message,
        window.ethereum.selectedAddress,
        ""
    );
    await metaMask.activate('56');
    const accounts2 = await web3.eth.getAccounts()
    console.log("account: "+ accounts2);
    if(accounts2) {
        var postData = {
            message: message,
            signature: signature,
            address: accounts2.toString(),
        };
        var headers = {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
        };
        web3LogIn(postData, headers).then((response) => {
            if(response.data.code === 200) {
                localStorage.setItem("authenticated", true);
                localStorage.setItem("accessToken", response.data.access_token);
                localStorage.setItem("accessTime", Date.now());
                localStorage.setItem("createdAt", response.data.created_at);
                localStorage.setItem("channelId", response.data.channel_id);
                localStorage.setItem("talkId", response.data.talk_id);
                localStorage.setItem("walletAddress", response.data.wallet_address);
                localStorage.setItem("user_type", response.data.user_type);
                localStorage.setItem("profile_pic", response.data.profile_pic);
    
                console.log("login Successfully");
                navigate("/");
            } else {
                localStorage.setItem("authenticated", false);
            }
        });
    }
    
    console.log(`Signed Message: ${signature}`);
  };

  const handleDisconnect = () => {
    metaMask.resetState();
  };

  return (
    <>
    <span className="cursor-pointer btn-get-secondry web3-btn callogbtn">
      <div class="flex">
          <span><img src={metamaskIcon} /></span>
          <span><img src={trustwalletIcon} /></span>
          <span><img src={tokenpocketIcon} /></span>
      </div>
      <span>
      <Connect
        isActivating={isActivating}
        //error={error}
        isActive={isActive}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      </span>
    </span>

    </>
  );
}
