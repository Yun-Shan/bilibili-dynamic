import { DynamicItem, DynamicType } from './types/dynamic/Dynamic';
import { RichTextNode, RichTextNodeType } from './types/dynamic/RichTextNode';

const a: RichTextNode = {} as any;
if (a.type === RichTextNodeType.TOPIC) {
  a.text = '111';
}

export {DynamicType, DynamicItem, RichTextNode, RichTextNodeType};
