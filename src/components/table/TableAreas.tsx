"use client";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAreaControleService } from '@/resources/area_controle/area_controle.service';
import { useEffect, useState } from 'react';
import { AreaControle } from '@/resources/area_controle/area_controle.resource';
import Button1 from '@mui/material/Button';
import Link from 'next/link';
import Status from '../status/Status';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.secondary.dark,
		color: theme.palette.common.white,
		fontSize: 18,
		textAlign: "center",      // 👈 centraliza cabeçalho
    	//verticalAlign: "middle",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 16,
		textAlign: "center",
		verticalAlign: "middle",
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));


export default function CustomizedTables() {
	const useAreaControlService = useAreaControleService();
	const [areas, setAreas] = useState<AreaControle[]>([]);
	const [itemSelecionadoS, setItemSelecionadoS] = useState<number | null>(null);
	const [itemSelecionadoP, setItemSelecionadoP] = useState<number | null>(null);

	useEffect(() => {
		searchAreas();
	}, []);

	async function searchAreas() {
		const response = await useAreaControlService.getAllAreasControle();
		setAreas(response);
	}

	/* ===== Renderização das sugestões ===== */

	function mostrarPerguntas() {
		if (itemSelecionadoP === null) return null;

		const area = areas.find((a) => a.id === itemSelecionadoP);
		if (!area) return null;

		const perguntas = area.perguntas;

		return (
			<div className="mt-6 w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-4">

			{/* Header */}
			<div className="flex items-center justify-between mb-3 border-b pb-2">
				<h2 className="font-semibold text-lg">Perguntas</h2>
				<span className="text-sm text-gray-500">
				{perguntas.length} {perguntas.length === 1 ? "pergunta" : "perguntas"}
				</span>
			</div>

			{/* Conteúdo */}
			{perguntas.length === 0 ? (
				<p className="text-sm text-gray-500">
				Nenhuma pergunta cadastrada para esta área.
				</p>
			) : (
				<ul className="space-y-3">
				{perguntas.map((p) => (
					<li
					key={p.id}
					className="bg-gray-50 rounded p-3 text-sm leading-relaxed"
					>
					{p.textoPergunta}
					</li>
				))}
				</ul>
			)}
			</div>
		);
	}



	function mostrarSugestoes() {
		if (itemSelecionadoS === null) return null;

		const area = areas.find((a) => a.id === itemSelecionadoS);
		if (!area) return null;

		const sugestoes = area.sugestoes;

		return (
				<div className="mt-6 w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-4">

				{/* Header */}
				<div className="flex items-center justify-between mb-3 border-b pb-2">
					<h2 className="font-semibold text-lg">Sugestões</h2>
					<span className="text-sm text-gray-500">
					{sugestoes.length} {sugestoes.length === 1 ? "item" : "itens"}
					</span>
				</div>

				{/* Conteúdo */}
				{sugestoes.length === 0 ? (
					<p className="text-sm text-gray-500">
					Nenhuma sugestão cadastrada para esta área.
					</p>
				) : (
					<ul className="space-y-2">
					{sugestoes.map((s) => (
						<li
						key={s.id}
						className="flex items-start gap-2 bg-gray-50 rounded p-2"
						>
						<span className="text-blue-500 font-bold">•</span>
						<span>{s.descricao}</span>
						</li>
					))}
					</ul>
				)}
				</div>
			);
		}



	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<StyledTableCell>Área de Controle</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell>Sugestões</StyledTableCell>
							<StyledTableCell>Perguntas</StyledTableCell>
							<StyledTableCell>Pontuação</StyledTableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{areas.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell>
									<Link href={`/area-detalhe/${row.id}`}>
									<h3 className='font-bold text-lg'>
										{row.nome}
									</h3>
									</Link>
								</StyledTableCell>

								<StyledTableCell>
									<div className="flex items-center justify-center gap-2">
										<Status text={row.status!} />
									</div>
								</StyledTableCell>

								<StyledTableCell>
									<Button1 onClick={() => setItemSelecionadoS(row.id!)}>
										Ver 
									</Button1>
								</StyledTableCell>
									
								<StyledTableCell>
									<Button1 onClick={() => setItemSelecionadoP(row.id!)}>
										Ver 
									</Button1>
								</StyledTableCell>

								<StyledTableCell>
									{row.pontuacao}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<div className='flex flex-row gap-32'>
				{itemSelecionadoS && mostrarSugestoes()}

				{itemSelecionadoP && mostrarPerguntas()}
			</div>

			
		</>
	);

}




