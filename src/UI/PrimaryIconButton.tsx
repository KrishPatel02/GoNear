import React from "react";

import IconButton from "@mui/material/IconButton";

const PrimaryIconButton = (props) => {
  return (
    <>
      <IconButton
        aria-label={props.label}
        sx={{
          backgroundColor: `${props.bgColor}`,
          borderRadius: "5px",
          color: `${props.color}`,
        }}
      >
        {props.icon}
      </IconButton>
    </>
  );
};

export default PrimaryIconButton;
