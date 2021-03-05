import { getCommentsByPost, getPostById } from 'api/post-api';
import { ButtonGroup } from 'components/button';
import { Comment } from 'components/comment';
import { Loader } from 'components/loader';
import { Post } from 'components/post';
import React, { useCallback, useEffect, useState } from 'react';
import { CommentModel } from 'types/comments';
import { EntityItemPage } from 'types/page';
import { PostModel } from 'types/post';

interface IPostItemPageProps extends EntityItemPage {
  getComments?: boolean;
}

export const PostItemPage: React.FC<IPostItemPageProps> = ({
  getComments,
  id,
  toHome,
  toList,
}) => {
  const [post, setPost] = useState<PostModel | null>(null);
  const [comments, setComments] = useState<CommentModel[] | null>(null);

  const updateComments = useCallback(async () => {
    const result = await getCommentsByPost(`${id}`);

    setComments(result);
  }, [id]);

  useEffect(() => {
    getPostById(`${id}`).then((res) => {
      setPost(res);
      if (getComments) {
        updateComments();
      }
    });
  }, [getComments, id, updateComments]);

  return (
    <div>
      {post === null ? (
        <Loader type="post" />
      ) : (
        <React.Fragment>
          <Post {...post} />
          {comments === null ? (
            <Loader type="comments" />
          ) : (
            comments.map((comment) => <Comment key={comment.id} {...comment} />)
          )}
        </React.Fragment>
      )}
      <ButtonGroup
        buttons={[
          { label: 'Back to Home', onClick: toHome },
          { label: 'Back to Posts', onClick: toList },
        ]}
      />
    </div>
  );
};
