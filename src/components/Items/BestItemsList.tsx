import { useState, useEffect } from 'react';
import { fetchTopFourBestItems } from '../../apis/apis';
import '../../styles/Items/BestItemsList.css';
import BestItem from './BestItem.js';

const getDisplayedItems = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 1;
  } else if (width < 1280) {
    // Tablet viewport
    return 2;
  } else {
    // Desktop viewport
    return 4;
  }
};

const BestItemsList = () => {
  const [bestItems, setBestItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(getDisplayedItems());

  useEffect(() => {
    const loadBestItems = async () => {
      const data = await fetchTopFourBestItems();
      setBestItems(data);
    };
    loadBestItems();

    const handleResize = () => {
      if (window.innerWidth < 1199 && window.innerWidth > 768) {
        setDisplayedItems(2);
      } else if (window.innerWidth < 767) {
        setDisplayedItems(1);
      } else {
        setDisplayedItems(4);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bestItemsList">
      <h1 className="bestItemsList__title">베스트 상품</h1>
      <div className="bestItemsList__wrapper">
        {bestItems
          ?.slice(0, displayedItems)
          .map(({ id, images, name, price, favoriteCount }) => (
            <BestItem
              key={id}
              imgSrc={images[0]}
              name={name}
              price={price}
              favoriteCount={favoriteCount}
            />
          ))}
      </div>
    </div>
  );
};

export default BestItemsList;
