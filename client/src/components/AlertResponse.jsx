import React, { useEffect } from "react";
import { notification } from "antd";
import { useSelector } from "react-redux";

const AlertResponse = () => {
  const response = useSelector((state) => state?.response?.item) || {};

  useEffect(() => {
    if (response?.error) {
      notification.error({
        message: "Error",
        description: response?.error?.data?.message || "Something went wrong",
        duration: 3,
      });
    } else if (response?.data) {
      notification.success({
        message: "Success",
        description: response?.data?.message || "Operation completed successfully!",
        duration: 3,
      });
    }
  }, [response])

  return null;
};

export default AlertResponse;
