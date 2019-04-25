const cloud = require('wx-server-sdk')

cloud.init()
exports.main = async (event, context) => {
  const db = cloud.database()
  await db.collection('student').add({
    data:{
      class_id:event.class_id,
      mail:event.mail,
      student_name: event.student_name,
      student_num: event.student_num
    },  
  })
  await db.collection('grade').add({
    data: {
      student_name: event.student_name,
      student_id: 'fdsfsdfasds',
      final_grade: 100,
      regular_grade: 100,
      total_grade: 100,
      class_id: event.class_id,
    }
  })
  await db.collection('class').doc(event.class_id).update({
    data:{
      count:event.count
    },
    success:res=>{
      console.log(res)
    },
    fail:err=>{
      console.error(err)
    }
  })
}