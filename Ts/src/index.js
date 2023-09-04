"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var data_1 = require("./stort/data");
var dotenv = require("dotenv");
dotenv.config();
var app = express();
app.get('/', function (req, res) {
    var config = {
        num: {
            arr1: 1,
            arr2: "123"
        },
        str: "字符串",
        arr: [
            {
                arr1: 1,
                arr2: "123"
            },
            {
                arr1: 1,
                arr2: "123"
            }
        ]
    };
    var data = (0, data_1.TypeFunction)(config);
    res.send(data);
});
app.listen(process.env.PORT || 3000, function () {
    console.log("\u76D1\u542C ".concat(process.env.PORT || 3000));
});
