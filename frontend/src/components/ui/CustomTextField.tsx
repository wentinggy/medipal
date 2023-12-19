import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface CustomTextFieldProps
  extends Omit<TextFieldProps, "fullWidth" | "size"> {
  fullWidth?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      size="small"
      variant="outlined"
      margin="normal"
      {...props}
    />
  );
};

export default CustomTextField;
