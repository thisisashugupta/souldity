const SBTokenFactory = {
    "contractName": "SBTokenFactory",
    "ownerAddress":"0x88914b8B8e85E807342a9eF2FE55eDC9b2fAFDCC",
    "abi": [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sbTokenAddress",
                    "type": "address"
                }
            ],
            "name": "SBTokenDeployed",
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
            "name": "createSBToken",
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
            "name": "deployedSBTokens",
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
            "name": "getDeployedSBTokens",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
            "address": "0x88914b8B8e85E807342a9eF2FE55eDC9b2fAFDCC",
            "transactionHash": "0xbb4af9fbfb2640c62f1b9c108cad4823467db72a9e6775d092ca64949e7b39ee"
        }
      
    }
  };

  export default SBTokenFactory;