import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
//import { BscConnector } from "@binance-chain/bsc-connector";
import { metaMask } from "../src/connectors/metaMask";
import { walletConnectV2 } from "../src/connectors/walletConnect";
import { coinbaseWallet } from "../src/connectors/coinbaseWallet";
import Web3 from 'web3';
import { web3LogIn } from './api/apiServices';
import { useNavigate } from "react-router-dom";

export default function WalletButton({popupModel, setPopupModel}) {
    const navigate = useNavigate();
    const { account, isActive, connector } = useWeb3React();
    const [acctADDR, setacctADDR] = useState(localStorage.getItem("acct"));

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
    };

    function addBscChain() {
        if (window.ethereum) {
          handleEthereum();
        } else {
          window.addEventListener("ethereum#initialized", handleEthereum, {
            once: true,
          });
          setTimeout(handleEthereum, 3000);
        }
    
        function handleEthereum() {
          const { ethereum } = window;
          if (ethereum) {
            console.log("Ethereum successfully detected!");
          } else {
            console.error("Ethereum not detected.");
          }
        }
        const BSC_MAINNET_PARAMS = {
          chainId: process.env.REACT_APP_CHAINIDHEX,
          chainName: "Binance Smart Chain",
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: [process.env.REACT_APP_RPC],
          blockExplorerUrls: ["https://bscscan.io/"],
        };
        if (window.ethereum) {
          window.ethereum
            .request({
              method: "eth_chainId",
            })
            .then((res) => {
              if (res != "0x38")
                window.ethereum
                  .request({
                    method: "wallet_addEthereumChain",
                    params: [BSC_MAINNET_PARAMS],
                  })
                  .then(() => {
                    console.log("BSC Added");
                  })
                  .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        }
    }

    function getAddChainParameters(chainId) {
        return {
          chainId,
          chainName: "BSC",
          nativeCurrency: "BNB",
          rpcUrls: "https://bsc-dataseed.binance.org",
        };
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

    const changeNetwork = async (wallet) => {
        try {
          addBscChain();
          if (wallet == "Metamask") {
            console.log("hererere111");
            localStorage.setItem("wallettype", "Metamask");
            const bscdets = getAddChainParameters(56);
            localStorage.setItem("authenticated", false);
            await window.ethereum.enable();
            const message = makeid(10) + "__" +Date.now();
            const web3 = new Web3(window.ethereum);
            console.log("web3 console: ",web3);
            const signature = await web3.eth.personal.sign(
                message,
                window.ethereum.selectedAddress,
                ""
            );
            await metaMask.activate(bscdets);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            const acct = localStorage.getItem('acct')
            console.log("signature: "+ signature);
            console.log("Account: "+ acct);

            if(acct) {
                var postData = {
                    message: message,
                    signature: signature,
                    address: acct.toString(),
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

            //setmodalV(false);
          }
          if (wallet == "WalletConnect") {
            localStorage.setItem("wallettype", "WalletConnect");
            //setmodalV(false);
            const bscdets = getAddChainParameters(56);
            await walletConnectV2.activate(56);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);

            await window.ethereum.enable();
            const message = makeid(10) + "__" +Date.now();
            const web3 = new Web3(window.ethereum);
            console.log("web3 console: ",web3);
            console.log("select Address: ",window.ethereum.selectedAddress);
            const signature = await web3.eth.personal.sign(
                message,
                window.ethereum.selectedAddress,
                ""
            );
            await walletConnectV2.activate(56);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            const acct = localStorage.getItem('acct')
            console.log("signature: "+ signature);
            console.log("Account: "+ acct);

            if(acct) {
              var postData = {
                  message: message,
                  signature: signature,
                  address: acct.toString(),
              };
              var headers = {
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
              };
              console.log("Post Data: ",postData);
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
          }
          /*if (wallet == "BCW") {
            localStorage.setItem("wallettype", "BCW");
            const bsc = new BscConnector({ supportedChainIds: [56, 97] });
            await bsc.activate();
            //setmodalV(false);
            console.log("aCCTOUNT BINANCE", account);
            setacctADDR(account);
          }*/
          if (wallet == "Coinbase") {
            localStorage.setItem("wallettype", "Coinbase");
            const bscdets = getAddChainParameters(56);
            await coinbaseWallet.activate(bscdets);
            //setmodalV(false);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            await window.ethereum.enable();
            const message = makeid(10) + "__" +Date.now();
            const web3 = new Web3(window.ethereum);
            console.log("web3 console: ",web3);
            const signature = await web3.eth.personal.sign(
                message,
                window.ethereum.selectedAddress,
                ""
            );
            await metaMask.activate(bscdets);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            const acct = localStorage.getItem('acct')
            console.log("signature: "+ signature);
            console.log("Account: "+ acct);

            if(acct) {
                var postData = {
                    message: message,
                    signature: signature,
                    address: acct.toString(),
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
          }
          if (wallet == "Trustwallet") {
            localStorage.setItem("wallettype", "Trustwallet");
            const bscdets = getAddChainParameters(56);
            await metaMask.activate(bscdets);
            //setmodalV(false);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            navigate("/login");
            /*await window.ethereum.enable();
            const message = makeid(10) + "__" +Date.now();
            const web3 = new Web3(window.ethereum);
            console.log("web3 console: ",web3);
            const signature = await web3.eth.personal.sign(
                message,
                window.ethereum.selectedAddress,
                ""
            );
            await metaMask.activate(bscdets);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            const acct = localStorage.getItem('acct')
            console.log("signature: "+ signature);
            console.log("Account: "+ acct);

            if(acct) {
                var postData = {
                    message: message,
                    signature: signature,
                    address: acct.toString(),
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
              }*/

          }
          if (wallet == "Others") {
            localStorage.setItem("wallettype", "Others");
            const bscdets = getAddChainParameters(56);
            await metaMask.activate(bscdets);
            //setmodalV(false);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            await window.ethereum.enable();
            const message = makeid(10) + "__" +Date.now();
            const web3 = new Web3(window.ethereum);
            console.log("web3 console: ",web3);
            const signature = await web3.eth.personal.sign(
                message,
                window.ethereum.selectedAddress,
                ""
            );
            await metaMask.activate(bscdets);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            const acct = localStorage.getItem('acct')
            console.log("signature: "+ signature);
            console.log("Account: "+ acct);

            if(acct) {
                var postData = {
                    message: message,
                    signature: signature,
                    address: acct.toString(),
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
          }
          if (wallet == "TokenPocket") {
            localStorage.setItem("wallettype", "TokenPocket");
            const bscdets = getAddChainParameters(56);
            await metaMask.activate(bscdets);
            //setmodalV(false);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            await window.ethereum.enable();
            const message = makeid(10) + "__" +Date.now();
            const web3 = new Web3(window.ethereum);
            console.log("web3 console: ",web3);
            const signature = await web3.eth.personal.sign(
                message,
                window.ethereum.selectedAddress,
                ""
            );
            await metaMask.activate(bscdets);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            const acct = localStorage.getItem('acct')
            console.log("signature: "+ signature);
            console.log("Account: "+ acct);

            if(acct) {
                var postData = {
                    message: message,
                    signature: signature,
                    address: acct.toString(),
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
          }
          if (wallet == "SafePal") {
            localStorage.setItem("wallettype", "SafePal");
            const bscdets = getAddChainParameters(56);
            await metaMask.activate(bscdets);
            //setmodalV(false);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            localStorage.setItem("acct", account);
            await window.ethereum.enable();
            const message = makeid(10) + "__" +Date.now();
            const web3 = new Web3(window.ethereum);
            console.log("web3 console: ",web3);
            const signature = await web3.eth.personal.sign(
                message,
                window.ethereum.selectedAddress,
                ""
            );
            await metaMask.activate(bscdets);
            window.localStorage.setItem("isWalletConnected", true);
            setacctADDR(account);
            const acct = localStorage.getItem('acct')
            console.log("signature: "+ signature);
            console.log("Account: "+ acct);

            if(acct) {
                var postData = {
                    message: message,
                    signature: signature,
                    address: acct.toString(),
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
          }
        } catch (err) {
          console.log("ERROR", err);
        }
    };

    useEffect(() => {
        if (isActive) {
          window.localStorage.setItem("isWalletConnected", true);
          console.log("!~~~~Acccount",account);
          window.localStorage.setItem("acct", account);
          setacctADDR(account);
        } else {
          setacctADDR("");
        }
    }, [account]);
    
      useEffect(() => {
        if(acctADDR)
        if (localStorage.getItem("isWalletConnected") == "true") {
          localStorage.setItem("acct", acctADDR);
        }
    }, [acctADDR]);

    useEffect(() => {
        setacctADDR(localStorage.getItem("acct"));
        if (!isActive && localStorage.getItem("wallettype")) {
          if (localStorage.getItem("wallettype") == "WalletConnect") {
            walletConnectV2.connectEagerly().catch((error) => {
              console.debug("Failed to connect eagerly to walletconnect", error);
            });
          } else if (localStorage.getItem("wallettype") == "Coinbase") {
            void coinbaseWallet.connectEagerly().catch(() => {
              console.debug("Failed to connect eagerly to coinbase wallet");
            });
          } else if (localStorage.getItem("wallettype")) {
            void metaMask.connectEagerly().catch(() => {
              console.debug("Failed to connect eagerly to metamask");
            });
          }
          // changeNetwork(localStorage.getItem("wallettype"));
          //setmodalV(false);
        }
    }, []);

    /*const refreshState = () => {
        localStorage.clear();
        setacctADDR("");
        navigate("/buy");
        if (connector?.deactivate) {
          connector.deactivate();
        } else {
          connector.resetState();
        }
    };*/

    return(
        <>
        {/* Web3 popup start */}
            {popupModel ? 
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-[#F2F2F7] outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl text-center font-semibold">
                            Connect Using
                        </h3>
                        <button
                            onClick={() => setPopupModel(false)}
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                            <span className="bg-transparent text-[#aaa] text-[0.75rem] block outline-none focus:outline-none">
                            Close
                            </span>
                        </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                        <ul>
                            <li className='popup_wallet_list'
                                onClick={() => {
                                    changeNetwork("Metamask");
                                    setProvider("injected");
                                  }}
                            ><a className='popup_walletconnect popup_wallet_icon cursor-pointer'>Metamask <img src='/metamaxicon.png' /></a></li>
                            <li className='popup_wallet_list'
                                onClick={() => {
                                    changeNetwork("WalletConnect");
                                    setProvider("walletConnect");
                                  }}
                            ><a className='popup_walletconnect popup_wallet_icon'>WalletConnect <img src='/walletconnecticon.png' /></a></li>
                            <li className='popup_wallet_list'
                            onClick={() => {
                                changeNetwork("Trustwallet");
                                setProvider("injected");
                              }}><a className='popup_walletconnect popup_wallet_icon'>TrustWallet <img src='/trustwallet.png' /></a></li>
                            <li className='popup_wallet_list'
                                onClick={() => {
                                    changeNetwork("SafePal");
                                    setProvider("injected");
                                }}
                            ><a className='popup_walletconnect popup_wallet_icon'>SafePal Wallet <img src='/safewallet.png' /></a></li>
                            <li className='popup_wallet_list'
                                onClick={() => {
                                    changeNetwork("TokenPocket");
                                    setProvider("injected");
                                }}
                            ><a className='popup_walletconnect popup_wallet_icon'>TokenPocket <img src='/tokenpocketicon.png' /></a></li>
                            <li className='popup_wallet_list'
                                onClick={() => {
                                    changeNetwork("Others");
                                    setProvider("injected");
                                }}
                            ><a className='popup_walletconnect popup_wallet_icon'>Other Web3 Wallets <img src='/webwalleticon.png' /></a></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            : ''}
            {/* Web3 popup end */}
        </>
    )
}