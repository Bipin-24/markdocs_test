import * as React from 'react';
import { Ascii } from './Ascii';

export function Item({ icon, ...props }) {
  return (
    <>
      {icon && <Ascii primary={icon} />}
      <div {...props} />
    </>
  );
}
