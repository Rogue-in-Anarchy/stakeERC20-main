import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  
  const stakingToken = await ethers.deployContract("D4N13LToken");
  await stakingToken.waitForDeployment();

  console.log(`D4N13L Token deployed to ${stakingToken.target}`);

  const stakingERC20 = await ethers.deployContract("StakingERC20", [stakingToken.target]);
  await stakingERC20.waitForDeployment();

  console.log(`ERC20 Staking Contract deployed to ${stakingERC20.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
