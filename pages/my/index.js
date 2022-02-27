// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:"喵了个咪",
      introduction:"用一句话介绍自己吧~",
      functions:[
        {icon:"../../icons/diamond.png", path:"./personal/index", text:"个人信息"},
        {icon:"../../icons/diamond.png", path:"./pet/index", text:"我的宠物"},
        {icon:"../../icons/diamond.png", path:"./message/index", text:"我的消息"}
      ],
      myPublish:[
        {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"},
        {img:"../../icons/cat.jpg", title:"流浪狗发现于武汉理工大学南湖校区智园10舍", type:"博美",color:"白色"}
      ],
      orders:[
        {shopname:"爱宠一家人宠物美容店",orderimg:"../../icons/cat.jpg",service:"洗澡美容套餐服务",time:"2022-01-01",
      status:"进行中",price:"1.00"}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleFunction: function(e){
    const path = e.currentTarget.dataset.path
    console.log(e)
    if(path){
      wx.navigateTo({
        url: path,
      }).catch((error) => {
        wx.switchTab({
          url: path,
        })
      })
    }
  }
})