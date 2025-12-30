import { useState } from "react";
import {
  Reply,
  ReplyWriter,
  ReplyContent,
  ReplyFooter,
  ReplyDate,
  ReplyButton,
  ReplyEditInput
} from "./Comment.styled";

const CommentItem = ({ reply, auth, onUpdate, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(reply.content);

  return (
    <Reply>
      <ReplyWriter>{reply.writer}</ReplyWriter>

      {isEdit ? (
        <>
          <ReplyEditInput
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <ReplyFooter>
            <ReplyButton
              onClick={() =>
                onUpdate(reply.id, text, () => setIsEdit(false))
              }
            >
              <i className="bi bi-check-lg"></i> 저장
            </ReplyButton>
            <ReplyButton onClick={() => setIsEdit(false)}>
              <i className="bi bi-x"></i> 취소
            </ReplyButton>
          </ReplyFooter>
        </>
      ) : (
        <>
          <ReplyContent>{reply.content}</ReplyContent>

          <ReplyFooter>
            <ReplyDate>{reply.date}</ReplyDate>

            {auth?.nickName === reply.writer && (
              <>
                <ReplyButton onClick={() => setIsEdit(true)}>
                  <i className="bi bi-pencil"></i> 수정
                </ReplyButton>
                |
                <ReplyButton onClick={() => onDelete(reply.id)}>
                  <i className="bi bi-trash"></i> 삭제
                </ReplyButton>
              </>
            )}
          </ReplyFooter>
        </>
      )}
    </Reply>
  );
};

export default CommentItem;
