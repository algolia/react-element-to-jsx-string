import React from 'react';

// eslint-disable-next-line func-names
export default function(props: { children: React.ReactNode } & any) {
  const { children } = props;
  return <div>{children}</div>;
}
