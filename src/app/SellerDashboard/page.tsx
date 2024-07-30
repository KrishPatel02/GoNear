import { useUserData } from '@/Context/UserDataContext';
import React from 'react';

const page = () => {
  // const { state } = useUserData();

  // console.log("state from Seller Dashboard", state);

  return (
    <div className='min-h-screen w-full z-10 flex justify-center items-center'>
      <h1 className='relative text-4xl font-bold'>
        This is seller Dashboard
      </h1>
    </div>
  );
};

export default page;
