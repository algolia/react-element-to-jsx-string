import React from 'react';

// eslint-disable-next-line func-names
export default function (props: { children: React.ReactNode }) {
  const { children } = props; // eslint-disable-line react/prop-types

  return <div>{children}</div>;
}
