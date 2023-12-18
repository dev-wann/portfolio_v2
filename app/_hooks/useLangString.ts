import strings from '@/public/strings.json';
import { useSelector } from 'react-redux';
import { RootState } from '../_redux';

export default function useLangString(pageName: string) {
  const lang = useSelector((state: RootState) => state.prefer.lang);
  if (!lang) return null;
  return strings[lang][pageName];
}
