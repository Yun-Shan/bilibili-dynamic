/**
 * 直播信息，目前不确定结构是不是固定的，因为b站api很神奇的把这个结构对象序列化成文本再传输的
 */
export type LiveInfo = {
  /**
   * 未知字段(用途未知、可用值未知)
   * 直播类型？直播能有什么类型？赛事直播？活动直播？
   */
  type: number;
  /**
   * 直播间信息
   */
  live_play_info: {
    /**
     * 用户UID，与直播间房间号不同
     */
    uid: number;
    /**
     * 未知字段(用途未知、可用值未知)
     * 直播间类型？还需要更多不同的例子才能确定
     */
    room_type: 0;
    /**
     * 未知字段(用途未知、可用值未知)
     * 看起来应该是是否是付费直播间
     */
    room_paid_type: 0;
    /**
     * 未知字段(用途未知、可用值未知)
     */
    play_type: 0;
    /**
     * 未知字段(用途未知、可用值未知)
     * 猜测是直播状态：1开播，0关播
     */
    live_status: number;
    /**
     * 未知字段(用途未知、可用值未知)
     */
    live_screen_type: 0;
    /**
     * 直播间房间号
     */
    room_id: number,
    /**
     * 直播间封面图的URL
     */
    cover: string;
    /**
     * 直播间标题
     */
    title: string;
    /**
     * 未知字段(用途未知、可用值未知)
     * 猜测可能是直播时长之类的
     */
    online: number;
    /**
     * 直播主分区ID(知识区、游戏区等)
     */
    parent_area_id: number;
    /**
     * 直播主分区(值是'知识'、'单机游戏'等)
     */
    parent_area_name: string;
    /**
     * 直播二级分区ID
     */
    area_id: 377;
    /**
     * 直播二级分区
     */
    area_name: string;
    /**
     * 直播开始时间(Unix秒)
     */
    live_start_time: number;
    /**
     * 看过直播的人数信息
     */
    watched_show: {
      /**
       * 看过的人数具体值
       */
      num: number;
      /**
       * 看过的人数，会简化，比如36932这里的值会是3.6万
       */
      text_small: string;
      /**
       * 看过的人数，就是text_small后面加'人看过'三个字
       */
      text_large: string;
      /**
       * 未知字段(用途未知、可用值未知)
       */
      switch: boolean;
      /**
       * 图标URL(表示"看"的眼睛图标)，并不知道为什么要两种图标
       */
      icon: string;
      /**
       * 图标URL(表示"看"的眼睛图标)，并不知道为什么要两种图标
       */
      icon_web: string;
      /**
       * 未知字段(用途未知、可用值未知)
       */
      icon_location: string;
    };
    /**
     * 直播间跳转链接，目前用的是相对协议(即//开头而不是https://开头)
     */
    link: string;
    /**
     * 未知字段(用途未知、可用值未知)
     * 看命名像是直播id，但是值很奇怪不知道是用在哪的
     */
    live_id: string,
    /**
     * 未知字段(用途未知、可用值未知)
     * TODO 看起来是直播成就
     */
    'pendants': {
      'list': {
        'mobile_index_badge': {
          'list': {
            '1': {
              "position": 1,
              "text": "",
              "bg_color": "#FB9E60",
              "bg_pic": "https://i0.hdslb.com/bfs/live/539ce26c45cd4019f55b64cfbcedc3c01820e539.png",
              "pendant_id": 426,
              "type": "mobile_index_badge",
              "name": "百人成就"
            },
            '2': {
              "text": "人气榜第7名",
              "bg_color": "#FB9E60",
              "bg_pic": "http://i0.hdslb.com/bfs/live/3222886e117aca36a3fa347d18164164c6beb956.png",
              "pendant_id": 1273,
              "type": "mobile_index_badge",
              "name": "人气榜前十",
              "position": 2
            }
          }
        },
        'out_live_badge': {
          'list': {
            '2': {
              "type": "out_live_badge",
              "name": "人气榜前十",
              "position": 2,
              "text": "人气榜第7名",
              "bg_color": "#FB9E60",
              "bg_pic": "http://i0.hdslb.com/bfs/live/3222886e117aca36a3fa347d18164164c6beb956.png",
              "pendant_id": 1264
            }
          }
        },
        'index_badge': {
          'list': {
            '1': {
              "name": "百人成就",
              "position": 1,
              "text": "",
              "bg_color": "#FB9E60",
              "bg_pic": "https://i0.hdslb.com/bfs/live/539ce26c45cd4019f55b64cfbcedc3c01820e539.png",
              "pendant_id": 425,
              "type": "index_badge"
            }
          }
        }
      }
    },
  },
  /**
   * 未知字段(用途未知、可用值未知)
   */
  live_record_info: null
}
