import React from 'react';
import { Button, Space,  message, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../hooks/userReducer'; 

export const UserActionCell = ({ text, data }) => {
    const dispatch = useDispatch();
    const confirm = (e) => {
        dispatch(setCurrentUser({...data, action:'delete'}))
    };
    return (
        <Space>
            <Button type="primary" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }} 
                onClick={()=>{dispatch(setCurrentUser({...data, action:'view'}))}}>
                VIEW
            </Button>

            <Button style={{ backgroundColor: '#faad14', borderColor: '#faad14', color: '#fff' }} 
                onClick={()=>{dispatch(setCurrentUser({...data, action:'update'}))}}>
                UPDATE
            </Button>
 
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this user?"
                onConfirm={confirm}
                onCancel={(e)=>{}}
                okText="Yes"
                cancelText="No"
            >
                    <Button type="primary" danger >
                    DELETE
                </Button>
            </Popconfirm>
        </Space>
    );
};
