// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./ERC721Factory.sol";

contract OpenFactory is ERC721Factory {
    constructor(address soulboundStorage) ERC721Factory(soulboundStorage) {
    }

    function createCollection(
        string memory name,
        string memory symbol,
        string memory uri
    ) public returns (address) {
        return createSoulboundCollection(name, symbol, uri, 0x0);
    }
}
