import React from "react";
import tailwindConfig from "../../tailwind.config";

const PrimaryButton = ( props ) => {
    return (
        <>
            <button
                variant="contained"
                sx={{
                    backgroundColor: tailwindConfig.theme.extend.colors.colorThree,
                    color: "black",
                    textTransform: "none",
                    "&:hover": {
                        color: "white",
                        backgroundColor: tailwindConfig.theme.extend.colors.colorOne,
                    },
                }}
                className={`${props.className} text-gray-700 rounded-md transition-colors duration-500 shadow gap-2 font-medium`}
                onClick={props.onClickFunc}
            >
                {props.logo} {"  "}
                {props.value}
            </button>
        </>
    );
};

export default PrimaryButton;