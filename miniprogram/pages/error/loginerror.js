// miniprogram/pages/error/loginerror.js
var appInstance = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    name:''
  },

  //获取输入框信息
  numInput:function(e){
    this.setData({
      num: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //提交操作
  clickButton:function(e){
    if(this.data.num == ''){
      wx.showToast({
        icon: 'none',
        title: '请输入工号'
      })
    }else if(this.data.name == ''){
      wx.showToast({
        icon: 'none',
        title: '请输入姓名'
      })
    }else{
      const db = wx.cloud.database()
      db.collection('teacherList').where({ _openid: appInstance.globalData.openid }).get({
        success: res => {
          db.collection('teacherList').doc(res.data[0]._id).update({
            data: {
              teacher_num: this.data.num,
              teacher_name: this.data.name,
              value: 1
            },
            success: res => {
              wx.showToast({
                icon: 'none',
                title: '认证请求已提交，请等待管理员处理'
              })
            },
            fail: err => {
              icon: 'none',
                console.error('请求失败，请稍后再试：')
            }
          })
        },
        fail: err => {
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
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

  }

  
})