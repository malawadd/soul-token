// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface ISoulboundERC721 {
    function issue(address receiver) external;

    function claim() external;
}
