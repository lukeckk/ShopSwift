import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {  
  // Create a token
  // paylod : id, secret: in env, when does the token expire (1 day is normal, 30 day is used for dev)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV !== 'development', // True if it is in production
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

}

export default generateToken;