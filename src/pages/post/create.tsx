import { createPost } from 'api/post-api';
import { Button, ButtonGroup } from 'components/button';
import { Post } from 'components/post';
import { useForm } from 'hooks/use-form';
import React, { useState } from 'react';
import { EntityCreatePage } from 'types/page';
import { PostModel } from 'types/post';

export const PostCreatePage: React.FC<EntityCreatePage> = ({
  isSubmitting,
  toHome,
  toList,
}) => {
  const [newPost, setNewPost] = useState<PostModel | null>(null);
  const { onChange, values } = useForm<PostModel>({
    body: '',
    id: 0,
    title: '',
    userId: 0,
  });

  const onSubmit = () => {
    createPost(values).then((res) => setNewPost(res));
  };

  return (
    <div>
      {newPost !== null ? (
        <Post {...newPost} />
      ) : (
        <div>
          <p>New Post</p>
          <p>
            <label>Title</label>
            <input
              disabled={isSubmitting}
              name="title"
              onChange={onChange}
              value={values.title}
            />
          </p>
          <p>
            <label>Body</label>
            <input
              disabled={isSubmitting}
              name="body"
              onChange={onChange}
              value={values.body}
            />
          </p>
          <div>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
          <br />
          <br />
          <br />
        </div>
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
