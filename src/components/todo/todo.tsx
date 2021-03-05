import { TodoModel } from 'types/todo';

export const Todo: React.FC<TodoModel> = ({ title, completed }) => (
  <div className="todo">
    <h4>Todo Completed: {completed ? 'True' : 'False'}</h4>
    <div className="todo-completed">{title}</div>
    <br />
    <br />
    <br />
  </div>
);
