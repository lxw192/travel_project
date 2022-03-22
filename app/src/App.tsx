import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Cascader, ConfigProvider, Input } from 'antd';
import { Provider } from "mobx-react";
import store from './models/index';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './home';
import MenuPage from './home/Menu';
import Register from './register/register';


function App() {
  return (
    <div className="App">
      <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
        <Provider {...store}>
          <BrowserRouter >
            <Routes>
              <Route path='/' element={<MenuPage/>}>
                <Route path='1' element={<Home/>}></Route>
                <Route path='2' element={<Register/>}></Route>
                <Route path='3' element={<Register/>}></Route>
                <Route path='4' element={<Register/>}></Route>
                <Route path='5' element={<Register/>}></Route>
                <Route path='6' element={<Register/>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    </div>
  );
}

export default App;
