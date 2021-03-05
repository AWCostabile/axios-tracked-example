import { ButtonGroup } from 'components/button';
import React, { useState } from 'react';
import { ErrorPage } from './error';
import { PostCreatePage, PostItemPage, PostListPage } from './post';
import { TodoCreatePage, TodoItemPage, TodoListPage } from './todo';

enum PageType {
  ERROR = 'error',
  HOME = 'home',
  POST_CREATE = 'post-create',
  POST_LIST = 'post-list',
  POST_ITEM = 'post-item',
  TODO_CREATE = 'todo-create',
  TODO_LIST = 'todo-list',
  TODO_ITEM = 'todo-item',
}

interface PageState {
  page: PageType;
  id: number;
}

interface IPageRouterProps {
  isSubmittingPost?: boolean;
  isSubmittingTodo?: boolean;
}

export const PageRouter: React.FC<IPageRouterProps> = ({
  isSubmittingPost,
  isSubmittingTodo,
}) => {
  const [{ page, id }, setState] = useState<PageState>({
    page: PageType.HOME,
    id: 0,
  });

  const toError = () => setState({ page: PageType.ERROR, id: 0 });
  const toHome = () => setState({ page: PageType.HOME, id: 0 });

  const toPostCreate = () => setState({ page: PageType.POST_CREATE, id: 0 });
  const toPostList = () => setState({ page: PageType.POST_LIST, id: 0 });
  const toPostItem = (nextId: number) =>
    setState({ page: PageType.POST_ITEM, id: nextId });

  const toTodoCreate = () => setState({ page: PageType.TODO_CREATE, id: 0 });
  const toTodoList = () => setState({ page: PageType.TODO_LIST, id: 0 });
  const toTodoItem = (nextId: number) =>
    setState({ page: PageType.TODO_ITEM, id: nextId });

  switch (page) {
    case PageType.ERROR:
      return <ErrorPage toHome={toHome} />;
    case PageType.HOME:
      return (
        <ButtonGroup
          buttons={[
            { label: 'Go to Error', onClick: toError },
            { label: 'Go to Posts', onClick: toPostList },
            { label: 'Go to Todos', onClick: toTodoList },
          ]}
        />
      );
    case PageType.POST_CREATE:
      return (
        <PostCreatePage
          isSubmitting={isSubmittingPost}
          toHome={toHome}
          toList={toPostList}
        />
      );
    case PageType.TODO_CREATE:
      return (
        <TodoCreatePage
          isSubmitting={isSubmittingTodo}
          toHome={toHome}
          toList={toTodoList}
        />
      );
    case PageType.POST_LIST:
      return (
        <PostListPage
          toCreate={toPostCreate}
          toHome={toHome}
          toItem={toPostItem}
        />
      );
    case PageType.TODO_LIST:
      return (
        <TodoListPage
          toCreate={toTodoCreate}
          toHome={toHome}
          toItem={toTodoItem}
        />
      );
    case PageType.POST_ITEM:
      return <PostItemPage id={id} toHome={toHome} toList={toPostList} />;
    case PageType.TODO_ITEM:
      return <TodoItemPage id={id} toHome={toHome} toList={toTodoList} />;
  }
};
