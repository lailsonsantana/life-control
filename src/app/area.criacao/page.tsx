'use client'

import NewButton from "@/components/button/NewButton";
import ContainerCriacao from "@/components/container/ContainerCriacao"
import Input from "@/components/input/Input"
import Subtitle from "@/components/title/Subtitle"
import Button from '@mui/material/Button';

export default function AreaCriacao() {

    return(
        <ContainerCriacao>
            <Subtitle></Subtitle>
            <Input></Input>
            
            <NewButton label="Nova Sugestão">

            </NewButton>
        </ContainerCriacao>
    )
}