import * as React from 'react';

type ContainerTableProps = {
  children: React.ReactNode;
};

export default function ContainerTable({ children }: ContainerTableProps) {
  return (
    <section
      className="
        bg-white
        flex flex-col
        border border-gray-100
        rounded-xl
        shadow-md
        p-6
        m-4
        gap-6
        w-3/4
        mx-auto
        items-stretch
      "
    >
      {children}
    </section>
  );
}