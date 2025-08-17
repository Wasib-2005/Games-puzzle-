import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="h-[94vh] md:h-[100vh] w-full flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default App;
