import ICON_ARROW from "../assets/icon_arrow_left.svg";
import "../styles/Pagenation.css";

const PageButton = ({ page, currentPage, handlePage }) => {
  return (
    <div
      onClick={handlePage}
      className={`pageButton ${currentPage === page ? "isActive" : ""}`}
    >
      {page}
    </div>
  );
};

const Pagenation = ({
  totalPages,
  currentPage,
  handlePageBtn,
  handlePagePrevBtn,
  handlePageNextBtn,
}) => {
  const createPagenation = (totalPages) => {
    const pagenationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagenationArray.push(
        <PageButton
          key={`pageButton-${i}`}
          page={i}
          currentPage={currentPage}
          handlePage={() => {
            handlePageBtn(i);
          }}
        />
      );
    }
    return pagenationArray;
  };

  return (
    <div className="pagenation">
      <div className="pagenation__prev-btn" onClick={handlePagePrevBtn}>
        <img src={ICON_ARROW} alt="페이지네이션 뒤로가기 버튼" />
      </div>
      <div className="pagenation__page-btn">{createPagenation(totalPages)}</div>
      <div className="pagenation__next-btn" onClick={handlePageNextBtn}>
        <img src={ICON_ARROW} alt="페이지네이션 뒤로가기 버튼" />
      </div>
    </div>
  );
};

export default Pagenation;
