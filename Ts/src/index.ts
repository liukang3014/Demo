import * as express from 'express';
import { Request, Response } from 'express';
import { TypeFunction } from "./stort/data"
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.get('/', (req: Request, res: Response) => {
    const config = {
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
    }
    const data = TypeFunction(config)
    res.send(data);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`监听 ${process.env.PORT || 3000}`);
});