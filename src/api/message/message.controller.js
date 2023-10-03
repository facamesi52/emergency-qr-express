const Message = require('./message.model');
const User = require('../user/user.model');
const { createMessage } = require('./message.service');
const nodemailer = require('nodemailer');

// Configura el transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIN_EMAIL,
    pass: process.env.MAIN_EMAIL_PASS,
  },
});

const createMessageController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Obtener el usuario de la base de datos
    const user = await User.findById(userId);

    // Si el usuario no existe, lanzar un error
    if (!user) {
      throw new Error('User not found');
    }

    // Crear el nuevo mensaje
    const newMessage = {
      messageText: req.body.message,
      emailMessage: req.body.nameMessage,
      user: userId,
      email: user.email, // Aquí agregamos el correo del usuario
    };

    // Guardar el nuevo mensaje en la base de datos
    const message = await createMessage(newMessage);

    // Agregar el mensaje a la lista de mensajes del usuario
    user.messages.unshift(message);

    // Guardar los cambios en el usuario
    await user.save({ validateBeforeSave: false });

    // Enviar un correo electrónico al usuario usando nodemailer
    const mailOptions = {
      from: process.env.MAIN_EMAIL,
      to: newMessage.email,
      subject: `mensaje nuevo enviado por ${newMessage.emailMessage}`,
      html: `
      <p>Tu mensaje recibido fue: <b>${newMessage.messageText}</b></p>
      <br />
      <a href="https://nextjs-qr-app.vercel.app/dashboard">
      <img src="https://res.cloudinary.com/drnclewqh/image/upload/v1696197049/hotelImages/jjeqkzedgtvikm68htps.png" alt="ImagenEmergencyQR">
    </a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        // Manejar errores de envío de correo electrónico
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Responde con el mensaje creado
    res.status(201).json({ message: 'message created', data: message });
  } catch (error) {
    // Responde con el error
    res.status(400).json({ message: 'Message could not be created', data: error.message });
  }
};

module.exports = {
  createMessageController,
};