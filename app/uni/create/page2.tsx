// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import SBTokenFactory from "@/contracts/SBTokenFactory.json";

// const App = () => {
//   const [web3, setWeb3] = useState(null);
//   const [accounts, setAccounts] = useState([]);
//   const [contract, setContract] = useState(null);
//   const [unis, setUnis] = useState([]);
//   const [uniName, setUniName] = useState("");
//   const [uniAddress, setUniAddress] = useState("");

//   useEffect(() => {
//     const initWeb3 = async () => {
//       if (window.ethereum) {
//         const newWeb3 = new Web3(window.ethereum);
//         try {
//           setWeb3(newWeb3);
//         } catch (error) {
//           console.error("User denied account access");
//         }
//       } else if (window.web3) {
//         const newWeb3 = new Web3(window.web3.currentProvider);
//         setWeb3(newWeb3);
//       } else {
//         console.error("Web3 not detected. Consider installing MetaMask");
//       }
//     };

//     initWeb3();
//   }, []);

//   useEffect(() => {
//     const initContract = async () => {
//       try {
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = SBTokenFactory.networks[networkId];
//         const instance = new web3.eth.Contract(
//           SBTokenFactory.abi,
//           deployedNetwork && deployedNetwork.address
//         );
//         setContract(instance);
//       } catch (error) {
//         console.error("Contract not deployed to the current network");
//       }
//     };

//     if (web3) {
//       initContract();
//     }
//   }, [web3]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (contract) {
//         const numberOfUniversities = await contract.methods.getNumberOfUniversities().call();
//         const universities = [];
//         for (let i = 0; i < numberOfUniversities; i++) {
//           const uni = await contract.methods.getUniversityDetails(i).call();
//           universities.push(uni);
//         }
//         setUnis(universities);
//       }
//     };

//     fetchData();
//   }, [contract]);

//   const handleCreateUniToken = async () => {
//     if (contract && web3 && accounts.length > 0) {
//       try {
//         await contract.methods
//           .createUniToken("TokenName", "TKN", uniName, uniAddress)
//           .send({ from: accounts[0] });
//         alert("University Token created successfully!");
//       } catch (error) {
//         console.error("Error creating University Token", error);
//         alert("Error creating University Token");
//       }
//     }
//   };

//   const handleConnectWallet = async () => {
//     try {
//       const accounts = await web3.eth.getAccounts();
//       setAccounts(accounts);
//     } catch (error) {
//       console.error("Error connecting to wallet", error);
//     }
//   };

//   return (
//     <div>
//       <h1>University Token Factory</h1>
//       {accounts.length === 0 ? (
//         <button onClick={handleConnectWallet}>Connect to Wallet</button>
//       ) : (
//         <>
//           <div>
//             <label htmlFor="uniName">University Name: </label>
//             <input
//               type="text"
//               id="uniName"
//               value={uniName}
//               onChange={(e) => setUniName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="uniAddress">University Address: </label>
//             <input
//               type="text"
//               id="uniAddress"
//               value={uniAddress}
//               onChange={(e) => setUniAddress(e.target.value)}
//             />
//           </div>
//           <button onClick={handleCreateUniToken}>Create University Token</button>
//           <h2>Universities</h2>
//           <ul>
//             {unis.map((uni) => (
//               <li key={uni.uni_id}>
//                 {uni.uni_name} - {uni.uni_address}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
