import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {QueryClient, QueryClientProvider} from "react-query";
import UserContext from "./contexts/AuthContext.jsx";
import {Toaster} from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import StoreContext from "./contexts/StoreContext";
import ShopingCartProvider from "./contexts/ShopingCartContext";


function App() {
  const client = new QueryClient()
  return (
      <>
        <QueryClientProvider client={client}>
          <ShopingCartProvider>
              <UserContext>
                  <StoreContext>
                      <ThemeProvider>
                          <RouterProvider router={router} />
                          <Toaster />
                      </ThemeProvider>
                  </StoreContext>
              </UserContext>
          </ShopingCartProvider>
        </QueryClientProvider>
      </>
  )
}

export default App
