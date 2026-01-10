'use client'

import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import TableAreas from '@/components/table/TableAreas';
import { useRouter } from 'next/navigation';
import ContainerTable from '@/components/container/ContainerTable';


export default function InicialPage() {

    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }


    return(
        
        <ContainerTable>

            <Button variant="contained" size="large" color='secondary' onClick={() => router.push(`/area-criacao/${1}`)}>
                ADICIONAR NOVA ÁREA
            </Button>

            <TableAreas />
        </ContainerTable>    

    )
}