import { Markup } from 'interweave';

export function renderText(str: string | undefined) {
  return <Markup content={str} noWrap={true} />;
}
