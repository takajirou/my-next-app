// import { useRouter } from "next/router";

// const Post = () => {
//     const router = useRouter();
//     const { id } = router.query;

//     return <p>Post ID: {id}</p>;
// };

// export default Post;

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

// next.js のビルド時に実行され、動的ルートのためのすべてのパスを生成する関数
export const getStaticPaths: GetStaticPaths = async () => {
    try {
        // 外部 API エンドポイントから投稿データをフェッチ（取得）
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        // レスポンスのステータスコードがエラーの場合にエラーハンドリング
        if (!res.ok) {
            throw new Error(`Failed to fetch posts, status: ${res.status}`);
        }

        // フェッチしたデータを JSON 形式で取得
        const posts: { id: number }[] = await res.json();

        // フェッチした投稿データからパス（URL パラメータ）を生成
        const paths = posts.map((post) => ({
            // "params" オブジェクトは動的ルートのパラメータ（この場合は "id"）を含む
            params: { id: post.id.toString() }, // id は文字列として扱う必要があるため、文字列に変換
        }));

        // 生成されたすべてのパスと、生成するパスが見つからない場合の処理を返す
        return { paths, fallback: false };
        // `fallback: false` により、生成されていないパスがリクエストされた場合は 404 ページを表示する
    } catch (error) {
        console.error(error); // エラーをコンソールに表示
        return { paths: [], fallback: false }; // エラー時には空のパスを返し、404 ページを表示させる
    }
};

// 各パス（URL パラメータ）ごとにデータを取得し、静的なページを生成するための関数
export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        // "params.id" を使って、個別の投稿データを API からフェッチ
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);

        // フェッチに失敗した場合のエラーハンドリング
        if (!res.ok) {
            throw new Error(`Failed to fetch post, status: ${res.status}`);
        }

        // フェッチしたデータを JSON 形式で取得
        const post: { id: number; title: string; body: string } = await res.json();

        // "props" としてページコンポーネントにデータを渡す
        return {
            props: { post }, // "post" オブジェクトをページコンポーネントに渡す
        };
    } catch (error) {
        console.error(error); // エラーをコンソールに表示
        return { notFound: true }; // データが取得できなかった場合は 404 ページを返す
    }
};

// ページコンポーネントで受け取ったデータを型推論を使って型を定義
const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            {/* 投稿のタイトルを表示 */}
            <h1>{post.title}</h1>
            {/* 投稿の本文を表示 */}
            <p>{post.body}</p>
        </div>
    );
};

// コンポーネントをエクスポートしてページとして使えるようにする
export default Post;
