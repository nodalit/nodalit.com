import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  console.log(body)
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'andersand@meetr.dk',
      pass: process.env.SMTP_PW,
    },
    service: 'Outlook365',
  })
  const result = await transporter.sendMail({
    from: 'Anders And <andersand@meetr.dk>',
    to: 'kontakt@meetr.dk',
    subject: 'Ny besked på nodalit.com',
    text: `Fra: ${body.name}\nEmail: <${body.email}>\n\n${body.message}`,
  })
  console.log(result)
  return {
    success: true,
  }
})
