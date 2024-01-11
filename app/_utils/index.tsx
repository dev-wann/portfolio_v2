import { Markup } from 'interweave';

// [pageName, pathname]
export const routes = [
  ['home', '/'],
  ['about', '/about'],
  ['project', '/project'],
  ['contact', '/contact'],
] as const;

export function renderText(str: string | undefined) {
  return <Markup content={str} noWrap={true} />;
}

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
