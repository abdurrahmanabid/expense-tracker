import {
  DollarSign,
  History,
  LayoutDashboard,
  LogIn,
  PlusCircle,
  User,
  UserPlus
} from "lucide-react";
import { useSelector } from "react-redux";

const useNavbarOptions = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return [
      {
        id: 1,
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: 2,
        label: "Add Transaction",
        path: "/add-transaction",
        icon: PlusCircle,
      },
      {
        id: 3,
        label: "Transaction History",
        path: "/transaction-history",
        icon: History,
      },
      {
        id: 4,
        label: "Budgets",
        path: "/budgets",
        icon: DollarSign,
      },
      {
        id: 5,
        label: "Profile",
        path: "/profile",
        icon: User,
        dropdown: [
          { id: "p1", label: "Settings", path: "/settings" },
          { id: "p2", label: "Logout", path: "/logout" },
        ],
      },
    ];
  } else {
    return [
      {
        id: 1,
        label: "Login",
        path: "/login",
        icon: LogIn,
      },
      {
        id: 2,
        label: "Signup",
        path: "/signup",
        icon: UserPlus,
      },
    ];
  }
};

export default useNavbarOptions;
