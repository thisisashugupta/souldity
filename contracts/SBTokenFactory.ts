const SBTokenFactory = {
    "contractName": "SBTokenFactory",
    "ownerAddress":"0x5E3Adbd57a310243f89A25B17d4BaC02bD78Bb3F",
    "abi": [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "uniId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "uniName",
                    "type": "string"
                }
            ],
            "name": "UniTokenCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "symbol",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "uniName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "uniAddress",
                    "type": "string"
                }
            ],
            "name": "createUniToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getNumberOfUniversities",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "getUniversityDetails",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "uni_id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "uni_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "uni_address",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "uni_owner",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct SBTokenFactory.University",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "uniIdToAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "unis",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "uni_id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "uni_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "uni_address",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "uni_owner",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    "networks": {
        "1": {
            "address": "0x123abc...",
            "transactionHash": "0x456def..."
        },
        "11155111": {
            "network": "sepolia",
            "address": "6BfC24EC5a6d48401a75629d5af7B707A3AF3224",
            "transactionHash": "0xd66e134187e6c99cf4de3412a3292a1d8d1f65f06578a6506cd8f21d01e4e352"
        }
      
    }
  };

  export default SBTokenFactory;