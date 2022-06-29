import styles from "../styles/Home.module.css";
import { getTodos, postTodo } from "../api/";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function Home() {
  const queryClient = useQueryClient();

  const query = useQuery("menus", getMenus);

  // Mutations
  const mutation = useMutation(postMenu, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("menus");
    },
  });

  return (
    <>
      <label>꼭 오늘의 메뉴를 확실하게 알고 계신 분이 입력해주세요!</label>
      <input type="text" />
      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "김치찌개",
          });
        }}
      >
        추가하기
      </button>

      <h1>오늘의 메뉴는!?????!?!?!??!?!?</h1>
      <ul>
        {query.data.map((menu, idx) => (
          <li key={idx}>{menu}</li>
        ))}
      </ul>
    </>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       menuData,
//     },
//   };
// }
