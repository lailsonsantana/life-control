'use client'

import NewButton from "@/components/button/NewButton";
import ContainerCriacao from "@/components/container/ContainerCriacao"
import Input from "@/components/input/Input"
import Subtitle from "@/components/title/Subtitle"
import { useAreaControleService } from "@/resources/area_controle/area_controle.service";
import { useState } from "react";


export default function AreaCriacao() {
  const useAreaControlService = useAreaControleService();
  const [area, setArea] = useState("");
  const [inputs, setInputs] = useState([""]);

  function novaSugestao() {
    setInputs((prev) => [...prev, ""]);
  }

  function handleSugestaoChange(index: number, value: string) {
    setInputs((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  }

  async function handleSubmit() {
  // evita submit inválido
  if (!area.trim()) {
    console.warn("Nome da área é obrigatório");
    return;
  }

  const sugestoesValidas = inputs
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  if (sugestoesValidas.length === 0) {
    console.warn("É necessário ao menos uma sugestão");
    return;
  }

  const areaControle = {
    nome: area,
    sugestoes: sugestoesValidas.map((descricao) => ({
      descricao,
    })),
  };

  try {
    await useAreaControlService.save(areaControle);
    setArea("");
    setInputs([""]);

    console.log("Payload enviado:", areaControle);
  } catch (error) {
    console.error("Erro ao salvar área de controle", error);
  }
}


  return (
    <ContainerCriacao>
      <div className="space-y-4">
        <Subtitle text="Inserir uma nova área de controle" />
        <Input
          label="Área"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <Subtitle text="Descreva uma nova sugestão de melhoria" />
        {inputs.map((value, index) => (
          <Input
            key={index}
            label={'Nova sugestão'}
            value={value}
            onChange={(e) =>
              handleSugestaoChange(index, e.target.value)
            }
          />
        ))}
      </div>

      <div className="mx-auto">
        <NewButton
          label="ADICIONAR SUGESTÃO"
          onClick={novaSugestao}
        />
      </div>

      <div>
        <NewButton label="Criar" onClick={handleSubmit} type="submit"/>
      </div>
    </ContainerCriacao>
  );
}
