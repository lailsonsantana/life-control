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
import { useSugestaoService } from '@/resources/sugestao/sugestao.service';
import { Sugestao } from '@/resources/sugestao/sugestao.resource';
import BasicSelect from '../select/Select';
import { StatusArea } from '@/resources/area_controle/status_area';
import Link from 'next/link';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    fontSize: 18
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
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
  const useSugestService = useSugestaoService();
  const useAreaControlService = useAreaControleService();
  const [areas, setAreas] = useState<AreaControle[]>([]);
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);

  useEffect(() => {
    searchAreas();
    searchSugestoes();
  }, []);

  async function searchAreas() {
    const response = await useAreaControlService.getAllAreasControle();
    setAreas(response);
  }

  async function searchSugestoes() {
    const response = await useSugestService.getAllSugestoes();
    setSugestoes(response);
  }

  /* ===== Atualizar status de uma área ===== */

  async function atualizarStatus(area: AreaControle, novoStatus: StatusArea) {
  const statusAnterior = area.status;

    // Atualização otimista (UI primeiro)
    setAreas((prev) =>
      prev.map((a) =>
        a.id === area.id
          ? { ...a, status: novoStatus }
          : a
      )
    );

    try {
      await useAreaControlService.changeStatus(
        area.id!,
        novoStatus
      );
    } catch (error) {
      console.error("Erro ao atualizar status", error);

      // rollback em caso de erro
      setAreas((prev) =>
        prev.map((a) =>
          a.id === area.id
            ? { ...a, status: statusAnterior }
            : a
        )
      );
    }
  }
    

  /* ===== Renderização das sugestões ===== */

  function mostrarSugestoes() {
    if (itemSelecionado === null) return null;

    const sugestoesDaArea = sugestoes.filter(
      (s) => s.areaControleId === itemSelecionado
    );

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Sugestões</h2>

        {sugestoesDaArea.length === 0 ? (
          <p>Nenhuma sugestão para esta área.</p>
        ) : (
          <ul className="list-disc ml-5">
            {sugestoesDaArea.map((s) => (
              <li key={s.id}>{s.descricao}</li>
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
              <StyledTableCell>ID</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {areas.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>
                  <Link href={`/area-detalhes/${row.id}`}>{row.nome}</Link>
                </StyledTableCell>

                <StyledTableCell>
                  <BasicSelect
                    value={row.status!}
                    onChange={(status) =>
                    atualizarStatus(row, status)
                    }
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <Button1 onClick={() => setItemSelecionado(row.id!)}>
                    Ver sugestões
                  </Button1>
                </StyledTableCell>

                <StyledTableCell>{row.id}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {itemSelecionado && mostrarSugestoes()}
    </>
  );

}




