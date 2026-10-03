 import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f4ff] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">

        <p className="text-violet-500 font-medium">
           Hello there, {user?.fullName} !
        </p>

        <h2 className="text-4xl font-semibold text-gray-800 mt-3">
          Well, well, well… look who’s here.!!
        </h2>

        <p className="text-gray-500 mt-3">
          It's good to have you here.
        </p>

         <button
  onClick={handleLogout}
  className="mt-8 px-6 py-3 rounded-2xl bg-violet-500 text-white font-medium shadow-sm hover:bg-violet-600 hover:shadow-md transition"
>
  Logout
</button>

      </div>
    </div>
  );
};

export default DashboardPage;