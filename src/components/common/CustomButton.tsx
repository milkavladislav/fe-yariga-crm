import { Button } from "@pankod/refine-mui";
import { CustomButtonProps } from "interfaces/common";
import React from "react";

const CustomButton = ({
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  handleClick,
}: CustomButtonProps) => {
  return (
    <Button
      sx={{
        flex: fullWidth ? 1 : "unset",
        padding: "10px 15px",
        width: fullWidth ? "100%" : "fit-content",
        minWidth: 130,
        backgroundColor,
        color,
        fontWeight: 600,
        fontSize: 16,
        gap: "10px",
        textTransform: "capitalize",
        "&:hover": { backgroundColor, opacity: 0.9 },
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
};

export default CustomButton;
