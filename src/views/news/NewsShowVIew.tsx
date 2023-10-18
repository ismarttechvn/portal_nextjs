import { useAppStore } from "@/stores";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";

export type INewsShowJson = {
  id: string;
  title: string;
  description: string;
  news_categories: {
    name: string;
  };
  content: string;
};

export function NewsShowView({ id }: { id: string }) {
  const [newsData, setNewsData] = useState<INewsShowJson | null>(null);

  const userLogin = useAppStore((state) => state.userLoggedIn);

  useEffect(() => {
    if (userLogin != undefined && id) {
      fetcher("/api/news/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: userLogin.accessToken,
        },
        body: JSON.stringify({
          refreshToken: userLogin.refreshToken,
        }),
      }).then((e) => setNewsData(e.data));
    }
  }, [userLogin]);

  return (
    <div className="container mt-4">
      <h4 className="text-uppercase text-muted">
        {newsData?.news_categories?.name}
      </h4>
      <h1 className="my-4">{newsData?.title}</h1>
      <h5 className="text-dark mb-4">{newsData?.description}</h5>
      <div className="container">
        {newsData && (
          <div dangerouslySetInnerHTML={{ __html: newsData.content }} />
        )}
      </div>
    </div>
  );
}
