import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [authCode, setAuthCode] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setAuthCode(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Công cụ Phân tích Bình luận TikTok</h1>
      
      {authCode ? (
        <div>
          <h2 style={{ color: 'green' }}>Đăng nhập thành công!</h2>
          <p>Mã ủy quyền (Authorization Code) của bạn là:</p>
          <code style={{ background: '#eee', padding: '10px', display: 'block', wordBreak: 'break-all', margin: '20px auto', maxWidth: '600px' }}>
            {authCode}
          </code>
        </div>
      ) : (
        <div>
          <h2 style={{ color: '#666' }}>Bạn chưa đăng nhập</h2>
          <p>Hãy truy cập vào trang Login để bắt đầu.</p>
          {/* Dùng Link của react-router-dom thay cho thẻ <a> để chuyển trang không bị load lại web */}
          <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
            Đi tới trang Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;