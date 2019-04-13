// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  for (let index in event.arr) {
    console.log(index,event.arr)
    await db.collection('grade').doc(event.arr[index]._id).update({
      data: {
        final_grade: event.arr[index].final_grade,
        regular_grade: event.arr[index].regular_grade,
        student_name: event.arr[index].student_name,
        total_grade: event.arr[index].total_grade
      },
      success: res => {
        console.log('更新成功')
      },
      fail: err => {
        console.error('更新失败', err)
      }
    })
  }
  return{
    event
  }
}