Page({
  data: {
    tempFilePaths:'',
    sourceType: ['camera', 'album']
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
    const that = this
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
        wx.setStorageSync('tempFilePaths', tempFilePaths)
        wx.uploadFile({
          url: 'http://101.42.227.112:8000/images/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'img',
          formData: {
          'userId': 'test'
          },
          success (res){
          const data = res.data
         console.log('上传成功')
          }
          })
      }
    })
  },
})
