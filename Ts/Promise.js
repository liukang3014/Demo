const axios = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = false;
        if (success) {
            resolve("数据成功获取");
        } else {
            reject("数据获取失败");
        }
    }, 1000);
});

const datafnu = async () => {
    try {
        const res = await axios; // 使用await等待Promise解析
        console.log(res);
    } catch (error) {
        console.log(error);
    } finally {
        console.log("执行完成");
    }
}

// datafnu();

