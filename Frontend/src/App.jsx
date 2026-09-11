import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Nhúng 2 trang bạn vừa tạo vào đây
import Home from './page/Home';
import Login from './page/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nếu vào link gốc "/", gọi giao diện file Home.jsx */}
        <Route path="/" element={<Home />} />
        
        {/* Nếu vào link "/login", gọi giao diện file Login.jsx */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;