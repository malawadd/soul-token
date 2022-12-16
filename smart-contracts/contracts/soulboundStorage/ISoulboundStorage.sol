// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./IssuerMint.sol";
import "./ReceiverMint.sol";

interface ISoulboundStorage {
    function registerEngine(address soulboundEngine) external;
    function registerFactory(address erc721Factory) external;
    function registerCollection(address erc721, address deployer) external;

    function addIssuedToken(address issuer, address receiver, address erc721) external;
    function confirmMint(address receiver, address erc721, uint256 tokenId) external;

    function getDeployedCollections(address deployer) external view returns(address[] memory);
    function getMintsByIssuer(address issuer) external view returns(IssuerMint[] memory);
    function wasMintConfirm(address receiver, address erc721) external view returns(bool);
    function getMintsByReceiver(address receiver) external view returns(ReceiverMint[] memory);
}
