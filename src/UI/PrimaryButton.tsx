import React from "react";
import tailwindConfig from "../../tailwind.config";
import { Button } from "@mui/material";

const PrimaryButton = ( props ) => {
    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: tailwindConfig.theme.extend.colors.colorOne,
                    color: "White",
                    textTransform: "none",
                    "&:hover": {
                        color: "white",
                        backgroundColor: tailwindConfig.theme.extend.colors.colorOne,
                    },
                }}
                className={`${props.className} text-gray-700 rounded-md transition-colors duration-500 shadow gap-2 font-medium`}
                onClick={props.onClickFunc}
                type={props.type}
            >
                {props.logo} {"  "}
                {props.value}
            </Button>
        </>
    );
};

export default PrimaryButton;