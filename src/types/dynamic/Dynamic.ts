import { DynamicModuleAuthor, DynamicModuleDynamic } from './DynamicModule';
import { RichTextDesc } from './RichTextNode';
import { Nullable } from '../_internal/util';

export type DynamicItem = _InternalDynamicItem;

type _InternalDynamicItem<Attr extends _InternalDynamicAttr = _InternalDynamicAttr.NORMAL> = {
  /**
   * 动态的基础信息
   */
  basic: DynamicBasicInfo;
  /**
   * ID
   */
  id_str: string;
  /**
   * 未知字段(用途未知)
   */
  visible: boolean;
} & (
  _DynamicTypeUtil<ArticleDynamic, Attr>
  | _DynamicTypeUtil<VideoDynamic, Attr>
  | _DynamicTypeUtil<WordDynamic, Attr>
  | _DynamicTypeUtil<DrawDynamic, Attr>
  | (Attr extends _InternalDynamicAttr.FORWARD_ORIGIN ? never : _DynamicTypeUtil<ForwardDynamic, Attr>)
  | _DynamicTypeUtil<LiveRecommendDynamic, Attr>
  );

type _DynamicTypeUtil<T extends {type: DynamicType}, Attr extends _InternalDynamicAttr> = {
  /**
   * 动态的模块
   */
  modules: {
    /**
     * 动态作者
     */
    module_author: DynamicModuleAuthor;
    /**
     * 动态内容
     */
    module_dynamic: DynamicModuleDynamic<T['type']>;
    /**
     * 目前只在有热评的动态看到，热评时items必然是长度为1的数组，其中的type必然为1
     */
    module_interaction?: Nullable<{
      items: {
        type: number;
        desc: RichTextDesc;
      }[];
    }>;
    /**
     * 标签，目前已知的只有置顶动态存在
     */
    module_tag?: {
      /**
       * 因为置顶而存在这个字段时，值固定为"置顶"
       */
      text: string;
    };
  } & (Attr extends _InternalDynamicAttr.FORWARD_ORIGIN ? {} : {
    /**
     * 统计信息
     */
    module_stat: {
      /**
       * 评论统计
       */
      comment: _CommonDynamicStat;
      /**
       * 转发统计
       */
      forward: _CommonDynamicStat;
      /**
       * 点赞统计
       */
      like: _CommonDynamicStat & {
        /**
         * 当前账号是否已点赞
         */
        status: boolean;
      };
    };
    /**
     * 看起来是杂项？目前好像只有右上角菜单用到了这个
     */
    module_more: {
      /**
       * 动态右上角菜单
       */
      three_point_items: ({
        label: "取消关注",
        type: "THREE_POINT_FOLLOWING"
      } | {
        label: "举报",
        type: "THREE_POINT_REPORT"
      })[]
    };
  });
} & T;

type _CommonDynamicStat = {
  /**
   * 数量
   */
  count: number;
  /**
   * 未知字段(用途未知)，猜测是禁用状态(例如关闭评论区)
   */
  forbidden: boolean;
  /**
   * 是否隐藏，true时不展示对应按钮和统计信息
   */
  hidden?: boolean;
};

type ArticleDynamic = { type: DynamicType.ARTICLE; };
type VideoDynamic = { type: DynamicType.VIDEO; };
type WordDynamic = { type: DynamicType.WORD; };
type DrawDynamic = { type: DynamicType.DRAW; };
type LiveRecommendDynamic = { type: DynamicType.LIVE_RECOMMEND; };

interface ForwardDynamic {
  type: DynamicType.FORWARD;
  /**
   * 源动态信息
   */
  orig: _InternalDynamicItem<_InternalDynamicAttr.FORWARD_ORIGIN>;
}

enum _InternalDynamicAttr {
  NORMAL,
  FORWARD_ORIGIN
}


/**
 * 动态类型
 */
export enum DynamicType {
  /**
   * 专栏
   */
  ARTICLE = 'DYNAMIC_TYPE_ARTICLE',
  /**
   * 视频
   */
  VIDEO = 'DYNAMIC_TYPE_AV',
  /**
   * 纯文本动态
   */
  WORD = 'DYNAMIC_TYPE_WORD',
  /**
   * 带图片的动态
   */
  DRAW = 'DYNAMIC_TYPE_DRAW',
  /**
   * 转发动态
   */
  FORWARD = 'DYNAMIC_TYPE_FORWARD',
  /**
   * 直播推送
   */
  LIVE_RECOMMEND = 'DYNAMIC_TYPE_LIVE_RCMD',
}

/**
 * 动态的基础信息
 */
interface DynamicBasicInfo {
  /**
   * 用于获取评论的ID。
   * 已知专栏动态时该ID与专栏ID一致，视频动态时与av号一致
   */
  comment_id_str: string;
  /**
   * 未知字段(可用值未知)，用途应该是区分应该加载哪种类型的评论模块
   * 已知视频动态值为1，带图片动态值为11，专栏值为12，纯文本动态和转发动态值为17
   */
  comment_type: number;
  /**
   * 点赞按钮的图片
   */
  like_icon: LikeIcon;
  /**
   * 未知字段(用途未知)，可能含义是referrer id，表示引用的对象的ID？
   * 已知专栏动态时该ID与专栏ID一致，视频动态时与av号一致
   */
  rid_str: string;
}

/**
 * 应该是一键三连的独特图片
 */
interface LikeIcon {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
}

export {};
