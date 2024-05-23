import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDetailItem } from "../apis/apis";
import { formatKorWon } from "../utils/utils";
import "../styles/detailItem/DetailItem.css";
import AddComment from "../components/detailItem/AddComment";
import Comments from "../components/detailItem/Comments";
import Button from "../components/Button";

import ICON_LIKES from "../assets/Icon_likes.svg";
import ICON_KEBAB from "../assets/icon_kebab.svg";
import ICON_GOBACK from "../assets/icon_goback.svg";

const DetailItem = () => {
  const [content, setContent] = useState({});
  const { itemId } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const loadContent = async () => {
      const itemContent = await fetchDetailItem(itemId);
      setContent(itemContent);
    };
    loadContent();
  }, []);

  return (
    <div className="detailItem">
      <div className="detailItem__wrapper">
        <div className="detailItem__img-frame">
          {content.images && content.images.length > 0 && (
            <img className="detailItem__img" src={content.images[0]} />
          )}
        </div>
        <div className="detailItem__content-wrapper">
          <div className="detailItem__content-header">
            <h1 className="detailItem__title">{content.name}</h1>
            <p className="detailItem__price">{formatKorWon(content.price)}</p>
          </div>
          <div className="detailItem__descripton-wrapper">
            <h2 className="detailItem__content-title">상품 소개</h2>
            <p className="detailItem__descripton">{content.description}</p>
          </div>
          <div className="detailItem__tags-wrapper">
            <h2 className="detailItem__content-title">상품 태그</h2>
            <div className="detailItem__tag-wrapper">
              {content.tags?.map((tag) => (
                <p className="detailItem__tag" key={`${content.id}-${tag}`}>
                  #{tag}
                </p>
              ))}
            </div>
          </div>
          <div className="detailItem__likes-wrapper">
            <img className="detailItem__likes" src={ICON_LIKES} />
            <p className="detailItem__likes__count">{content.favoriteCount}</p>
          </div>
          <div className="detailItem__more-wrapper">
            <img className="detailItem__more" src={ICON_KEBAB} />
          </div>
        </div>
      </div>

      <div className="detailItem__addComment-wrapper">
        <AddComment />
        <Comments itemId={itemId} />
      </div>
      <div className="detailItem__goBack-btn-wrapper">
        <Button onClick={handleGoBack}>
          뒤로가기
          <img src={ICON_GOBACK} />
        </Button>
      </div>
    </div>
  );
};

export default DetailItem;
