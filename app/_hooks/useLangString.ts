import strings from '@/public/strings.json';
import { useSelector } from 'react-redux';
import { RootState } from '../_redux';

export default function useLangString(
  ...pathArgs: string[]
): { [key: string]: string } | null {
  const lang = useSelector((state: RootState) => state.prefer.lang);
  if (!lang) return null;

  let target: any = strings[lang];
  for (let i = 0; i < pathArgs.length && target; i++) {
    target = target[pathArgs[i]];
  }

  if (!isStrObj(target)) {
    console.error(target);
    throw new Error(
      `useLangString.ts: Wrong language or pathArgs.
      language: ${lang}, pathArgs: ${pathArgs}`
    );
  }
  return target;
}

function isStrObj(obj: any) {
  if (typeof obj !== 'object') return false;

  let result = true;
  Object.entries(obj).some(([_key, value]) => {
    if (typeof value !== 'string') {
      result = false;
      return true;
    }
  });

  return result;
}
