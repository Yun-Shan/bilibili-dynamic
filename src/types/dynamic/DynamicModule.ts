import { RichTextDesc } from './RichTextNode';
import { ModuleDynamicMajor } from './ModuleDynamicMajor';
import { DynamicType } from './Dynamic';
import { Nullable } from '../_internal/util';

export interface DynamicModuleAuthor {
  /**
   * UID
   */
  mid: number;
  /**
   * 昵称
   */
  name: string;
  /**
   * 头像URL
   */
  face: string;
  /**
   * 是否是数字藏品头像(这种头像会在头像右下角显示钻石标)
   */
  face_nft: boolean;
  /**
   * 当前账号是否已关注动态作者，当且仅当值为true时是已关注
   */
  following: boolean | null;
  /**
   * 动态作者的空间的动态页的URL，不包含protocol部分
   */
  jump_url: string;
  /**
   * 未知字段(用途未知、可用值未知)
   */
  label: string;
  /**
   * 认证信息(蓝V、黄V)
   */
  official_verify: {
    /**
     * 未知字段(用途未知)
     * 能找到的动态中这个值都是空字符串
     */
    desc: string;
    /**
     * -1=无认证、0=黄V、1=蓝V
     */
    type: -1 | 0 | 1;
  };
  /**
   * 动态发布信息。
   * 已知可能的值：
   * 发布视频：投稿了视频
   * 发布/参与联合视频：与他人联合创作
   * 发布专栏：投稿了文章
   */
  pub_action: string;
  /**
   * 动态发布时间，并非标准日期格式，仅用于显示
   */
  pub_time: string;
  /**
   * 动态发布的时间戳(Unix秒)
   */
  pub_ts: number;
  /**
   * 作者类型，一般情况下都是NORMAL，番剧推送是PGC
   */
  type: 'AUTHOR_TYPE_NORMAL' | 'AUTHOR_TYPE_PGC';
  /**
   * 卡片装扮
   */
  decorate?: DynamicAuthorDecorate;
  /**
   * 头像挂饰
   */
  pendant: MemberPendant;
  /**
   * 大会员信息
   */
  vip: MemberVipInfo;
}

/**
 * 动态的卡片装扮
 */
interface DynamicAuthorDecorate {
  /**
   * 卡片装扮的右上角图片URL
   */
  card_url: string;
  /**
   * 粉丝装扮的信息
   */
  fan: {
    /**
     * 粉丝编号的颜色(16进制颜色格式，带#)
     */
    color: string
    /**
     * 是否是粉丝装扮
     */
    is_fan: boolean
    /**
     * 粉丝编号
     */
    num_str: string
    /**
     * 粉丝编号
     */
    number: number
  };
  /**
   * 装扮的ID
   */
  id: number;
  /**
   * 卡片装扮售卖的跳转地址(只能APP访问)
   */
  jump_url: string;
  /**
   * 装扮名称
   */
  name: string;
  /**
   * 未知字段(用途未知、可用值未知)
   */
  type: number;
}

/**
 * 头像挂饰
 */
interface MemberPendant {
  /**
   * 未知字段(可用值未知)，应该是过期时间
   * 永久时值为0
   * 不知道限期时的值用的是什么，反正大部分都是永久的(
   */
  expire: number;
  /**
   * 挂饰图片(静态)URL
   */
  image: string;
  /**
   * 挂饰图片(动态)URL
   */
  image_enhance: string;
  /**
   * 挂饰图片(按帧拼接成一行图片)URL
   */
  image_enhance_frame: string;
  /**
   * 挂饰名称
   */
  name: string;
  /**
   * 挂饰ID
   */
  pid: number;
}

interface MemberVipInfo {
  /**
   * 昵称颜色(16进制颜色格式，带#)
   */
  nickname_color: string;
  /**
   * 大会员状态。
   * 已知非大会员为0，大会员为1
   */
  status: 0 | 1;
  /**
   * 未知字段(用途未知、可用值未知)
   * 已知非大会员为1，年度大会员为2
   * 怀疑可能跟年度大会员和非年度的值不一样，但找不到是大会员但不是年度大会员的用户
   */
  type: 1 | 2;
  /**
   * 大会员过期时间(Unix毫秒)
   */
  due_date: number;
  /**
   * 用于展示大会员标识，懒得研究格式
   */
  label: { [key: string]: string | number | boolean };
  /**
   * 未知字段(用途未知、可用值未知)
   */
  theme_type: number;
  /**
   * 未知字段(用途未知、可用值未知)
   */
  avatar_subscript: number;
  /**
   * 未知字段(用途未知、可用值未知)
   */
  avatar_subscript_url: string;
}


export interface DynamicModuleDynamic<T extends DynamicType> {
  /**
   * 未知字段(可用值未知)，额外组件
   * 已知用户发视频时同步发布的动态带图片时，type=ADDITIONAL_TYPE_UGC
   * 已知显示相关游戏时，type=ADDITIONAL_TYPE_COMMON
   * 已知显示预约时，type=ADDITIONAL_TYPE_RESERVE
   * 已知显示投票时，type=ADDITIONAL_TYPE_VOTE
   * 已知显示包月充电专属抽奖时，type=ADDITIONAL_TYPE_UPOWER_LOTTERY
   * 已知显示赛事时(暂时只看到回放的，理论上直播时应该也是这个)，type=ADDITIONAL_TYPE_MATCH
   * TODO 已知很多个type了，可以考虑转换成enum并添加相应类型声明了
   */
  additional: Nullable<{ type: "ADDITIONAL_TYPE_UGC" | "ADDITIONAL_TYPE_COMMON" | "ADDITIONAL_TYPE_RESERVE" | "ADDITIONAL_TYPE_VOTE" | "ADDITIONAL_TYPE_UPOWER_LOTTERY" | string; } & { [key: string]: object; }>;
  /**
   * 动态的描述内容
   */
  desc: OptionalDesc<T>;
  /**
   * 动态的主要内容
   */
  major: OptionalMajor<T>;
  /**
   * 话题，当且仅当动态最前面有带小电视图标的话题的时候才存在，其它形式的话题都不算
   */
  topic: Nullable<{
    /**
     * 话题ID
     */
    id: number;
    /**
     * 话题的跳转链接
     */
    jump_url: string;
    /**
     * 话题名称
     */
    name: string;
  }>;
}

/**
 * 指定的动态类型包含或有可能包含desc字段
 */
type DynamicTypeHasDesc =  never
  | DynamicType.WORD | DynamicType.DRAW | DynamicType.FORWARD
  | DynamicType.COMMON_SQUARE | DynamicType.COMMON_VERTICAL;
type DynamicTypeMayHasDesc = DynamicType.VIDEO;
type OptionalDesc<T extends DynamicType> = T extends DynamicTypeHasDesc ? RichTextDesc
  : (T extends DynamicTypeMayHasDesc ? Nullable<RichTextDesc> : null);

/**
 * 只有指定的动态类型包含或有可能包含major字段
 */
type DynamicTypeHasMajor = never
  | DynamicType.VIDEO | DynamicType.ARTICLE | DynamicType.DRAW
  | DynamicType.LIVE | DynamicType.LIVE_RECOMMEND
  | DynamicType.PGC | DynamicType.PGC_UNION
  | DynamicType.COMMON_SQUARE | DynamicType.COMMON_VERTICAL
  | DynamicType.COURSES_SEASON;
type OptionalMajor<T extends DynamicType> = T extends DynamicTypeHasMajor ? ModuleDynamicMajor<T> : null;

export {};
