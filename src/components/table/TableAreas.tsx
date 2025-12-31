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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}



export default function CustomizedTables() {

  const useSugestService = useSugestaoService();
  const useAreaControlService = useAreaControleService();
  const [areas, setAreas] = useState<AreaControle[]>([]);
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);


  useEffect(() => {
    searchAreas();
    searchSugestoes();
  }, []);

  const rows = areas

  async function searchAreas(){
    const response = await useAreaControlService.getAllAreasControle();
    setAreas(response);
    console.log("AREAS CONTROLE")
    console.table(response)
  }

  async function searchSugestoes(){
    const response = await useSugestService.getAllSugestoes();
    setSugestoes(response);
    console.log("AREAS CONTROLE")
    console.table(response)
  }

  function mostrarSugestoes(){
    sugestoes
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Área de Controle</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Sugestão</StyledTableCell>
            <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.nome}
              </StyledTableCell>
              <StyledTableCell align="left">{row.nome}</StyledTableCell>
              <StyledTableCell align="left">
                <Button1>Ver sugestão</Button1>
              </StyledTableCell>
              <StyledTableCell align="left">{row.id}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



