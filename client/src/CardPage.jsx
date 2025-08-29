import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

function CardPage() {
  const { id } = useParams(); // 讀取 URL 參數 :id
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => {
        setCard(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("載入卡片失敗:", err);
        setError("找不到卡片或伺服器錯誤");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>載入中...</p>;
  if (error) return <p style={{color:"red"}}>{error}</p>;

  return (
    <div style={{padding:"2rem", textAlign:"center"}}>
      <h1>💌 情人節卡片</h1>
      <p style={{fontSize:"1.2rem"}}>{card.message}</p>
    </div>
  );
}

export default CardPage;
