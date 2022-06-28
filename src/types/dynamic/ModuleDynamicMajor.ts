import { DynamicType } from './Dynamic';

export type ModuleDynamicMajor<T extends DynamicType> =
  _MajorTypeUtil<VideoMajor, DynamicType.VIDEO, T>
  & _MajorTypeUtil<ArticleMajor, DynamicType.ARTICLE, T>
  & _MajorTypeUtil<DrawMajor, DynamicType.DRAW, T>
  & _MajorTypeUtil<LiveRecommendMajor, DynamicType.LIVE_RECOMMEND, T>
  ;

type _MajorTypeUtil<M, EXPECT extends DynamicType, ACTUAL extends DynamicType> = ACTUAL extends EXPECT ? M : {};

interface VideoMajor {
  type: MajorType.VIDEO;
  /**
   * 视频信息
   */
  archive: {
    /**
     * AV号
     */
    aid: string;
    /**
     * BV号
     */
    bvid: string,
    /**
     * 视频标题
     */
    title: string;
    /**
     * 视频简介
     */
    desc: string;
    /**
     * 视频封面URL
     */
    cover: string;
    /**
     * 视频时长，仅用于展示
     */
    duration_text: string;
    /**
     * 视频的跳转链接
     */
    jump_url: string;
    /**
     * 视频的统计数据，仅用于展示
     */
    stat: {
      /**
       * 弹幕数量
       */
      danmaku: string;
      /**
       * 播放量
       */
      play: string;
    };
    /**
     * 用于展示投稿标识，显示在视频封面的右上角，里面每个值的注释应该没必要写了 一看就懂，颜色都是16进制带#的格式
     */
    badge: {
      bg_color: string;
      color: string;
      text: string;
    };
    /**
     * 未知字段(用途未知、可用值未知)
     */
    disable_preview: number;
    /**
     * 未知字段(用途未知、可用值未知)
     */
    type: number;
  }
}

interface LiveRecommendMajor {
  type: MajorType.LIVE_RECOMMEND;
  live_rcmd: {
    /**
     * 直播卡片的内容，值为JSON文本，可以使用JSON.parse解析
     */
    content: string;
    /**
     * 未知字段(用途未知、可用值未知)
     */
    reserve_type: number;
  };
}

interface ArticleMajor {
  type: MajorType.ARTICLE
  /**
   * 专栏信息
   */
  article: {
    /**
     * 专栏的cid
     */
    id: number;
    /**
     * 专栏标题
     */
    title: string;
    /**
     * 专栏简介
     * 似乎存在一个默认值："点击进入查看全文>"
     */
    desc: string;
    /**
     * 封面URL列表，并不知道封面什么时候才会有多个
     */
    covers: string[];
    /**
     * 专栏的跳转链接
     */
    jump_url: string;
    /**
     * 内容能找到的都是阅读量，但是网页版似乎没显示
     */
    label: string;
  }
}

interface DrawMajor {
  type: MajorType.DRAW
  /**
   * 动态内的图片信息
   */
  draw: {
    /**
     * 未知字段(用途未知)
     */
    id: number,
    /**
     * 图片列表
     */
    items: {
      /**
       * 图片实际宽度
       */
      width: number;
      /**
       * 图片实际高度
       */
      height: number;
      /**
       * 图片实际大小，单位：KiB(1024进制)，之所以要强调这个单位是因为我发现chrome的开发者工具用的是1000进制
       */
      size: number;
      /**
       * 图片URL
       */
      src: string;
      /**
       * 未知字段(用途未知、可用值未知)
       */
      tags: [];
    }[];
  }
}

export enum MajorType {
  /**
   * 视频
   */
  VIDEO = "MAJOR_TYPE_ARCHIVE",
  /**
   * 专栏
   */
  ARTICLE = "MAJOR_TYPE_ARTICLE",
  /**
   * 带图片的动态
   */
  DRAW = "MAJOR_TYPE_DRAW",
  /**
   * 直播推送
   */
  LIVE_RECOMMEND = "MAJOR_TYPE_LIVE_RCMD",
}

export {};
