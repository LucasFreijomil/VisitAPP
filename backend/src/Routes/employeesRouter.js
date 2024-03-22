const { Router } = require("express");
const getEmployees = require("../Controllers/Employees/getEmployees");
const postEmployee = require("../Controllers/Employees/postEmployee");
const updateEmployee = require("../Controllers/Employees/updateEmployee.js");
const deleteEmployee = require("../Controllers/Employees/deleteEmployee.js");

employeesRouter = Router();

employeesRouter.post('/', postEmployee);
employeesRouter.get('/', getEmployees);
employeesRouter.put('/', updateEmployee);
employeesRouter.delete('/', deleteEmployee);

module.exports = employeesRouter;