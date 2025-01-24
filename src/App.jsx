import React from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import AddBudget from "./components/budget/AddBudget";
import Footer from "./components/Footer";
import ExpenseNavbar from './components/Navbar';
import UpdateProfile from "./components/setting/UpdateProfile";
import AddTransaction from "./pages/AddTransaction";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import Logout from "./pages/Logout";
import NotFound from './pages/NotFound';
import Settings from "./pages/Settings";
import TransactionHistory from "./pages/TransactionHistory";

export default function App() {
  const dark = useSelector((state) => state.theme);
  return (
    <div
      className={`${
        dark ? "dark bg-[#0F0F0F] text-[#DADADA] min-h-screen" : ""
      }`}
    >
      <Router>
        <ExpenseNavbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/budgets" element={<Budget />} />
            <Route path="/budgets/add-budget" element={<AddBudget />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Settings />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route
              path="/settings/update-profile"
              element={<UpdateProfile />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};
