import { Sugestao } from "../sugestao/sugestao.resource";
import { StatusArea } from "./status_area";


export class AreaControle {
  id?: number;
  nome: string;
  sugestoes: Sugestao[];
  status?: StatusArea;

  constructor(
    id: number,
    nome: string,
    sugestoes: Sugestao[],
    status: StatusArea
  ) {
    this.id = id;
    this.nome = nome;
    this.sugestoes = sugestoes;
    this.status = status;
  }
}
