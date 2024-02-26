// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract D4N13LToken is ERC20, Ownable{
    
    constructor() ERC20("D4N13L", "DNL") Ownable(msg.sender){
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}