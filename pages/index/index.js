// index.js
// 获取应用实例
const app = getApp();
const domain = getApp().globalData.domainName;
Page({
  data: {
    publishItem:[
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园", type:"博美",color:"白色"},
      {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园", type:"博美",color:"白色"}
    ],
    tabs: ['流浪猫狗','寻找宠物','爱宠配对','萌宠动态'],
    currentIndex: 0
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: './more/index'
    })
  },

  onLoad(options) {
    //this.test();  
    this.getMain();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getMain(){
    const that = this;
    wx.request({
      url: domain + '/comment/specificComment',
      data:{
        type: that.data.tabs[that.data.currentIndex]
      },
      success(res){
        const resData = res.data.data;
        console.log(res);
        that.setData({
          publishItem: resData
        })
      },
      fail(error){
        console.log(error);
      }
    })
  },

  toSearch(){
    wx.navigateTo({
      url: './searchinput/index',
    })
  },

  toPublish(){
    const userId = app.globalData.userId;
    if(userId == undefined){
      wx.showModal({
        content: '请先登录！',
        showCancel: false
      })
    }
    else{
      wx.navigateTo({
        url: './pulish/index?id=' + userId,
      })
    }
  },

  toMore(e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './more/index?id='+ id ,
    })
  },

  changeTab(e){
    console.log(e.currentTarget.dataset.index);
    const index = e.currentTarget.dataset.index;
    this.setData({currentIndex: index});
    this.getMain();
  },

  search(e){
    console.log(e);
  }
})
