import {
   loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("StakingERC20", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOstakingERC20Fixture() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const StakingToken = await ethers.getContractFactory("D4N13LToken");
    const stakingToken = await StakingToken.deploy();

    const StakingERC20 = await ethers.getContractFactory("StakingERC20");
    const stakingERC20 = await StakingERC20.deploy(stakingToken.target);

    return { stakingToken, stakingERC20, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the token addresses", async function () {
      const {stakingToken, stakingERC20} = await loadFixture(deployOstakingERC20Fixture);

      expect(await stakingERC20.stakingToken()).to.equal(stakingToken.target);
    });

    it("Should set the right owner", async function () {
      const { stakingERC20, owner } = await loadFixture(deployOstakingERC20Fixture);

      expect(await stakingERC20.owner()).to.equal(owner.address);
    });

  });

  describe("Deposit", function () {

    it("Should Revert if sender is address Zero", async function () {
      const { owner } = await loadFixture(deployOstakingERC20Fixture);

      const addressZero = "0x0000000000000000000000000000000000000000";

      expect(await owner.address).to.not.equal(addressZero);
    });
    
    it("Should revert if deposit amount is Zero", async function () {

      const {stakingERC20, stakingToken } = await loadFixture(deployOstakingERC20Fixture);

             
      const ApproveTx = await stakingToken.approve(stakingERC20, 500);
      ApproveTx.wait;

         
        await expect(stakingERC20.deposit(0)).to.be.revertedWith(
          "Can't Deposit Zero"
        );
      });

    it("It Should deposit amount from User into Contract Balance", async function () {

      const { stakingERC20, stakingToken } = await loadFixture(deployOstakingERC20Fixture);
      
      const ApproveTx = await stakingToken.approve(stakingERC20, 500);
      ApproveTx.wait;

      const depositAmount = 1;

      const deposittx = await stakingERC20.deposit(depositAmount);
      deposittx.wait;

      expect(await stakingERC20.getContractBal()).to.be.equal(depositAmount);

            
    });

  });

  describe("Openstake", function () {
      it("Should revert if amount staked is more than balance", async function () {

      const {stakingERC20, stakingToken } = await loadFixture(deployOstakingERC20Fixture);

             
      const ApproveTx = await stakingToken.approve(stakingERC20, 500);
      ApproveTx.wait;

      const depositAmount = 1;

      const deposittx = await stakingERC20.deposit(depositAmount);
      deposittx.wait;

        await expect(stakingERC20.openStake(2)).to.be.revertedWith(
          "Insufficent Balance Please Deposit"
        );
      });

      it("Should revert if stake amount is Zero", async function () {

        const {stakingERC20, stakingToken } = await loadFixture(deployOstakingERC20Fixture);
  
               
        const ApproveTx = await stakingToken.approve(stakingERC20, 500);
        ApproveTx.wait;
  
           
          await expect(stakingERC20.openStake(0)).to.be.revertedWith(
            "Can not stake Zero"
          );
       });

       it("Should emit if stake is opened successfully", async function () {

        const {stakingERC20, stakingToken } = await loadFixture(deployOstakingERC20Fixture);
  
               
        const ApproveTx = await stakingToken.approve(stakingERC20, 500);
        ApproveTx.wait;

        const depositTX = await stakingERC20.deposit(20);
  
           
          await expect(stakingERC20.openStake(1)).to.emit(stakingERC20, "StakeOpened").withArgs(anyValue, "1");
       });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
});

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
