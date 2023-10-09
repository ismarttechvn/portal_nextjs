/* eslint-disable @next/next/no-img-element */

import { Visibility } from "@/components/ui";
import Link from "next/link";
import { INewsJson } from "./NewsView";
import { useEffect, useState } from "react";
import { useAppStore } from "@/stores";
import { fetcher } from "@/utils/fetcher";

export function NewsByCategory({
  cateId,
  title,
}: {
  cateId: number;
  title: string;
}) {
  const [list, setList] = useState<Array<INewsJson>>([]);
  const userLogin = useAppStore((state) => state.userLoggedIn);

  useEffect(() => {
    if (userLogin != undefined) {
      fetcher("api/news/getnewsbycate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          refreshToken: userLogin.refreshToken,
          page: 1,
          take: 4,
          cateId: cateId,
        }),
      }).then((e) => setList(e.data));
    }
  }, [userLogin]);

  return (
    <Visibility visibility={list.length !== 0}>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h3>{title}</h3>
          </div>
        </div>
        <div className="row">
          {list.map((val, index) => {
            return (
              <div className="col-12 col-md-6 col-lg-3 mb-4" key={val.id}>
                <div className="card h-100">
                  <img
                    src={val.thumbnail || "img/noimage_news.png"}
                    className="card-img-top"
                    alt={val.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link href={"/news/" + val.id} passHref>
                        <a>{val.title}</a>
                      </Link>
                    </h5>
                    <p className="card-text">{val.description}</p>
                    <p className="card-text">
                      <span className="badge rounded-pill text-bg-primary">
                        {val.news_categories.name}
                      </span>
                    </p>
                  </div>
                  <div className="card-footer text-end">
                    <small className="text-body-secondary ">
                      Đăng lúc{" "}
                      {new Date(val.createdDate).toLocaleString("vi-VN")}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Visibility>
  );
}
