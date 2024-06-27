import React from "react";
import { Menu } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Menu
        style={{ fontSize: "30px" }}
        mode="horizontal"
        items={[
          {
            label: (
              <Link to="">
                <HomeFilled style={{ fontSize: "30px" }} />
              </Link>
            ),
            key: "home",
          },
          {
            label: <Link to="/about">Hakkımızda</Link>,
            key: "about",
          },
          {
            label: "İletişim",
            key: "contact",
            children: [
              { label: "Tel : +90 531 364 41 51", key: "tel" },
              { label: "Faks : +90-284-3102416", key: "fax" },
              { label: "E-posta : mucahiddemircan@gmail.com", key: "email" },
            ],
          },
        ]}
      ></Menu>
    </div>
  );
}

export default NavBar;
