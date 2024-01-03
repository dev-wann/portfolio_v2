import { Markup } from 'interweave';

export function renderText(str: string | undefined) {
  return <Markup content={str} noWrap={true} />;
}

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
