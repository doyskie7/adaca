import CreateUserForm from "../components/CreateUserForm";
import ViewUserForm from "../components/ViewUserForm";
import UserTable from "../components/UserTable";
import { Space } from "antd";

const UserPage = () => {
    return (
        <>
            <div className="container">
                <div className="half-width">
                    <CreateUserForm />
                </div>
                <div className="half-width">
                    <ViewUserForm />
                </div>
            </div>
            <UserTable/>
        </>
    )
}

export default UserPage;