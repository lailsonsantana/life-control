//import AlimentacaoIcon from "@/assets/icons/alimentacao.png";
import EspiritualidadeIcon from "@/assets/icons/jesus.png";
import InglesIcon from "@/assets/icons/english.png";
//import EstudoIcon from "@/assets/icons/estudo.png";
import DefaultIcon from "@/assets/icons/default.png";
import AlimentacaoIcon from "@/assets/icons/alimentacao.png";
import OrganizacaoIcon from "@/assets/icons/organizacao.png"
import RelacionamentosIcon from "@/assets/icons/relacionamentos.png"
import ComunicacaoIcon from "@/assets/icons/comunicacao.png"
import InteracaoIcon from "@/assets/icons/interacao.png"
import EstudoIcon from "@/assets/icons/estudo.png"
import DsicplinaIcon from "@/assets/icons/disciplina.png"


const AREA_ICON_MAP: Record<string, string> = {
  ALIMENTACAO: AlimentacaoIcon.src,
  ESPIRITUALIDADE: EspiritualidadeIcon.src,
  INGLES: InglesIcon.src,
  ORGANIZACAO: OrganizacaoIcon.src,
  RELACIONAMENTOS: RelacionamentosIcon.src,
  COMUNICACAO: ComunicacaoIcon.src,
  INTERACAOSOCIAL: InteracaoIcon.src,
  ESTUDO: EstudoIcon.src,
  DISCIPLINA: DsicplinaIcon.src
};


export function normalizeAreaName(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}


export function getAreaIcon(nomeArea?: string): string {
  if (!nomeArea) return DefaultIcon.src;

  const key = normalizeAreaName(nomeArea);

  return AREA_ICON_MAP[key] ?? DefaultIcon.src;
}
