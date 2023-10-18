/* eslint-disable @next/next/no-img-element */
import { useAppStore } from "@/stores";
import Link from "next/link";
import { clsx } from "clsx";
import { Visibility } from "./ui";
import { useRouter } from "next/router";

export function Header({ activeTab }: { activeTab: number }) {
  const userLogin = useAppStore((state) => state.userLoggedIn);
  const logout = useAppStore((state) => state.logout);

  const router = useRouter();

  const logOut = () => {
    logout();
    router.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src="/img/logo.png" width="50px" alt="logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href={"/"} passHref>
                <a className={clsx("nav-link", activeTab === 1 && "active")}>
                  MY KỀM NGHĨA
                  <span className="visually-hidden">(current)</span>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={"/news"} passHref>
                <a className={clsx("nav-link", activeTab === 2 && "active")}>
                  TIN TỨC
                  <span className="visually-hidden">(current)</span>
                </a>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className={clsx(
                  "nav-link dropdown-toggle",
                  activeTab === 3 && "active"
                )}
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                TICKETS
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item " href="/tickets">
                  Danh sách Tickets
                </a>
                <a className="dropdown-item" href="/tickets/create">
                  Tạo Ticket
                </a>
              </div>
            </li>

            <Visibility
              visibility={
                userLogin?.roles?.admin === 1 ||
                userLogin?.roles?.moderator === 1
              }
            >
              <li className="nav-item">
                <Link href="/admin" passHref>
                  <a className={clsx("nav-link", activeTab === 7 && "active")}>
                    BẢNG ĐIỀU KHIỂN
                  </a>
                </Link>
              </li>
            </Visibility>
          </ul>

          <div className="d-flex">
            <ul className="navbar-nav">
              <li className="nav-item text-white">
                <Link href="/profiles" passHref>
                  <a className="text-white">{userLogin?.fullname}</a>
                </Link>
                <span className="text-white">
                  {" ["}
                  <span className="cursor-pointer" onClick={logOut}>
                    LOGOUT
                  </span>
                  {"]"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
