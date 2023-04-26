import React from 'react';
import { ReactNode } from 'react';

function Template({ children }: { children: ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
export default Template;
