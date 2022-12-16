import "../styles/globals.css";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import dynamic from "next/dynamic";

const xdctest = {
  id: 50,
  name: "XinFin XDC Network",
  network: "XinFin XDC Network",
  nativeCurrency: {
    decimals: 18,
    name: " XDC",
    symbol: "XDC",
  },
  rpcUrls: {
    default: "https://erpc.xinfin.network",
  },
  blockExplorers: {
    default: { name: "blockscan", url: "https://xdcscan.io/" },
  },
  testnet: false,
};
const { chains, provider, webSocketProvider } = configureChains(
  [xdctest],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== xdctest.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

// Dynamic import of Navbar to avoid SSR issues
const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});
let client;
if (typeof window !== "undefined") {
  client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });
}

function MyApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning>
      {typeof window !== "undefined" && client && (
        <WagmiConfig client={client}>
          <div className="bg-gradient-to-r from-[#ffffff] to-white h-screen">
            <Navbar suppressHydrationWarning />
            <Component {...pageProps} />
            <Toaster />
          </div>
        </WagmiConfig>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
