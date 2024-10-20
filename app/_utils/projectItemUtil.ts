import { StrsType } from '../_hooks/useLangString';

export function generateProjectItems(s: StrsType | null) {
  if (!s) return fallback;

  return [
    {
      id: 'coming-soon',
      title: 'Coming Soon..',
      info: '',
      org: s.personal,
      period: '',
      descs: [s['CS-desc0'], s['CS-desc1']],
      skills: [],
    },
    {
      id: 'portfolio-page',
      title: 'Portfolio Page',
      info: s['PF-info'],
      org: s.personal,
      period: '2023.12 ~ 2024.01',
      descs: [s['PF-desc0'], s['PF-desc1'], s['PF-desc2'], s['PF-desc3']],
      fyi: [s['PF-fyi0'], s['PF-fyi1']],
      skills: ['Next.js', 'TypeScript', 'SCSS', 'Redux'],
    },
    {
      id: 'superoffice',
      title: 'SuperOffice',
      info: s['SO-info'],
      org: '@TmaxOffice',
      period: '2021.03 ~ 2023.05',
      descs: [
        s['SO-desc0'],
        s['SO-desc1'],
        s['SO-desc2'],
        s['SO-desc3'],
        s['SO-desc4'],
        s['SO-desc5'],
      ],
      skills: ['React', 'TypeScript', 'MobX', 'Jest', 'GitLab'],
    },
    {
      id: 'tooffice',
      title: 'ToOffice',
      info: s['TO-info'],
      org: '@TmaxA&C',
      period: '2019.08 ~ 2021.10',
      descs: [
        s['TO-desc0'],
        s['TO-desc1'],
        s['TO-desc2'],
        s['TO-desc3'],
        s['TO-desc4'],
      ],
      skills: ['C++', 'GitLab'],
    },
  ];
}

const fallback = [
  {
    id: 'coming-soon',
    title: 'Coming Soon..',
    info: '',
    org: '',
    period: '',
    descs: [],
    skills: [],
  },
  {
    id: 'portfolio-page',
    title: 'Portfolio Page',
    info: '',
    org: '',
    period: '',
    descs: [],
    skills: [],
  },
  {
    id: 'superoffice',
    title: 'SuperOffice',
    info: '',
    org: '',
    period: '',
    descs: [],
    skills: [],
  },
  {
    id: 'tooffice',
    title: 'ToOffice',
    info: '',
    org: '',
    period: '',
    descs: [],
    skills: [],
  },
];
