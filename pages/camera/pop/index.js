Page({
  data:{
function :[
  
]
  

  },
  //创建相机
  onLoad() {
    this.ctx = wx.createCameraContext()
  },
  //拍照
  takePhoto() {
    const that = this;
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
      wx.request({
        url: 'http://101.42.227.112:8000/images/upload',
        method: 'POST',
        data:'pageSize=1&pageNum=10',    //参数为键值对字符串
        header: {
          'content-type':'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            items: res.data
          })
        }
        
      })
      }
    })
  },
 message(){
  wx.navigateTo({
    url: '/pages/camera/message/index'
  })
 },
 result(){
   wx.navigateTo({
     url: '/pages/camera/result/index',
   })
 },
  
  error(e) {
    console.log(e.detail)
  }
})