import ICON_MAGNIFYING from "../../assets/icon_magnifying_glass.svg";
import "../../styles/Items/SearchInput.css";

const SearchInput = () => {
  return (
    <div className="searchBox">
      <input
        className="searchBox__input"
        type="text"
        placeholder="검색할 상품을 입력해주세요."
      />
      <img
        className="searchBox__img"
        src={ICON_MAGNIFYING}
        alt="돋보기 아이콘"
      />
    </div>
  );
};

export default SearchInput;
