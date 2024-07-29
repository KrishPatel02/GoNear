"use client";
import tailwindConfig from "../../tailwind.config";
const GlobalLayout = ({ children }) => {
  return (
    <>
      <div className="absolute w-[200px] h-[200px] bg-colorOne rounded-full blur-[80px] top-[50%] left-[10%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute w-[200px] h-[200px] bg-colorOne rounded-full blur-[70px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute w-[200px] h-[200px] bg-colorOne rounded-full blur-[80px] top-[80%] left-[70%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute w-[150px] h-[150px] bg-colorTwo rounded-full blur-[80px] top-[40%] left-[90%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute w-[150px] h-[150px] bg-colorTwo rounded-full blur-[80px] top-[70%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"></div>
      <div className="absolute z-10 w-full h-full">
        {children}
      </div>
    </>
  );
};

export default GlobalLayout;
