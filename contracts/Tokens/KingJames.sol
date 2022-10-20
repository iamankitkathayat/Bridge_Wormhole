// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KingJames is ERC20 {

    address public _owner;

    uint256 private _totalSupply = 90000000000000000000000000; //90,000,000 KingJames tokens

    mapping(address => uint256) private _balances;
    
    constructor() ERC20("KingJames token", "KingJames") {
        _owner = msg.sender;
        _mint(msg.sender, _totalSupply);
        _balances[_owner] = _totalSupply;
    }

}
