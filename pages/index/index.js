// index.js
// 获取应用实例
const domain = getApp().globalData.domainName;
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

  onLoad(options) {
    this.test();  
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  test(){
    var temp = {
      'animalName': 'test',
      'varieties': 't',
      'color': 'white',
      'type': '0',
      'imgUrl': 'http://101.42.227.112:8000/media/product/372967a2480129cb.jpg',
      'ownerId': 14,
      'ownerName': 'dd',
      'isLost': '0',
      'state': '1',
      'creatorId': 1
    };
    console.log(temp);
    wx.request({
      url: 'http://101.42.227.112:8000/animals/ownerUpload',
      method: 'POST',
      header: {'content-type': 'application/json'},
      data: temp,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
        })
      }})
  },

  toSearch(){
    wx.navigateTo({
      url: './searchinput/index',
    })
  },

  toMore(){
    wx.navigateTo({
      url: './more/index',
    })
  }
})
