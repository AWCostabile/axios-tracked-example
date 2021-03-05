import { TodoAction } from 'constants/actions';
import { TodoModel } from 'types/todo';
import { apiInstance } from './api-instance';

export const getTodos = () =>
  apiInstance
    .tracked({
      action: TodoAction.LIST,
      cancelPrevious: true,
    })
    .get<TodoModel[]>('/todos')
    .then((res) => res.data);

export const getTodoById = (id: string) =>
  apiInstance
    .tracked({
      action: TodoAction.GET,
    })
    .get<TodoModel>(`/todos/${id}`)
    .then((res) => res.data);

export const createTodo = (newTodo: Omit<TodoModel, 'id'>) =>
  apiInstance
    .tracked({
      action: TodoAction.CREATE,
    })
    .post<TodoModel>(`/todos`, newTodo)
    .then((res) => res.data);
