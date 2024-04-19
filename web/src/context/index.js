import { ProductProvider } from "./productContext";
import { UserProvider } from "./userContext";

export function Providers({ children }) {
    return (   
        <UserProvider>
            <ProductProvider>
                {children}
            </ProductProvider>
        </UserProvider>
    );
  }