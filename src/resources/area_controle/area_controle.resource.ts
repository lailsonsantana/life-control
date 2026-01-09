import { Pergunta } from "../pergunta/pergunta.resource";
import { Sugestao } from "../sugestao/sugestao.resource";
import { StatusArea } from "./status_area";


export class AreaControle {
	id?: number;
	nome: string;
	sugestoes: Sugestao[];
	perguntas: Pergunta[];
	status?: StatusArea;
	dataCriacao?: string;
	pontuacao?: number

	constructor(
		id: number,
		nome: string,
		sugestoes: Sugestao[],
		perguntas: Pergunta[],
		status: StatusArea,
		dataCriacao: string,
		pontuacao: number
	) {
		this.id = id;
		this.nome = nome;
		this.sugestoes = sugestoes;
		this.perguntas = perguntas;
		this.status = status;
		this.dataCriacao = dataCriacao;
		this.pontuacao = pontuacao;
	}
}
