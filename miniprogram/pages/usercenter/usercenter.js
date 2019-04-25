// pages/usercenter/usercenter.js
Page({
  onclick:function(e){
    wx.navigateTo({
      url: '../managerPage/managerPage',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    teacher_num:'',
    teacher_name:'',
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var app = getApp();
    var openid = app.globalData.openid;
    var flag = app.globalData.flag;
    var teacher_num = app.globalData.teacher_num;
    var teacher_name = app.globalData.teacher_name;
    this.setData({
      openid: openid,
      teacher_num :teacher_num,
      teacher_name : teacher_name,
      flag :flag
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})