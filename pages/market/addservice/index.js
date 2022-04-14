// pages/market/addservice/index.js
const app = getApp();
const domain = app.globalData.domainName;
const userId = app.globalData.userId;
Page({
    data: {
      addPhotoIcon: domain + "/media/icon/addphoto.png",
      info:["服务名称","服务描述","服务状态","价格","保障"],
      imageList1:[],
      imageList2:[],
      imageList3:[],
      shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
      types: ['洗澡', '美容', '寄卖','撸宠'], //下拉列表的数据
      typeIndex: 0, //选择的下拉列表下标,
      Type:'洗澡',
      storeId:'',
      stateIndex: 0,
      state: ['未售完', '已售完'],
      levels: ['一星级','二星级','三星级','四星级','五星级',],
      levelIndex: 0,
      interfaces: ['/images/uploadFile/service','/images/uploadFile/bulk','/images/uploadFile/purInfor']
    },

    bindTypeChange(e){
      this.setData({ typeIndex: e.detail.value * 1});
    },
    
    bindStateChange(e){
      this.setData({ stateIndex: e.detail.value * 1});
    },

    bindLevelChange(e){
      this.setData({ levelIndex: e.detail.value * 1});
    },
    
    preview(e){
      const url = e.currentTarget.dataset.url;
      wx.previewImage({
        urls: [url],
      })
    },

    formSubmit(e) {
      var that=this;
      const userId = app.globalData.userId;
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      const Name=e.detail.value.input0;
      const Detail=e.detail.value.input1;
      const State= that.data.stateIndex;
      const Price=e.detail.value.input3;
      const Security=e.detail.value.input4;
      var temp = {
        "name":Name,
        "imgUrl": that.data.imageList1,
        "detail":Detail,
        "type": that.data.types[that.data.typeIndex],
        "state":State,
        "creatorId":userId,
        "storeId":that.data.storeId,
        "price": Price,
        "security":Security,
        "level": that.data.levelIndex + 1,
        "bulkUrl":that.data.imageList2,
        "purInforUrl":that.data.imageList3
      };
      console.log(temp);
      wx.request({
        url: domain+'/service/add', 
        method: 'POST',
        data: temp,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          wx.showModal({
            cancelColor: 'cancelColor',
            content: '添加成功！',
            showCancel: false,
            success(res){
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    },

    chooseImage(e){
      var that = this;
      console.log(e.currentTarget.dataset.index);
      wx.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths 
          that.upload(tempFilePaths, e.currentTarget.dataset.index * 1)
        }
      })
    },

    upload(data,index){
      var curInterface = this.data.interfaces[index];
      const userId = app.globalData.userId;
      var that = this;
      var imgUrls = this.data.imageList1;
      console.log(curInterface, index);
      switch(index){
        case 1:
          imgUrls = this.data.imageList2;
          break;
        case 2:
          imgUrls = this.data.imageList3;
          break;
      }
      wx.showToast({
          icon: "loading",
          title: "正在上传"
      }),
      console.log(curInterface);
      data.forEach((item)=>{
        wx.uploadFile({
          filePath: item,
          //上传图片协议接口
          url: domain + curInterface,
          name:'img',
          formData: {
            "creatorId": userId
          },
          success(res) {
            let imgUrl = JSON.parse(res.data).imgUrl;
            imgUrl.forEach((item)=>{
              imgUrls.push(item);
            })
            switch(index){
              case 0:
                that.setData({imageList1: imgUrls});
                console.log(1);
                console.log(that.data.imageList1);
                break;
              case 1:
                that.setData({imageList2: imgUrls});
                console.log(2);
                console.log(that.data.imageList2);
                break;
              case 2:
                that.setData({imageList3: imgUrls});
                console.log(3);
                console.log(that.data.imageList3);
                break;
            }
          },
          fail(e) {
            console.log(e);
            wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
            })
          }
        })
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({storeId: options.storeId * 1});
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