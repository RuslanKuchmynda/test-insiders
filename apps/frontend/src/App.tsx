import { Route, Routes } from "react-router";
import LoginPage from "@/pages/login/LoginPage.tsx";
import TripsPage from "@/pages/trips/TripsPage.tsx";
import TripPage from "@/pages/trips/TripPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/trips/:id" element={<TripPage />} />
      </Routes>
    </>
  );
}

export default App;
