import React from "react";

const GridCard = ({count}:any) => {
  return (
    <>
      
        <div
          
          className={`bg-white rounded-lg shadow-md p-6 border-l-4 `}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total User</h3>
            <div className={`p-2 rounded-lg ${card.iconBg}`}>{card.icon}</div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1"></p>
          
        </div>
     
    </div>
  );
};

export default GridCard;
