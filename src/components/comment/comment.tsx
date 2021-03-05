import { CommentModel } from 'types/comments';

export const Comment: React.FC<CommentModel> = ({ body, email, name }) => (
  <div className="comment">
    <div className="comment-name">
      {name}{' '}
      {email && (
        <>
          &lt;
          <em>{email}</em>
          &gt;
        </>
      )}
    </div>
    <div className="comment-body">{body}</div>
  </div>
);
