import { Col, MonthPicker, Row } from '@/components';
import React from 'react';
import AmountByCategoryChart from './chart.amountByCategory';
import ResultByMonth from './chart.resultByMonth';
import TransactionsByMonth from './chart.transactionsByMonth';
import { CategoryType } from '@/types/category';

function Dashboard({ params: { month } }: { params: { month: string } }) {
  return (
    <Row gutter={[8, 8]} justifyContent="center">
      <Col>
        <TransactionsByMonth month={month} type={1} title="Total Income" />
      </Col>
      <Col>
        <TransactionsByMonth month={month} type={0} title="Total Outcome" />
      </Col>
      <Col>
        <AmountByCategoryChart month={month} type={CategoryType.Outcome} title="Expenses By Category" />
      </Col>
      <Col>
        <AmountByCategoryChart month={month} type={CategoryType.Income} title="Income By Category" />
      </Col>
      <Col>
        <ResultByMonth month={month} title="Result by Month" />
      </Col>
    </Row>
  );
}

export default Dashboard;
