// middleware/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_clave_secreta'; // Debe ser la misma que usaste para firmar el token

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtiene el token del header

  if (!token) return res.sendStatus(401); // Si no hay token, no está autorizado

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Si el token no es válido, está prohibido
    req.user = user; // Guarda la información del usuario en el request
    next(); // Llama al siguiente middleware
  });
};
