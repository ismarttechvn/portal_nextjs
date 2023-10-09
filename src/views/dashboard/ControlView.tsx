import { CardMenu } from "@/components";
import { Visibility } from "@/components/ui";
import { useAppStore } from "@/stores";

export function ControlView() {
  const userLogin = useAppStore((state) => state.userLoggedIn);

  return (
    <div>
      <Visibility
        visibility={
          userLogin?.roles.admin === 1 || userLogin?.roles["news.mod"] === 1
        }
      >
        <div className="container mt-4 shadow rounded p-4">
          <div className="row">
            <div className="col h5">TRUYỀN THÔNG</div>
          </div>
          <div className="row">
            <div className="col my-2">
              Truyền thông nội bộ cung cấp các nội dung và thông điệp cần thiết
              đến các cá nhân, bộ phận trong Doanh nghiệp vào đúng thời điểm.
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <CardMenu
                bstText="text-success"
                icName="newspaper"
                title="Danh sách bài viết"
                description="Danh sách bài viết các bài viết truyền thông nội bộ."
                navLink="/news/list"
                navText="Chi tiết"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <CardMenu
                bstText="text-primary"
                icName="history_edu"
                title="Viết bài"
                description="Đăng bài viết truyền thông."
                navLink="/news/create"
                navText="Bắt đầu"
              />
            </div>
          </div>
        </div>
      </Visibility>
      <Visibility
        visibility={
          userLogin?.roles["salary.mod"] === 1 || userLogin?.roles.admin === 1
        }
      >
        <div className="container mt-4 shadow rounded p-4">
          <div className="row">
            <div className="col h5">NHÂN SỰ</div>
          </div>
          <div className="row">
            <div className="col">Quản lý thông tin nhân sự dành cho HR</div>
          </div>
          <hr />

          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <CardMenu
                bstText="text-success"
                icName="receipt_long"
                title="Danh sách kỳ lương"
                description="............."
                navLink="/payslips"
                navText="Chi tiết"
              />
            </div>
            <Visibility
              visibility={
                userLogin?.roles["extrasalary.mod"] === 1 ||
                userLogin?.roles.admin === 1
              }
            >
              <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                <CardMenu
                  bstText="text-primary"
                  icName="payments"
                  title="Danh sách lương điều chỉnh"
                  description="....."
                  navLink="/payslips/modifies"
                  navText="Bắt đầu"
                />
              </div>
            </Visibility>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <CardMenu
                bstText="text-primary"
                icName="settings"
                title="Cấu hình"
                description="Cấu hình tính năng HR"
                navLink="/admin/hrconfig"
                navText="Bắt đầu"
              />
            </div>
          </div>
        </div>
      </Visibility>
      <Visibility
        visibility={
          userLogin?.roles["employee.mod"] === 1 || userLogin?.roles.admin === 1
        }
      >
        <div className="container mt-4 shadow rounded p-4">
          <div className="row">
            <div className="col h4">ADMINISTRATOR</div>
          </div>
          <div className="row">
            <div className="col">
              Quản trị hệ thống thông tin dành cho Admin
            </div>
          </div>
          <hr />
          <div className="row">
            <Visibility
              visibility={
                userLogin?.roles["employee.view"] === 1 ||
                userLogin?.roles.admin === 1
              }
            >
              <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                <CardMenu
                  bstText="text-success"
                  icName="group"
                  title="Tài khoản"
                  description="Quản lý tài khoản"
                  navLink="/employees"
                  navText="Chi tiết"
                />
              </div>
            </Visibility>
          </div>
        </div>
      </Visibility>
    </div>
  );
}
