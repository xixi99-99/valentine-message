import React, { use, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from 'axios'
// const API_URL =  'https://valentine-message-server.vercel.app/api' // vercel test
const API_URL = "http://localhost:8080/api"; //local test



export default function Home() {

  let [to, setTo] = useState("");
  let [message, setMessage] = useState("");
  let [from, setFrom] = useState("");
  let [cardId, setCardId] = useState(null);

  const handleSubmit = (e) => {
    return axios.post(`${API_URL}`, { to,message, from })
      .then((res) => {
        const id = res.data.id || res.data._id;  // 後端要回傳 _id
        setCardId(id);                           // 設定 cardId
        window.alert(`訊息已成功上傳! ${message}`)
        setTo("")
        setMessage("")
        setFrom("")
      })
      .catch(err => {
        console.log("訊息上傳失敗", err);
      })
  }

  return (

    <div className="page">
      <h1>💌新增卡片</h1>
      <br />
      <div className="letter-header">
        <div className="to">
          <label htmlFor="to">To</label>
          <input type="text" name="to" id="to" onChange={(e) => setTo(e.target.value)}/>
        </div>
      </div>

      <textarea
        rows="5"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="寫下想告訴他/她的話"
        className="msg-input"
        
      />
      <br />

      <div className="letter-header" style={{ marginRight: "0px" }}>
        <div className="from">
          <label htmlFor="from">From</label>
          <input type="text" name="from" id="from" onChange={(e) => setFrom(e.target.value)}/>
        </div>
      </div>
      <br />

      <button onClick={handleSubmit} className="btn-primary">
        上傳訊息
      </button>

      {cardId && (
        <div className="share">
          <p>分享這個連結：</p>

          <div style={{ marginTop: "1rem" }}>
            <QRCodeCanvas
              value={`${window.location.origin}/api/${cardId}`}
              size={200}
            />
          </div>
          <a
            href={`/${cardId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {window.location.origin}/api/{cardId}
          </a>
        </div>
      )}
    </div>
  );
}