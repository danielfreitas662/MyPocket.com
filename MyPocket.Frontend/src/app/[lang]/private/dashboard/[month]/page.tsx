import { Col, Row } from '@/components';
import React from 'react';
import AmountByCategoryChart from './chart.amountByCategory';
import ResultByMonth from './chart.resultByMonth';
import TransactionsByMonth from './chart.transactionsByMonth';
import { CategoryType } from '@/types/category';
import CategoryExpensesByMonth from './chart.categoryExpenseByMonth';
import { useTranslations } from 'next-intl';

function Dashboard({ params: { month } }: { params: { month: string } }) {
  const t = useTranslations('Dashboard');
  return (
    <div>
      <Row gutter={[8, 8]} wrap>
        <Col flex="1 0 400px">
          <TransactionsByMonth month={month} type={CategoryType.Income} title={t('chart1.title')} />
        </Col>
        <Col flex="1 0 400px">
          <TransactionsByMonth month={month} type={CategoryType.Expense} title={t('chart2.title')} />
        </Col>
        <Col flex="1 0 400px">
          <AmountByCategoryChart month={month} type={CategoryType.Expense} title={t('chart3.title')} />
        </Col>
        <Col flex="1 0 400px">
          <AmountByCategoryChart month={month} type={CategoryType.Income} title={t('chart4.title')} />
        </Col>
        <Col flex="1 0 400px">
          <ResultByMonth month={month} title={t('chart5.title')} />
        </Col>
        <Col flex="1 0 400px">
          <CategoryExpensesByMonth month={month} title={t('chart6.title')} />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
