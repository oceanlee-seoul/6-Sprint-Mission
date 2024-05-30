import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Items/ItemsList.css';

import { fetchItems } from '../../apis/apis.js';

import SearchInput from './SearchInput.jsx';
import Button from '../Button.js';
import DropdownOrder from './DropdownOrder.js';
import Item from './Item.js';
import Pagenation from '../Pagenation.js';
import { formatKorWon } from '../../utils/utils.js';

const getDisplaySize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 'mobile';
  } else if (width < 1280) {
    // Tablet viewport
    return 'tablet';
  } else {
    // Desktop viewport
    return 'desktop';
  }
};
const getItemsPerPage = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 4;
  } else if (width < 1280) {
    // Tablet viewport
    return 6;
  } else {
    // Desktop viewport
    return 10;
  }
};

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('최신순');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [displaySize, setDisplaySize] = useState(getDisplaySize());
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    // window.innerWidth에 따라서 displaySize, itemsPerPage state 변경
    const resizeHandler = () => {
      if (window.innerWidth < 1199 && window.innerWidth > 768) {
        setDisplaySize('tablet');
        setItemsPerPage(6);
      } else if (window.innerWidth < 767) {
        setDisplaySize('mobile');
        setItemsPerPage(4);
      } else {
        setDisplaySize('desktop');
        setItemsPerPage(10);
      }
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // DisplaySize State가 변할 때 마다 itemsPerPage를 변경해서 API 호출
  useEffect(() => {
    const orderText = order === '최신순' ? 'recent' : 'favorite';
    setCurrentPage(1);
    const loadItems = async () => {
      const newItems = await fetchItems(orderText, currentPage, itemsPerPage);
      setItems(newItems.list);
      setTotalPages(Math.ceil(newItems.totalCount / itemsPerPage));
    };
    loadItems();
  }, [displaySize]);

  // 페이지 및 정렬 변경 시 데이터 로드
  useEffect(() => {
    const orderText = order === '최신순' ? 'recent' : 'favorite';
    const loadItems = async () => {
      const newItems = await fetchItems(orderText, currentPage, itemsPerPage);
      setItems(newItems.list);
      setTotalPages(Math.ceil(newItems.totalCount / itemsPerPage));
    };
    loadItems();
  }, [order, currentPage]);

  // 최신순, 좋아요순 정렬
  const orderChangeHandler = (orderText: string) => {
    setOrder(orderText);
    // 정렬이 바뀌면 현재 페이지를 1로 바꿈
    setCurrentPage(1);
  };

  // 페이지네이션 클릭 핸들러
  const handlePagePrevBtn = () => {
    if (currentPage === 1) return;
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handlePageNextBtn = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePageBtn = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="itemsList">
      <div className="itemsList__menu-bar">
        <h1 className="itemsList__menu-bar__title">전체 상품</h1>
        <div className="itemsList__menu-bar__right">
          <SearchInput />
          <div className="itemsList__menu-bar__btn-wrapper">
            <Link to="additem" style={{ textDecoration: 'none' }}>
              <Button>상품 등록하기</Button>
            </Link>
          </div>
          <DropdownOrder
            order={order}
            orderChangeHandler={orderChangeHandler}
            displaySize={displaySize}
          />
        </div>
      </div>
      <div className="itemsList__items-wrapper">
        {items?.map(({ id, images, name, price, favoriteCount }) => (
          <Link
            to={`/items/${id}`}
            key={`item-${id}`}
            style={{ textDecoration: 'none' }}
          >
            <Item
              imgSrc={images[0]}
              name={name}
              price={formatKorWon(price)}
              favoriteCount={favoriteCount}
            />
          </Link>
        ))}
      </div>
      <div className="itemsList__pagination-wrapper">
        <Pagenation
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageBtn={handlePageBtn}
          handlePagePrevBtn={handlePagePrevBtn}
          handlePageNextBtn={handlePageNextBtn}
        />
      </div>
    </div>
  );
};

export default ItemsList;
