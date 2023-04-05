'use client';
import { Card } from '@/components';
import { getAmountByCategory } from '@/services/api/dashboard';
import { currencyFormat } from '@/utils/formaters';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
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
    <Card title="Expenses by Category">
      <ReactApexChart options={options} series={data} type="pie" width={380} />
    </Card>
  );
}

export default AmountByCategoryChart;
