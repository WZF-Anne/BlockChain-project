// SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;
import "./Roles.sol";

// Define a contract 'ManufacturerRole' to manage this role - add, remove, check
contract NewCompanyRole{
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event NewCompanyAdded(address indexed account);
  event NewCompanyRemoved(address indexed account);

  // Define a struct 'manufacturers' by inheriting from 'Roles' library, struct Role
  Roles.Role private NewCompanys;

  // In the constructor make the address that deploys this contract the 1st manufacturer
  constructor() public {
    _addNewCompany(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyNewCompany() {
    require(isNewCompany(msg.sender));
    _;
  }

  // Define a function 'isManufacturer' to check this role
  function isNewCompany(address account) public view returns (bool) {
    return Roles.has(NewCompanys, account);
  }

  // Define a function 'addManufacturer' that adds this role
  function addNewCompany(address account) public onlyNewCompany{
    _addNewCompany(account);
  }

  // Define a function 'renounceManufacturer' to renounce this role
  function renounceNewCompany() public {
    _removeNewCompany(msg.sender);
  }

  // Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
  function _addNewCompany(address account) internal {
    Roles.add(NewCompanys, account);
    emit NewCompanyAdded(account);
  }

  // Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
  function _removeNewCompany(address account) internal {
    Roles.remove(NewCompanys, account);
    emit NewCompanyRemoved(account);
  }
}