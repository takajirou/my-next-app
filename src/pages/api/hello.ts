// /*NextApiRequest と NextApiResponse は、Next.js の API Routes で使用されるリクエストとレスポンスのオブジェクトの型を定義するものです。
// TypeScript を使用する場合、これによって、関数の引数がどのようなデータを持つかが明確になります。*/
// import type { NextApiRequest, NextApiResponse } from "next"; //リクエストとレスポンスの型定義

// //API Routeのハンドラー関数を定義

// /*export default は、この関数が他のファイルからインポートされる際に、デフォルトエクスポートとして使用されることを意味します。
// handler 関数は、API Routeのリクエストが来たときに呼び出されます。
// req: リクエストオブジェクト。クライアントから送信されたデータが含まれます。
// res: レスポンスオブジェクト。サーバーからクライアントに返されるデータを定義します。*/
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     //ステータスコード200でJSON形式のレスポンスを返す

//     /*res.status(200) は、HTTP ステータスコード 200 (OK) をクライアントに返すことを意味します。ステータスコードは、リクエストが成功したかどうかを示します。
//     res.json({ message: "Hello from API Routes" }) は、JSON 形式のレスポンスとして、{ message: "Hello from API Routes" }
//     というオブジェクトをクライアントに返します。*/
//     res.status(200).json({ message: "Hello from API Routes" });
// }

// /*このコードは、APIエンドポイントが呼ばれた際に、"Hello from API Routes" というメッセージを持つ
// JSON レスポンスを、ステータスコード 200 (OK) と共に返すシンプルな API の例です。*/

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    //GETリクエストの場合
    if (req.method === "GET") {
        res.status(200).json({ message: "This is a GET request" });
        //POSTリクエストの場合
    } else if ((req.method = "POST")) {
        const { name } = req.body; //リクエストボディからデータを取得
        res.status(200).json({ message: `Hello,${name}! This is a POST request.` });
        //その他のリクエストメソッドの場合
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
