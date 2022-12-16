// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ISoulboundStorage.sol";

contract SoulboundStorage is ISoulboundStorage, AccessControl {
    bytes32 public constant ENGINE_REGISTRAR = keccak256("ENGINE_REGISTRAR");
    bytes32 public constant FACTORY_REGISTRAR = keccak256("FACTORY_REGISTRAR");
    bytes32 public constant ERC721_REGISTRAR = keccak256("ERC721_REGISTRAR");
    bytes32 public constant SOULBOUND_COLLECTION = keccak256("SOULBOUND_COLLECTION");
    
    mapping(address => address[]) _collectionsByDeployer;

    // Mints a issuer assigned = May be pending OR complete
    mapping(address => IssuerMint[]) _mintsByIssuer;
    // Mints a receiver was assigned = May be pending OR complete
    mapping(address => ReceiverMint[]) _mintsByReceiver;

    //// Register roles to gate write access
    constructor() {
        _grantRole(ENGINE_REGISTRAR, msg.sender);
    }

    function registerEngine(address soulboundEngine) public onlyRole(ENGINE_REGISTRAR) {
        _grantRole(FACTORY_REGISTRAR, soulboundEngine);
    }

    function registerFactory(address erc721Factory) public onlyRole(FACTORY_REGISTRAR) {
        _grantRole(ERC721_REGISTRAR, erc721Factory);
    }

    function registerCollection(address deployer, address erc721) public onlyRole(ERC721_REGISTRAR) {
        _grantRole(SOULBOUND_COLLECTION, erc721);
        _collectionsByDeployer[deployer].push(erc721);
    }

    function addIssuedToken(address issuer, address receiver, address erc721) public onlyRole(SOULBOUND_COLLECTION) {
        _mintsByIssuer[issuer].push(IssuerMint(erc721, receiver));
        _mintsByReceiver[receiver].push(ReceiverMint(erc721, 0, false));
    }

    function confirmMint(address receiver, address erc721, uint256 tokenId) public onlyRole(SOULBOUND_COLLECTION) {
        ReceiverMint[] storage pendingMints = _mintsByReceiver[receiver];
        for(uint i = 0; i < pendingMints.length; ++i) {
            ReceiverMint storage pendingMint = pendingMints[i];
            if (pendingMint.collection == erc721) {
                pendingMint.tokenId = tokenId;
                pendingMint.completed = true;
                break;
            }
        }
    }

    // Views
    function getDeployedCollections(address deployer) public view returns(address[] memory) {
        address[] memory collections = _collectionsByDeployer[deployer];
        return collections;
    }

    // Can include both confirmed & unconfirmed mints
    // call wasMintConfirmed(receiver, address) to check if a mint was received.
    function getMintsByIssuer(address issuer) public view returns(IssuerMint[] memory) {
        IssuerMint[] memory issuedMints = _mintsByIssuer[issuer];
        return issuedMints;
    }

    function wasMintConfirm(address receiver, address erc721) public view returns(bool) {
        ReceiverMint[] memory pendingMints = _mintsByReceiver[receiver];
        for(uint i = 0; i < pendingMints.length; ++i) {
            ReceiverMint memory pendingMint = pendingMints[i];
            if (pendingMint.collection == erc721) {
                return pendingMint.completed;
            }
        }
        return false;
    }

    function getMintsByReceiver(address receiver) public view returns(ReceiverMint[] memory) {
        ReceiverMint[] memory receiverMints = _mintsByReceiver[receiver];
        return receiverMints;
    }
}
