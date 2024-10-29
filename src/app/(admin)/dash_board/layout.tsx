"use client";
import { Layout } from "antd";
import AdminFooter from "@/components/layout/admin.footer";
import React from "react";
import AdminContent from "@/components/layout/admin.content";
import AdminSideBar from "@/components/layout/admin.sidebar";
import AdminHeader from "@/components/layout/admin.header";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Layout>
      <AdminSideBar />
      <Layout>
        <AdminHeader />
        <AdminContent>{children}</AdminContent>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
