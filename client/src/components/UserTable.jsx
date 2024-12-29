import { Table, Card } from "antd";
import { UserColumn } from "../constant/UserColumn";
import { usePrivateGetRequestsMutation } from "../hooks/apiServiceReducer";
import { useEffect } from "react";
const UserTable = () => {
    
    let [privateGetRequests, { isLoading, error}] = usePrivateGetRequestsMutation();

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];

    useEffect(()=>{
        const fetchUsers = async () =>{
            let users = await privateGetRequests({
                route: '/users',
                query: {},
            })
            console.log(users)
        }
        fetchUsers()
        return ()=>{}
    },[]) 

      
    return (
        <Card> 
            <Table dataSource={dataSource} columns={UserColumn} />
        </Card>
    )
}

export default UserTable;