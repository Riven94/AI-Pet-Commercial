// pages/camera/matching/index.js
const app = getApp();
const domain = app.globalData.domainName;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        animals:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    const that = this;
    eventChannel.on('sendData', function(data){
      let resData = data.data.data;
      console.log(resData);
      that.getOwner(resData);
      that.setData({animals: resData}, ()=>{
        console.log(that.data.animals);
      });
    })
  },

  getOwner(data){
    var owners = [];
    data.forEach( (item) =>{
      wx.request({
        url: domain + '/user/getUserDetail',
        data:{
          userId: item.ownerId
        },
        method: 'GET',
        success(res){
          owners.push(res.data.data);
        },
        fail(error){
          console.log(error);
        }
      })
    });
    setTimeout(()=>{
      this.setData({owners: owners}, ()=>{
        console.log(this.data.owners);
      });
    }, 0);
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

  toDetail(e){
    console.log(e);
    const that = this;
    const dataset = e.currentTarget.dataset
    const animalId = dataset.id;
    const ownerId = dataset.owner;
    const index = dataset.index;
    wx.navigateTo({
      url: '../result/index?index=' + index,
      events:{
        sendData: function(data){
        }
      },
      success(res){
        res.eventChannel.emit('sendData', {animal: that.data.animals, owner: that.data.owners});
      }
    })
  },
})