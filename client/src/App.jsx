import { PublicRoutes } from './routes/Public';
import Dashboard from './context/dashboard';
const App = () => {
    return (
      <>
        <Dashboard>
          <PublicRoutes/>
        </Dashboard>
      </>
    );
};

export default App;
