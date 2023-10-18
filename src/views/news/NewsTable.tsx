/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { INewsAdminJson } from "./NewsAdminView";

export function NewsTable({ list }: { list: Array<INewsAdminJson> }) {
  if (list.length === 0) {
    return (
      <div className="container mt-4">
        <h5>Hiện chưa có bài viết nào!</h5>
      </div>
    );
  } else {
    return (
      <div className="container mt-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Hình đại diện</th>
              <th scope="col">Tiêu đề</th>
              <th scope="col">Danh mục</th>
              <th scope="col">Người đăng</th>
              <th scope="col">Ngày đăng</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {list.map((element, index) => {
              return (
                <tr key={element.id} id={`row_${element.id}`}>
                  <td data-target={element.id}>{index + 1}</td>
                  <td>
                    <img
                      src={element.thumbnail}
                      alt={element.title}
                      width="70px"
                    />
                  </td>
                  <td data-target={element.title}>
                    <Link href={"/news/" + element.id} passHref>
                      <a>{element.title}</a>
                    </Link>
                  </td>
                  <td>{element.news_categories.name}</td>
                  <td>{element.employees.fullname}</td>
                  <td>
                    {new Date(element.createdDate).toLocaleString("vi-VN")}
                  </td>
                  <td>
                    <Link href={"/news/" + element.id + "/edit"} passHref>
                      <a>Edit</a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
