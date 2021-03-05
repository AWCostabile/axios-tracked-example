import React from 'react';

interface ILoaderProps {
  type?: string;
}

export const Loader: React.FC<ILoaderProps> = ({ type = '' }) => (
  <div>Loading{type && ` ${type}`}...</div>
);
