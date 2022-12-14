import React, { useState } from "react";
import { useGetFactories } from "../hooks/useEngineHooks";
import toast from "react-hot-toast";
import { useSigner, useProvider } from "wagmi";
import chainId from "../constants/chainId";
import { deployCollection } from "../utils/deployCollection";
import { createDeal } from "../utils/createDeal";
import { useGetDeployedAddresses } from "../hooks/useStorageHooks";
import { NFTStorage, File } from "nft.storage";

const create = () => {
  const { data: signer } = useSigner(chainId);
  const [tokenNameValue, setTokenName] = useState("xdcHack Successful Submission");
  const [descriptionValue, setDescription] = useState("Congratulations on submitting for the xdcHack defi 2022 hackathon!");
  const [dateValue, setDate] = useState("December 17, 2022");
  const [issuerNameValue, setIssuerName] = useState("Devpost");
  const provider = useProvider(chainId);
  const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU3MzYzMDg1YzdDOTY1ZjFkNjRDREE2MTcxMTBkNUQ4NjRhNGY1ZjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MTIyMTE0NTc3MiwibmFtZSI6InhkYyBzb3VsIn0.LLNu8vMujgVp_jOT7hIWxxmdBymDOdSnBWq9u61xWZs";
  const client = new NFTStorage({ token: API_TOKEN });

  const [files, setFile] = useState(0);
  const [message, setMessage] = useState();
  const [selectedFactoryIndex, setSelectedFactoryIndex] = useState(0);
  const { factories } = useGetFactories();
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile(file);
        // replace id="filecontainer" with the image preview and remove the text drag and drop
        const fileContainer = document.getElementById("filecontainer");
        fileContainer.innerHTML = "";
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file[i]);
        img.width = 200;
        img.height = 200;
        fileContainer.appendChild(img);

        // also show the name of the file
        const fileName = document.getElementById("filename");
        fileName.innerHTML = file[i].name;
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };
  const handleTokenValueChange = (event) => {
    setTokenName(event.target.value);
  };
  const handleDescriptionValueChange = (event) => {
    setDescription(event.target.value);
  };
  const handleDateValueChange = (event) => {
    setDate(event.target.value);
  };
  const handleIssuerValueChange = (event) => {
    setIssuerName(event.target.value);
  };
  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-3xl  text-black mt-4">?????? Create a soulbound token</h1>
      </div>
      <div className="card lg:card-side bg-white border-[2px] border-[#f2dbd0] ml-12 mr-12 rounded-2xl">
        {/* give the whole card some spacing and padding */}
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose a token factory</span>
            </label>
            <select
              onChange={(event) => {
                setSelectedFactoryIndex(event.target.selectedIndex);
              }}
              className="select select-bordered w-full"
            >
              {factories.map(({ name, index }) => (
                <option id={index}>{name}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Token Name</span>
            </label>
            <input id="tokenName" type="text" className="input input-bordered" value={tokenNameValue} onChange={handleTokenValueChange} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input id="description" type="text" className="input input-bordered" value={descriptionValue} onChange={handleDescriptionValueChange} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input id="date" type="text" className="input input-bordered" value={dateValue} onChange={handleDateValueChange} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Issuer name (you or organization)</span>
            </label>
            <input id="issuerName" type="text" className="input input-bordered" value={issuerNameValue} onChange={handleIssuerValueChange} />
          </div>
          <div className="form-control mt-6">
            <button
              onClick={async () => {
                // const tokenName = document.getElementById("tokenName").value;
                // const description =
                //   document.getElementById("description").value;
                // const date = document.getElementById("date").value;
                // const issuerName = document.getElementById("issuerName").value;

                // upload to IPFS
                const ipfsMetadata = {
                  name: tokenNameValue,
                  description: descriptionValue,
                  image: files[0],
                  properties: {
                    issuerName: issuerNameValue,
                    date: dateValue,
                    factory: factories[selectedFactoryIndex].id,
                  },
                };
                toast("Storing data on IPFS...");
                const metadata = await client.store(ipfsMetadata);

                // little hacky but easiest way to construct the ipfs hash which should be something like:
                // bafyreihkw75u3ftad3xmgqfektvbhp65cnbrv25pwb6tr3tzuihffu66jy/metadata.json
                const ipfsHash = metadata.ipnft + "/metadata.json";
                console.log(ipfsHash);

                let dealId = Math.floor(Math.random() * 10_000);

                if (selectedFactoryIndex == 1) {
                  toast("Creating a storage deal with filecoin...");
                  await createDeal(provider, signer, dealId, ipfsHash, 1000_000);
                }

                toast("Deploying collection...");
                await deployCollection(
                  provider,
                  signer,
                  selectedFactoryIndex,
                  tokenNameValue,
                  tokenNameValue, // symbol
                  dealId,
                  ipfsHash
                );
                toast("Collection deployed!");
              }}
              className="relative inline-block px-4 py-2 font-medium group mt-4 w-[200px] mx-auto  text-center"
            >
              <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bff22d] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bff22d]"></span>
              <span className="relative text-black text-center">Create token</span>
            </button>
          </div>
        </div>
        <div className="card-body justify-center">
          <div className="flex justify-center items-center bg-white px-2">
            <div className="p-3 w-full rounded-md">
              <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
              <div className="h-64 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer">
                <input type="file" onChange={handleFile} className="h-full w-full opacity-0 z-10 absolute" multiple="multiple" name="files[]" />
                <div className="h-full w-full bg-[#e4e4e4] absolute z-1 flex justify-center items-center top-0">
                  <div className="flex flex-col">
                    <i className="mdi mdi-folder-open text-[30px] text-black text-center"></i>
                    <span id="filecontainer" className="text-lg">{`Drag and drop your token image here`}</span>
                    <span id="filename" className="text-sm">
                      {files.length > 0 ? files[0].name : ""}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center items-center mt-2">
                <h1 className="text-md text-black mt-4">Please upload .png or .jpg files only, max 10MB</h1>
              </div>
              <div className="flex flex-wrap gap-2 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default create;
