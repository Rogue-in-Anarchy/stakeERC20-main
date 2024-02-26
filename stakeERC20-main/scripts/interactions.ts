import { ethers } from "hardhat";

async function main() {
  const StakingContractAddress = "0x742689cCE9A983cAfC00de2FDc86b874D4960978";

  const TokenContractAddress = "0x160c0bc36B552A77776cCd1059D43014052f5d98";

  const StakingContract = await ethers.getContractAt("IstakeERC20", StakingContractAddress);

  const TokenContract = await ethers.getContractAt("ID4n13ltoken", TokenContractAddress);

  const stakingAmount = ethers.parseUnits("500", 6);

  const approve = await TokenContract.approve(StakingContractAddress, stakingAmount);
  approve.wait;
  
  console.log("-------------------Approve-----------------------")
  
    const depositTX = await StakingContract.deposit(stakingAmount);
  depositTX.wait;

    console.log("------------------Deposited---------------");

  const getBalanceTXBeforeStaking = await StakingContract.getUserBalance();

  console.log("User Balance AfterDeposit is:", getBalanceTXBeforeStaking);

  const openSTakeTx = await StakingContract.openStake(stakingAmount);
  openSTakeTx.wait;

    console.log("-------------------Opened Stake-----------------------");

  const closeStakeTX = await StakingContract.closeStake(2);
  closeStakeTX.wait;

  const getBalanceAfterClosingStake = await StakingContract.getUserBalance();

  console.log("User Balance After Closing Stake is", getBalanceAfterClosingStake);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
