import jwt from 'jsonwebtoken';
const secret = 'afsdjkaewiosdfklerwojisxfk23455434e5trcnvjligkeslrdsfg';

export const createJwt = (message) => {
  try {
    const jwtToken = jwt.sign({data: message.signature}, secret, { expiresIn: "3h" });
    return jwtToken;
  } catch (error) {
    console.error(error.message);
    return false
  }
};

export const verifyJwt = (jwtToken) => {
  try {
    const verify = jwt.verify(jwtToken, secret);
    return true
  } catch (error) {
    console.error(error.message);
    return false;
  }
};