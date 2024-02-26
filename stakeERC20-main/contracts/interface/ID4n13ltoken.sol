// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ID4n13ltoken {

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);
 
    function transferFrom(address from,address to,uint256 amount) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);
    
}