// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database()
    var regular_grade = event.student_regular + event.regular_grade;
    await db.collection('grade').doc(event._id).update({
      data: {
        regular_grade: regular_grade
      },
      success(res) {
        console.log(res)
      },
      fail: console.error
    })
    await db.collection('attend').add({
      data: {
        student_id: event.student_id,
        student_name: event.student_name,
        class_id:event.class_id,
        student_num: event.student_num,
        attend_date: event.attend_date,
        value: event.value
      }
    })
}