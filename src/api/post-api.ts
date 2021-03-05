import { PostAction } from 'constants/actions';
import { CommentModel } from 'types/comments';
import { PostModel } from 'types/post';
import { apiInstance } from './api-instance';

export const getPosts = () =>
  apiInstance
    .tracked({
      action: PostAction.LIST,
      cancelPrevious: true,
    })
    .get<PostModel[]>('/posts')
    .then((res) => res.data);

export const getPostById = (id: string) =>
  apiInstance
    .tracked({
      action: PostAction.GET,
    })
    .get<PostModel>(`/posts/${id}`)
    .then((res) => res.data);

export const createPost = (newPost: Omit<PostModel, 'id'>) =>
  apiInstance
    .tracked({
      action: PostAction.CREATE,
    })
    .post<PostModel>(`/posts`, newPost)
    .then((res) => res.data);

export const getCommentsByPost = (id: string) =>
  apiInstance
    .tracked({
      action: PostAction.COMMENTS,
    })
    .get<CommentModel[]>(`/posts/${id}/comments`)
    .then((res) => res.data);
