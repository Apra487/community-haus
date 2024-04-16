'use client';
import React from 'react';

interface Props {}

const DashboardBlockCard: React.FC<Props> = () => {
  return (
    <div className="p-7 bg-[#121f02] w-[220px] h-[220px] rounded-xl border border-brand-green-bright">
      <p className="text-lg mb-6 font-bold tracking-widest text-[#8EFF01]">
        Revenue
      </p>
      <div className="flex items-center mb-6">
        <img src="/assets/icons/drop.svg" alt="drop" />
        <p className="text-2xl font-bold ml-1 text-3xl text-[#fff]">5.00</p>
        <p className="text-xs font-light self-end ml-1 text-[#8C8C8C]">DROP</p>
      </div>
      <button className="text-[#fff] w-full bg-[#000] py-3 rounded-xl flex justify-center items-center border-l-2 border-t-2 border-b-2 border-accent border-opacity-40">
        <img
          className="mr-2"
          src="/assets/icons/green-arrow-up.svg"
          alt="green-arrow-up"
        />
        12.3%
      </button>
    </div>
  );
};

export default DashboardBlockCard;
