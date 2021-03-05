import { UserCreatedEntity } from './entity';

export interface PostModel extends UserCreatedEntity {
  body: string;
  title: string;
}
