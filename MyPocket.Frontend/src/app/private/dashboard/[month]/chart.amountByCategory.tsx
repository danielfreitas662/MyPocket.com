'use client';
import { Card } from '@/components';
import { getAmountByCategory } from '@/services/api/dashboard';
import { CategoryType } from '@/types/category';
import { currencyFormat } from '@/utils/formaters';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function AmountByCategoryChart({ month, type, title }: { month: string; type: CategoryType; title: string }) {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  useEffect(() => {
    getAmountByCategory(month, type).then((res) => {
      setData(res.data?.map((c) => c.amount) || []);
      setLabels(res.data?.map((c) => c.category) || []);
    });
  }, []);
  const options: ApexOptions = {
    labels: labels,
    tooltip: {
      y: {
        formatter: (val) => currencyFormat(val, 'pt-BR'),
      },
    },
  };
  return (
    <Card title={title} align="center" style={{ minWidth: 400 }}>
      <ReactApexChart options={options} series={data} type="pie" height={500} width={400} />
    </Card>
  );
}

export default AmountByCategoryChart;
