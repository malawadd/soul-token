// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./erc721Factory/OpenFactory.sol";
import "./soulboundStorage/ISoulboundStorage.sol";

contract SoulboundEngine {
    mapping(bytes32 => address) _erc721Factories;
    bytes32[] public _ids;
    ISoulboundStorage _soulboundStorage;

    constructor(address soulboundStorage) {
        _soulboundStorage = ISoulboundStorage(soulboundStorage);
    }

    function registerFactory(bytes32 _keccakId, address erc721Factory) public {
        require(_erc721Factories[_keccakId] == address(0), "Error: Factory already registered with this id.");
        _erc721Factories[_keccakId] = erc721Factory;
        _ids.push(_keccakId);
        _soulboundStorage.registerFactory(erc721Factory);
    }

    function getFactory(bytes32 _keccakId) public view returns (address) {
        return _erc721Factories[_keccakId];
    }

    function getStorageAddress() public view returns (address) {
        return address(_soulboundStorage);
    }
}
