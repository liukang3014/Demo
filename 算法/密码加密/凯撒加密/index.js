// 创建英文字母数组：['a', 'b', 'c', ..., 'z']。
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

/**
 * 生成一个基于字母表的密码映射。
 * 例如，使用位移值 3：{'a': 'd', 'b': 'e', 'c': 'f', ...}
 *
 * @param {string[]} alphabet - 字母表，例如 ['a', 'b', 'c', ... , 'z']
 * @param {number} shift - 位移值，例如 3
 * @return {Object} - 密码映射，例如 {'a': 'd', 'b': 'e', 'c': 'f', ..., 'z': 'c'}
 */
const getCipherMap = (alphabet, shift) => {
    return alphabet
        .reduce((charsMap, currentChar, charIndex) => {
            const charsMapClone = { ...charsMap };
            // 让位移是循环的（例如，位移 1 时，'z' 会映射到 'a'）。
            let encryptedCharIndex = (charIndex + shift) % alphabet.length;
            // 支持负数位移以创建解密映射
            // （例如，使用位移 -1 时，'a' 会映射到 'z'）。
            if (encryptedCharIndex < 0) {
                encryptedCharIndex += alphabet.length;
            }
            charsMapClone[currentChar] = alphabet[encryptedCharIndex];
            return charsMapClone;
        }, {});
};

/**
 * 加密文本。
 *
 * @param {string} str - 要加密的文本
 * @param {number} shift - 位移值
 * @param {string[]} alphabet - 字母表，默认为英文字母表
 * @return {string} - 密文
 */
export const caesarCipherEncrypt = (str, shift, alphabet = englishAlphabet) => {
    // 创建密码映射:
    const cipherMap = getCipherMap(alphabet, shift);
    return str
        .toLowerCase()
        .split('')
        .map((char) => cipherMap[char] || char)
        .join('');
};


// const encryptedText = caesarCipherEncrypt("hello", 3);
// console.log(encryptedText); // 输出：khoor

/**
 * 解密文本。
 *
 * @param {string} str - 要解密的文本
 * @param {number} shift - 位移值
 * @param {string[]} alphabet - 字母表，默认为英文字母表
 * @return {string} - 明文
 */
export const caesarCipherDecrypt = (str, shift, alphabet = englishAlphabet) => {
    // 创建解密密码映射:
    const cipherMap = getCipherMap(alphabet, -shift);
    return str
        .toLowerCase()
        .split('')
        .map((char) => cipherMap[char] || char)
        .join('');
};


// const decryptedText = caesarCipherDecrypt("khoor", 3);
// console.log(decryptedText); // 输出：hello
