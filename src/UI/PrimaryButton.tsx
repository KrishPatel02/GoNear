import React from "react";
import tailwindConfig from "../../tailwind.config";
import { Button } from "@mui/material";

const PrimaryButton = (props) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: tailwindConfig.theme.extend.colors.colorOne,

          color: "white",

          textTransform: "none",

          "&:hover": {
            color: "white",

            backgroundColor: tailwindConfig.theme.extend.colors.colorOne,
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
        {props.logo} {"  "}
        {props.value}
      </Button>
    </>
  );
};

export default PrimaryButton;
