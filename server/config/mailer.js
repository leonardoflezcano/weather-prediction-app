import nodemailer from 'nodemailer';

// Configuración de Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usamos Gmail como servicio de correo
  auth: {
    user: 'fabilezcano94@gmail.com', // Tu correo de Gmail
    pass: 'zqgzgjvbtldpkcys', // Contraseña de aplicación (sin espacios)
  },
});

// Función para enviar el correo
export const sendRecoveryEmail = async (email, resetLink) => {
  const mailOptions = {
    from: 'fabilezcano94@gmail.com', // Correo desde donde enviarás los emails
    to: email, // Correo del usuario que solicita el restablecimiento
    subject: 'Restablecer tu contraseña', // Asunto del correo
    html: `
      <p>Hola,</p>
      <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para proceder:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Si no solicitaste este cambio, ignora este mensaje.</p>
    `, // HTML para un formato más profesional
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo');
  }
};
