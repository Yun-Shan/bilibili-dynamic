export interface ContentBadge {
  /**
   * 背景色(带#的hex)
   */
  bg_color: string;
  /**
   * 文字颜色(带#的hex)
   */
  color: string;
  /**
   * 文字内容
   */
  text: string;
}

export interface ContentStat {
  /**
   * 弹幕数量
   */
  danmaku: string;
  /**
   * 播放量
   */
  play: string;
}
