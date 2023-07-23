import { ethers } from "ethers";
import abi from "./abi.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const contract = new ethers.Contract(
  "0x4084e455F681785215CF892093Bf73953b86482C",
  abi,
  provider
);

const signer = provider.getSigner();
const contractWithSigner = contract.connect(signer);

export const register = async (name, sex, age) => {
  if (!name || !sex || !age) throw Error({ message: "Invalid Arguments" });
  await contractWithSigner.register(name, sex, age);
};

export const getUser = async () => {
  return await contractWithSigner.getUser();
};

export const reports = async () => {
  return await contractWithSigner.reports();
};

