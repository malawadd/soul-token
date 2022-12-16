// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../soulboundERC721/SoulboundERC721.sol";
import "../soulboundStorage/ISoulboundStorage.sol";

abstract contract ERC721Factory {
    mapping(string => address) internal _soulboundCollections;
    ISoulboundStorage internal _soulboundStorage;

    constructor(address soulboundStorage) {
        _soulboundStorage = ISoulboundStorage(soulboundStorage);
    }

    function createSoulboundCollection(
        string memory name,
        string memory symbol,
        string memory uri,
        bytes32 data
    ) internal virtual returns (address) {
        address collection = address(new SoulboundERC721(msg.sender, address(_soulboundStorage), name, symbol, uri));
        registerCollection(name, collection, msg.sender);
        return collection;
    }

    function registerCollection(string memory key, address collection, address deployer) internal {
        require(_soulboundCollections[key] == address(0), "Error: A factory has already been registered to name.");
        _soulboundCollections[key] = collection;
        _soulboundStorage.registerCollection(deployer, collection);
    }
}
