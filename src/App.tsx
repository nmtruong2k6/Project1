import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterUrl } from "./enums/router.enum";
import { PublicGuard } from "./guard/PublicGuard";
import { PrivateGuard } from "./guard/PrivateGuard";
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
              <PublicGuard>
                <Login></Login>
              </PublicGuard>
            }
          />
          <Route
            path={RouterUrl.Home}
            element={
              <PublicGuard>
                <Home></Home>
              </PublicGuard>
            }
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
