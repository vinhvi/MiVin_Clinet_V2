import "../styles/Login.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";

import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../stores/AuthContext"; // Import useAuth từ context

import { useHistory } from "react-router-dom";

import { useState } from "react";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const { setIsLoggedIn } = useAuth();

  const history = useHistory();

  const handleOnChangeInput = (e) => {
    if (e.target.classList.contains("inputEmail")) {
      setEmail(e.target.value);
    } else {
      setPassWord(e.target.value);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      passWordA: password,
    };

    try {
      const response = axios.post("/api/v1/auth/login", formData);

      const data = await response;
      console.log(data);

      if (data.data) {
        localStorage.setItem("data", JSON.stringify(data.data));
        localStorage.setItem("token", JSON.stringify(data.data.token));
        toast.success(
          `Chào mừng ${data.data.firstName} ${data.data.lastName} đã quay trở lại!`
        );
        setIsLoggedIn(true);

        history.push("/");
      }

      console.log(data);
    } catch (error) {
      console.log(error.message);

      toast.error(`sai tài khoản hoặc mật khẩu!`);
    }
  };

  const handleF = () => {
    Swal.fire({
      title: "Vui lòng điền Email",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      reverseButtons: true,
      preConfirm: async (login) => {
        try {
          axios
            .get(`/api/v1/sendMail/resetPassword/${login}`)
            .then(function (response) {
              return response.json();
            })
            .catch(function (error) {
              console.log(error);
            });
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thành công",
          text: "Đã gửi mật khẩu mới về email của bạn",
          icon: "success",
        });
      }
    });
  };

  return (
    <form className="col-8 offset-2  containerLogin justify-content-center bgLogin">
      <div className="col-12">
        <div className="containerLogo">
          <h2 style={{ display: "block" }}>Đăng nhập</h2>
          <img className="logoLogin" src={logo} alt=""></img>
        </div>

        <div className="mb-3 p">
          {/* <label className="lbInput">Email</label> */}
          <input
            type="email"
            className="form-control inputEmail "
            placeholder="Nhập email"
            name="email"
            value={email}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>
        <div className="mb-3 ">
          {/* <label className="lbInput">Password</label> */}
          <input
            type="password"
            className="form-control inputPassword"
            name="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>
        <div className="mb-3">
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheck1"
            />
            <label
              className="form-check-label text-left"
              htmlFor="customCheck1"
            >
              {/* <br /> */}
              Lưu tài khoản
            </label>
          </div>
        </div>
        <div className="d-grid mb-3">
          <Typography
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={handleF}
          >
            Quên mật khẩu ?
          </Typography>
        </div>
        <div className="d-grid mb-3">
          <button
            type="submit"
            className="btn btn-primary col-12 mx-auto"
            onClick={(e) => handleSignIn(e)}
          >
            Đăng nhập
          </button>
        </div>
        {/* <p className="forgot-password text-right">
          <a href="#">Quên mật khẩu?</a>
        </p> */}
        <Link class="nav-item btn btn-primary col-12" to="/Register">
          Đăng kí
        </Link>
      </div>

      {/* <button class="nav-item btn btn-primary"> */}

      {/* </button> */}
    </form>
  );
};
export default Login;
