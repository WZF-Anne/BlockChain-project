// SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;
import "./Roles.sol";

// Define a contract 'ManufacturerRole' to manage this role - add, remove, check
contract LastCompanyRole{
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event LastCompanyAdded(address indexed account);
  event LastCompanyRemoved(address indexed account);

  // Define a struct 'manufacturers' by inheriting from 'Roles' library, struct Role
  Roles.Role private LastCompanys;

  // In the constructor make the address that deploys this contract the 1st manufacturer
  constructor() public {
    _addLastCompany(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyLastCompany() {
    require(isLastCompany(msg.sender));
    _;
  }

  // Define a function 'isManufacturer' to check this role
  function isLastCompany(address account) public view returns (bool) {
    return Roles.has(LastCompanys, account);
  }

  // Define a function 'addManufacturer' that adds this role
  function addLastCompany(address account) public onlyLastCompany{
    _addLastCompany(account);
  }

  // Define a function 'renounceManufacturer' to renounce this role
  function renounceLastCompany() public {
    _removeLastCompany(msg.sender);
  }

  // Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
  function _addLastCompany(address account) internal {
    Roles.add(LastCompanys, account);
    emit LastCompanyAdded(account);
  }

  // Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
  function _removeLastCompany(address account) internal {
    Roles.remove(LastCompanys, account);
    emit LastCompanyRemoved(account);
  }
}