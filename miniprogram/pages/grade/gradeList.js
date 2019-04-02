// miniprogram/pages/grade/gradeList.js
Page({

  /**
   * 页面的初始数据
   */
  switchChange:function(e){
    this.setData({
      flag:e.detail.value
    })
  },
  rateInpute:function(e){
    if(e.detail.value>0&&e.detail.value<1){
      this.data.rate = e.detail.value
      for (let index in this.data.gradeArray) {
        var total_grade = 'gradeArray[' + index + '].total_grade'
        this.setData({
          [total_grade]: this.data.gradeArray[index].regular_grade * (1 - this.data.rate) + this.data.gradeArray[index].final_grade * this.data.rate
        })
      }
    }else{
      wx.showToast({
        icon: 'none',
        title: '占比区间为(0,1),请校验后再试'
      })
    }
   
  },
  regular_gradeInput: function(e) {
    this.data.gradeArray[e.currentTarget.id].regular_grade = e.detail.value
    var total_grade = 'gradeArray[' + e.currentTarget.id +'].total_grade'
    this.setData({
     // [regular_grade]: e.detail.value,
      [total_grade]: this.data.gradeArray[e.currentTarget.id].regular_grade * (1 - this.data.rate) + this.data.gradeArray[e.currentTarget.id].final_grade * this.data.rate
    })
  },
  final_gradeInput: function(e) {
    this.data.gradeArray[e.currentTarget.id].final_grade = e.detail.value
    /*this.data.gradeArray[e.currentTarget.id].total_grade = e.detail.value * (1 - this.data.rate) + this.data.gradeArray[e.currentTarget.id].final_grade * this.data.rate*/
    //var final_grade = 'gradeArray[' + e.currentTarget.id + '].final_grade'
    var total_grade = 'gradeArray[' + e.currentTarget.id + '].total_grade'
    this.setData({
      //[final_grade]: e.detail.value,
      [total_grade]: this.data.gradeArray[e.currentTarget.id].regular_grade * (1 - this.data.rate) + this.data.gradeArray[e.currentTarget.id].final_grade * this.data.rate
    })
  },

  clickButton: function(e) {
    var flag = false
    for (let index in this.data.gradeArray) {
      if (this.data.gradeArray[index].regular_grade > 100 || this.data.gradeArray[index].regular_grade < 0 || this.data.gradeArray[index].final_grade > 100 || this.data.gradeArray[index].final_grade < 0) {
        flag = true;
        break;
      }
    }
    if (flag == true) {
      console.error('成绩区间为[0,100],请校验后再试')
      wx.showToast({
        icon: 'none',
        title: '成绩区间为[0,100],请校验后再试'
      })
    } else {
      wx.cloud.callFunction({
        name:'revisionGrade',
        data:{
          arr:this.data.gradeArray
        },
        success(res){
          wx.showToast({
            icon: 'none',
            title: '保存成功'
          })
          console.log(res)
        },
        fail: console.error
      })
      /*const db = wx.cloud.database()
      for (let index in this.data.gradeArray) {
        console.log(this.data.gradeArray[index]._id)
        console.log(this.data.gradeArray[index].regular_grade)
        db.collection('grade').doc(this.data.gradeArray[index]._id).update({
          data: {
            final_grade:this.data.gradeArray[index].final_grade,
            regular_grade:this.data.gradeArray[index].regular_grade,
            student_name:this.data.gradeArray[index].student_name,
            total_grade:this.data.gradeArray[index].total_grade
          },
          success: res => {
            console.log('更新成功',res)
          },
          fail: err => {
            console.error('更新失败', err)
          }
        })
      }*/
    }
    
  },
  data: {
    gradeArray: [{}],
    rate:0.6,
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var app = getApp();

    const db = wx.cloud.database()
    db.collection('grade').where({
      class_id: options.class_id
    }).get({
      success: res => {
        this.setData({
          gradeArray: res.data
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
})