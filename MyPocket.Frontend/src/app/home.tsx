import Link from 'next/link';
import styles from './page.module.scss';
import Image from 'next/image';
import home3 from '../images/home/home3.png';
import chart from '../images/home/chart.svg';
import calendar from '../images/home/calendar.svg';
import upload from '../images/home/upload.svg';
import why from '../images/home/why.png';

function UnauthHome() {
  return (
    <div className={styles.page}>
      <section className={styles.presentation}>
        <div className={styles.description}>
          <div className={styles.title}>Manage your finances is easier than you think!</div>
          <div>
            {`Welcome to MyPocket - the web application that makes managing your personal finances a breeze! With
              our real-time dashboards and custom budgeting tools, you can take control of your finances and achieve
              your financial goals.`}
          </div>
          <Link href="/signup">
            <div className={styles.link}>Sign up for a free account</div>
          </Link>
        </div>
        <div className={styles.image}>
          <Image src={home3} alt="finances" height={300} />
        </div>
      </section>
      <section className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <Image src={chart} alt="chart" height={70} />
          </div>
          <div className={styles.title}>Real-time dashboards</div>
          <div className={styles.text}>
            Keep track of your income and expenses with our easy-to-use dashboard. See where your money is going at a
            glance and make informed decisions about your spending.
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <Image src={calendar} alt="chart" height={70} />
          </div>
          <div className={styles.title}>Monthly budgets</div>
          <div className={styles.text}>
            Set budgets for each category of expense and track your progress throughout the month. Our app will help you
            stay on track and avoid overspending.
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <Image src={upload} alt="chart" height={70} />
          </div>
          <div className={styles.title}>Import OFX files</div>
          <div className={styles.text}>
            MyPocket can easily import OFX files generated by your bank, making it easy to keep all your financial
            information in one place.
          </div>
        </div>
      </section>
      <section className={styles.why}>
        <div className={styles.title}>Why Choosing Us?</div>
        <div className={styles.body}>
          <div className={styles.image}>
            <Image src={why} alt="chart" height={200} />
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.title}>Easy to use</div>
              <div className={styles.description}>
                Our app is designed to be intuitive and user-friendly, so you can get started right away.
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>Secure</div>
              <div className={styles.description}>
                Your financial information is important to us, which is why we use the latest security measures to keep
                your data safe.
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>Customizable</div>
              <div className={styles.description}>
                {`MyPocket can be customized to fit your unique financial situation. Whether you're a student, a small
                business owner, or a retiree, our app has the tools you need to manage your money.`}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Link href="/signup">
          <div className={styles.link}>Sign up for a free account</div>
        </Link>
      </section>
    </div>
  );
}
export default UnauthHome;
