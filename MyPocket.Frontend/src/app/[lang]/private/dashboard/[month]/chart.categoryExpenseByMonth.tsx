'use client';
import { Card } from '@/components';
import { getCategoryExpenses, getResultsByMonth } from '@/services/api/dashboard';
import { currencyFormat } from '@/utils/formatters';
import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function CategoryExpensesByMonth({ month, title }: { month: string; title: string }) {
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  useEffect(() => {
    getCategoryExpenses(moment(month).utc().format('YYYY-MM-DD')).then((res) => {
      setSeries([
        {
          name: t('chart6.expenses'),
          data: res?.data.map((c) => ({
            x: c.category,
            y: c.expenses,
            goals: [
              {
                name: t('chart6.budget'),
                value: c.budget,
                strokeWidth: 5,
                strokeColor: '#775DD0',
              },
            ],
          })),
        },
      ]);
    });
  }, []);
  const options: ApexOptions = {
    xaxis: {
      labels: {
        formatter: (val) => currencyFormat(Number(val), locale),
      },
    },
    grid: { show: true },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val) => currencyFormat(val, locale),
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: [t('chart6.expenses'), t('chart6.budget')],
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 400,
          },
        },
      },
      {
        breakpoint: 800,
        options: {
          chart: {
            width: 600,
          },
        },
      },
    ],
  };
  return (
    <Card title={title} align="center" style={{ minWidth: 400 }}>
      <ReactApexChart options={options} series={series} type="bar" height={400} width={800} />
    </Card>
  );
}

export default CategoryExpensesByMonth;
