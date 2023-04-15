// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BondToken is ERC20 {
  constructor(
    string memory name, 
    string memory symbol
  ) 
    ERC20(name, symbol) 
  {
    _mint(msg.sender, 1);
  }
}