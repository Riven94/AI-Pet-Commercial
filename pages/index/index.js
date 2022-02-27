// index.js
// 获取应用实例
Page({
  data: {
    myPublish:[
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"}
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: './more/index'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
})
