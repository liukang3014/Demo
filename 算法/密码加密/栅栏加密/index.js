/**
 * @typedef {string[]} Rail
 * @typedef {Rail[]} Fence
 * @typedef {number} Direction
 */

/**
 * @constant DIRECTIONS
 * @type {object}
 * @property {Direction} UP
 * @property {Direction} DOWN
 */
const DIRECTIONS = { UP: -1, DOWN: 1 };

/**
 * 构建具有特定行数的栅栏。
 *
 * @param {number} rowsNum - 栅栏中的行数
 * @returns {Fence} - 返回一个二维数组，表示栅栏
 */
const buildFence = (rowsNum) => Array(rowsNum)
  .fill(null)
  .map(() => []);

/**
 * 获取在穿越栅栏时下一个移动方向（基于当前方向）。
 *
 * @param {object} params
 * @param {number} params.railCount - 栅栏的行数
 * @param {number} params.currentRail - 当前正在访问的行
 * @param {Direction} params.direction - 当前方向
 * @returns {Direction} - 下一个要采取的方向
 */
const getNextDirection = ({ railCount, currentRail, direction }) => {
  switch (currentRail) {
    case 0:
      // 如果在栅栏顶部，向下移动。
      return DIRECTIONS.DOWN;
    case railCount - 1:
      // 如果在栅栏底部，向上移动。
      return DIRECTIONS.UP;
    default:
      // 如果在栅栏中间，继续使用相同的方向。
      return direction;
  }
};

/**
 * @param {number} targetRailIndex - 目标行的索引
 * @param {string} letter - 要添加到行的字符
 * @returns {Function} - 返回一个函数，用于将字符添加到行
 */
const addCharToRail = (targetRailIndex, letter) => {
  /**
   * 如果匹配目标索引，则将字符添加到行的函数。
   *
   * @param {Rail} rail - 当前行
   * @param {number} currentRail - 当前行的索引
   * @returns {Rail} - 返回更新后的行
   */
  function onEachRail(rail, currentRail) {
    return currentRail === targetRailIndex
      ? [...rail, letter]
      : rail;
  }
  return onEachRail;
};

/**
 * 将字符挂在栅栏上。
 *
 * @param {object} params
 * @param {Fence} params.fence - 栅栏
 * @param {number} params.currentRail - 当前行
 * @param {Direction} params.direction - 移动方向
 * @param {string[]} params.chars - 要挂在栅栏上的字符数组
 * @returns {Fence} - 返回更新后的栅栏
 */
const fillEncodeFence = ({
  fence,
  currentRail,
  direction,
  chars,
}) => {
  if (chars.length === 0) {
    // 所有字符都已经挂在栅栏上。
    return fence;
  }

  const railCount = fence.length;

  // 获取下一个要挂在栅栏上的字符。
  const [letter, ...nextChars] = chars;
  const nextDirection = getNextDirection({
    railCount,
    currentRail,
    direction,
  });

  return fillEncodeFence({
    fence: fence.map(addCharToRail(currentRail, letter)),
    currentRail: currentRail + nextDirection,
    direction: nextDirection,
    chars: nextChars,
  });
};

/**
 * @param {object} params
 * @param {number} params.strLen - 字符串长度
 * @param {string[]} params.chars - 字符数组
 * @param {Fence} params.fence - 栅栏
 * @param {number} params.targetRail - 目标行索引
 * @param {Direction} params.direction - 移动方向
 * @param {number[]} params.coords - 坐标
 * @returns {Fence} - 返回更新后的栅栏
 */
const fillDecodeFence = (params) => {
  const {
    strLen, chars, fence, targetRail, direction, coords,
  } = params;

  const railCount = fence.length;

  if (chars.length === 0) {
    return fence;
  }

  const [currentRail, currentColumn] = coords;
  const shouldGoNextRail = currentColumn === strLen - 1;
  const nextDirection = shouldGoNextRail
    ? DIRECTIONS.DOWN
    : getNextDirection(
      { railCount, currentRail, direction },
    );
  const nextRail = shouldGoNextRail ? targetRail + 1 : targetRail;
  const nextCoords = [
    shouldGoNextRail ? 0 : currentRail + nextDirection,
    shouldGoNextRail ? 0 : currentColumn + 1,
  ];

  const shouldAddChar = currentRail === targetRail;
  const [currentChar, ...remainderChars] = chars;
  const nextString = shouldAddChar ? remainderChars : chars;
  const nextFence = shouldAddChar ? fence.map(addCharToRail(currentRail, currentChar)) : fence;

  return fillDecodeFence({
    strLen,
    chars: nextString,
    fence: nextFence,
    targetRail: nextRail,
    direction: nextDirection,
    coords: nextCoords,
  });
};

/**
 * @param {object} params
 * @param {number} params.strLen - 字符串长度
 * @param {Fence} params.fence - 栅栏
 * @param {number} params.currentRail - 当前行
 * @param {Direction} params.direction - 移动方向
 * @param {number[]} params.code - 解码后的字符数组
 * @returns {string} - 返回解码后的字符串
 */
const decodeFence = (params) => {
  const {
    strLen,
    fence,
    currentRail,
    direction,
    code,
  } = params;

  if (code.length === strLen) {
    return code.join('');
  }

  const railCount = fence.length;

  const [currentChar, ...nextRail] = fence[currentRail];
  const nextDirection = getNextDirection(
    { railCount, currentRail, direction },
  );

  return decodeFence({
    railCount,
    strLen,
    currentRail: currentRail + nextDirection,
    direction: nextDirection,
    code: [...code, currentChar],
    fence: fence.map((rail, idx) => (idx === currentRail ? nextRail : rail)),
  });
};

/**
 * 使用铁栅栏密码对消息进行编码。
 *
 * @param {string} string - 要编码的字符串
 * @param {number} railCount - 栅栏的行数
 * @returns {string} - 编码后的字符串
 */
const encodeRailFenceCipher = (string, railCount) => {
  const fence = buildFence(railCount);

  const filledFence = fillEncodeFence({
    fence,
    currentRail: 0,
    direction: DIRECTIONS.DOWN,
    chars: string.split(''),
  });

  return filledFence.flat().join('');
};

/**
 * 使用铁栅栏密码对消息进行解码。
 *
 * @param {string} string - 编码后的字符串
 * @param {number} railCount - 栅栏的行数
 * @returns {string} - 解码后的字符串
 */
const decodeRailFenceCipher = (string, railCount) => {
  const strLen = string.length;
  const emptyFence = buildFence(railCount);
  const filledFence = fillDecodeFence({
    strLen,
    chars: string.split(''),
    fence: emptyFence,
    targetRail: 0,
    direction: DIRECTIONS.DOWN,
    coords: [0, 0],
  });

  return decodeFence({
    strLen,
    fence: filledFence,
    currentRail: 0,
    direction: DIRECTIONS.DOWN,
    code: [],
  });
};

const originalMessage = "123456789"; // 要编码的消息
const railCount = 3; // 设置铁栅栏的行数

const encodedMessage = encodeRailFenceCipher(originalMessage, railCount);

console.log("编码后的消息: " + encodedMessage);

const decodedMessage = decodeRailFenceCipher(encodedMessage, railCount);

console.log("解码后的消息: " + decodedMessage);