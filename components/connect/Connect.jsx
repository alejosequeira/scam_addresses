"use client"
import React from 'react'
import { useState } from 'react';
import style from './connect.module.css'
import { Alert } from '@mui/material';


export default function Connect() {
    const [account, setAccount] = useState('');

    const connectWalletHandler = async () => {
        if (window.ethereum ) {
            console.log('MetaMask Here!');
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Connected', accounts[0]);
                setAccount(accounts[0]);
            } catch (error) {
                console.log('Error connecting...');
                setAccount('Error connecting...'+error.message);
            }
        } else {
            console.log('Need to install MetaMask');
            setAccount('Need to install a Wallet');
        }
    };
    return (
        <div className={style.container}>
            <button className={style.bouton} onClick={connectWalletHandler}>Connect to MetaMask</button>
            {account && (
                <div className={style.formu}>
                    <Alert
                        severity=""
                        sx={{
                            width: "20rem",
                            maxWidth: "19.5rem",
                            fontSize: '13px',
                            color: 'black',
                            backgroundColor: 'lightgray',
                            border: '3px solid gray',
                            borderRadius: '5px',
                            padding: '0 10px 0px 0px',
                            textAlign: 'center',
                            margin: '0 5px',
                            marginTop: '5px',
                            boxShadow: 'white 3px 3px 3px 0px inset, white -3px -3px 3px 0px inset',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        {account}</Alert>
                </div>
            )}
        </div>
    )
}
