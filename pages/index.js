import AdminDashboard from "@/pages/admindashboard";
import LoginPage from "./menuepage";
import { useRouter } from "next/router";
import WelcomePage from "./welcome";
import { Provider } from "react-redux";
import store from "@/Redux/store";
export default function Home() {
  const router = useRouter();
  console.log(router.pathname);
  
 
      return<Provider store={store}>

       <WelcomePage />;
      </Provider>
 
    
 
}
