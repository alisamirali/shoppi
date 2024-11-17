"use client";

import Loader from "@/components/Loader";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate
          loading={<Loader title="Loading..." />}
          persistor={persistor}
        >
          {children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};
export default Layout;
