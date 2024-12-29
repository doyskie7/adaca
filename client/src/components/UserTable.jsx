import { Table, Card } from "antd";
import { UserColumn } from "../constant/UserColumn.jsx";
import { usePrivateGetRequestsMutation } from "../hooks/apiServiceReducer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const UserTable = () => {
    
    const [userList,setUserList] = useState([])
    const [privateGetRequests, { isLoading, error}] = usePrivateGetRequestsMutation();
    const response = useSelector((state) => state?.response?.item)

    useEffect(()=>{
        const fetchUsers = async () =>{
            let users = await privateGetRequests({
                route: '/users',
            })
            setUserList(users?.data?.data?.map((item)=>{
                return {
                    key: item?.id,
                    full_name: item?.full_name,
                    email:  item?.email,
                    contact: item?.contact,
                }
            }))
        }
        fetchUsers()
        return ()=>{}
    },[response?.reload]) 

    return (
        <Card> 
            <Table dataSource={userList} columns={UserColumn} />
        </Card>
    )
}

export default UserTable;