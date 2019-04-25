// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
    await db.collection('teacherList').doc(event._id).update({
      data: {
        value: 2
      },
      success: res => {
        console.log('更新成功')
      },
      fail: err => {
        console.error('更新失败', err)
      }
    })
  return {
    event
  }
}