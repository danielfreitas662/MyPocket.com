import React from 'react';
import AmountByCategoryChart from './amountByCategoryChart';

function Dashboard({ params: { month } }: { params: { month: string } }) {
  return (
    <div>
      {/*@ts-ignore */}
      <AmountByCategoryChart month={month} />
    </div>
  );
}

export default Dashboard;
