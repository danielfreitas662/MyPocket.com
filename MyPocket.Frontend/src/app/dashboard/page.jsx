import { PageTitle } from 'components';
import React from 'react';
import styles from './page.module.scss';
function Dashboard() {
  return (
    <div className={styles.body}>
      <PageTitle>Dashboard</PageTitle>
    </div>
  );
}

export default Dashboard;
