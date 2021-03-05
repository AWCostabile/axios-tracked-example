import { PostModel } from 'types/post';

export const Post: React.FC<PostModel> = ({ body, title }) => (
  <div className="post">
    <h4 className="post-title">{title}</h4>
    <div className="post-body">{body}</div>
    <br />
    <br />
    <br />
  </div>
);
