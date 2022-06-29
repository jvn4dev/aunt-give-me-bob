import styles from "../styles/Home.module.css";
import { writeMealData, getMealData } from "../utils/firebase";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";

export default function Home({ menuData }) {
  const [currentMenu, setCurrentMenu] = useState("");
  const [menuList, setMenuList] = useState([]);
  const queryClient = useQueryClient();

  // const query = useQuery("menus", getMenus);

  // Mutations
  // const mutation = useMutation(postMenu, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries("menus");
  //   },
  // });
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
      <button onClick={() => writeMealData(new Date(), menuList)}>
        메뉴 제출하기
      </button>

      <h1>오늘의 메뉴는!?????!?!?!??!?!?</h1>
      <ul>
        {menuData.map((menu, idx) => (
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
