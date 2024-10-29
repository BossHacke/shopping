"use client";
import { Layout } from "antd";

const AdminFooter = () => {
  const { Footer } = Layout;
  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        Hùng shopping ©{new Date().getFullYear()} Created by @vonguyenphihung
      </Footer>
    </>
  );
};

export default AdminFooter;
