// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./SBToken.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol";

contract SBTokenFactory is Ownable {
    using Counters for Counters.Counter;

    event UniTokenCreated(address indexed tokenAddress, uint256 indexed uniId, string indexed uniName);

    struct University {
        uint256 uni_id;
        string uni_name;
        string uni_address;
        address uni_owner;
    }

    Counters.Counter private _uniIdCounter;
    University[] public unis;
    mapping(uint256 => address) public uniIdToAddress;

    // Function to create a new SBToken contract
    function createUniToken(
        string memory name,
        string memory symbol,
        string memory uniName,
        string memory uniAddress
    ) external returns (address) {
        _uniIdCounter.increment();
        uint256 newUniId = _uniIdCounter.current();

        SBToken newToken = new SBToken(name, symbol, uniName, uniAddress);
        
        University memory newUni = University({
            uni_id: newUniId,
            uni_name: uniName,
            uni_address: uniAddress,
            uni_owner: msg.sender
        });
        unis.push(newUni);
        uniIdToAddress[newUniId] = address(newToken);

        emit UniTokenCreated(address(newToken), newUniId, uniName);

        return address(newToken);
    }

    // Function to get the total number of universities
    function getNumberOfUniversities() external view returns (uint256) {
        return unis.length;
    }

    // Function to get details of a specific university by index
    function getUniversityDetails(uint256 index) external view returns (University memory) {
        require(index < unis.length, "Index out of bounds");
        return unis[index];
    }
}