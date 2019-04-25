// miniprogram/pages/addStudent/addStudent.js
Page({
  nameInpute: function (e) {
    this.setData({
      student_name: e.detail.value
    })
  },
  numInpute: function (e) {
    this.setData({
      student_num: e.detail.value
    })
  },
  mailInpute: function (e) {
    this.setData({
      mail: e.detail.value
    })
  },
  onclick:function(e){
    var that = this
    var name = this.data.student_name
    var num = this.data.student_num
    var mail = this.data.mail
    var count = this.data.selectData[this.data.index].count+1
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: 'addStudent',
      data: {
        class_id:that.data.selectData[this.data.index]._id,
        mail:mail,
        student_name:name,
        student_num:num,
        count:count,  
      },
      success(res) {
        wx.showToast({
          icon: 'none',
          title: '保存成功'
        })
      },
      fail: console.error
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    student_name:'',
    student_num:'',
    mail:'',
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: '',//下拉列表的数据
    index: 0,//选择的下拉列表下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('class').get({
      success:res=>{
        that.setData({
          selectData:res.data
        })
        fail:err=>{
          console.error(err)
        }
      }
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

  },

  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
})