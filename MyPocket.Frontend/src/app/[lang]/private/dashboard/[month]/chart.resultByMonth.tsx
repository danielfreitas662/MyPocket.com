'use client';
import { Card } from '@/components';
import { getResultsByMonth } from '@/services/api/dashboard';
import { currencyFormat } from '@/utils/formatters';
import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import en from 'apexcharts/dist/locales/en.json';
import pt_BR from 'apexcharts/dist/locales/pt-br.json';
import { useLocale, useTranslations } from 'next-intl';

function ResultByMonth({ month, title }: { month: string; title: string }) {
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const t = useTranslations('Dashboard');
  useEffect(() => {
    getResultsByMonth(moment(month).utc().format('YYYY-MM-DD')).then((res) => {
      setSeries([
        { name: t('chart5.income'), data: res?.data.map((c) => c.income) },
        { name: t('chart5.expenses'), data: res?.data.map((c) => c.expense) },
        { name: t('chart5.result'), data: res?.data.map((c) => c.result) },
      ]);
      setLabels(res.data?.map((c) => moment(c.date).format('MMM-YYYY')));
    });
  }, []);
  const locale = useLocale();

  const options: ApexOptions = {
    chart: {
      locales: [en, pt_BR],
      defaultLocale: locale.toLowerCase(),
    },
    labels: labels,
    xaxis: {
      //type: 'datetime',
    },
    grid: { show: true },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: (val) => currencyFormat(val, locale),
      },
    },
    tooltip: {
      y: {
        formatter: (val) => currencyFormat(val, locale),
      },
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

export default ResultByMonth;
