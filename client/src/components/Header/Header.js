import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../Redux/slices/auth";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Header.css";
import "../../styles/Global.css";

const Header = () => {
  const token = useSelector((store) => store.auth.token);
  const userInfo = useSelector((store) => store.auth.userInfo.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    notify();
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token]);

  const notify = () => toast("👋 Bye Bye!");

  return (
    <section className="header__wraper">
      <div className="header__logo">
        <img
          src={require("../../assets/appLogo.png")}
          alt="logo"
          className="sitelogo"
        />
        <h1 className="header__title">Expense Tracker</h1>
      </div>
      {token && (
        <div className="header__authwraper">
          <div className="icon__wraper">
            <AiOutlineUser className="auth__icon" />
            <p className="auth__title">{userInfo}</p>
          </div>
          <div className="icon__wraper">
            <FiLogOut className="auth__icon" onClick={handleLogout} />
            <p className="auth__title">logout</p>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Header;
