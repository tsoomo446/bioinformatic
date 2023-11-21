import { Divider, Typography } from "antd";
import React from "react";

export const Header = () => {
  return (
    <>
      <div className="w-full h-8 p-8 text-center">
        <Typography.Title level={5}>Хос дарааллын харьцуулалт</Typography.Title>
      </div>
      <Divider />
    </>
  );
};
