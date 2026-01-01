'use client'

import Button from '@mui/material/Button';
import { useAreaControleService } from "@/resources/area_controle/area_controle.service";
import { AreaControle } from '@/resources/area_controle/area_controle.resource';
import { useEffect, useState } from 'react';
import TableAreas from '@/components/table/TableAreas';




export default function InicialPage() {

    const useAreaControlService = useAreaControleService();
    const [areas, setAreas] = useState<AreaControle[]>([]);
    const [hasMounted, setHasMounted] = useState(false);

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
        <div className='flex flex-col items-center p-16 space-y-4'>

            <span className='w-3/4'>
                <Button variant="contained" size="large" color='secondary'>
                    ADICIONAR NOVA ÁREA
                </Button>
            </span>

            <TableAreas></TableAreas>
        </div>
    )
}