export interface RichTextDesc {
  /**
   * 富文本节点列表，可用于组合成动态的内容
   */
  rich_text_nodes: RichTextNode[];
  /**
   * rich_text_nodes对应的纯文本内容
   */
  text: string;
}

export type RichTextNode = {
  /**
   * 原始文本
   */
  orig_text: string;
} & (
  _NodeTypeUtil<TextNode>
  | _NodeTypeUtil<EmojiNode>
  | _NodeTypeUtil<AtNode>
  | _NodeTypeUtil<VideoNode>
  | _NodeTypeUtil<ArticleNode>
  | _NodeTypeUtil<WebNode>
  | _NodeTypeUtil<TopicNode>
  | _NodeTypeUtil<LotteryNode>
  );

type _NodeTypeUtil<T> = (T extends {text: string} ? {}: {
  /**
   * 解析后的内容文本
   * 已知orig_text为视频/专栏链接时，text会是对应的标题
   */
  text: string
}) & T;

export enum RichTextNodeType {
  /**
   * 纯文本
   */
  TEXT = 'RICH_TEXT_NODE_TYPE_TEXT',
  /**
   * 表情
   */
  EMOJI = 'RICH_TEXT_NODE_TYPE_EMOJI',
  /**
   * AT用户
   * <p>
   * 需要注意的是动态热评的用户名也是用的这个类型，所以不能全部当成@xxx来处理，建议只用于跳转到用户主页
   */
  AT = 'RICH_TEXT_NODE_TYPE_AT',
  /**
   * 跳转视频
   */
  VIDEO = 'RICH_TEXT_NODE_TYPE_BV',
  /**
   * 跳转专栏
   */
  ARTICLE = 'RICH_TEXT_NODE_TYPE_CV',
  /**
   * 跳转网页
   */
  WEB = 'RICH_TEXT_NODE_TYPE_WEB',
  /**
   * 话题
   */
  TOPIC = 'RICH_TEXT_NODE_TYPE_TOPIC',
  /**
   * 互动抽奖
   */
  LOTTERY = 'RICH_TEXT_NODE_TYPE_LOTTERY',
}

export interface TextNode {
  type: RichTextNodeType.TEXT;
}

export interface EmojiNode {
  type: RichTextNodeType.EMOJI;
  /**
   * 表情信息
   */
  emoji: {
    /**
     * 表情图片地址
     */
    icon_url: string;
    /**
     * 表情大小
     * 已知 普通emoji=1、热词系列表情的大小=2
     */
    size: number;
    /**
     * 表情的文本格式
     */
    text: string;
    /**
     * 表情类型
     * 已知普通表情=1，UP主表情应该是10
     */
    type: number;
  };
}

export interface AtNode {
  type: RichTextNodeType.AT;
  /**
   * 被AT的用户UID
   */
  rid: string;
}

export interface VideoNode {
  type: RichTextNodeType.VIDEO;
  /**
   * 视频的BV号
   */
  rid: string;
  /**
   * 视频的跳转链接
   */
  jump_url: string;
}

export interface ArticleNode {
  type: RichTextNodeType.ARTICLE;
  /**
   * 专栏的cid
   */
  rid: string;
  /**
   * 专栏的跳转链接
   */
  jump_url: string;
}

export interface WebNode {
  type: RichTextNodeType.WEB;
  /**
   * 固定值
   */
  text: '网页链接';
  /**
   * 实际网页链接
   */
  jump_url: string;
}

export interface TopicNode {
  type: RichTextNodeType.TOPIC;
  /**
   * 话题的跳转链接
   */
  jump_url: string;
}

export interface LotteryNode {
  type: RichTextNodeType.LOTTERY;
  /**
   * 应该是互动抽奖的ID
   */
  rid: string;
}

export {};
