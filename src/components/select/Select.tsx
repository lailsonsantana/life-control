import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { StatusArea } from "@/resources/area_controle/status_area";


interface BasicSelectProps {
  value: StatusArea;
  onChange: (status: StatusArea) => void;
}

export default function BasicSelect({ value, onChange }: BasicSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as StatusArea);
  };

  return (
    <Box sx={{ minWidth: 40, maxWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Status</InputLabel>

        <Select value={value} label="Status" onChange={handleChange}>
          <MenuItem value="PESSIMO">Péssimo</MenuItem>
          <MenuItem value="RUIM">Ruim</MenuItem>
          <MenuItem value="RAZOAVEL">Razoável</MenuItem>
          <MenuItem value="BOM">Bom</MenuItem>
          <MenuItem value="OTIMO">Ótimo</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

