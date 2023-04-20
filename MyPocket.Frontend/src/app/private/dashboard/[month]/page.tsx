import { Col, Row } from '@/components';
import React from 'react';
import AmountByCategoryChart from './chart.amountByCategory';
import ResultByMonth from './chart.resultByMonth';
import TransactionsByMonth from './chart.transactionsByMonth';
import { CategoryType } from '@/types/category';
import CategoryExpensesByMonth from './chart.categoryExpenseByMonth';

function Dashboard({ params: { month } }: { params: { month: string } }) {
  return (
    <div>
      <Row gutter={[8, 8]} wrap>
        <Col flex="1 0 400px">
          <TransactionsByMonth month={month} type={CategoryType.Income} title="Total Income" />
        </Col>
        <Col flex="1 0 400px">
          <TransactionsByMonth month={month} type={CategoryType.Expense} title="Total Expenses" />
        </Col>
        <Col flex="1 0 400px">
          <AmountByCategoryChart month={month} type={CategoryType.Expense} title="Expenses By Category" />
        </Col>
        <Col flex="1 0 400px">
          <AmountByCategoryChart month={month} type={CategoryType.Income} title="Income By Category" />
        </Col>
        <Col flex="1 0 400px">
          <ResultByMonth month={month} title="Result by Month" />
        </Col>
        <Col flex="1 0 400px">
          <CategoryExpensesByMonth month={month} title="Expenses by Category" />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
