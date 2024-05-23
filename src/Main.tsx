import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import Items from './pages/Items';
import Board from './pages/Board';
import AddItem from './pages/AddItem';
import DetailItem from './pages/DetailItem';

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="items">
            <Route index element={<Items />} />
            <Route path="additem" element={<AddItem />} />
            <Route path=":itemId" element={<DetailItem />} />
          </Route>
          <Route path="board" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
