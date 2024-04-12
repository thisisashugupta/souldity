// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./SBToken.sol";

contract SBTokenFactory {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    address[] public deployedSBTokens;

    event SBTokenDeployed(address indexed sbTokenAddress);

    function createSBToken(
        string memory name,
        string memory symbol,
        string memory uniName,
        string memory uniAddress
    ) public {
        SBToken newSBToken = new SBToken(msg.sender, name, symbol, uniName, uniAddress);
        deployedSBTokens.push(address(newSBToken));
        emit SBTokenDeployed(address(newSBToken));
    }

    function getDeployedSBTokens() public view onlyOwner returns (address[] memory) {
        return deployedSBTokens;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only Owner can call this");
        _;
    }
}
