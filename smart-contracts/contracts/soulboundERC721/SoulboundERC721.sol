// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ISoulboundERC721.sol";
import "../soulboundStorage/ISoulboundStorage.sol";

contract SoulboundERC721 is ERC721, ISoulboundERC721, AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    uint256 _nextTokenId;
    mapping(address => bool) _claims;
    address _owner;
    string _uri;
    ISoulboundStorage _soulboundStorage;

    constructor(
        address owner,
        address soulboundStorage,
        string memory name,
        string memory symbol,
        string memory uri
    ) ERC721(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, owner);
        _setupRole(ISSUER_ROLE, owner);
        _owner = owner;
        _uri = uri;
        _soulboundStorage = ISoulboundStorage(soulboundStorage);
    }

    function issue(address receiver) public virtual onlyRole(ISSUER_ROLE) {
        _claims[receiver] = true;
        _soulboundStorage.addIssuedToken(msg.sender, receiver, address(this));
    }

    function claim() public virtual {
        require(_claims[msg.sender] == true, "ERROR: No issue to claim.");
        mint(msg.sender);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _uri;
    }

    function mint(address receiver) internal virtual {
        _mint(receiver, _nextTokenId);
        _soulboundStorage.confirmMint(receiver, address(this), _nextTokenId);
        _nextTokenId++;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

    //// Prevent transfers ////
    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("Error: Soulbound tokens cannot be transferred.");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("Error: Soulbound tokens cannot be transferred.");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        revert("Error: Soulbound tokens cannot be transferred.");
    }
}
