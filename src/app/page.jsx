"use client"
import React, { useState } from 'react';

export default function Home() {
  const [account, setAccount] = useState('');

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected', accounts[0]);
        setAccount(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      console.log('Need to install MetaMask');
      // Code to handle non-MetaMask browsers
    }
  };

  return (
    <div className="
    flex
    flex-col
    items-center
    justify-center
    min-h-screen
    bg-gray-100
    dark:bg-neutral-900
    dark:text-neutral-100    
    ">
      <button className='m-0
      px-4 py-2
       max-w-[30ch] text-l font-medium text-white transition bg-indigo-600 rounded hover:bg-indigo-700 border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30' onClick={connectWalletHandler}>Connect to MetaMask</button>
      {account && <p
        className='
      flex
      items-center
      justify-center

      text-l 
      border border-transparent
      px-5 py-4
      font-medium text-white transition bg-indigo-600 rounded hover:bg-indigo-700
      shadow-lg -left-1/2 inset-y-0 w-3/4
      hover:shadow-xl
      hover:border-gray-300
      hover:bg-gray-100
      hover:dark:border-neutral-700
      hover:dark:bg-neutral-800
      hover:dark:bg-opacity-30   
      '>Connected Account: {account}</p>}
    </div>
  );
};



