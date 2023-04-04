'use client';
import { Skeleton } from '@/components';
import { getAmountByCategory } from '@/services/api/dashboard';
import { currencyFormat } from '@/utils/formaters';
import { ApexOptions } from 'apexcharts';
import { Suspense, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function AmountByCategoryChart({ month }: { month: string }) {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  useEffect(() => {
    getAmountByCategory(month).then((res) => {
      setData(res.data?.map((c) => c.amount) || []);
      setLabels(res.data?.map((c) => c.category) || []);
    });
  }, []);
  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (val) => currencyFormat(val, 'pt-BR'),
      },
    },
  };
  return (
    <div>
      <ReactApexChart options={options} series={data} type="pie" width={380} />
    </div>
  );
}

export default AmountByCategoryChart;
