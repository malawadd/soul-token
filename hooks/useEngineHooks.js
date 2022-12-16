import { ethers } from "ethers";

// Returns the collections YOU deployed
export function useGetFactories() {
  const factories = [
    {
      name: "Open Factory",
      id: ethers.utils.keccak256(ethers.utils.toUtf8Bytes("default")),
    }
  ];

  return { factories };
}
