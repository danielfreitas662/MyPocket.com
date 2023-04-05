'use client';
import { Card } from '@/components';
import { getResultsByMonth } from '@/services/api/dashboard';
import { currencyFormat } from '@/utils/formaters';
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
    chart: {
      type: 'bar',
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
  };
  return (
    <Card title={title}>
      <ReactApexChart options={options} series={series} type="bar" width={380} />
    </Card>
  );
}

export default ResultByMonth;
