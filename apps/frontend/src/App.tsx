import {Route, Routes} from "react-router";
import LoginPage from "@/pages/login/LoginPage.tsx";
import TripsPage from "@/pages/trips/TripsPage.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trips" element={<TripsPage />} />
      </Routes>
    </>
  )
}

export default App
