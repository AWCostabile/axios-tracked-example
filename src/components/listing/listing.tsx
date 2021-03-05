import React from 'react';
import { Entity } from 'types/entity';

interface IListingProps extends Entity {
  onClick: (id: number) => void;
}

export const Listing: React.FC<IListingProps> = React.memo(
  ({ children, id, onClick }) => (
    <div className="listing" onClick={() => onClick(id)}>
      {children}
    </div>
  ),
);
