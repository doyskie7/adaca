import React from "react";
import { Card, Descriptions, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentUser } from "../hooks/userReducer";

const ViewUserForm = () => {
  const currentUser = useSelector((state) => state?.user?.item)
  const dispatch = useDispatch()

  return (
    <Card style={{height:344}}>
        <h2>Contact Details</h2>
        <Descriptions column={1} bordered>
            <Descriptions.Item label="Full Name">{currentUser?.action === 'view' ? currentUser?.full_name : ''}</Descriptions.Item>
            <Descriptions.Item label="Email">{currentUser?.action === 'view' ? currentUser?.email : ''}</Descriptions.Item>
            <Descriptions.Item label="Contact">{currentUser?.action === 'view' ? currentUser?.contact : ''}</Descriptions.Item>
        </Descriptions>
        <br/>
        <Button onClick={()=>{dispatch(clearCurrentUser())}} block>
            CLEAR
        </Button>
    </Card>
  );
};

export default ViewUserForm;
