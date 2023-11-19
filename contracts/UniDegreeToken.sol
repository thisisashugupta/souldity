// Try using this as URI ipfs://bafkreic6ov4qo4ucd4g4uuyve4h72nc4y2lg7ugtq3n3vxnfp3lojvtmdu

// owner 0x0c093868DAC0514B99e4d4CfB0880ee5Fa5A711B
// address1 0x3db6e8f35Ff731415B7647eCe5936A74Ee75fAF5
// address2 0x83778Fa6B0836E804e95334dE7056B7d7BB9ED91

// LNM Student Token, LNMS , LNMIIT , "Rupa ki Nangal, Post-Sumel, Via-Jamdoli, Jaipur-302031, (Rajasthan) INDIA"

// 0x3db6e8f35Ff731415B7647eCe5936A74Ee75fAF5 , ipfs://bafkreic6ov4qo4ucd4g4uuyve4h72nc4y2lg7ugtq3n3vxnfp3lojvtmdu , 2202221 , TEST NAME 2 ,  CSE , 27012011 , 2022
// 0x83778Fa6B0836E804e95334dE7056B7d7BB9ED91 , ipfs://bafkreic6ov4qo4ucd4g4uuyve4h72nc4y2lg7ugtq3n3vxnfp3lojvtmdu , 2303110 , TEST NAME 3 ,  CCE , 29092012 , 2023

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol";

contract SBToken is ERC721, ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    struct University {
        string uni_name;
        string uni_address;
        address uni_owner; // Ethereum address of the university
    }

    struct Student {
        uint16 stu_year_of_admission;
        uint32 stu_id;
        uint32 stu_birthdate;
        string stu_name;
        string stu_branch;
        address stu_owner; // Ethereum address of the student
    }

    University public uni;
    Student[] private students;

    constructor(string memory name, string memory symbol, string memory _uni_name, string memory _uni_address) ERC721(name, symbol) {
        uni.uni_name = _uni_name;
        uni.uni_address = _uni_address;
        uni.uni_owner = msg.sender;
    }

    function safeMint(
        address to, 
        string memory uri,
        uint32 _stu_id,
        string memory _stu_name,
        string memory _stu_branch,
        uint32 _stu_birthdate,
        uint16 _stu_year_of_admission
    ) public onlyOwner {

        _addStudent(
            _stu_id,
            _stu_name,
            _stu_branch,
             _stu_birthdate,
            _stu_year_of_admission,
            to
        );

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner of the token can burn it");
        _burn(tokenId);
    }

    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
        require(from == address(0) || to == address(0), "Not allowed to transfer token");
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId) override internal {

        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _addStudent(
        uint32 _stu_id,
        string memory _stu_name,
        string memory _stu_branch,
        uint32 _stu_birthdate,
        uint16 _stu_year_of_admission,
        address _stu_owner
    ) internal {
        Student memory newStudent = Student({
            stu_id: _stu_id,
            stu_name: _stu_name,
            stu_branch: _stu_branch,
            stu_birthdate: _stu_birthdate,
            stu_year_of_admission: _stu_year_of_admission,
            stu_owner: _stu_owner
        });

        students.push(newStudent);
    }

    // Function to get the total number of students
    function getNumberOfStudents() public view returns (uint256) {
        return students.length;
    }

    // Function to get details of a specific student by index
    function getStudentDetails(uint256 index) public onlyOwner view returns (Student memory) {
        require(index < students.length, "Index out of bounds");
        return students[index];
    }

    // Function to get details of all students
    function getAllStudents() public onlyOwner view returns (Student[] memory) {
        return students;
    }
}