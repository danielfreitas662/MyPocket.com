'use client';
import { Card } from '@/components';
import { getResultsByMonth } from '@/services/api/dashboard';
import { currencyFormat } from '@/utils/formatters';
import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function ResultByMonth({ month, title }: { month: string; title: string }) {
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  const [labels, setLabels] = useState<string[]>([]);
  useEffect(() => {
    getResultsByMonth(moment(month).utc().format('YYYY-MM-DD')).then((res) => {
      setSeries([
        { name: 'Income', data: res?.data.map((c) => c.income) },
        { name: 'Outcome', data: res?.data.map((c) => c.outcome) },
        { name: 'Result', data: res?.data.map((c) => c.result) },
      ]);
      setLabels(res.data?.map((c) => moment(c.date).format('MMM-YYYY')));
    });
  }, []);
  const options: ApexOptions = {
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
        formatter: (val) => currencyFormat(val, 'pt-BR'),
      },
    },
    tooltip: {
      y: {
        formatter: (val) => currencyFormat(val, 'pt-BR'),
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
