// SPDX-License-Identifier: WZF
pragma solidity ^0.7.0;
import "./Roles.sol";

// Define a contract 'ManufacturerRole' to manage this role - add, remove, check
contract StaffRole{
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event StaffAdded(address indexed account);
  event StaffRemoved(address indexed account);

  // Define a struct 'manufacturers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Staffs;

  // In the constructor make the address that deploys this contract the 1st manufacturer
  constructor() public {
    _addStaff(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyStaff() {
    require(isStaff(msg.sender));
    _;
  }

  // Define a function 'isManufacturer' to check this role
  function isStaff(address account) public view returns (bool) {
    return Roles.has(Staffs, account);
  }

  // Define a function 'addManufacturer' that adds this role
  function addStaff(address account) public{
    _addStaff(account);
  }

  // Define a function 'renounceManufacturer' to renounce this role
  function renounceStaff() public {
    _removeStaff(msg.sender);
  }

  // Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
  function _addStaff(address account) internal {
    Roles.add(Staffs, account);
    emit StaffAdded(account);
  }

  // Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
  function _removeStaff(address account) internal {
    Roles.remove(Staffs, account);
    emit StaffRemoved(account);
  }
}