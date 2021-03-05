import { getTodoById } from 'api/todo-api';
import { ButtonGroup } from 'components/button';
import { Loader } from 'components/loader';
import { Todo } from 'components/todo';
import React, { useEffect, useState } from 'react';
import { EntityItemPage } from 'types/page';
import { TodoModel } from 'types/todo';

export const TodoItemPage: React.FC<EntityItemPage> = ({
  id,
  toHome,
  toList,
}) => {
  const [todo, setTodo] = useState<TodoModel | null>(null);

  useEffect(() => {
    getTodoById(`${id}`).then((res) => setTodo(res));
  }, [id]);

  return (
    <div>
      {todo === null ? <Loader type="todo" /> : <Todo {...todo} />}
      <ButtonGroup
        buttons={[
          { label: 'Back to Home', onClick: toHome },
          { label: 'Back to Todos', onClick: toList },
        ]}
      />
    </div>
  );
};
