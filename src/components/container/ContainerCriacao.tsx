import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


type ContainerCriacaoProps = {
  children: React.ReactNode;
};

export default function ContainerCriacao({ children }: ContainerCriacaoProps) {
  return (
    <section className='flex flex-col border p-4 m-4 gap-4 w-3/4 mx-auto justify-center items-center'>
        {children}
    </section>
  );
}