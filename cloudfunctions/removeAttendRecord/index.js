// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
 await db.collection('attend').doc(event._id).remove({
    success: console.log,
    fail: console.error
  })

}