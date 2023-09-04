// 导入矩阵模块（在 '../../math/matrix/Matrix' 中定义的模块）。
import * as mtrx from '../../math/matrix/Matrix';

// 字母 'A' 的Unicode编码值（等于65）。
const alphabetCodeShift = 'A'.codePointAt(0);

const englishAlphabetSize = 26;

/**
 * 从给定的keyString生成密钥矩阵。
 *
 * @param {string} keyString - 用于构建密钥矩阵的字符串（必须是matrixSize^2长度的字符串）。
 * @return {number[][]} 密钥矩阵
 */
const generateKeyMatrix = (keyString) => {
  const matrixSize = Math.sqrt(keyString.length);
  if (!Number.isInteger(matrixSize)) {
    throw new Error(
      '无效的密钥字符串长度。密钥字符串的平方根必须是整数',
    );
  }
  let keyStringIndex = 0;
  return mtrx.generate(
    [matrixSize, matrixSize],
    // 回调函数用于获取每个矩阵单元格的值。
    // 矩阵填充的顺序是从左到右，从上到下。
    () => {
      // A → 0, B → 1, ..., a → 32, b → 33, ...
      const charCodeShifted = (keyString.codePointAt(keyStringIndex)) % alphabetCodeShift;
      keyStringIndex += 1;
      return charCodeShifted;
    },
  );
};

/**
 * 从给定的消息生成消息向量。
 *
 * @param {string} message - 要加密的消息。
 * @return {number[][]} 消息向量
 */
const generateMessageVector = (message) => {
  return mtrx.generate(
    [message.length, 1],
    // 回调函数用于获取每个矩阵单元格的值。
    // 矩阵填充的顺序是从左到右，从上到下。
    (cellIndices) => {
      const rowIndex = cellIndices[0];
      return message.codePointAt(rowIndex) % alphabetCodeShift;
    },
  );
};

/**
 * 使用Hill密码加密给定的消息。
 *
 * @param {string} message 明文
 * @param {string} keyString 密钥字符串
 * @return {string} 密文字符串
 */
export function hillCipherEncrypt(message, keyString) {
  // 密钥字符串和消息只能包含字母。
  const onlyLettersRegExp = /^[a-zA-Z]+$/;
  if (!onlyLettersRegExp.test(message) || !onlyLettersRegExp.test(keyString)) {
    throw new Error('消息和密钥字符串只能包含字母');
  }

  const keyMatrix = generateKeyMatrix(keyString);
  const messageVector = generateMessageVector(message);

  // keyString.length必须等于message.length的平方
  if (keyMatrix.length !== message.length) {
    throw new Error('无效的密钥字符串长度。密钥长度必须是消息长度的平方');
  }

  const cipherVector = mtrx.dot(keyMatrix, messageVector);
  let cipherString = '';
  for (let row = 0; row < cipherVector.length; row += 1) {
    const item = cipherVector[row];
    cipherString += String.fromCharCode((item % englishAlphabetSize) + alphabetCodeShift);
  }

  return cipherString;
}

// @TODO: 实现解密方法。
export const hillCipherDecrypt = () => {
  throw new Error('此方法尚未实现');
};