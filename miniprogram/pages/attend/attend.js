// miniprogram/pages/attend/attend.js
Page({
    attendRecord: function(e) {
      wx.navigateTo({
        url: '../../pages/attendRecord/attendRecord?class_id=' + this.data.class_id
      })
    },
    //迟到
    late: function(e) {
      var index = this.data.index
      if (index >= this.data.count) {
        wx.showToast({
          icon: 'none',
          title: '无效指令'
        })
      } else {
        const db = wx.cloud.database()
        var that = this
        console.log(this.data)
        db.collection('grade').where({
          student_id: this.data.students[index]._id
        }).get({
          success(res) {
            wx.cloud.callFunction({
              name: 'revisionRegular',
              data: {
                _id:res.data[0]._id,
                student_id: res.data[0].student_id,
                student_regular: res.data[0].regular_grade,
                regular_grade: -10,
                attend_date: new Date().Format("yyyy-MM-dd HH:mm:ss"),
                class_id: that.data.class_id,
                value: '迟到',
                student_name: that.data.studentName,
                student_num: that.data.studentNum
              },
              success(res) {
                wx.showToast({
                  icon: 'none',
                  title: '记录保存成功'
                })
              },
              fail: console.error
            })
          },
          fail(err) {
            console.error(err)
          }
        })
        /*wx.cloud.callFunction({
          name: 'revisionRegular',
          data: {
            studentName:this.data.studentName,
            regular_grade:-10
          },
          success(res) {
            wx.showToast({
              icon: 'none',
              title: '保存成功'
            })
            console.log(res)
          },
          fail: console.error
        })*/
      }
    },
    //旷课
    truancy: function(e) {
      var index = this.data.index
      if (index >= this.data.count) {
        wx.showToast({
          icon: 'none',
          title: '无效指令'
        })
      } else {
        const db = wx.cloud.database()
        var that = this
        db.collection('grade').where({
          student_id: this.data.students[index]._id
        }).get({
          success(res) {
            wx.cloud.callFunction({
              name: 'revisionRegular',
              data: {
                _id: res.data[0]._id,
                student_id: res.data[0].student_id,
                student_regular: res.data[0].regular_grade,
                regular_grade: -20,
                attend_date: new Date().Format("yyyy-MM-dd HH:mm:ss"),
                value: '旷课',
                class_id: that.data.class_id,
                student_name: that.data.studentName,
                student_num: that.data.studentNum
              },
              success(res) {
                wx.showToast({
                  icon: 'none',
                  title: '记录保存成功'
                })
              },
              fail: console.error
            })
          },
          fail(err) {
            console.error(err)
          }
        })
      }
    },
    //请假
    leave: function(e) {
      var index = this.data.index
      if (index >= this.data.count) {
        wx.showToast({
          icon: 'none',
          title: '无效指令'
        })
      } else {
        var that = this
        const db = wx.cloud.database()
        db.collection('attend').add({
          data: {
            student_id: that.data.students[that.data.index]._id,
            student_name: that.data.studentName,
            student_num: that.data.studentNum,
            class_id: that.data.class_id,
            attend_date: new Date().Format("yyyy-MM-dd HH:mm:ss"),
            value: '请假'
          },
          success(res) {
            console.log(res)
            wx.showToast({
              icon: 'none',
              title: '记录保存成功'
            })
          }
        })
      }

    },
    //随机抽点
    randompick: function(e) {
      this.setData({
        flag: false,
        mode: 1
      })
      this.getNext(e)
    },
    //全班点名
    orderpick: function(e) {
      this.setData({
        index: -1,
        flag: false,
        mode: 2
      })
      this.getNext(e)
    },

    //退出
    quitButton: function(e) {
      this.setData({
        studentName: '',
        studentNum: '',
        flag: true
      })
    },

    //获取下一个学生
    getNext: function(e) {
      this.tts(e)
      if (this.data.mode == 1) {
        //随机抽查
        var index = Math.round(Math.random() * (this.data.count - 1))
        this.setData({
          index: index,
          studentName: this.data.students[index].student_name,
          studentNum: this.data.students[index].student_num
        })
        console.log(this.data.index)
      } else if (this.data.mode == 2) {
        //全班点名
        var index = this.data.index
        index++
        if (index >= this.data.count) {
          this.setData({
            index: index,
            studentName: '点名完成',
            studentNum: ''
          })
        } else {
          this.setData({
            index: index,
            studentName: this.data.students[index].student_name,
            studentNum: this.data.students[index].student_num
          })
        }
      }
    },

    //语音合成
    tts: function(e) {
      var that = this
      var grant_type = 'client_credentials'
      var appKey = 'p2y49vSHOupKCqYimsDitEOF'
      var appSecret = 'GBLs9sluNqwbDKSY72Sg5OaCaNAeGsoC'
      var url = 'https://openapi.baidu.com/oauth/2.0/token?grant_type=' + grant_type + '&client_id=' + appKey + '&client_secret=' + appSecret
      wx.request({
        url: url,
        data: {
          grant_type: grant_type,
          client_id: appKey,
          client_secret: appSecret
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          var token = res.data.access_token
          that.cancel(token)
        }
      })
    },

    cancel: function(token) {
      // var text = JSON.parse('语音播放')
      // var msg = this.data.studentName
      // var text = JSON.parse(msg).msg;
      var that = this
      var myapp = getApp()
      var tex = encodeURI(this.data.studentName)
      var tok = token
      var cuid = myapp.globalData.openid
      var ctp = 1;
      var lan = 'zh'
      var spd = 5
      var url = 'https://tsn.baidu.com/text2audio?tex=' + tex + '&lan=' + lan + '&cuid=' + cuid + '&ctp=' + ctp + '&tok=' + tok + '&spd=' + spd
      wx.downloadFile({
        url: url,
        success: function(res) {
          var filePath = res.tempFilePath
          if (res.statusCode === 200) {
            wx.playVoice({
              filePath: 'res.tempFilePath',
            })
          }
          that.play(filePath)
        }
      })
    },

    play: function(filePath) {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = filePath
      /*innerAudioContext.onPlay(()=>{
        console.log("开始播放")
      })*/
      innerAudioContext.onError((res) => {
        console.error(res)
      })
    },

    /**
     * 页面的初始数据
     */
    data: {
      index: -1,
      class_id: '',
      count: '',
      students: [{}],
      studentName: '',
      sutdentNum: '',
      mode: 0,
      flag: true,
      //filePath:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(options)
      this.data.class_id = options.class_id,
        this.data.count = options.count

      const db = wx.cloud.database()
      db.collection('student').where({
        class_id: options.class_id
      }).get({
        success: res => {
          this.setData({
            students: res.data
          })
        },
        fail: err => {
          console.error('[数据库] [查询记录] 失败：', err)
        },
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
  }),

  Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "H+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds() //毫秒  
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }