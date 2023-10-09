import { Fragment } from "react";
import { NewsByCategory } from "./NewsByCategory";

export type INewsJson = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  news_categories: {
    name: string;
  };
  createdDate: string;
};

export function NewsView() {
  return (
    <Fragment>
      <NewsByCategory cateId={1} title="THÔNG BÁO" />
      <NewsByCategory cateId={3} title="TIN TỨC" />
      <NewsByCategory cateId={4} title="SỰ KIỆN" />
      <NewsByCategory cateId={2} title="HƯỚNG DẪN" />
    </Fragment>
  );
}
