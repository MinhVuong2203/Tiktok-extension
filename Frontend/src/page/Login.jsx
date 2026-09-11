import React from 'react';

function Login() {
  const CLIENT_KEY = import.meta.env.VITE_TIKTOK_CLIENT_KEY; 
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const handleLogin = () => {
    const csrfState = Math.random().toString(36).substring(2);
    let tiktokLoginUrl = 'https://www.tiktok.com/v2/auth/authorize/';
    tiktokLoginUrl += `?client_key=${CLIENT_KEY}`;
    tiktokLoginUrl += '&scope=user.info.basic,video.list'; 
    tiktokLoginUrl += '&response_type=code';
    tiktokLoginUrl += `&redirect_uri=${REDIRECT_URI}`;
    tiktokLoginUrl += `&state=${csrfState}`;

    window.location.href = tiktokLoginUrl;
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Trang Đăng Nhập</h1>
      <p>Vui lòng đăng nhập để sử dụng công cụ phân tích.</p>
      <button 
        onClick={handleLogin} 
        style={{ 
          padding: '12px 24px', fontSize: '16px', backgroundColor: '#fe2c55', 
          color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
        }}
      >
        Đăng nhập bằng TikTok
      </button>
    </div>
  );
}

export default Login;