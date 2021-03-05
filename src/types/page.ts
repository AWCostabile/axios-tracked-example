import { Entity } from './entity';

export interface EntityCreatePage {
  isSubmitting?: boolean;
  toHome: () => void;
  toList: () => void;
}

export interface EntityItemPage extends Entity {
  toHome: () => void;
  toList: () => void;
}

export interface EntityListPage {
  toCreate: () => void;
  toHome: () => void;
  toItem: (id: number) => void;
}
