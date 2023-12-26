import NeuTitle from '../common/NeuTitle';
import gStyles from './AboutGlobal.module.scss';
import styles from './Experience.module.scss';

export default function Experience() {
  return (
    <section className={gStyles.section}>
      <NeuTitle text="Experience" className="observe" />
      <div className={gStyles.content} style={{ marginBottom: 0 }}>
        <div className={`${styles.role} observe text`}>
          <h2>Software Engineer&ensp;</h2>
          <h3>
            <span>@TmaxOffice, TmaxA&C</span>
            <span className={styles.help}>?</span>
          </h3>
          <p className={styles['sub-desc']}>
            <span>2019.08 ~ 2023.05</span>
          </p>
        </div>
        <div className={`${styles.project} observe text`}>
          <h3>SuperOffice Project</h3>
          <p className={styles['sub-desc']}>2021.02 ~ 2023.05</p>
          <p>A web/electron document editing apps</p>
          <p>description</p>
          <ul>
            <li>aaaa</li>
            <li>aaaa</li>
            <li>aaaa</li>
            <li>aaaa</li>
          </ul>
        </div>
        <div
          className={`${styles.project} observe text`}
          style={{ marginBottom: 0 }}
        >
          <h3>ToOffice Projcet</h3>
          <p className={styles['sub-desc']}>2019.08 ~ 2021.10</p>
          <p>A desktop document editing software for Windows / Linux OS</p>
          <p>description</p>
          <ul>
            <li>aaaa</li>
            <li>aaaa</li>
            <li>aaaa</li>
            <li>aaaa</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
