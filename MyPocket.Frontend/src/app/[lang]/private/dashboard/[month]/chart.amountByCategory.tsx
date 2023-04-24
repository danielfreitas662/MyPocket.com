'use client';
import { Card } from '@/components';
import { getAmountByCategory } from '@/services/api/dashboard';
import { CategoryType } from '@/types/category';
import { currencyFormat } from '@/utils/formatters';
import { ApexOptions } from 'apexcharts';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import en from 'apexcharts/dist/locales/en.json';
import pt_BR from 'apexcharts/dist/locales/pt-br.json';

function AmountByCategoryChart({ month, type, title }: { month: string; type: CategoryType; title: string }) {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  useEffect(() => {
    getAmountByCategory(month, type).then((res) => {
      setData(res.data?.map((c) => c.amount) || []);
      setLabels(res.data?.map((c) => c.category) || []);
    });
  }, []);
  const locale = useLocale();
  const t = useTranslations('Dashboard');
  const options: ApexOptions = {
    chart: {
      defaultLocale: locale.toLowerCase(),
      locales: [en, pt_BR],
    },
    labels: labels,
    tooltip: {
      y: {
        formatter: (val) => currencyFormat(val, locale),
      },
    },
  };
  return (
    <Card title={title} align="center" style={{ minWidth: 400, minHeight: 300 }}>
      <ReactApexChart options={options} series={data} type="pie" height={500} width={400} />
    </Card>
  );
}

export default AmountByCategoryChart;
