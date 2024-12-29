import { PublicRoutes } from "./routes/Public";
import Dashboard from "./context/Dashboard.jsx";
import { Button, ConfigProvider, theme } from "antd";
const App = () => {
    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <Dashboard>
                    <PublicRoutes />
                </Dashboard>
            </ConfigProvider>
        </>
    );
};

export default App;
