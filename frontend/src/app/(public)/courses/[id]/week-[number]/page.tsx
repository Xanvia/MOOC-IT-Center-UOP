import React from 'react';

interface PageProps {
  title: string;
  children: React.ReactNode;
  customStyle?: React.CSSProperties;
}

const Page: React.FC<PageProps> = ({ title, children, customStyle }) => {
  return (
    <div style={{ padding: '20px', ...customStyle }}>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default Page;