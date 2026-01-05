import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface InputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};

export default Input;

