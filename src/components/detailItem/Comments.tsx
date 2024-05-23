import { useState, useEffect } from "react";
import "../../styles/detailItem/Comments.css";
import { fetchComments } from "../../apis/apis";
import { calculateTimeDifference } from "../../utils/utils.js";
import IMG_EMPTY from "../../assets/img_empty.svg";

const Comments = ({ itemId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const commentsList = await fetchComments(itemId);
      setComments(commentsList.list);
    };
    loadComments();
  }, []);

  return (
    <div className="comments">
      {comments.length === 0 ? (
        <div className="commentsEmpty">
          <img className="commentsEmpty__img" src={IMG_EMPTY} />
          <p className="commentsEmpty__p">아직 문의가 없습니다.</p>
        </div>
      ) : (
        comments?.map((comment) => (
          <div key={`comment-${comment.id}`} className="comment__wrapper">
            <p className="comment__content">{comment.content}</p>
            <div className="comment__profile-wrapper">
              <img
                src={comment.writer.image}
                alt="profile image"
                style={{ width: "40px", height: "40px" }}
              />
              <div className="comment__profile__content-wrapper">
                <p className="comment__nickname">{comment.writer.nickname}</p>
                <p className="comment__createdAt">
                  {calculateTimeDifference(comment.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
