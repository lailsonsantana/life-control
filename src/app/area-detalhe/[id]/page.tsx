'use client'

import NewButton from "@/components/button/NewButton";
import ContainerCriacao from "@/components/container/ContainerCriacao";
import Subtitle from "@/components/title/Subtitle";
import Input from "@/components/input/Input"
import { AreaControle } from "@/resources/area_controle/area_controle.resource";
import { useAreaControleService } from "@/resources/area_controle/area_controle.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Status from "@/components/status/Status";
import BasicSelect from "@/components/select/Select";
import { StatusArea } from "@/resources/area_controle/status_area";
import { InfoBlock } from "@/components/info/InfoBlock";
import StatusBadge from "@/components/status/StatusBadge";


export default function AreaDetalhes() {

	const areaControleService = useAreaControleService();
	const params = useParams();
	const id = Number(params?.id);
	const router = useRouter();
	
	const [area, setArea] = useState<AreaControle>({
		nome: "",
		sugestoes: [],
		perguntas: [],
		status: undefined,
		pontuacao: 0
	});

	// estado SOMENTE para edição
	const [nomeEdit, setNomeEdit] = useState<string>("");
	const [sugestoesEdit, setSugestoesEdit] = useState<string[]>([]);
	const [perguntasEdit, setPerguntasEdit] = useState<string[]>([]);
	const [statusSelecionado, setStatusSelecionado] = useState<StatusArea>();
	const [telaEdicao, setTelaEdicao] = useState<boolean>(false);
	const [pontuacao, setPontuacao] = useState<number>(0);

	useEffect(() => {
		if (!isNaN(id)) {
			searchArea(id);
		}
	}, [id]);

	async function searchArea(id: number) {
		const response = await areaControleService.getAreaControle(id);
		setArea(response);

		setNomeEdit(response.nome);
		setSugestoesEdit(response.sugestoes.map(s => s.descricao));
		setPerguntasEdit(response.perguntas.map(p => p.textoPergunta));
		setStatusSelecionado(response.status!);
		setPontuacao(response.pontuacao!);
	}

	// Atualiza sugestão específica
	const handleSugestaoChange = (index: number, value: string) => {
		setSugestoesEdit(prev => {
			const copia = [...prev];
			copia[index] = value;
			return copia;
		});
	};

	const handlePerguntaChange = (index: number, value: string) => {
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

	const addPergunta = () => {
		setPerguntasEdit(prev => [...prev, ""]);
	};

	const removePergunta = (index: number) => {
		setPerguntasEdit(prev => prev.filter((_, i) => i !== index));
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


		console.log("Pontuação :", pontuacao)

		// monta payload no formato do backend
		const areaControlePayload = {

			id: area.id, // 🔥 FUNDAMENTAL no update
			nome: nomeEdit,
			sugestoes: sugestoesValidas.map(descricao => ({
				descricao
			})),
			perguntas: perguntasEdit.map(textoPergunta => ({
				textoPergunta
			})),
			status: statusSelecionado,
			pontuacao: area.pontuacao
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
				})),
				pontuacao: pontuacao
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

				{/* ===== HEADER ===== */}
				<div className="w-full flex flex-col gap-2 border-b pb-4">
				<h1 className="text-2xl font-bold">{area.nome}</h1>

				<div className="flex flex-wrap items-center gap-4">
					<StatusBadge status={statusSelecionado!} />

					<div className="px-3 py-1 rounded bg-white shadow text-sm font-medium">
					Pontuação:
					<span className="font-bold ml-1">{area.pontuacao}</span>
					</div>

					<span className="text-sm text-gray-600">
					Criado em: {area.dataCriacao}
					</span>
				</div>
				</div>

				{/* ===== CONTEÚDO ===== */}
				<InfoBlock
				title="Sugestões"
				items={area.sugestoes.map(s => s.descricao)}
				/>

				<InfoBlock
				title="Perguntas"
				items={area.perguntas.map(p => p.textoPergunta)}
				/>

				{/* ===== AÇÕES ===== */}
				<div className="w-full flex justify-between pt-6 border-t">
				<NewButton
					label="VOLTAR"
					onClick={() => router.push(`/inicial/${1}`)}
				/>

				<NewButton
					label="EDITAR"
					onClick={() => setTelaEdicao(true)}
				/>
				</div>

			</ContainerCriacao>
			)}

			{/* ===== EDIÇÃO ===== */}
			{telaEdicao && (
				<ContainerCriacao>
	'				<div className="flex flex-col gap-6 w-full">

						{/* ===== NOME DA ÁREA ===== */}
						<Input
						label="Nome da área"
						value={nomeEdit}
						onChange={(e) => setNomeEdit(e.target.value)}
						/>

						{/* ===== SUGESTÕES ===== */}
						<div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
						<h2 className="font-semibold text-lg">Sugestões</h2>

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
								className="text-red-500 text-sm"
								onClick={() => removeSugestao(index)}
								disabled={sugestoesEdit.length === 1}
							>
								Remover
							</button>
							</div>
						))}

						<button
							className="text-blue-600 text-sm self-start"
							onClick={addSugestao}
						>
							+ Adicionar sugestão
						</button>
						</div>

						{/* ===== PERGUNTAS ===== */}
						<div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
						<h2 className="font-semibold text-lg">Perguntas</h2>

						{perguntasEdit.map((pergunta, index) => (
							<div key={index} className="flex gap-2 items-center">
							<Input
								label={`Pergunta ${index + 1}`}
								value={pergunta}
								onChange={(e) =>
								handlePerguntaChange(index, e.target.value)
								}
							/>

							<button
								className="text-red-500 text-sm"
								onClick={() => removePergunta(index)}
								disabled={perguntasEdit.length === 1}
							>
								Remover
							</button>
							</div>
						))}

						<button
							className="text-blue-600 text-sm self-start"
							onClick={addPergunta}
						>
							+ Adicionar pergunta
						</button>
						</div>

						{/* ===== STATUS ===== */}
						<div className="flex items-center gap-4">
						<span className="font-semibold">Status da área:</span>
						<BasicSelect
							value={statusSelecionado!}
							onChange={setStatusSelecionado}
						/>
						</div>

						{/* ===== AÇÕES ===== */}
						<div className="flex gap-4 justify-end pt-4 border-t">
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

