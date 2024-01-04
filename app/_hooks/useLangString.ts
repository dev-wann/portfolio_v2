import data from '@/public/strings.json';
import { useSelector } from 'react-redux';
import { RootState } from '../_redux';
import { LangValueType } from '../_redux/module/preferSlice';

type DataType = string | { [K: string]: DataType } | undefined;
export type StrsType = { [K: string]: string };

export default function useLangString(...pathArgs: string[]): StrsType | null {
  const lang: LangValueType | null = useSelector(
    (state: RootState) => state.prefer.lang
  );
  if (!lang) return null;

  let target: DataType = data[lang];
  for (let i = 0; i < pathArgs.length; i++) {
    if (!target) break;
    if (typeof target === 'string') break;
    target = target[pathArgs[i]];
  }

  if (!isStrObj(target)) {
    console.error(target);
    throw new Error(
      `useLangString.ts: Wrong language or pathArgs.
      language: ${lang}, pathArgs: ${pathArgs}`
    );
  }

  return target as StrsType;
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
