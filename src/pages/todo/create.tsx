import { createTodo } from 'api/todo-api';
import { Button, ButtonGroup } from 'components/button';
import { Todo } from 'components/todo';
import { useForm } from 'hooks/use-form';
import React, { useState } from 'react';
import { EntityCreatePage } from 'types/page';
import { TodoModel } from 'types/todo';

export const TodoCreatePage: React.FC<EntityCreatePage> = ({
  isSubmitting,
  toHome,
  toList,
}) => {
  const [newTodo, setNewTodo] = useState<TodoModel | null>(null);
  const { onChange, values } = useForm<TodoModel>({
    completed: false,
    id: 0,
    title: '',
    userId: 0,
  });

  const onSubmit = () => {
    createTodo(values).then((res) => setNewTodo(res));
  };

  return (
    <div>
      {newTodo !== null ? (
        <Todo {...newTodo} />
      ) : (
        <div>
          <p>New Todo</p>
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
            <label>Is Completed</label>
            <input
              disabled={isSubmitting}
              defaultChecked={values.completed}
              name="completed"
              type="checkbox"
              onChange={onChange}
            />
          </p>
          {values.completed ? 'True' : 'False'}
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
          { label: 'Back to Todos', onClick: toList },
        ]}
      />
    </div>
  );
};
