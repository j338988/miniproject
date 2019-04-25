// miniprogram/pages/addClass/addClass.js
Page({
  classInpute:function(e){
    this.setData({
      class_name: e.detail.value
    })
  },
  courseInpute:function(e){
    this.setData({
      course_name: e.detail.value
    })
  },
  onclick:function(e){
    console.log(this.data.index)
    var class_name = this.data.class_name
    var course_name = this.data.course_name
    var teacher_id = this.data.selectData[this.data.index]._id
    if(class_name == ''||course_name == ''){
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      })
    }else{
      const db = wx.cloud.database()
      db.collection('class').add({
        data: {
          class_name:class_name+' '+course_name,
          count:0,
          teacher_id:teacher_id
        },
        success: res => {
          wx.showToast({
            title: '新建班级成功',
          })
        },
        fail: err => {
          console.error(err)
        }
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    class_name:'',
    course_name:'',
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: '',//下拉列表的数据
    index: 0,//选择的下拉列表下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection('teacherList').where({ value: _.in([2, 3])}).get({
      success:res=>{
        that.setData({
          selectData:res.data
        })
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
