import { DynamicType } from './Dynamic';
import { ContentBadge, ContentStat } from './CommonContentInfo';
import { RichTextDesc } from './RichTextNode';

export type ModuleDynamicMajor<T extends DynamicType> =
  _MajorTypeUtil<VideoMajor, DynamicType.VIDEO, T>
  & _MajorTypeUtil<ArticleMajor | OPUSMajor, DynamicType.ARTICLE, T>
  & _MajorTypeUtil<DrawMajor, DynamicType.DRAW, T>
  & _MajorTypeUtil<LiveMajor, DynamicType.LIVE, T>
  & _MajorTypeUtil<LiveRecommendMajor, DynamicType.LIVE_RECOMMEND, T>
  & _MajorTypeUtil<PGCMajor, DynamicType.PGC | DynamicType.PGC_UNION, T>
  & _MajorTypeUtil<CommonMajor, DynamicType.COMMON_SQUARE | DynamicType.COMMON_VERTICAL, T>
  & _MajorTypeUtil<CoursesMajor, DynamicType.COURSES_SEASON, T>
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
     * <p>
     * <strong>注意：对于动态API，当视频简介过长的时候这个字段可能不是完整的，需要确保获取完整简介请使用获取视频数据的API</strong>
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
     * 跳转链接，目前用的是相对协议(即//开头而不是https://开头)
     */
    jump_url: string;
    /**
     * 视频的统计数据，仅用于展示
     */
    stat: ContentStat;
    /**
     * 用于展示投稿标识，显示在视频封面的右上角，里面每个值的注释应该没必要写了 一看就懂，颜色都是16进制带#的格式
     */
    badge: ContentBadge;
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

interface LiveMajor {
  type: MajorType.LIVE;
  live: {
    /**
     * 直播间房间号
     */
    id: number;
    /**
     * 直播间标题
     */
    title: string;
    /**
     * 未知字段(用途未知、可用值未知)
     * 猜测是直播状态：1开播，0关播
     */
    live_state: number;
    /**
     * 直播间封面图的URL
     */
    cover: string;
    /**
     * 直播信息的第一部分，目前观察到用来显示分区
     */
    desc_first: string;
    /**
     * 直播信息的第二部分，目前观察到用来显示多少人看过
     */
    desc_second: string;
    /**
     * 跳转链接，目前用的是相对协议(即//开头而不是https://开头)
     */
    jump_url: string;
    /**
     * 直播状态标识，在直播封面右上角显示
     */
    badge: ContentBadge;
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

interface PGCMajor {
  type: MajorType.PGC
  /**
   * 番剧更新的视频信息
   */
  pgc: {
    badge: ContentBadge,
    /**
     * 视频标题
     */
    title: string;
    /**
     * 封面图
     */
    cover: string;
    /**
     * 跳转地址，通常格式是：https://www.bilibili.com/bangumi/play/ep{epid}
     */
    jump_url: string;
    /**
     * ep(episode)的id，就是这个url里的id：https://www.bilibili.com/bangumi/play/ep{epid}
     */
    epid: number;
    /**
     * pgc内容id(整个番剧的id、整个电视剧的id)，相同的IP的每一季的id都不一样
     */
    season_id: number;
    /**
     * 未知字段(用途未知、可用值未知)
     * 应该是标记PGC类型
     */
    type: number;
    /**
     * 未知字段(用途未知、可用值未知)
     * 应该是标记PGC子类型
     * 已知(不完全确定)：番剧：1，电影：2，纪录片：3，国创：4，电视剧：5，综艺：7
     */
    sub_type: number;
    stat: ContentStat;
  }
}

/**
 * 通用图文内容
 */
interface OPUSMajor {
  type: MajorType.OPUS
  /**
   * 通用图文内容
   */
  opus: {
    /**
     * 跳转链接，目前用的是相对协议(即//开头而不是https://开头)
     */
    jump_url: string;
    /**
     * 图片数组
     */
    pics: {
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
      url: string;
    }[];
    /**
     * 文字内容
     */
    summary: RichTextDesc;
    /**
     * 标题
     */
    title: string;
  }
}

/**
 * 这也是通用图文内容
 */
interface CommonMajor {
  type: MajorType.COMMON
  /**
   * 通用图文内容
   */
  common: {
    badge: ContentBadge;
    /**
     * 未知字段(用途未知、可用值未知)
     * 已知(不确定)：专属活动页：1，会员购/赛事/工房集市：3，游戏：111或0或3(这个值具体根据什么情况变化不清楚)，小黑屋：121，装扮：3，热门活动：3
     *      手机上是专属页面展示一系列视频且分享后无法在pc web打开且pc web跳转的url似乎与话题有关：211
     *
     * 猜测：值为3时似乎表示内容和b站官方有强关联
     */
    biz_type: number;
    /**
     * 未知字段(用途未知、可用值未知)
     */
    label: string;
    /**
     * 卡片左侧图片的URL
     */
    cover: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 内容
     */
    desc: string;
    /**
     * 跳转链接
     */
    jump_url: string;
    /**
     * 展示样式
     * 已知：动态类型为DYNAMIC_TYPE_COMMON_SQUARE：1，动态类型为DYNAMIC_TYPE_COMMON_VERTICAL：2
     * 已知：值为1时pc web展示的是高为80px的矩形卡片，值为2时pc web展示的是高为160px的矩形卡片
     */
    style: 1;
    /**
     * 未知字段(用途未知、可用值未知)
     * 通过分享专属活动页测试，源动态是该动态类型时，位于源动态的该字段每次分享都不一样
     */
    id: string;
    /**
     * 未知字段(用途未知、可用值未知)
     * 通过分享专属活动页测试，源动态是该动态类型时，位于源动态的该字段每次分享都不一样
     */
    sketch_id: string;
  }
}

/**
 * 课程
 */
interface CoursesMajor {
  type: MajorType.COURSES
  /**
   * 课程信息
   */
  courses: {
    badge: ContentBadge;
    /**
     * 课程封面URL
     */
    cover: string;
    /**
     * 课程标题
     */
    title: string;
    /**
     * 课程简介
     */
    sub_title: string;
    /**
     * 课时信息
     */
    desc: string;
    /**
     * 跳转链接
     */
    jump_url: string;
    /**
     * 课程id
     */
    id: string;
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
  /**
   * 分享直播间(目前发现只有直接从直播间分享的是这个类型)
   */
  LIVE = "MAJOR_TYPE_LIVE",
  /**
   * 番剧
   */
  PGC = "MAJOR_TYPE_PGC",
  /**
   * 通用图文内容，应该主要用于原创内容(目前已知的只有专栏)
   */
  OPUS = "MAJOR_TYPE_OPUS",
  /**
   * 通用图文内容，目前发现主要跟特殊官方功能有关系，例如专属活动页、会员购、漫画、赛事中心、游戏中心、小黑屋、工房集市、装扮等
   */
  COMMON = "MAJOR_TYPE_COMMON",
  /**
   * 课程
   */
  COURSES = "MAJOR_TYPE_COURSES",
}

export {};
