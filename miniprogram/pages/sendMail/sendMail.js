// miniprogram/pages/sendMail/sendMail.js
Page({
  titleInpute:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  textInpute:function(e){
    this.setData({
      text: e.detail.value
    })
  },
  onclick1:function(e){
    wx.navigateTo({
      url: '../../pages/messageRecord/messageRecord?class_id=' + this.data.class_id
    })
  },
  onclick:function(e){
    var students = this.data.students
    var mail = ''
    var that = this
    if(that.title == ''){
      wx.showToast({
        icon: 'none',
        title: '标题不能为空'
      })
    }else if(that.text == ''){
      wx.showToast({
        icon: 'none',
        title: '内容不能为空'
      })
    }else{
      for (let index in students) {
        mail += students[index].mail + ','
      }
      wx.cloud.callFunction({
        name: 'sendMail',
        data: {
          title: that.data.title,
          text: that.data.text,
          mail: mail
        },
        success(res) {
          wx.showToast({
            icon: 'none',
            title: '消息已发送'
          })
        },
        fail: console.error
      })
      const db = wx.cloud.database()
      db.collection('messageRecord').add({
        data:{
          class_id:that.data.class_id,
          send_date: new Date().Format("yyyy-MM-dd HH:mm:ss"),
          text:that.data.text,
          title:that.data.title
        }
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    class_id:'',
    class_name:'',
    title:'',
    text:'',
    students:[{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.class_id = options.class_id
    this.data.class_name = options.class_name
    var that = this
    const db = wx.cloud.database()
    db.collection('student').where({class_id:this.data.class_id}).get({
      success(res){
        that.setData({
          students:res.data
        })
      },
      fail(err){
        console.error(err)
      }
    })
  
   /* wx.cloud.callFunction({
      name: 'sendMail',
      success(res) {
        wx.showToast({
          icon: 'none',
          title: '记录保存成功'
        })
      },
      fail: console.error
    })*/
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
}),
Date.prototype.Format = function (fmt) { //author: meizz 
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