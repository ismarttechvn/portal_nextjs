import { useEffect, useState } from "react";
import Link from "next/link";
import { NewsTable } from "./NewsTable";
import { useAppStore } from "@/stores";
import { fetcher } from "@/utils/fetcher";

export type INewsAdminJson = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  news_categories: {
    name: string;
  };
  createdDate: string;
  employees: {
    fullname: string;
  }
};

export function NewsAdminView() {

  const [list, setList] = useState<Array<INewsAdminJson>>([]);

  const userLogin = useAppStore((state) => state.userLoggedIn);

  useEffect(() => {
    if (userLogin != undefined) {
      fetcher("/api/news/getactivenews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: userLogin.accessToken,
        },
        body: JSON.stringify({
          refreshToken: userLogin.refreshToken,
          page: 1,
          take: 100,
        }),
      }).then((e) => setList(e.data));
    }
  }, [userLogin]);

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/admin" passHref>
              <a>Bảng điều khiển</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Danh sách bài viết
          </li>
        </ol>
      </nav>
      <NewsTable list={list}/>
    </div>
  );
}
