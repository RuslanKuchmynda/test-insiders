import LoginPage from "@/pages/login/LoginPage.tsx";
import RegisterPage from "@/pages/register/RegisterPage.tsx";
import ForgotPasswordPage from "@/pages/forgot/ForgotPasswordPage.tsx";
import ResetPasswordPage from "@/pages/reset/ResetPasswordPage.tsx";
import VerifyEmailPage from "@/pages/verify/VerifyEmailPage.tsx";
import TripsPage from "@/pages/trips/TripsPage.tsx";
import TripPage from "@/pages/trips/TripPage.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuthStore } from "./store/auth-store";
import {Navigate, Outlet, Route, Routes} from "react-router";
import AcceptInvitePage from "@/pages/invite/AcceptInvitePage.tsx";

const MainLayout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <footer className="bg-gray-100 p-4 text-center">
        <Button onClick={clearAuth}>Logout</Button>
      </footer>
    </div>
  );
};

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      <Route path="/invites/accept" element={<AcceptInvitePage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:id" element={<TripPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;