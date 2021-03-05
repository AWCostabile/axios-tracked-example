import { getTodos } from 'api/todo-api';
import { ButtonGroup } from 'components/button';
import { Listing } from 'components/listing';
import { ListingContainer } from 'components/listing/listing-container';
import { Loader } from 'components/loader';
import React, { useEffect, useState } from 'react';
import { EntityListPage } from 'types/page';
import { TodoModel } from 'types/todo';

export const TodoListPage: React.FC<EntityListPage> = ({
  toCreate,
  toHome,
  toItem,
}) => {
  const [todos, setTodos] = useState<TodoModel[] | null>(null);

  const updateList = () =>
    getTodos()
      .then((res) => {
        const index = Math.floor(Math.random() * res.length) - 10;
        setTodos(res.slice(index > 0 ? index : 0, index + 10));
      })
      .catch((err) => {
        // do nothing
      });

  useEffect(() => {
    updateList();
  }, []);

  return (
    <div>
      {todos === null ? (
        <Loader type="todo" />
      ) : (
        <ListingContainer>
          {todos.map((todo) => (
            <Listing key={todo.id} onClick={toItem} id={todo.id}>
              {todo.title}
            </Listing>
          ))}
        </ListingContainer>
      )}
      <ButtonGroup
        buttons={[
          { label: 'Back to Home', onClick: toHome },
          { label: 'Create a Todo', onClick: toCreate },
          { label: 'Refresh Todos', onClick: updateList },
        ]}
      />
    </div>
  );
};
