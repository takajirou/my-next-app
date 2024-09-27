// import { useRouter } from "next/router";

// const Post = () => {
//     const router = useRouter();
//     const { id } = router.query;

//     return <p>Post ID: {id}</p>;
// };

// export default Post;

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

//next.jsのビルド時に実行され、動的ルートのためのすべてのパスを生成する関数
export const getStaticPaths: GetStaticPaths = async () => {
    try {
        //外部APIエンドポイントから投稿データをフェッチ
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        //レスポンスのステータスコードがエラーのときの対応
        if (!res.ok) {
            throw new Error(`Failed to fetch posts, status: ${res.status}`);
        }
        const posts: { id: number }[] = await res.json(); //フェッチしたデータをJson形式で取得

        //フェッチした投稿データからぱす(URLパラメータ)を生成
        const paths = posts.map((post) => ({
            //paramsオベジェクトは動的ルートのパラメータ(ここでは)idを含む
            params: { id: post.id.toString() }, //idは文字列として扱う必要がある
        }));

        //生成されたすべてのパスと、生成するパスが見つからない場合の処理を返す
        return { paths, fallback: false }; //`fallback:false`だと指定されたパス以外は404ページが表示される
    } catch (error) {
        console.error(error);
        return { paths: [], fallback: false }; //エラーの場合は空のパスを渡す
    }
};

//各パス(URLパラメータ)ごとにデータを取得し、静的なページを生成するための関数
export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        //"params.id"を使って個別の投稿データをフェッチ
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch post, status: ${res.status}`);
        }

        const post: { id: number; title: string; body: string } = await res.json(); //フェッチしたデータをJSON形式で取得

        //"props" としてページコンポーネントにデータを渡す
        return {
            props: { post }, //"post"データをコンポーネントにわらす
        };
    } catch (error) {
        console.error(error);
        return { notFound: true };
    }
};

//型推論を使ってpropsの型を設定
const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            {/* 投稿のタイトル */}
            <h1>{post.title}</h1>
            {/* 投稿の本文 */}
            <p>{post.body}</p>
        </div>
    );
};

export default Post; //コンポーネントをエクスポートしてページとして使えるようにする。
