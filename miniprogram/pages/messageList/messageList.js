// miniprogram/pages/attend/attend.js
Page({

  onclick: function (e) {
    wx.navigateTo({
      url: '../../pages/sendMail/sendMail?class_id=' + e.currentTarget.id 
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    classArray: [{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var openid = app.globalData.openid;

    const db = wx.cloud.database()
    db.collection('class').where({ teacher_id: app.globalData.teacher_id }).get({
      success: res => {
        this.setData({
          classArray: res.data
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