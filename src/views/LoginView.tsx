import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Visibility } from "@/components/ui";
import { enqueueSnackbar } from "notistack";
import { useAppStore } from "@/stores";
import { fetcher } from "@/utils/fetcher";

const schema = yup.object({
  username: yup.string().required("Tên đăng nhập là bắt buộc"),
  password: yup.string().required("Mật khẩu là bất buộc"),
});

export function LoginView() {
  const [errorForm, setErrorForm] = useState("");
  const router = useRouter();
  const setLogin = useAppStore((state) => state.setLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
    control,
    trigger,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = handleSubmit((data) => {
    fetcher("api/auth/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    })
      .then((e) => {
        const status = e.status;
        if (status == "success") {
          setLogin({
            ...e.data,
            roles: {
              admin: 1,
            },
          });
          router.push("/");
          enqueueSnackbar("Đăng nhập thành công", { variant: "success" });
        }
        if (status == "error") {
          setErrorForm(e.message || "Đăng nhập thất bại, vui lòng thử lại");
        }
      })
      .catch((e) =>
        setErrorForm(e.message || "Đăng nhập thất bại, vui lòng thử lại")
      );
  });

  useEffect(() => {
    if (window) {
      var forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    }
  }, []);

  return (
    <section className="login-dark">
      <form className="needs-validation" onSubmit={onSubmit}>
        <h2 className="visually-hidden">Login Form</h2>
        <Visibility visibility={!!errorForm}>
          <div className="alert alert-danger">{errorForm}</div>
        </Visibility>
        <div className=" flex flex-row justify-center illustration">
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="username"
            minLength={3}
            maxLength={10}
            placeholder="Số điện thoại"
            required
            {...register("username")}
          />
          <div className="invalid-feedback">Vui lòng nhập tên đăng nhập. </div>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            minLength={3}
            max="16"
            id="password"
            placeholder="Mật khẩu"
            required
            {...register("password")}
          />
          <div className="invalid-feedback">Vui lòng nhập mật khẩu.</div>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary d-block w-100" type="submit">
            Đăng nhập
          </button>
        </div>
        <a className="forgot" href="#">
          Quên tài khoản hoặc mật khẩu?
        </a>
      </form>
    </section>
  );
}
