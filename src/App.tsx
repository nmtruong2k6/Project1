import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterUrl } from "./enums/router.enum";
import { Public } from "./login permission/PublicGuard";
import { Private } from "./login permission/PrivateGuard";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path={RouterUrl.Login}
            element={
              <Public>
                <Login></Login>
              </Public>
            }
          />
          <Route
            path={RouterUrl.Home}
            element={
              <Private>
                <Home></Home>
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
