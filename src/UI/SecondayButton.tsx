import React from "react";
import tailwindConfig from "../../tailwind.config";
import { Button } from "@mui/material";

const SecondaryButton = (props) => {
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          color: tailwindConfig.theme.extend.colors.colorOne,
          border: "1px solid",
          borderColor: tailwindConfig.theme.extend.colors.colorOne,
          textTransform: "none",

          "&:hover": {
            borderColor: tailwindConfig.theme.extend.colors.colorOne,
            backgroundColor: tailwindConfig.theme.extend.colors.colorOne,
            color: "white",
          },

          "&.Mui-disabled": {
            backgroundColor: tailwindConfig.theme.extend.colors.colorThree,
            color: "white",
          },
        }}
        className={`${props.className} text-gray-700 rounded-md transition-colors duration-500 shadow gap-2 font-medium`}
        onClick={props.onClickFunc}
        type={props.type}
        disabled={props.disabled}
      >
        {props.icon} {"  "}
        {props.value}
      </Button>
    </>
  );
};

export default SecondaryButton;
