// SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;

import "./Roles.sol";

// Define a contract 'ManufacturerRole' to manage this role - add, remove, check
contract CompanyRole{
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event CompanyAdded(address indexed account);
  event CompanyRemoved(address indexed account);

  // Define a struct 'manufacturers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Companys;

  // In the constructor make the address that deploys this contract the 1st manufacturer
  constructor() public {
    _addCompany(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyCompany() {
    require(isCompany(msg.sender));
    _;
  }

  // Define a function 'isManufacturer' to check this role
  function isCompany(address account) public view returns (bool) {
    return Roles.has(Companys, account);
  }

  // Define a function 'addManufacturer' that adds this role
  function addCompany(address account) public onlyCompany{
    _addCompany(account);
  }

  // Define a function 'renounceManufacturer' to renounce this role
  function renounceCompany() public {
    _removeCompany(msg.sender);
  }

  // Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
  function _addCompany(address account) internal {
    Roles.add(Companys, account);
    emit CompanyAdded(account);
  }

  // Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
  function _removeCompany(address account) internal {
    Roles.remove(Companys, account);
    emit CompanyRemoved(account);
  }
}