import styles from "../styles/Home.module.css";
import { writeMealData, getMealData } from "../utils/firebase";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { useState } from "react";
import dayjs from "dayjs";

export default function Home() {
  const { data, isLoading, isFetching, refetch } = useQuery("meals", () =>
    getMealData(new Date())
  );

  const [currentMenu, setCurrentMenu] = useState("");
  const [menuList, setMenuList] = useState([]);

  if (!data) return <div>데이터가 없습니다</div>;
  if (isLoading) return <h1>데이터를 로딩 중입니다.</h1>;

  const handleMenuSubmit = () => {
    writeMealData(new Date(), menuList);
    refetch();
    setMenuList([]);
  };

  return (
    <>
      <div>
        <label>꼭 오늘의 메뉴를 확실하게 알고 계신 분이 입력해주세요!</label>
        <div>
          <input
            type="text"
            value={currentMenu}
            onChange={(e) => setCurrentMenu(e.target.value)}
          />
          <button
            onClick={() => {
              setMenuList([...menuList, currentMenu]);
              setCurrentMenu("");
            }}
          >
            +
          </button>
        </div>
      </div>

      <h4>입력된 메뉴 : </h4>
      <ul>
        {menuList?.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
      <button onClick={handleMenuSubmit}>메뉴 제출하기</button>

      <h1>
        오늘은 {dayjs().format("YY-MM-DD-ddd")} 입니다. <br />
        오늘의 메뉴는!?????!?!?!??!?!?
      </h1>
      <ul>
        {data?.map((menu, idx) => (
          <li key={idx}>{menu}</li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("meals", () => getMealData(new Date()));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
