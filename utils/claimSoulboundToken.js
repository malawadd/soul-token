import SoulboundERC721ABI from "../constants/abi/SoulboundERC721.json";
import { ethers } from "ethers";
import { getMaxPriorityFeePerGas } from "./getMaxPriorityFeePerGas";

export async function claimSoulboundToken(provider, signer, collectionAddress) {
  let maxPriorityFee = await getMaxPriorityFeePerGas(provider);

  const contract = new ethers.Contract(
    collectionAddress,
    SoulboundERC721ABI.abi,
    signer
  );
  await contract.claim({
    gasLimit: 1000000000,
    maxPriorityFeePerGas: maxPriorityFee?.toString(),
  });
}
