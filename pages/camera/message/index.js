// pages/camera/message/index.js
Page({
    onShareAppMessage() {
      return {
        title: 'form',
        path: 'page/component/pages/form/form',
        title:'radio',
        path:'page/component/pages/radio/radio'
      }
    },
  
    data: {
      items:[
          {value:'0',name:"宠物（未丢失）"},
          {value:'1',name:"宠物（丢失）"},
          {value:'2',name:"流浪动物"}
      ],
    
     imageList:[],
     name:"",
     kind:"",
     islost:"",
     yanse:"",
     kd_type:""
    },
 

    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
         const items = this.data.items
         for (let i = 0, len = items.length; i < len; ++i) {
          items[i].checked = items[i].value === e.detail.value
        }
        this.setData({
           islost:e.detail.value
          }) 
      }, 
      formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        this.setData({
          kd_type:e.detail.value
        })
      },
      uploadImage:function(){
          var that=this;
          wx.chooseImage({
            count: 5,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFilePaths = res.tempFilePaths 
              console.log(res)
              that.setData({
                  imageList:res.tempFilePaths
              })
              console.log("aaaaaaaaa",that.data.imageList)
              that.upload({
                path: tempFilePaths
            })
            }
         
          })
      },
      			//上传图片
			upload(data) { // 上传图片
				var that = this;
				wx.showToast({
						icon: "loading",
						title: "正在上传"
					}),
				wx.request({
					//上传图片协议接口
          url: 'http://101.42.227.112:8000/iamges/uploadFile/animal',
          method: 'POST',
					/* img: data.path[i], */
          name: 'image',
          formData:{
            creatorId: 1,
            photo:"sdfjiuhhk"
          },
					success(res) {
            console.log("上传图片成功")

					},
					fail(e) {
						wx.showModal({
							title: '提示',
							content: '上传失败',
							showCancel: false
						})
					},

				})
            },
      animalname:function(e){
        this.setData({
            name:e.detail.value
          })
              console.log("姓名："+this.data.name)
            },
     variety:function(e){
              this.setData({
                  kind:e.detail.value
                })
                    console.log("品种："+this.data.kind)
                  },
     yanSe:function(e){
                    this.setData({
                        yanse:e.detail.value
                      })
                          console.log("颜色："+this.data.yanse)
                        },            
      bindSubmit :function (params) {
        var that=this;
        if(that.data.islost==0||that.data.islost==1){
          that.setData({state: that.data.islost})
          console.log(that.data.state)
          const currentState = Number(that.data.state)
          const currentType=Number(that.data.kd_type)
          var temp = {
            animalName: that.data.name,
            varieties: that.data.kind,
            color:that.data.yanse,
            type:currentType,
            imgUrl:that.data.imageList,
            ownerId: 13,
            ownerName: 'dd',
            isLost: 0,
            state: currentState
          };
          console.log(temp);
          wx.request({
            url: 'http://101.42.227.112:8000/animals/ownerUpload',
            method: 'POST',
            header: {'content-type': 'application/x-www-form-urlencoded'},
            data: temp,
            success: function(res) {
              console.log(res)
              that.setData({
               /*  animalName:res.data.animalName,
                varieties:res.data.varieties */
              })
              wx.showModal({
                title:'提示',
                content: '信息是否填入完全',
                success: function (res) {
                  if (res.confirm) {//这里是点击了确定以后
                    console.log('用户点击前往录用')
                  } else {//这里是点击了取消以后
                    console.log('用户点击暂时不用')
                  }
                }
                
              })
            },
            fail: function(res) {
              wx.showModal({
                title: '提示',
              })
            }})
      
        
        }
        if(that.data.islost==2){
         
            wx.request({
              url: 'http://101.42.227.112:8000/animals/helperUpload',
              data: {
                'animalName': that.data.name,
                'varieties': that.data.kind,
                'color':that.data.yanse,
                'type':that.data.kd_type,
                'imgUrl':that.data.imageList,
                'finderId': 12,
                'finderName': 'dd',
                'isLost': 1,
                'state':0
              },
              method: 'POST',
              header: {'content-type': 'application/x-www-form-urlencoded'},

              success: function(res) {
                console.log(res.data)
                that.setData({
                 /*  animalName:res.data.animalName,
                  varieties:res.data.varieties */
                })
                wx.showModal({
                  title:'提示',
                  content: '信息是否填入完全',
                  success: function (res) {
                    if (res.confirm) {//这里是点击了确定以后
                      console.log('用户点击前往录用')
                    } else {//这里是点击了取消以后
                      console.log('用户点击暂时不用')
                    }
                  }
                  
                })
              },
              fail: function(res) {
                wx.showModal({
                  title: '提示',
                })
              }
            })
          }        
     }
         
              
  })
  