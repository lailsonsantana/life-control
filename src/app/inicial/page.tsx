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
        <div className='flex flex-col justify-center p-16'>
            <Button variant="contained" size="large" color='secondary'>
                NOVA ÁREA
            </Button>

            <TableAreas></TableAreas>
        </div>
    )
}