const app = getApp();
const domain = app.globalData.domainName;
Page({
  data: {
    tempFilePaths:'',
    sourceType: ['camera', 'album'],
    recognizeImg: domain + "/media/icon/recognize.png"
  },
  
  onLoad: function () {
 
  },
  
 //头像点击处理事件，使用wx.showActionSheet()调用菜单栏
  buttonclick: function () {
    const that = this
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      itemColor: '',
      //成功时回调
      success: function (res) {
        if (!res.cancel) {
          /*
           res.tapIndex返回用户点击的按钮序号，从上到下的顺序，从0开始
           比如用户点击本例中的拍照就返回0，相册就返回1
           我们res.tapIndex的值传给chooseImage()
          */
          that.chooseImage(res.tapIndex)
        }
      },
      //失败时回调
      fail: function (res) {
        console.log('调用失败')
       },
      complete: function (res) { },
    })
  },

  chooseImage(tapIndex) {
    const checkeddata = true
    const that = this;
    wx.chooseImage({
    //count表示一次可以选择多少照片
      count: 1,
      //sizeType所选的图片的尺寸，original原图，compressed压缩图
      sizeType: ['original', 'compressed'],
      //如果sourceType为camera则调用摄像头，为album时调用相册
      sourceType: [that.data.sourceType[tapIndex]],
      success(res) {
         //tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        //将选择到的图片缓存到本地storage中
        wx.setStorageSync('tempFilePaths', tempFilePaths);
        wx.showLoading({
          title: "识别中..."
        })
        wx.uploadFile({
          url: domain + '/images/uploadFile/petIdentify', 
          filePath: tempFilePaths[0],
          name: 'img',
          formData: {
            creatorId: app.globalData.userId
          },
          success (res){
            const data = JSON.parse(res.data);
            console.log(JSON.parse(res.data));
            console.log(res);
            console.log('上传成功');
            wx.navigateTo({
              url: './matching/index',
              events:{
                sendData: function(data){
                }
              },
              success(res){
                res.eventChannel.emit('sendData', {data: data});
              }
            })
            wx.hideLoading({
            })
          }
          })
      }
    })
  },
})
