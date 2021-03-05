import { UserCreatedEntity } from './entity';

export interface TodoModel extends UserCreatedEntity {
  completed: boolean;
  title: string;
}
