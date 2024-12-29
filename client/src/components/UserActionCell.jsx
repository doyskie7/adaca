import React from 'react';
import { Button, Space } from 'antd';

export const UserActionCell = ({ onView, onUpdate, onDelete }) => {
    return (
        <Space>
            <Button type="primary" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }} onClick={onView}>
                VIEW
            </Button>
            <Button style={{ backgroundColor: '#faad14', borderColor: '#faad14', color: '#fff' }} onClick={onUpdate}>
                UPDATE
            </Button>
            <Button type="primary" danger onClick={onDelete}>
                DELETE
            </Button>
        </Space>
    );
};
