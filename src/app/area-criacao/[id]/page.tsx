'use client'

import NewButton from "@/components/button/NewButton";
import ContainerCriacao from "@/components/container/ContainerCriacao"
import Input from "@/components/input/Input"
import Subtitle from "@/components/title/Subtitle"
import { useAreaControleService } from "@/resources/area_controle/area_controle.service";
import { useRouter } from 'next/navigation';
import { useState } from "react";


export default function AreaCriacao() {

	const router = useRouter();
	const useAreaControlService = useAreaControleService();
	const [area, setArea] = useState("");
	const [inputSugestoes, setInputSugestoes] = useState([""]);
	const [inputPerguntas, setInputperguntas] = useState([""]);

	function incluirSugestao() {
		setInputSugestoes((prev) => [...prev, ""]);
	}

	function removerSugestao(index: number) {
		setInputSugestoes((prev) => prev.filter((_, i) => i !== index));
	}

	function incluirPergunta() {
		setInputperguntas((prev) => [...prev, ""]);
	}

	function removerPergunta(index: number) {
		setInputperguntas((prev) => prev.filter((_, i) => i !== index));
	}

	function handlePerguntaChange(index: number, value: string) {
		setInputperguntas((prev) =>
			prev.map((item, i) => (i === index ? value : item))
		);
	}

	function handleSugestaoChange(index: number, value: string) {
		setInputSugestoes((prev) =>
			prev.map((item, i) => (i === index ? value : item))
		);
	}


	async function handleSubmit() {
		// evita submit inválido
		if (!area.trim()) {
			console.warn("Nome da área é obrigatório");
			return;
		}

		const sugestoesValidas = inputSugestoes
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
			perguntas: inputPerguntas.map((textoPergunta) => ({
				textoPergunta,
			})),
		};

		try {
			await useAreaControlService.save(areaControle);
			setArea("");
			setInputSugestoes([""]);
			setInputperguntas([""])

			console.log("Payload enviado:", areaControle);
		} catch (error) {
			console.error("Erro ao salvar área de controle", error);
		}
	}



	return (
		<ContainerCriacao>

			{/* ===== CABEÇALHO ===== */}
			<div className="flex flex-col gap-4 w-full border-b border-b-gray-950 pb-4">
				<Subtitle text="Inserir uma nova área de controle" />

				<Input
					label="Área"
					value={area}
					onChange={(e) => setArea(e.target.value)}
				/>
			</div>

			{/* ===== SUGESTÕES & PERGUNTAS ===== */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

				{/* ===== SUGESTÕES ===== */}
				<div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
					<Subtitle text="Sugestões de melhoria" />

					{inputSugestoes.map((value, index) => (
						<div key={index} className="flex flex-col gap-1">
							<Input
								label={`Sugestão ${index + 1}`}
								value={value}
								onChange={(e) =>
									handleSugestaoChange(index, e.target.value)
								}
							/>

							<button
								className="text-red-500 text-sm self-start"
								onClick={() => removerSugestao(index)}
								disabled={inputSugestoes.length === 1}
							>
								Remover
							</button>
						</div>
					))}

					<button
						className="text-blue-600 text-sm self-start"
						onClick={incluirSugestao}
					>
						+ Incluir sugestão
					</button>
				</div>

				{/* ===== PERGUNTAS ===== */}
				<div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
					<Subtitle text="Perguntas de reflexão" />

					{inputPerguntas.map((value, index) => (
						<div key={index} className="flex flex-col gap-1">
							<Input
								label={`Pergunta ${index + 1}`}
								value={value}
								onChange={(e) =>
									handlePerguntaChange(index, e.target.value)
								}
							/>

							<button
								className="text-red-500 text-sm self-start"
								onClick={() => removerPergunta(index)}
								disabled={inputPerguntas.length === 1}
							>
								Remover
							</button>
						</div>
					))}

					<button
						className="text-blue-600 text-sm self-start"
						onClick={incluirPergunta}
					>
						+ Incluir pergunta
					</button>
				</div>

			</div>

			{/* ===== AÇÕES ===== */}
			<div className="flex justify-end gap-4 pt-6 border-t w-full">
				<NewButton
					label="Cancelar"
					onClick={() => router.push(`/inicial/${1}`)}
				/>

				<NewButton
					label="Criar"
					onClick={handleSubmit}
					type="submit"
				/>
			</div>

		</ContainerCriacao>

	);
}
