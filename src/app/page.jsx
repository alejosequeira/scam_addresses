import React from 'react';
import Connect from '../../components/connect/Connect';
import style from './page.module.css';
import SignTX from '../../components/sign_transaction/SignTX';
import SendTX from '../../components/send_transaction/SendTX';

export default function Home() {

  return (
    <div className={style.form_test}>
      <div className={style.block}><SendTX /></div>
      <div className={style.block}><Connect /></div>
      <div className={style.block}><SignTX /></div>
    </div>
  );
};



