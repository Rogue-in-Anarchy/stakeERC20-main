// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IstakeERC20{

    function deposit(uint _amount) external;

    function openStake(uint _stakingAmount) external;

    function closeStake(uint _stakeID) external;

    function withdraw(uint _amount) external;

    function getUserBalance() external view returns (uint);

    function getContractBal() external view returns(uint);
    
}