import styles from '@/app/_components/home/Typing.module.scss';
import {
  LANG_ENUM,
  LangValueType,
  THEME_ENUM,
  ThemeValueType,
} from '../_redux/module/preferSlice';

// generate sequence for typing
export function generateSequence(
  stage: 'opening' | 'main',
  theme: ThemeValueType,
  lang: LangValueType
) {
  if (!lang) return ['Error: Cannot find string sequence.'];
  return seqData[stage][theme][lang];
}

// generate speed for typing
export function generateSpeed(
  stage: 'opening' | 'main',
  theme: ThemeValueType,
  lang: LangValueType
): Speed | GranularSpeed {
  return speedData[stage][theme][lang] as Speed | GranularSpeed;
}

// strings for korean and english
const kor = {
  hello: '안녕하세요!',
  webDev: '프론트엔드 개발자',
  softEng: '소프트웨어 엔지니어',
  swcho: '조승완입니다.',
};
const eng = {
  hello: 'Hello!  ',
  iAm: "I'm",
  webDev: 'A Web Developer',
  softEng: 'A Software Engineer',
  swcho: 'Seungwan Cho',
};

// sequence data
const seqData = {
  opening: {
    [THEME_ENUM.DARK]: {
      [LANG_ENUM.ENG]: [hideCursor, 3000, showCursor, eng['hello']],
      [LANG_ENUM.KOR]: [hideCursor, 3000, showCursor, kor['hello']],
    },
    [THEME_ENUM.LIGHT]: {
      [LANG_ENUM.ENG]: [hideCursor, 3900, showCursor, eng['hello']],
      [LANG_ENUM.KOR]: [hideCursor, 3900, showCursor, kor['hello']],
    },
  },
  main: {
    [THEME_ENUM.DARK]: {
      [LANG_ENUM.ENG]: [
        hideCursor,
        1700,
        showCursor,
        eng['webDev'],
        1500,
        '',
        eng['softEng'],
        800,
        '',
        300,
        eng['swcho'],
      ],
      [LANG_ENUM.KOR]: [
        hideCursor,
        1500,
        showCursor,
        kor['webDev'],
        1800,
        '',
        kor['softEng'],
        1200,
        '',
        400,
        kor['swcho'],
      ],
    },
    [THEME_ENUM.LIGHT]: {
      [LANG_ENUM.ENG]: [
        hideCursor,
        1350,
        showCursor,
        eng['webDev'],
        1600,
        '',
        200,
        eng['softEng'],
        1800,
        '',
        200,
        eng['swcho'],
      ],
      [LANG_ENUM.KOR]: [
        hideCursor,
        1200,
        showCursor,
        kor['webDev'],
        1700,
        '',
        800,
        kor['softEng'],
        1400,
        '',
        600,
        kor['swcho'],
      ],
    },
  },
};

// show & hide typing cursor functions
export function showCursor(elem: HTMLElement | null) {
  if (!elem) return;
  elem.classList.remove(styles['hide-cursor']);
}
export function hideCursor(elem: HTMLElement | null) {
  if (!elem) return;
  elem.classList.add(styles['hide-cursor']);
}

const speedData = {
  opening: {
    [THEME_ENUM.DARK]: {
      [LANG_ENUM.ENG]: { type: 'keyStrokeDelayInMs', value: 150 },
      [LANG_ENUM.KOR]: { type: 'keyStrokeDelayInMs', value: 150 },
    },
    [THEME_ENUM.LIGHT]: {
      [LANG_ENUM.ENG]: { type: 'keyStrokeDelayInMs', value: 150 },
      [LANG_ENUM.KOR]: { type: 'keyStrokeDelayInMs', value: 150 },
    },
  },
  main: {
    [THEME_ENUM.DARK]: {
      [LANG_ENUM.ENG]: { type: 'keyStrokeDelayInMs', value: 145 },
      [LANG_ENUM.KOR]: { type: 'keyStrokeDelayInMs', value: 250 },
    },
    [THEME_ENUM.LIGHT]: {
      [LANG_ENUM.ENG]: { type: 'keyStrokeDelayInMs', value: 140 },
      [LANG_ENUM.KOR]: { type: 'keyStrokeDelayInMs', value: 245 },
    },
  },
};

// speed types (copied from react-type-animation)
type GranularSpeed = {
  type: 'keyStrokeDelayInMs';
  value: number;
};
type Speed =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99;
