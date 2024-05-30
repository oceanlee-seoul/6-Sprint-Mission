import '../../styles/Items/Item.css';
import iconLikes from '../../assets/Icon_likes.svg';

interface IItemProps {
  imgSrc: string;
  name: string;
  price: string;
  favoriteCount: number;
}

const Item = ({ imgSrc, name, price, favoriteCount }: IItemProps) => {
  return (
    <div className="item">
      <div className="item__img-frame">
        <img src={imgSrc} alt="상품 이미지" />
      </div>
      <div className="item__text-wrapper">
        <p className="item__name">{name}</p>
        <p className="item__price">{price}</p>
        <p className="item__likes">
          <img src={iconLikes} alt="좋아요 아이콘" />
          {favoriteCount}
        </p>
      </div>
    </div>
  );
};

export default Item;
