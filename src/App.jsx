import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-[94vh] md:min-h-[100vh] w-full flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default App;
