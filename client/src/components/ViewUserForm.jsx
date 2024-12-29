import React from "react";
import { Card, Descriptions } from "antd";

const ViewUserForm = ({ userData }) => {
  // Sample data to display
  const { fullName, email, contact } = userData || {
    fullName: "John Doe",
    email: "johndoe@example.com",
    contact: "1234567890",
  };

  return (
    <Card style={{height:344}}>
      <h2>Contact Details</h2>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Full Name">{fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Contact">{contact}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ViewUserForm;
