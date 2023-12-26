import { Interweave } from 'interweave';

export function renderText(str: string | undefined) {
  return <Interweave content={str} />;
}
