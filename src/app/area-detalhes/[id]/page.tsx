'use client'

import NewButton from "@/components/button/NewButton";
import ContainerCriacao from "@/components/container/ContainerCriacao";
import Subtitle from "@/components/title/Subtitle";
import Input from "@/components/input/Input"
import { AreaControle } from "@/resources/area_controle/area_controle.resource";
import { useAreaControleService } from "@/resources/area_controle/area_controle.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AreaDetalhes() {

  const areaControleService = useAreaControleService();
  const params = useParams();
  const id = Number(params?.id);

  const [area, setArea] = useState<AreaControle>({
    nome: "",
    sugestoes: []
  });

  // estado SOMENTE para edição
  const [nomeEdit, setNomeEdit] = useState<string>("");
  const [sugestoesEdit, setSugestoesEdit] = useState<string[]>([]);

  const [telaEdicao, setTelaEdicao] = useState<boolean>(false);

  useEffect(() => {
    if (!isNaN(id)) {
      searchArea(id);
    }
  }, [id]);

  async function searchArea(id: number) {
    const response = await areaControleService.getAreaControle(id);

    setArea(response);

    // 🔥 AQUI está o ponto-chave:
    // inicializa os inputs com dados vindos do backend
    setNomeEdit(response.nome);
    setSugestoesEdit(response.sugestoes.map(s => s.descricao));
  }

  // Atualiza sugestão específica
  const handleSugestaoChange = (index: number, value: string) => {
    setSugestoesEdit(prev => {
      const copia = [...prev];
      copia[index] = value;
      return copia;
    });
  };

  const addSugestao = () => {
    setSugestoesEdit(prev => [...prev, ""]);
  };

  const removeSugestao = (index: number) => {
    setSugestoesEdit(prev => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit() {

  // valida nome
  if (!nomeEdit.trim()) {
    console.warn("Nome da área é obrigatório");
    return;
  }

  // valida sugestões
  const sugestoesValidas = sugestoesEdit
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (sugestoesValidas.length === 0) {
    console.warn("É necessário ao menos uma sugestão");
    return;
  }

  // monta payload no formato do backend
  const areaControlePayload = {
    id: area.id, // 🔥 FUNDAMENTAL no update
    nome: nomeEdit,
    sugestoes: sugestoesValidas.map(descricao => ({
      descricao
    }))
  };

  try {
    await areaControleService.updateById(areaControlePayload);

    console.log("Payload enviado:", areaControlePayload);

    // atualiza tela de visualização após salvar
    setArea(prev => ({
      ...prev,
      nome: nomeEdit,
      sugestoes: areaControlePayload.sugestoes.map((s, index) => ({
        id: prev.sugestoes[index]?.id ?? index,
        descricao: s.descricao
      }))
    }));

    setTelaEdicao(false);

  } catch (error) {
    console.error("Erro ao atualizar área de controle", error);
  }
}

  return (
    <>
      {/* ===== VISUALIZAÇÃO ===== */}
      {!telaEdicao && (
        <ContainerCriacao>
          <Subtitle text={area.nome} />

          <div className="w-full">
            <div className="flex flex-col mt-4 p-4 items-start">
              <h2 className="font-bold mb-2">Sugestões</h2>
              <ul className="list-disc ml-5">
                {area.sugestoes.map((s) => (
                  <li key={s.id}>{s.descricao}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col mt-4 p-4 items-end">
              <NewButton label="EDITAR" onClick={() => setTelaEdicao(true)} />
            </div>
          </div>
        </ContainerCriacao>
      )}

      {/* ===== EDIÇÃO ===== */}
      {telaEdicao && (
        <ContainerCriacao>
          <div className="flex flex-col gap-4">

            <Input
              label="Nome da área"
              value={nomeEdit}
              onChange={(e) => setNomeEdit(e.target.value)}
            />

            <h2 className="font-bold">Sugestões</h2>

            {sugestoesEdit.map((sugestao, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  label={`Sugestão ${index + 1}`}
                  value={sugestao}
                  onChange={(e) =>
                    handleSugestaoChange(index, e.target.value)
                  }
                />

                <button
                  className="text-red-500"
                  onClick={() => removeSugestao(index)}
                  disabled={sugestoesEdit.length === 1}
                >
                  Remover
                </button>
              </div>
            ))}

            <button
              className="text-blue-600 self-start"
              onClick={addSugestao}
            >
              + Adicionar sugestão
            </button>

            <div className="flex gap-4 justify-end">
              <NewButton
                label="CANCELAR"
                onClick={() => setTelaEdicao(false)}
              />

              <NewButton
               type="submit"
                label="SALVAR"
                onClick={handleSubmit}
              />
            </div>

          </div>
        </ContainerCriacao>
      )}
    </>
  );
}

