import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";
import EditTransaction from "./pages/EditTransaction"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-transaction" element={<AddTransaction />} />
      <Route path="/transaction" element={<Transactions />} />
      <Route path="/transaction/edit/:id" element={<EditTransaction />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
