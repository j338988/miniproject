const nodemailer = require("nodemailer"); 
var transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,               // SMTP 端口
  secure: true,            // 使用 SSL
  auth: {
    user: '442999720@qq.com',   //发邮件邮箱
    pass: 'raaivsmgcgnbbjia'        //此处不是qq密码是
  }
}); 
// 云函数入口函数
exports.main = async (event, context) => {
  var mailOptions = {
    from: '442999720@qq.com',   // 发件地址
    to: event.mail,    // 收件列表
    subject: event.title,      // 标题
    text: event.text
  };
//开始发送邮件
const info = await transporter.sendMail(mailOptions);
console.log('Message sent: ' + info.response);
return info}