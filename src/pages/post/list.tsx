import { getPosts } from 'api/post-api';
import { ButtonGroup } from 'components/button';
import { Listing } from 'components/listing';
import { ListingContainer } from 'components/listing/listing-container';
import { Loader } from 'components/loader';
import React, { useEffect, useState } from 'react';
import { EntityListPage } from 'types/page';
import { PostModel } from 'types/post';

export const PostListPage: React.FC<EntityListPage> = ({
  toCreate,
  toHome,
  toItem,
}) => {
  const [posts, setPosts] = useState<PostModel[] | null>(null);

  const updateList = () =>
    getPosts()
      .then((res) => {
        const index = Math.floor(Math.random() * res.length) - 10;
        setPosts(res.slice(index > 0 ? index : 0, index + 10));
      })
      .catch((err) => {
        // do nothing
      });

  useEffect(() => {
    updateList();
  }, []);

  return (
    <div>
      {posts === null ? (
        <Loader type="post" />
      ) : (
        <ListingContainer>
          {posts.map((post) => (
            <Listing key={post.id} onClick={toItem} id={post.id}>
              {post.title}
            </Listing>
          ))}
        </ListingContainer>
      )}
      <ButtonGroup
        buttons={[
          { label: 'Back to Home', onClick: toHome },
          { label: 'Create a Post', onClick: toCreate },
          { label: 'Refresh Posts', onClick: updateList },
        ]}
      />
    </div>
  );
};
