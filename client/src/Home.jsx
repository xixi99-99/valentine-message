import React, { use, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from 'axios'
const API_URL =  'https://valentine-message-server.vercel.app/api'


export default function Home() {

  let [message, setMessage] = useState("");
  let [cardId, setCardId] = useState(null);

const handleSubmit = (e) => {
  console.log("post card!!");
  return axios.post(`${API_URL}`, { message })
    .then((res) => {
      const id = res.data.id || res.data._id;  // 後端要回傳 _id
      setCardId(id);                           // 設定 cardId
      window.alert(`訊息已成功上傳! ${message}`)
      setMessage("")
    })
    .catch(err => {
      console.log("訊息上傳失敗", err);
    })
}

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>💌 新增卡片</h1>
      <textarea
        rows="5"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="寫下想告訴他/她的話"
        style={{ width: "80%", padding: "1rem" }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        上傳訊息
      </button>

      {cardId && (
        <div style={{ marginTop: "2rem" }}>
          <p>分享這個連結：</p>
          <a
            href={`/${cardId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {window.location.origin}/api/{cardId}
          </a>
          <div style={{ marginTop: "1rem" }}>
            <QRCodeCanvas
              value={`${window.location.origin}/api/${cardId}`}
              size={200}
            />
          </div>
        </div>
      )}
    </div>
  );
}
