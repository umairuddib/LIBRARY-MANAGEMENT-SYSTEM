import {
  Outlet,
  Navigate
} from "react-router-dom";

function StudentLayout() {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default StudentLayout;