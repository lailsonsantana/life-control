import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


type ContainerCriacaoProps = {
  children: React.ReactNode;
};

export default function ContainerCriacao({ children }: ContainerCriacaoProps) {
  return (
    <section className='flex flex-col p-4 m-4 mr-32 ml-32 space-y-8'>
        {children}
    </section>
  );
}