import express from 'express';
import { createTransport } from 'nodemailer';
import { json } from 'body-parser';

const app = express();
const port = 8181;

app.use(json());

// 랜덤한 6자리 숫자로 구성된 인증번호 생성 함수
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = createTransport({
  service: 'naver',
  auth: {
    user: `${process.env.REACT_APP_HUNMO_EMAIL}`, // 발송 이메일 주소
    pass: `${process.env.REACT_APP_HUNMO_PASS}`, // 발송 이메일 비밀번호
  },
});

app.post('/CheckMailSend', (req, res) => {
  const { userEmail } = req.body;

  const verificationCode = generateVerificationCode();

  const mailOptions = {
    from: 'hunmo089300@gmail.com', // 발송 이메일 주소
    to: userEmail,
    subject: '이메일 인증 코드',
    text: `인증 코드: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: '이메일 전송에 실패했습니다.' });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({ success: true, message: '이메일이 성공적으로 전송되었습니다.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
