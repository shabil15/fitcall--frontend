import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children, 
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-xl">
      <div className="flex h-12 w-12 bg-black items-center justify-center mx-6 rounded-full ">
        {children}
      </div>

      <div className="mt-4 mx-6 flex  justify-between">
        <div>
          <h4 className="text-2xl font-bold text-black">{total}</h4>
          <span className="text-lg font-bold text-black ">{title}</span>
        </div>

        
      </div>
    </div>
  );
};

export default CardDataStats;
