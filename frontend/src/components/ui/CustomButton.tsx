import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  borderRadius?: number;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  children?: ReactNode;
}

function CustomButton({
  borderRadius = 8,
  backgroundColor = "#000000",
  padding = "0.25em 0.5em",
  fontSize = "1rem",
  children,
  ...rest
}: CustomButtonProps) {
  return (
    <Button
      style={{
        borderRadius,
        backgroundColor,
        padding,
        fontSize,
        color: "white",
        textTransform: "none",
      }}
      variant="contained"
      fullWidth
      {...rest}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
