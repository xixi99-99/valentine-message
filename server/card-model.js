import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  to:{
    type: String,
    required: true,
    maxlength: 500 
  },
  message: {
    type: String,
    required: true,   // 使用者必填
    maxlength: 1000   // 限制長度避免濫用
  },
  from:{
    type: String,
    required: true,
    maxlength: 500 
  }
  // },
  // mediaUrl: {
  //   type: String,     // 上傳的照片或影片連結 (選填)
  // },
  // qrLink: {
  //   type: String,     // 對應的唯一連結，例如 https://yourapp.vercel.app/card/abc123
  //   unique: true
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },
  // expiresAt: {
  //   type: Date,       // 可選：設定卡片過期時間（例如30天）
  // }
});

// 自動清理過期資料 (MongoDB TTL Index)
cardSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Card", cardSchema);