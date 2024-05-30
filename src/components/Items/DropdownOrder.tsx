import '../../styles/Items/DropdownOrder.css';
import ICON_DOWN from '../../assets/icon_down.svg';
import ICON_SORT from '../../assets/icon_sort.svg';
import { useState } from 'react';

interface IDropdownOrderProps {
  order: string;
  orderChangeHandler: any;
  displaySize: string;
}

const DropdownOrder = ({
  order,
  orderChangeHandler,
  displaySize,
}: IDropdownOrderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };
  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div
      className="dropdownOrder__wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdownOrder">
        {displaySize === 'mobile' ? (
          <img src={ICON_SORT} style={{ width: '24px', height: '24px' }} />
        ) : (
          <>
            {order}
            <img src={ICON_DOWN} alt="내리기 아이콘" />
          </>
        )}
      </div>
      <div
        className={`dropDownOrder__list-wrapper ${showDropdown ? 'show' : ''} ${
          displaySize === 'mobile' ? 'mobile' : ''
        }`}
      >
        <ul>
          <li onClick={() => orderChangeHandler('최신순')}>최신순</li>
          <li onClick={() => orderChangeHandler('좋아요순')}>좋아요순</li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownOrder;
