import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {QueryClient, QueryClientProvider} from "react-query";
import UserContext from "./contexts/AuthContext.jsx";
import {Toaster} from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";


function App() {
  const client = new QueryClient()
  return (
      <>
        <QueryClientProvider client={client}>
          <UserContext>
              <ThemeProvider>
                  <RouterProvider router={router} />
                  <Toaster />
              </ThemeProvider>
          </UserContext>
        </QueryClientProvider>
      </>
  )
}

export default App
