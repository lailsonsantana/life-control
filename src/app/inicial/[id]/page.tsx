'use client'

import Button from '@mui/material/Button';
import { useAreaControleService } from "@/resources/area_controle/area_controle.service";
import { AreaControle } from '@/resources/area_controle/area_controle.resource';
import { useEffect, useState } from 'react';
import TableAreas from '@/components/table/TableAreas';
import ContainerCriacao from '@/components/container/ContainerCriacao';
import { useRouter } from 'next/navigation';
import ContainerTable from '@/components/container/ContainerTable';



export default function InicialPage() {

    const useAreaControlService = useAreaControleService();
    const [areas, setAreas] = useState<AreaControle[]>([]);
    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setHasMounted(true);
        searchAreas();
    }, []);

    if (!hasMounted) {
        return null;
    }

    async function searchAreas(){
        const response = await useAreaControlService.getAllAreasControle();
        setAreas(response);
        console.log("AREAS CONTROLE")
        console.table(response)
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