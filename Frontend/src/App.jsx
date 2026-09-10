import React, { useEffect, useState } from 'react';

function App() {
  const [authCode, setAuthCode] = useState(null);

  // THAY THẾ BẰNG THÔNG TIN CỦA BẠN
  // Lấy Client Key trong mục App Details trên TikTok Developer Portal
  const CLIENT_KEY = 'ĐIỀN_CLIENT_KEY_CỦA_BẠN_VÀO_ĐÂY'; 
  
  // Phải khớp 100% với Redirect URI bạn đã cấu hình trên TikTok
  const REDIRECT_URI = 'https://tiktok-extension-production-4f69.up.railway.app/'; 

  useEffect(() => {
    // Khi trang load, kiểm tra xem trên URL có biến "code" do TikTok trả về không
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Nếu có, lưu lại code này lên màn hình
      setAuthCode(code);
      
      // (Tùy chọn) Xóa code trên thanh URL cho gọn
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // TẠI ĐÂY: Sau này bạn sẽ gửi 'code' này xuống Backend (Spring Boot) 
      // để Backend đổi lấy Access Token và gọi API lấy dữ liệu.
    }
  }, []);

  const handleLogin = () => {
    // 1. Tạo một chuỗi ngẫu nhiên để bảo mật (CSRF protection)
    const csrfState = Math.random().toString(36).substring(2);

    // 2. Xây dựng đường dẫn đăng nhập của TikTok
    let tiktokLoginUrl = 'https://www.tiktok.com/v2/auth/authorize/';
    tiktokLoginUrl += `?client_key=${CLIENT_KEY}`;
    tiktokLoginUrl += '&scope=user.info.basic,video.list'; // Các quyền bạn cần xin
    tiktokLoginUrl += '&response_type=code';
    tiktokLoginUrl += `&redirect_uri=${REDIRECT_URI}`;
    tiktokLoginUrl += `&state=${csrfState}`;

    // 3. Chuyển hướng người dùng sang trang của TikTok
    window.location.href = tiktokLoginUrl;
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Công cụ Phân tích Bình luận TikTok</h1>
      
      {!authCode ? (
        <div>
          <p>Vui lòng đăng nhập để bắt đầu lấy dữ liệu.</p>
          <button 
            onClick={handleLogin} 
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px', 
              backgroundColor: '#fe2c55', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Đăng nhập bằng TikTok
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ color: 'green' }}>Đăng nhập thành công!</h2>
          <p>Mã ủy quyền (Authorization Code) của bạn là:</p>
          <code style={{ background: '#eee', padding: '10px', display: 'block', wordBreak: 'break-all', margin: '20px auto', maxWidth: '600px' }}>
            {authCode}
          </code>
          <p><i>Lưu ý: Mã này chỉ có giá trị sử dụng 1 lần để backend đổi lấy token.</i></p>
          
          <button 
            onClick={() => setAuthCode(null)}
            style={{ padding: '8px 16px', marginTop: '20px', cursor: 'pointer' }}
          >
            Thử đăng nhập lại
          </button>
        </div>
      )}
    </div>
  );
}

export default App;