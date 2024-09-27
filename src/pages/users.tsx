import { GetServerSideProps } from "next";

//ユーザーデータの型定義
type User = {
    id: number;
    name: string;
};

//この関数はサーバーサイドでリクエストごとに実行され、ページ用のデータを取得
export const getServerSideProps: GetServerSideProps<{ users: User[] }> = async () => {
    try {
        //外部APIからユーザー情報をフェッチ
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        //レスポンスがエラーの場合に例外をスロー
        if (!res.ok) {
            throw new Error(`Failed to fetch users, status: ${res.status}`);
        }

        const users: User[] = await res.json(); //フェッチしたデータをJSON形式で取得

        //`props`にユーザーデータを含めて返します。これがページコンポーネントの`props`になります
        return {
            props: { users }, //ユーザーデータを`props`としています
        };
    } catch (error) {
        console.error(error);
        //エラーハンドリング：エラーが発生した場合に404ページを表示
        return {
            notFound: true,
        };
    }
};

const Users = ({ users }: { users: User[] }) => {
    return (
        <div>
            {/* ページタイトル */}
            <h1>Users List</h1>
            <ul>
                {/* ユーザーリストを表示、ユーザーデータごとにリストアイテムを作成 */}
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
