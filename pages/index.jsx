import styles from "../styles/Home.module.css";
import { writeMealData, getMealData } from "../utils/firebase";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function Home({ menuData }) {
  const queryClient = useQueryClient();

  const query = useQuery("menus", getMenus);

  // Mutations
  const mutation = useMutation(postMenu, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("menus");
    },
  });

  console.log(menuData);

  return (
    <>
      <label>꼭 오늘의 메뉴를 확실하게 알고 계신 분이 입력해주세요!</label>
      <input type="text" />
      <button>추가하기</button>

      <h1>오늘의 메뉴는!?????!?!?!??!?!?</h1>
      <ul>
        {query.data.map((menu, idx) => (
          <li key={idx}>{menu}</li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps(context) {
  const menuData = await getMealData(new Date());

  return {
    props: {
      menuData,
    },
  };
}
