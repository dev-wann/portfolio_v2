import Link from 'next/link';
import styles from './resume.module.scss';

export default function Resume() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <button>
          <Image />
        </button>
        <h1 className={styles.resumeTitle}>
          <span style={{ fontSize: '0.85em' }}>Frontend Developer</span>
          <br />
          조승완입니다.
        </h1>
        <div className={styles.info}>
          <div style={{ marginBottom: '1rem' }}>
            <h2>About</h2>
            <p style={{ wordBreak: 'keep-all' }}>
              Web / Electron 기반 문서 편집기를 개발하며 다양한 UI 기능 개발,
              client side 문서 정보 관리 방안 설계, client side 성능 개선 등의
              작업을 진행하였습니다. React, TypeScript를 이용한 SPA 개발에
              익숙하며 MobX를 이용한 상태 관리, Jest를 이용한 테스트 작성 경험이
              있습니다.
            </p>
          </div>
        </div>
        <div className={styles.info} style={{ paddingBottom: '0.4rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4em' }}>Interest</h2>
            <p>직관적으로 이해하기 쉽고 효율적이며</p>
            <p>자연스럽게 사용자의 행동을 유도하는</p>
            <p>UX/UI 개발에 관심이 많습니다.</p>
            <p>도전을 통해 성장할 기회를 찾고 있습니다.</p>
          </div>
          <div style={{ marginRight: '24px' }}>
            <h2 style={{ fontSize: '1.4em' }}>Contact</h2>
            <p>
              <Link href="mailto:swcho8220@gmail.com">
                Email: swcho8220@gmail.com
              </Link>
            </p>
            <p>Phone: 010-xxxx-xxxx</p>
            <p>
              <Link href="https://github.com/dev-wann">
                GitHub: https://github.com/dev-wann
              </Link>
            </p>
            <p>
              <Link href="https://dev-wann.tistory.com">
                Blog: https://dev-wann.tistory.com
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Work Experience</h1>
        <div className={styles.desc}>
          <div className={styles.row}>
            <div className={styles.row_left}>
              <h2>TmaxOffice</h2>
              <p>2020.08 ~ 2023.06</p>
              <p>연구원 / PK본부</p>
            </div>
            <div className={styles.row_right}>
              <h2>SuperOffice 개발</h2>
              <h3>Description</h3>
              <p>
                Web / Electron 문서 편집 앱인 &apos;SuperOffice&apos;를
                개발하였습니다. 실시간 다중 사용자 편집, 문서의 DB화, 다양한 OS
                및 브라우저 환경 지원, 다양한 확장자의 문서 호환 기능을
                제공합니다.
              </p>
              <p>서울시교육청 및 대한민국 육군본부에 도입되었습니다.</p>
              <h3>Responsibilities</h3>
              <ul>
                <li>
                  SuperWord(Word processor) 및 SuperPoint(Presentation) 앱의 표
                  공통 기능 개발 담당
                </li>
                <li>MVC 패턴의 client-side 문서 정보 관리 모델 설계 및 개발</li>
                <li>
                  20개 이상의 문서 편집 UI 기능을 개발하며 event handling,
                  command handling 로직 구현
                </li>
                <li>
                  Event loop를 활용한 JS 로직 개선 및 MobX observable 최적화를
                  통한 clinet-side 문서 편집 성능 개선 (~70%)
                </li>
                <li>
                  문서 pagination을 위한 Blink custom layout algorithm 개발
                </li>
                <li>실시간 다중 사용자 편집 기능 개발</li>
              </ul>
              <h3>Tech Stack</h3>
              <p>React, TypeScript, MobX, Jest, C++(Blink)</p>
            </div>
          </div>
          <hr style={{ margin: '20px 0' }} />
          <div className={styles.row}>
            <div className={styles.row_left}>
              <h2>TmaxA&C</h2>
              <p>2019.08 ~ 2020.08</p>
              <p>연구원 / PK본부</p>
            </div>
            <div className={styles.row_right}>
              <h2>ToOffice 개발</h2>
              <h3>Description</h3>
              <p>
                Desktop 문서 편집 프로그램인 &apos;ToOffice&apos;를
                개발하였습니다. Windows, Linux 등 다양한 OS 환경 지원, 다양한
                확장자의 문서 호환을 제공합니다.
              </p>
              <p>특허청 및 한국교육학술정보원에 도입되었습니다.</p>
              <h3 style={{ pageBreakBefore: 'always' }}>Responsibilities</h3>
              <ul>
                <li>
                  ToWord(Word processor), ToPoint(Presentation)의 표 기능 및
                  ToCell(spreadsheet)의 표 서식 기능 개발 담당
                </li>
                <li>
                  Document layout algorithm 및 10개 이상의 문서 편집 UI 기능
                  개발
                </li>
                <li>
                  State 관리를 통한 layout algorithm 로직 개선을 통한 프로그램
                  레이아웃 성능 개선 (~30%)
                </li>
                <li>doc, docx, doch, hwp 확장자의 parser, writer 구현</li>
                <li>Legacy code refactoring</li>
              </ul>
              <h3>Tech Stack</h3>
              <p>C++</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Other Experience</h1>
        <div className={styles.desc_other}>
          <h2>Portfolio Page</h2>
          <Link href={'/'}>
            <p>https://portfolio-dev-wann.vercel.app/</p>
          </Link>
          <p>2023.07 ~ 2023.08</p>
          <h3>Description</h3>
          <p>
            Next.js framework 및 TypeScript를 사용해 제작한 포트폴리오 페이지
          </p>
          <p>심플하면서도 다양한 사용자 인터랙션을 구현하고자 함</p>
          <p>canvas를 이용한 애니메이션 구현</p>
          <h3>Tech Stack</h3>
          <p>Next.js, TypeScript</p>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Skills</h1>
        <div className={styles.desc_other}>
          <h2>Overall</h2>
          <p>
            프론트엔드는 사용자 경험에 가장 큰 영향을 주는 파트라고 생각합니다.
          </p>
          <p>
            사용자를 효과적으로 끌어들일 수 있으면서도, 사소한 불편함이 가랑비에
            옷 젖는 줄 모르듯이 쌓여가다 결국 떠나가게도 할 수도 있습니다.
          </p>
          <p>
            그렇기에 기능 개발 시 이 기능을 사용자가 논리적으로 납득할 수 있을지
            항상 고민하고, 작은 부분에서부터 좋은 사용성을 제공할 수 있도록
            노력합니다.
          </p>
        </div>
        <hr style={{ margin: '20px 0' }} />
        <div className={styles.desc_other}>
          <h2>Web Development</h2>
          <h3>React</h3>
          <ul>
            <li>사용자와 복잡하게 상호작용하는 SPA를 개발할 수 있습니다.</li>
            <li>React + MobX를 이용한 상태 관리에 익숙합니다.</li>
            <li>Jest를 이용한 테스트 작성 경험이 있습니다.</li>
          </ul>
          <h3>TypeScript / JavaScript</h3>
          <ul>
            <li>
              TypeScript 및 JavaScript로 복잡한 로직을 작성하고 유지 보수할 수
              있습니다.
            </li>
          </ul>
        </div>
        <hr style={{ margin: '20px 0' }} />
        <div className={styles.desc_other}>
          <h2>Others</h2>
          <h3>협업</h3>
          <ul>
            <li>
              팀 동료들과 주간 세미나를 진행하며 개발 및 업무 관련 정보를
              공유하였습니다.
            </li>
            <li>팀 동료들과 활발히 코드 리뷰를 진행하였습니다.</li>
            <li>여러 개발자 및 디자이너와의 협업 경험이 있습니다.</li>
            <li>GitLab을 통한 협업 경험이 있습니다.</li>
          </ul>
          <h3>Electron</h3>
          <ul>
            <li>
              Electron 환경에서의 앱 개발 및 Chromium rendering engine인 Blink의
              custom layout algorithm 개발과 디버깅 경험이 있습니다.
            </li>
          </ul>
          <h3>C++</h3>
          <ul>
            <li>
              C++로 복잡한 layout algorithm을 설계 및 구현한 경험이 있습니다.
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Education</h1>
        <div className={styles.desc_other}>
          <p>연세대학교 전기전자공학 석사 (2017.03 ~ 2019.08)</p>
          <p>연세대학교 전기전자공학 학사 (2013.03 ~ 2017.02)</p>
        </div>
      </div>
    </div>
  );
}
