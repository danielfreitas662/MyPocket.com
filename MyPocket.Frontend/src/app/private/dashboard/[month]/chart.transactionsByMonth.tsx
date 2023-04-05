'use client';
import { Card } from '@/components';
import { getTransactionsByMonth } from '@/services/api/dashboard';
import { CategoryType } from '@/types/category';
import { currencyFormat } from '@/utils/formaters';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function IncomeByMonthChart({ month, type, title }: { month: string; type: CategoryType; title: string }) {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  useEffect(() => {
    getTransactionsByMonth(month, type).then((res) => {
      setData(res.data?.map((c) => c.amount));
      setLabels(res.data?.map((c) => c.date));
    });
  }, []);
  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 200,
      width: '100%',
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
    stroke: {
      curve: 'straight',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false,
      },
    },
    grid: { show: false },
    yaxis: {
      labels: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      style: { fontSize: '28px' },
      text: currencyFormat(
        data.reduce((a, b) => a + b, 0),
        'pt-BR'
      ),
    },
    tooltip: {
      y: {
        formatter: (val) => currencyFormat(val, 'pt-BR'),
      },
    },
  };
  return (
    <Card title={title}>
      <ReactApexChart options={options} series={[{ name: 'amount', data: data }]} type="area" width={380} />
    </Card>
  );
}

export default IncomeByMonthChart;
