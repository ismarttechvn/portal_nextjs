/* eslint-disable @next/next/no-img-element */
import { Visibility } from "@/components/ui";
import { useAppStore } from "@/stores";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { useEffect, useState } from "react";

export type NewsJson = {
  id: string;
  thumbnail: string;
  categories: {
    name: string;
  };
  description: string;
  title: string;
}

export function DashBoardView() {
  const userLogin = useAppStore((state) => state.userLoggedIn);

  const [news, setNews] = useState<Array<NewsJson>>([]);

  useEffect(() => {
    if (userLogin != undefined) {
    fetcher("api/news/getlastestnews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        refreshToken: userLogin.refreshToken,
        page: 1,
        take: 4,
      }),
    }).then((e) => setNews(e.data));
  }
  }, [userLogin]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h5 className="text-uppercase fw-semibold">Tiện ích</h5>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <button
            disabled
            className="btn btn-outline-primary btn-sm rounded"
            type="button"
          >
            <span className="material-symbols-outlined align-middle">
              check_in_out
            </span>
            Chấm công
          </button>
          <button
            disabled
            className="btn btn-outline-primary btn-sm rounded"
            type="button"
          >
            <span className="material-symbols-outlined align-middle">
              manage_history
            </span>
            Nghỉ phép
          </button>
          <Link href="/payrolls" passHref>
            <a className="btn btn-outline-primary btn-sm rounded">
              <span className="material-symbols-outlined align-middle">
                receipt
              </span>
              Phiếu lương
            </a>
          </Link>
        </div>
      </div>

      <Visibility visibility={news.length !== 0}>
        <div className="row mt-4">
          <div className="col-12 align-middle">
            <span
              className="material-symbols-outlined align-middle"
              style={{
                fontSize: "2rem",
              }}
            >
              campaign
            </span>
            <span className="text-uppercase fw-semibold h4 align-middle">
              {" "}
              Thông tin mới
            </span>
            <hr />
          </div>
        </div>

        <div className="row mt-2">
          {news.map((e, i) => {
            return (
              <div className="col-12 col-md-6 col-lg-3 mb-4" key={i}>
                <div className="card">
                  <img
                    className="card-img-top w-100 d-block fit-cover"
                    style={{
                      height: "200px",
                    }}
                    src={e.thumbnail || "img/noimage_news.png"}
                    alt={e.title}
                  />
                  <div
                    className="card-body p-4"
                    style={{
                      minHeight: "220px",
                    }}
                  >
                    <p className="text-primary card-text mb-0">
                      {e?.categories?.name}
                    </p>
                    <h6 className="card-title py-2 text-overflow-clamp">
                      <Link href={"news/" + e.id} passHref>
                        <a>{e.title}</a>
                      </Link>
                    </h6>
                    <p className="card-text text-overflow-clamp">
                      {e.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Visibility>
    </div>
  );
}
