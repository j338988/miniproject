//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {}

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
      //逻辑判断是否认证

        const db = wx.cloud.database()
        db.collection('teacherList').where({ _openid: this.globalData.openid }).get({
        success: res => {
         console.log('[数据库] [查询记录] 成功: ',res.data)
         if(res.data.length != 0){
           //账号存在
           console.log('2')
           if (res.data[0].value == 2) {
             this.globalData.teacher_num = res.data[0].teacher_num
             this.globalData.teacher_name = res.data[0].teacher_name
             this.globalData.teacher_id = res.data[0]._id
             wx.switchTab({
               url: '../usercenter/usercenter'
             })
           } else if (res.data[0].value == 1) {
             wx.showToast({
               icon: 'none',
               title: '账号认证中，请稍后再试'
             })
           } else {
             wx.redirectTo({
               url: '../error/loginerror',
             })
           }
         }else{
           //账号不存在
           db.collection('teacherList').add({
             data: {
               value: 0
             },
             success: res => {
               wx.redirectTo({
                 url: '../error/loginerror',
               })
               console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
             },
             fail: err => {
               console.error('[数据库] [新增记录] 失败：', err)
             }
           })
         }
         
       },
          fail: err => {
         console.error('[数据库] [查询记录] 失败：', err)
       },
     })

      //认证代码
      
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  }
})
