"use client"
import React, { useState } from 'react';
import style from './signTX.module.css'
import { Alert, TextField } from '@mui/material';
import testParams from './msgParam.json';
import erc20Params from './erc20Param.json'

export default function SignTX() {
    const [address, setAddress] = useState('0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954');
   
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const [signTypedData, setSignTypedData] = useState({ v3: '', v4: '' });
    const [jsonFiles, setJsonFiles] = useState({
        testParams: JSON.stringify(testParams, null, 2),
        erc20Params: JSON.stringify(erc20Params, null, 2),
    });
    const [currentJson, setCurrentJson] = useState('testParams');

    const handleSignTypedData = async (version) => {
        if (!window.ethereum) return alert("MetaMask is required!");
        try {
            const sign = await window.ethereum.request({
                method: `eth_signTypedData_${version}`,
                params: [address, jsonFiles[currentJson]],
            });
            setSignTypedData(prev => ({ ...prev, [version]: sign }));
        } catch (err) {
            console.error("Signing error:", err);
            setSignTypedData(prev => ({ ...prev, [version]: `Error: ${err.message}` }));
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/json") {
            const fileContent = await file.text();
            setJsonFiles(prev => ({
                ...prev,
                [currentJson]: fileContent,
            }));
        }
    };

    const downloadJson = (jsonName) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonFiles[jsonName]);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${jsonName}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className={style.container}>
              <div className={style.formu_ADDRESS}>
                <label htmlFor="addressInput_eht" className={style.label_address}>Enter an Address</label>

                <TextField
                    type="text"
                    id="addressInput_eht"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder='0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954...'

                    InputProps={{
                        sx: {
                            color: 'white',
                            backgroundColor: '#434343',
                            fontSize: "0.65rem",
                            border: '1px solid rgb(222, 222, 222)',
                            borderRadius: '5px',
                            height: '1rem',
                            width: '17rem',
                            boxShadow: '#666666 1px 1px 1px 0px inset, #666666 -1px -1px 1px 0px inset',
                            textDecoration: 'none',
                            padding: '0 10px',
                            '&:focus': {
                                border: '1px solid #434343',
                            },
                        },
                    }}
                    inputProps={{
                        sx: {
                            height: '20px',
                            textAlign: 'center',
                        },
                    }}
                /></div>
            <div className={style.formu}>
                <button className={style.bouton} onClick={() => handleSignTypedData('v3')}>SIGN TYPED DATA V3</button>
                {signTypedData.v3 && (
                    <div>
                        <Alert severity="" sx={{
                            width: "17rem",
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

                        }}>{signTypedData.v3}</Alert>
                    </div>
                )}
                <button className={style.bouton} onClick={() => handleSignTypedData('v4')}>SIGN TYPED DATA V4</button>
                {signTypedData.v4 && (
                    <div>
                        <Alert severity="" sx={{
                            width: "17rem",
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

                        }}>{signTypedData.v4}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formulario}>
                <input type="file" accept=".json" onChange={handleFileUpload} className={style.input_file} />
                
                    <button onClick={() => downloadJson('erc20Params')} className={style.bouton_download}>Download ERC20 Permit sample</button>
                    <button onClick={() => downloadJson('testParams')} className={style.bouton_download}>Download OpenSea Contract sample</button>
               
                <div className={style.textareaContainer}>
                    <button className={style.toggleButton} onClick={() => setCurrentJson(prev => prev === 'testParams' ? 'erc20Params' : 'testParams')}>
                        {currentJson === 'testParams' ? 'OpenSea' : 'ERC20'}
                    </button>
                    <textarea className={style.textarea_json} value={jsonFiles[currentJson]} onChange={(e) => setJsonFiles(prev => ({ ...prev, [currentJson]: e.target.value }))}></textarea>
                </div>
            </div>
        </div>
    );
}
          