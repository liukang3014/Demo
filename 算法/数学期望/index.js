function calculateExpectedValue(values, probabilities) {
    if (values.length !== probabilities.length) {
        throw new Error("值和概率数组的长度必须相等。");
    }

    let expectedValue = 0;
    for (let i = 0; i < values.length; i++) {
        expectedValue += values[i] * probabilities[i];
    }

    return expectedValue;
}

// 示例：计算一个骰子的数学期望
const values = [1, 2, 3, 4, 5, 6]; // 骰子的可能值
const probabilities = [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6]; // 对应的概率
const result = calculateExpectedValue(values, probabilities);

console.log("骰子的数学期望为: " + result);