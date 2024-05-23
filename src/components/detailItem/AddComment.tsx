import { useState, useEffect } from "react";
import Button from "../Button";
import "../../styles/detailItem/AddComment.css";

const PLACE_HOLDER_TEXT =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

const AddComment = () => {
  const [commentValue, setCommentValue] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const commentOnChange = (e) => {
    setCommentValue(e.target.value);
  };

  useEffect(() => {
    if (commentValue.length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [commentValue]);

  return (
    <div className="addComment">
      <label className="addComment__label">문의하기</label>
      <textarea
        className="addComment__textarea"
        placeholder={PLACE_HOLDER_TEXT}
        onChange={commentOnChange}
      />
      <div className="addComment__btn-wrapper">
        <Button disable={!canSubmit}>등록</Button>
      </div>
    </div>
  );
};

export default AddComment;
