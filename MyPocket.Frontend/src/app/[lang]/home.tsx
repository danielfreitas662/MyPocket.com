import Link from 'next/link';
import styles from './page.module.scss';
import Image from 'next/image';
import home3 from '../../images/home/home3.png';
import chart from '../../images/home/chart.svg';
import calendar from '../../images/home/calendar.svg';
import upload from '../../images/home/upload.svg';
import why from '../../images/home/why.png';

function UnAuthHome({ content }: { content: any }) {
  return (
    <div className={styles.page}>
      <section className={styles.presentation}>
        <div className={styles.description}>
          <div className={styles.title}>{content('section1.title')}</div>
          <div>{content('section1.description')}</div>
          <Link href="/signup">
            <div className={styles.link}>{content('signupfree')}</div>
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
          <div className={styles.title}>{content('section2.item1.title')}</div>
          <div className={styles.text}>{content('section2.item1.description')}</div>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <Image src={calendar} alt="chart" height={70} />
          </div>
          <div className={styles.title}>{content('section2.item2.title')}</div>
          <div className={styles.text}>{content('section2.item2.description')}</div>
        </div>
        <div className={styles.feature}>
          <div className={styles.icon}>
            <Image src={upload} alt="chart" height={70} />
          </div>
          <div className={styles.title}>{content('section2.item3.title')}</div>
          <div className={styles.text}>{content('section2.item3.description')}</div>
        </div>
      </section>
      <section className={styles.why}>
        <div className={styles.title}>{content('section3.title')}</div>
        <div className={styles.body}>
          <div className={styles.image}>
            <Image src={why} alt="chart" height={200} />
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.title}>{content('section3.item1.title')}</div>
              <div className={styles.description}>{content('section3.item1.description')}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>{content('section3.item2.title')}</div>
              <div className={styles.description}>{content('section3.item2.description')}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>{content('section3.item3.title')}</div>
              <div className={styles.description}>{content('section3.item3.description')}</div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Link href="/signup">
          <div className={styles.link}>{content('signupfree')}</div>
        </Link>
      </section>
    </div>
  );
}
export default UnAuthHome;
