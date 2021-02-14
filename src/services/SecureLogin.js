import sha256 from 'crypto-js/sha256';

function encrypt(str) {
  let encryptedStr = sha256(str.concat(str[0])).toString();
  str.split('').forEach((char) => {
    encryptedStr = sha256(encryptedStr.concat(char)).toString();
    encryptedStr = sha256(encryptedStr.replaceAll('a', encryptedStr[0])).toString();
    encryptedStr = sha256(encryptedStr.replaceAll('0', encryptedStr[0])).toString();
  })

  return encryptedStr;
}

export function requestRegister(password) {
  if (password.length === 0) return null;

  return encrypt(password);
}

export function requestLogin(password, hash) {
  if (password.length === 0) return null;

  return encrypt(password) === hash;
}