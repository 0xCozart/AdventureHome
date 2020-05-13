declare let web3: any;
declare let ethereum: any;
declare let Web3: any;

let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

const determineBalance = (
  tokenAddress: string,
  userAddress: string
): Promise<string> => {
  let contract = web3.eth.contract(minABI);
  let cont = contract.at(tokenAddress);
  return new Promise<string>((resolve) => {
    let balance: string = cont.balanceOf(
      userAddress,
      (error: any, success: object) => {
        if (error) {
          console.log("something went wrong" + error);
        }
        let output = success.toString();
        output = output.substring(0, output.length - 18);
        resolve(output);
      }
    );
  });
};

export default determineBalance;
