import { useState, useEffect } from "react";
import "../styles/additem/AddItem.css";
import Button from "../components/Button";
import ImgInput from "../components/Items/ImgInput";
import Tag from "../components/addItem/Tag";

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

const AddItem = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [values, setValues] = useState({
    imgFile: null,
    title: "",
    description: "",
    price: 0,
  });
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleValueChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleValueChange(name, sanitize(type, value));
  };

  const AddTag = () => {
    if (!tagValue) return;
    if (tags.includes(tagValue)) {
      alert("이미 존재하는 태그입니다!");
      setTagValue("");
      return;
    }
    setTags((prevArray) => [...prevArray, tagValue]);
    setTagValue("");
  };

  const handleTagInputChange = (e) => {
    setTagValue(e.target.value);
  };

  const handleTagDelete = (deleteItem) => {
    const deletedItemsArray = tags.filter((item) => item !== deleteItem);
    setTags(deletedItemsArray);
  };

  useEffect(() => {
    if (values.title && values.description && values.price && tags.length) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [values, tags.length]);

  return (
    <div className="addItem">
      <form
        className="addItem__form"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.name !== "productTags")
            e.preventDefault();
          if (
            e.key === "Enter" &&
            e.target.name === "productTags" &&
            e.nativeEvent.isComposing === false
          ) {
            e.preventDefault();
            AddTag();
          }
        }}
      >
        <div className="addItem__header">
          <h1 className="addItem__header__title">상품 등록하기</h1>
          <div className="addItem__header__btn-wrapper">
            <Button type="submit" disable={!canSubmit}>
              등록
            </Button>
          </div>
        </div>

        <div className="addItem__input-wrapper">
          <label className="addItem__input__title">상품 이미지</label>
          <ImgInput
            name="imgFile"
            value={values.imgFile}
            onChange={handleValueChange}
          />
        </div>
        <div className="addItem__input-wrapper">
          <label className="addItem__input__title" htmlFor="title">
            상품명
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="상품명을 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div className="addItem__input-wrapper">
          <label className="addItem__input__title" htmlFor="description">
            상품 소개
          </label>
          <textarea
            id="description"
            className="addItem__textarea"
            name="description"
            placeholder="상품 소개를 입력해주세요"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="addItem__input-wrapper">
          <label className="addItem__input__title" htmlFor="price">
            판매가격
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="판매 가격을 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div className="addItem__input-wrapper">
          <label className="addItem__input__title" htmlFor="productTags">
            태그
          </label>
          <input
            id="productTags"
            name="productTags"
            type="text"
            placeholder="태그를 입력해주세요"
            value={tagValue}
            onChange={handleTagInputChange}
          />
          <div className="addItem__tags-wrapper">
            {tags?.map((item) => {
              return <Tag key={item} value={item} onDelete={handleTagDelete} />;
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
