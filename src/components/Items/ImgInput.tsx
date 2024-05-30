import { useEffect, useRef, useState } from "react";
import "../../styles/additem/ImgInput.css";
import ICON_PLUS from "../../assets/icon_plus.svg";
import ICON_CANCEL from "../../assets/icon_cancel.svg";

const ImgInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState(null);
  const imgInputRef = useRef();
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };
  const handleClearClick = () => {
    const inputNode = imgInputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className="imgInput">
      <div className="imgInput__wrapper">
        <label htmlFor="imgFile">
          <img
            src={ICON_PLUS}
            alt="이미지 첨부 아이콘"
            style={{ width: "48px" }}
          />
          이미지 등록
        </label>
        <input
          id="imgFile"
          type="file"
          onChange={handleChange}
          ref={imgInputRef}
        />
      </div>
      <div className={`imgInput__preview-wrapper ${preview ? "show" : ""}`}>
        <img
          className="imgInput__preview-img"
          src={preview}
          alt="이미지 미리보기"
        />
        <button
          className="imgInput__preview-cancel-btn"
          type="button"
          onClick={handleClearClick}
        >
          <img src={ICON_CANCEL} alt="이미지 취소 버튼" />
        </button>
      </div>
    </div>
  );
};

export default ImgInput;
