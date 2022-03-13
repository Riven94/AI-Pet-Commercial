// pages/camera/matching/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        animalitem:{
            attribute: "宠物狗",
            match:"99%",
            name: "旺旺",
            type: "萨摩耶",
            color: "白色",
            img: "../../../icons/t016405bacfe2006a05.jpg",
            currentData: 0, 
            selectPerson: true,
          },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
            url: 'http://101.42.227.112:8000/user/getUserDetail',
            data:{
              userId:1
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)
            }
          })
    },
 //获取当前滑块的index
 bindchange: function(e) {
  const that = this;
  that.setData({
    currentData: e.detail.current
  })
},
//点击切换，滑块index赋值
checkCurrent: function(e) {
  const that = this;

  if (that.data.currentData === e.target.dataset.current) {
    return false;
  } else {

    that.setData({
      currentData: e.target.dataset.current
    })
  }
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