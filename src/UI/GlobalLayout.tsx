"use client";
import tailwindConfig from "../../tailwind.config";
const GlobalLayout = ({ children }) => {
  return (
    <>
      <div className="absolute w-[100px] h-[100px] bg-colorOne rounded-full blur-[80px] top-[50%] left-[35%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute w-[100px] h-[100px] bg-colorOne rounded-full blur-[80px] top-[50%] left-[65%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute w-[100px] h-[100px] bg-colorTwo rounded-full blur-[60px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute w-[100px] h-[100px] bg-colorOne rounded-full blur-[80px] top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute w-[100px] h-[100px] bg-colorOne rounded-full blur-[80px] top-[65%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"></div>

      <div className="absolute z-10 w-full h-full">{children}</div>
    </>
  );
};

export default GlobalLayout;
