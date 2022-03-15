// pages/market/addaddress/index.js
const app=getApp();
const userId = app.globalData.userId;
const domain = app.globalData.domainName
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addres: [{
            icon: "../../../icons/location.png",
            useraddress: "湖北省武汉市洪山区珞南街道武汉理工大学南湖校区",
            username: "李华",
            userphone: "8208208820"
          },
          {
            icon: "../../../icons/location.png",
            useraddress: "湖北省武汉市洪山区珞南街道武汉理工大学南湖校区",
            username: "李华",
            userphone: "8208208820"
          },],
          getAllList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getAlladdress(userId)
    },
    getAlladdress:function(userId){
      const that=this;
      wx.request({
        url:domain+'/address/getAll',
        data: {
            creatorId:userId
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data)
            const resData=res.data.data
            that.setData({
                addres: resData
            })
          }
      })
    },
    toAddaddress(){
      wx.navigateTo({
        url: '../receive/index',
      })
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

    }
})