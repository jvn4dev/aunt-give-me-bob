import styles from "../styles/Home.module.css";
import S from "../styles/_Home.module.css";
import { writeMealData, getMealData } from "../utils/firebase";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";

export default function Home() {
  const { data, isLoading, isFetching, refetch } = useQuery("meals", () =>
    getMealData(new Date())
  );

  const [currentMenu, setCurrentMenu] = useState("");
  const [menuList, setMenuList] = useState([]);
  const inputRef = useRef(null);

  if (!data) return <div>데이터가 없습니다</div>;
  if (isLoading) return <h1>데이터를 로딩 중입니다.</h1>;

  const handleMenuSubmit = () => {
    writeMealData(new Date(), menuList);
    refetch();
    setMenuList([]);
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className={S.wrapper}>
      <div>
        <div className={S.pencil}>
          <img src="https://i.ibb.co/wLkLcCZ/Untitled.png" alt="aunt give me bob" />
          <span className={S.ing}>
            <svg width="250" height="220" viewBox="0 0 250 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M91.3484 36.5059C85.4066 36.5937 79.235 37.6331 75.7625 38.508C68.0219 40.4583 62.7939 43.7716 59.5054 47.9C56.2525 51.9837 54.2616 57.6602 54.4251 65.573C54.4692 67.7073 54.8139 70.7931 55.4843 73.8565C55.9948 76.189 56.6003 78.0701 57.1714 79.372C57.3729 79.4513 57.6091 79.5395 57.8829 79.6359C58.6719 79.9139 59.5105 80.1709 60.4371 80.4542C60.4849 80.4689 60.5345 80.484 60.5857 80.4996C61.3365 80.7288 62.431 81.0629 63.3028 81.4108C66.4727 82.6759 69.3534 83.6332 72.4638 84.6667C74.6761 85.4019 77.0047 86.1756 79.6361 87.1263C80.2039 87.3314 80.7458 87.5195 81.2833 87.7054L81.4325 87.757C81.904 87.92 82.4061 88.0935 82.8597 88.2575C83.3473 88.4338 83.9494 88.6596 84.5355 88.921C84.9802 89.1193 86.0812 89.6203 87.1506 90.5004C87.9089 91.1245 91.5019 94.3583 90.1577 99.5473C89.5975 101.709 88.3669 103.108 87.5725 103.841C86.767 104.583 85.9769 105.042 85.4875 105.298C83.8747 106.142 81.8959 106.595 80.6626 106.869C73.6364 108.427 66.4579 109.304 59.342 109.577C54.373 109.768 48.6832 110.6 43.6807 112.36C38.5953 114.15 35.0475 116.6 33.1385 119.457C28.2683 126.746 28.3149 135.468 33.1123 142.896C37.6125 149.863 44.3881 154.487 51.0505 154.632C55.5089 154.728 60.247 153.337 65.4512 150.811C70.0188 148.594 74.3832 145.8 78.9475 142.878C79.6513 142.428 80.3599 141.974 81.0747 141.519C83.6174 139.901 87.1835 137.929 91.0787 137.979C93.4623 138.009 95.9574 138.794 98.0179 140.624C99.898 142.294 100.796 144.287 101.252 145.676C102.059 148.139 102.143 150.933 102.191 152.523L102.194 152.611C102.206 153.022 102.217 153.413 102.226 153.787C102.266 155.299 102.299 156.549 102.438 157.836C103.364 166.459 107.715 175.584 113.51 179.378C117.448 181.956 122.547 183.393 128.631 184.047C134.729 184.702 141.117 184.512 147.492 184.308C147.492 184.308 147.492 184.308 147.492 184.308L147.702 184.302L147.702 184.302C149.029 184.259 150.8 184.304 152.395 184.344C153.063 184.36 153.699 184.376 154.259 184.385C156.513 184.419 158.497 184.375 160.13 184.148C160.432 184.106 160.694 184.062 160.92 184.017C160.403 177.392 158.175 170.552 155.672 162.869C155.516 162.389 155.359 161.906 155.201 161.42C154.892 160.468 154.336 159.181 153.479 157.314C153.337 157.004 153.186 156.679 153.03 156.341C152.326 154.818 151.503 153.039 150.77 151.268C149.169 147.404 146.828 141.052 148.296 134.854C148.628 133.452 149.55 130.914 152.178 129.15C154.963 127.28 157.844 127.478 159.5 127.883C162.118 128.523 164.007 130.197 164.567 130.694L164.6 130.723C165.474 131.495 166.252 132.328 166.706 132.819C166.837 132.96 166.929 133.061 167.004 133.142C167.018 133.157 167.031 133.171 167.044 133.185C167.984 133.912 168.889 134.619 169.773 135.31C172.132 137.154 174.341 138.881 176.664 140.536C177.604 141.206 180.115 141.953 184.667 141.843C188.848 141.742 193.283 140.968 196.646 140.236C200.859 139.32 206.545 138.056 211.584 136.082C214.089 135.102 216.134 134.057 217.624 132.996C219.143 131.913 219.628 131.139 219.756 130.848C221.663 126.481 219.765 120.314 214.432 113.645C214.435 113.648 214.435 113.65 214.435 113.65C214.425 113.661 213.915 113.226 212.092 112.577C211.141 112.239 210.116 111.934 208.887 111.573L208.729 111.527C207.632 111.205 206.275 110.806 205.027 110.352C200.362 108.652 195.849 108.264 190.148 107.773C188.043 107.591 185.776 107.396 183.279 107.116C180.862 106.844 178.713 106.554 176.675 106.279C173.492 105.848 170.577 105.455 167.33 105.226C167.359 105.228 167.351 105.228 167.296 105.228C167.194 105.229 166.926 105.232 166.414 105.252C166.245 105.258 166.028 105.267 165.789 105.278C165.27 105.3 164.644 105.327 164.154 105.34C164.132 105.34 164.105 105.341 164.075 105.342C163.612 105.356 162.231 105.397 160.921 105.162C160.753 108.164 159.971 111.238 158.658 114.32C155.317 122.163 149.824 128.542 142.498 132.208C135.118 135.9 126.583 136.481 117.912 133.928C102.712 129.453 94.3276 116.962 94.3276 102.02C94.3276 94.3204 97.0585 82.8815 107.529 77.6582C110.904 75.9741 114.158 75.6596 116.784 75.7571C117.918 75.6007 119.101 75.6719 120.272 76.0057C120.514 76.0747 120.769 76.1449 121.035 76.2164C121.098 76.2257 121.159 76.2348 121.22 76.2437C122.68 76.4596 123.407 76.5671 124.165 76.5671C126.006 76.5671 127.71 77.1523 129.102 78.1468C130.441 78.4629 131.839 78.8023 133.252 79.1693C137.671 80.3167 142.694 81.8455 147.155 84.1253C150.187 85.675 153.42 87.8039 156.006 90.7914C156.359 90.41 156.648 90.1665 156.773 90.0604L156.787 90.0487C157.517 89.4329 158.206 89.0532 158.542 88.8765C160.912 87.6321 163.399 86.9659 165.122 86.5348C165.727 86.3835 166.243 86.2588 166.696 86.1493C167.8 85.8825 168.534 85.7052 169.281 85.45C176.844 82.8687 184.111 77.8825 190.738 72.0055C199.848 63.926 204.567 59.4511 204.979 51.3692C205.127 48.4692 205.098 45.1055 204.457 42.597C204.311 42.028 204.158 41.6042 204.021 41.3055C204.016 41.2948 204.012 41.2844 204.007 41.2742C198.666 40.6854 192.639 41.7962 186.143 44.1335C179.435 46.5473 172.831 50.042 166.719 53.4889C165.621 54.1081 164.473 54.73 163.296 55.3672C159.803 57.2585 156.062 59.2844 152.653 61.7748C150.454 63.3813 148.868 64.8627 147.89 66.1598C146.935 67.4264 146.891 68.0641 146.891 68.2127C146.891 72.9071 143.085 76.7127 138.391 76.7127C134.924 76.7127 131.943 74.638 130.62 71.6627C129.42 70.5683 128.099 69.439 126.663 68.2359C126.204 67.8512 125.728 67.4551 125.242 67.0502C123.518 65.614 121.66 64.0671 119.937 62.5288C115.116 58.2247 111.964 52.8564 109.537 48.7212C109.485 48.6324 109.433 48.5441 109.381 48.4564C106.703 43.897 104.776 40.7048 102.157 38.292C102.006 38.1534 101.18 37.5714 98.9999 37.1041C96.9317 36.6607 94.3103 36.4622 91.3484 36.5059ZM136.004 53.8886C135.994 53.881 135.985 53.8733 135.976 53.8657C134.294 52.4646 132.743 51.172 131.258 49.847C128.635 47.5046 126.689 44.3577 124.04 39.8471C123.943 39.6818 123.845 39.5142 123.745 39.3446C121.366 35.2865 118.288 30.037 113.673 25.7874C110.369 22.7441 106.194 21.2602 102.564 20.4818C98.8216 19.6796 94.8244 19.4527 91.0972 19.5078C83.6609 19.6177 76.1728 20.8733 71.609 22.0232C61.21 24.6433 52.3624 29.5822 46.2083 37.3081C40.0187 45.0786 37.2 54.8584 37.4287 65.9242C37.4979 69.2697 37.9947 73.4579 38.8774 77.4911C39.7286 81.3804 41.1119 85.9458 43.3471 89.5484C44.7222 91.7647 46.6936 93.0733 47.8952 93.757C44.63 94.3466 41.2865 95.1808 38.0362 96.3249C31.0927 98.769 23.7348 102.931 19.0034 110.013C10.233 123.139 10.4886 139.202 18.832 152.119C25.2339 162.031 36.5358 171.321 50.6819 171.628C58.894 171.806 66.4207 169.237 72.8745 166.105C77.3259 163.944 81.6141 161.331 85.4608 158.892C85.4831 159.145 85.5077 159.398 85.5348 159.651C86.7586 171.048 92.5298 185.961 104.197 193.601C111.262 198.226 119.337 200.147 126.816 200.95C134.188 201.741 141.658 201.503 147.8 201.307L148.034 201.3L148.034 201.3L148.243 201.293C148.244 201.293 148.244 201.293 148.244 201.293C149.092 201.266 150.019 201.29 151.26 201.323C152.033 201.343 152.928 201.367 154.002 201.383C156.446 201.42 159.497 201.4 162.472 200.986C165.295 200.594 169.082 199.721 172.287 197.321C176.029 194.519 178.172 190.231 178.003 185.124C177.684 175.444 174.55 165.882 172.001 158.102C171.871 157.703 171.741 157.309 171.614 156.92C176.194 158.651 181.143 158.933 185.078 158.838C190.826 158.699 196.466 157.673 200.259 156.848L200.28 156.843C204.382 155.951 211.32 154.443 217.782 151.912C221.034 150.639 224.465 148.996 227.49 146.84C230.484 144.706 233.551 141.734 235.334 137.653C241.35 123.884 233.685 110.48 227.656 102.962C224.698 99.2722 220.475 97.5157 217.791 96.5608C216.336 96.0432 214.878 95.6149 213.718 95.2741L213.678 95.2623C212.405 94.8883 211.542 94.6323 210.845 94.3784C205.374 92.3857 199.508 91.5596 194.23 91.0438C196.998 89.0094 199.598 86.8699 202.018 84.724C202.367 84.4143 202.721 84.1014 203.08 83.7847C211.077 76.7229 221.163 67.8168 221.957 52.2344C222.118 49.0666 222.242 43.53 220.927 38.3865C219.655 33.4126 216.086 25.753 206.908 24.5044C197.651 23.2449 188.471 25.2287 180.387 28.1375C172.268 31.0591 164.636 35.1467 158.368 38.6813C157.699 39.0588 156.864 39.5096 155.911 40.0244C152.329 41.9589 147.074 44.7972 142.624 48.048C140.377 49.6899 138.044 51.6316 136.004 53.8886ZM163.203 88.3491C163.204 88.349 163.216 88.3492 163.24 88.3504C163.214 88.3499 163.203 88.3493 163.203 88.3491ZM92.0951 154.825C92.0952 154.825 92.0816 154.83 92.0551 154.839C92.0819 154.828 92.095 154.824 92.0951 154.825ZM117.662 92.9057C115.591 92.626 115.296 92.7783 115.138 92.8601C115.131 92.8636 115.124 92.867 115.118 92.8703C113.207 93.8237 111.328 96.9021 111.328 102.02C111.328 109.919 115.212 115.411 122.713 117.62C127.716 119.093 131.766 118.568 134.892 117.004C138.071 115.414 141.003 112.388 143.017 107.658C144.42 104.365 143.881 103.103 143.697 102.721C143.341 101.982 142.274 100.722 139.418 99.2628C136.635 97.8402 133.046 96.6797 128.979 95.6235C126.981 95.1045 124.977 94.6377 122.975 94.1738L122.659 94.1008C120.975 93.7109 119.256 93.3128 117.662 92.9057ZM167.335 133.494C167.338 133.499 167.314 133.475 167.257 133.415C167.304 133.462 167.331 133.49 167.335 133.494ZM56.3178 78.9893C56.318 78.9893 56.3213 78.9913 56.3276 78.9951C56.3208 78.9912 56.3176 78.9892 56.3178 78.9893Z" fill="black" />
            </svg>
          </span>
        </div>
        <div>
          <label>꼭 오늘의 메뉴를 확실하게 알고 계신 분이 입력해주세요!</label>
        </div>
        <div className={S.input_wrapper}>
          <input
            type="text"
            value={currentMenu}
            ref={inputRef}
            onChange={(e) => setCurrentMenu(e.target.value)}
          />
          <button
            onClick={() => {
              setMenuList([...menuList, currentMenu]);
              setCurrentMenu("");
              inputRef.current.focus();
            }}
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 7V27M27 17H7" stroke="white" stroke-width="5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={S.menu_list}>
        <h4>입력된 메뉴</h4>
        <ul>
          {menuList?.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <button className={S.submit} onClick={handleMenuSubmit}>메뉴 제출하기</button>

      </div>
      <h2>
        오늘은 {dayjs().format(`YY년 MM월 DD일 dddd`)} 입니다. <br />
        오늘의 메뉴는!?????!?!?!??!?!?
      </h2>
      <div className={S.result}>
        <ul>
          {data?.map((menu, idx) => (
            <li key={idx}>{menu}</li>
          ))}
        </ul>
      </div>
    </div>
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
