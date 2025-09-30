import AdminDashboard from "@/pages/AdminDashboard";
import LoginPage from "./MenuePage";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  console.log(router.pathname);
  switch (router.pathname) {
    case "/": {
      return <LoginPage />;
    }
    case "dashbord": {
      return <AdminDashboard />;
    }
  }
}
