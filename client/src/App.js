import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {QueryClient, QueryClientProvider} from "react-query";
import UserContext from "./contexts/AuthContext.jsx";
import {Toaster} from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import StoreContext from "./contexts/StoreContext";
import ShopingCartProvider from "./contexts/ShopingCartContext";
import FavoriteProvider from "./contexts/FavoriteContext";
import AdminContext from "./contexts/AdminContext";


function App() {
  const client = new QueryClient()
  return (
      <>
        <QueryClientProvider client={client}>
          <ShopingCartProvider>
              <FavoriteProvider>
                  <UserContext>
                      <AdminContext>
                          <StoreContext>
                              <ThemeProvider>
                                  <RouterProvider router={router} />
                                  <Toaster />
                              </ThemeProvider>
                          </StoreContext>
                      </AdminContext>
                  </UserContext>
              </FavoriteProvider>
          </ShopingCartProvider>
        </QueryClientProvider>
      </>
  )
}

export default App
