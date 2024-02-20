"use client"
import React, { useState } from 'react';
import style from './signTX.module.css'
import { Alert, TextField } from '@mui/material';
import testParams from './msgParam.json';
import erc20Params from './erc20Param.json'

export default function SignTX() {
    const [address, setAddress] = useState('0x462A0d4fE4C2b10aadFBD4628f697d09a76Cd954');
    const [signTypedDataV3, setSignTypedDataV3] = useState('');
    const [signTypedDataV4, setSignTypedDataV4] = useState('');
    const [editedJson, setEditedJson] = useState(JSON.stringify(testParams, null, 2));
    const [editedJson2, setEditedJson2] = useState(JSON.stringify(erc20Params, null, 2));

    const [displayJson, setDisplayJson] = useState(editedJson);
    const [displayContract, setDisplayContract] = useState(false);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const toggleDisplay = () => {
        setDisplayContract(!displayContract);
        if (displayContract) {
            setDisplayJson(editedJson);
        } else {
            setDisplayJson(editedJson2);
        }
    };

    const handleSignTypedDataV3 = async () => {
        if (!window.ethereum) return alert("MetaMask is required!");
        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v3',
                params: [address, displayJson],
            });
            setSignTypedDataV3(sign);
            console.log(JSON.stringify(editedJson))
        } catch (err) {
            console.error("Error este: " + err);
            setSignTypedDataV3(`Error: ${err.message}`);
        }
    }
    const handleSignTypedDataV4 = async () => {
        if (!window.ethereum) return alert("MetaMask is required!");

        try {
            const provider = window.ethereum;
            const sign = await provider.request({
                method: 'eth_signTypedData_v4',
                params: [address, displayJson],
            });
            setSignTypedDataV4(sign);
        } catch (err) {
            console.error(err);
            setSignTypedDataV4(`Error: ${err.message}`);
        }
    }

    const handleEditableJsonChange = (e) => {
        const editedData = e.target.value;
        if (displayContract) {
            setEditedJson(editedData);
        } else {
            setEditedJson2(editedData);
        }
    };


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                setEditedJson(fileContent);
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(editedJson);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "testParams.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };
    const handleSubmit2 = (e) => {
        e.preventDefault();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(editedJson2);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "erc20Params.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className={style.container}>


            <div className={style.formu}>
                <button
                    className={style.bouton}
                    onClick={handleSignTypedDataV3}
                >SIGN TYPED DATA V3
                </button>
                {signTypedDataV3 && (
                    <div>
                        <Alert severity="" sx={{
                            width: "14.5rem",
                            maxWidth: "14.5rem",
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

                        }}>{signTypedDataV3}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formu}>
                <button
                    className={style.bouton}
                    onClick={handleSignTypedDataV4}
                > SIGN TYPED DATA V4
                </button>
                {signTypedDataV4 && (
                    <div>
                        <Alert severity="" sx={{
                            width: "14.5rem",
                            maxWidth: "14.5rem",
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

                        }}>{signTypedDataV4}</Alert>
                    </div>
                )}
            </div>
            <div className={style.formulario}>
                <input
                    type="file"
                    id="fileInput"
                    accept=".json"
                    onChange={handleFileUpload}
                    className={style.input_file}
                />



                <div className={style.formulario_input}>
                    <button
                        onClick={handleSubmit2}
                        className={style.bouton_download}
                    >
                        <span className={style.bouton_download_span}> Download ERC20 Permit sample</span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={style.bouton_download}
                    >
                        <span className={style.bouton_download_span}> Download OpenSea Contract sample</span>
                    </button>
                </div>
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
                                fontSize: 15,
                                border: '1px solid #434343',
                                borderRadius: '0px',
                                height: '20px',
                                width: '400px',
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
                <div className={style.textareaContainer}>
                    <button className={style.toggleButton} onClick={toggleDisplay}>
                        {displayContract ? 'ERC20' : 'OpenSea'}
                    </button>
                    <textarea
                        className={style.textarea_json}
                        value={displayJson}
                        onChange={handleEditableJsonChange}
                    ></textarea>
                </div>

            </div>
        </div>
    );
}