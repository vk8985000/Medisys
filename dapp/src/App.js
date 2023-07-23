import "./App.css";
import { Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Daignosis from "./pages/Daignosis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState({
    address: "",
    balance: null,
    chainId: null,
    chainName: "",
  });

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount.address))
      return;
    console.log("useEffect");

    //client side code
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(currentAccount.address).then((result) => {
      console.log(result);
      setCurrentAccount((pre) => {
        return { ...pre, balance: ethers.utils.formatEther(result) };
      });
    });
    provider.getNetwork().then((result) => {
      console.log(result);
      setCurrentAccount((pre) => {
        return { ...pre, chainId: result.chainId, chainName: result.name };
      });
    });
  }, [currentAccount.address]);
  useEffect(() => {
    console.log(currentAccount);
  }, [currentAccount]);
  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    /*
    //change from window.ethereum.enable() which is deprecated
    //see docs: https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts:any)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch('error',console.error)
    */

    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0)
          setCurrentAccount((pre) => {
            return { ...pre, address: accounts[0] };
          });
      })
      .catch((e) => console.log(e));
  };

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    setCurrentAccount({
      address: "",
      balance: null,
      chainId: null,
      chainName: "",
    });
  };

  return (
    <div className="App">
      {!currentAccount.address ? (
        <header className="App-header">
          <p>
            Welcome to <code>Medisys</code>, a <code>Blockchain</code> based
            disease predictor using power of <code>Machine Learning</code>.
          </p>
          <Button variant="contained" onClick={onClickConnect}>
            Connect Wallet
          </Button>
        </header>
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  currentAccount={currentAccount}
                  onClickDisconnect={onClickDisconnect}
                />
              }
            />
            <Route
              path="/daignosis"
              element={
                <Daignosis
                  currentAccount={currentAccount}
                  onClickDisconnect={onClickDisconnect}
                />
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
