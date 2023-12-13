import "../styles/Nav.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useAuth } from "../stores/AuthContext"; // Import useAuth từ context
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
const Nav = () => {
  const { isLoggedIn, searchInput, setSearchInput } = useAuth(); // Sử dụng useAuth để lấy trạng thái đăng nhập
  const history = useHistory();
  // xử lý tìm kiếm

  const search = () => {
    let searchValue = searchInput;

    console.log("value in nav", searchValue);
    history.push("/Shopping", { searchValue });
  };

  const handleKeyDown = (event) => {
    let searchValue = searchInput;
    if (event.key === "Enter") {
      history.push("/Shopping", { searchValue });
    }
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("data");
    setUser(JSON.parse(data));
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-blue sticky-top navbar-light  shadow-sm ">
        <div className="navbar-brand">
          <Link className="nav-link text-uppercase" to="/">
            <i className="fa-solid fa-shop me-5  "></i>
            <img className="logo" alt="" src={logo}></img>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
          <div className="input-group">
            <span className="border-primary input-group-text bg-primary text-black">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input type="text" className="form-control border-primary" />
            <button className="btn btn-primary text-white">Tìm kiếm</button>
          </div>
        </div>
        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
          {/* <div className="ms-auto d-none d-lg-block "> */}
          <div className=" d-none d-lg-block ">
            <div className="input-group searchContainer">
              <span className="border-primary input-group-text bg-primary text-black">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                value={searchInput}
                className="form-control border-primary"
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="btn btn-primary text-white"
                onClick={() => search()}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
          <ul className="navbar-nav ms-auto ">
            <Stack
              className="nav-item"
              direction={"column"}
              style={{
                display: "flex",
                justifyContent: "center",
                marginRight: 30,
                cursor: "pointer",
              }}
            >
              <Link className="nav-link-nav mx-3 text-uppercase" to="/Shopping">
                <Box>
                  <ListIcon sx={{ width: 40, height: 40 }} />
                </Box>
              </Link>

              <Typography sx={{ fontWeight: "bold" }}>Sản phẩm</Typography>
            </Stack>
            <Stack
              className="nav-item"
              direction={"column"}
              style={{
                display: "flex",
                justifyContent: "center",
                marginRight: 30,
                cursor: "pointer",
              }}
            >
              <Link className="nav-link-nav mx-3 text-uppercase" to="/Cart">
                <Box>
                  <ShoppingBasketIcon sx={{ width: 40, height: 40 }} />
                </Box>
              </Link>

              <Typography sx={{ fontWeight: "bold" }}>Giỏ hàng</Typography>
            </Stack>

            {isLoggedIn ? (
              // Đã đăng nhập, hiển thị "Cá nhân"
              <Stack
                className="nav-item"
                direction={"column"}
                style={{
                  display: "flex",
                  justifyContent: "center",

                  cursor: "pointer",
                }}
              >
                <Link className="nav-link-nav mx-3 text-uppercase" to="/User">
                  <Box>
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.avatar?.imageLink || ""}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                </Link>

                <Typography sx={{ fontWeight: "bold" }}>Cá nhân</Typography>
              </Stack>
            ) : user ? (
              // Chưa đăng nhập, nhưng user tồn tại, hiển thị "Cá nhân"
              <Stack
                className="nav-item"
                direction={"column"}
                style={{
                  display: "flex",
                  justifyContent: "center",

                  cursor: "pointer",
                }}
              >
                <Link className="nav-link-nav mx-3 text-uppercase" to="/User">
                  <Box>
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.avatar?.imageLink || ""}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                </Link>

                <Typography sx={{ fontWeight: "bold" }}>Cá nhân</Typography>
              </Stack>
            ) : (
              // Chưa đăng nhập và user không tồn tại, hiển thị "Đăng nhập"
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link-nav mx-3 text-uppercase"
                    to="/Register"
                  >
                    <i className="fas fa-user-alt"></i>
                    <br />
                    Đăng kí
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link-nav mx-3 text-uppercase"
                    to="/login"
                  >
                    <LoginIcon sx={{ fontSize: 20 }} />
                    <br />
                    Đăng nhập
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto "></ul>
        </div>
      </nav>
    </div>
  );
};
export default Nav;
