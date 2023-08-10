let employeedetails = require('../models').employeedetails;
const sequelize = require('sequelize');
const Joi = require('joi');
const moment = require('moment');

async function getAllEmployees(req, res) {

    try {
        let where = {};
        if (req.body.empid) {
            where.empid = req.body.empid;
        }
        if (req.body.empname) {
            where.empname = req.body.empname;
        }

        const result = await employeedetails.findAll({
            where: where
        });

        if (result.length > 0) {
            res.send({
                "status": true,
                "successMessage": "Data Found.",
                "data": result
            });
        }
        else {
            res.send({
                "status": false,
                "returnMessage": "Data Not Found",
                "data": []
            });
        }

    } catch (err) {
        console.log("Error fetching employeedetails :", err);
        res.status(500).json({ error: "something went wrong" })
    }
}

async function createNewEmployee(req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
        empid: Joi.number().required(),
        empname: Joi.string().required(),
        emailid: Joi.string().required().description('email').email().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).lowercase().trim().replace(`'`, ``),
        job: Joi.string().required(),
        createdby: Joi.string().required().description('email').email().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).lowercase().trim().replace(`'`, ``),
        isactive: Joi.required()
    });

    try {
        const validateSchema = await schema.validateAsync(data);

        const result = await employeedetails.findAll({
            where: {
                empid: req.body.empid
            }
        });

        // console.log("result ==========", result.dataValues.empid);

        // console.log("result ==========", employeedetails.dataValues);

        if (result.length > 0) {
            res.send({
                "errorCode": -1,
                "status": false,
                "returnMessage": `Employee is already exist`,
                "data": result
            })
        }
        else {
            employeedetails.create({
                empid: req.body.empid,
                empname: req.body.empname,
                emailid: req.body.emailid,
                job: req.body.job,
                createddate:  moment(new Date()),
                createdby: req.body.createdby,
                isactive: req.body.isactive
            })
                .then((result) => {
                    res.send({
                        "errorCode": 0,
                        "status": true,
                        "data": result,
                        "successMessage": `Employee Details Added Successfully.!`
                    })
                })
                .catch((error) => {
                    res.status(500).send({
                        message: error.message || "Some error occurred while adding the Employee Details."
                    })
                })
        }
    }
    catch (error) {
        res.status(400).json({
            errorCode: 400,
            status: false,
            returnMessage: error.details[0].message
        });
    }

}

async function updateAddEmployee(req, res) {
    data = req.body;

    const schema = Joi.object().keys({
        empid: Joi.number().required(),
        empname: Joi.string().required(),
        emailid: Joi.string().required().description('email').email().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).lowercase().trim().replace(`'`, ``),
        job: Joi.string().required(),
        createdby: Joi.string().required().description('email').email().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).lowercase().trim().replace(`'`, ``),
        lastmodifiedby: Joi.string().required().description('email').email().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).lowercase().trim().replace(`'`, ``),
        isactive: Joi.required()
    });

    try {
        const validateSchema = await schema.validateAsync(data);

        employeedetails.findAll({
            where: {
                empid: data.empid
            }
        }).then(result => {

            // console.log("result ==========", result);

            if (result.length > 0) {
                let input = {
                    empname: data.empname,
                    emailid: data.emailid,
                    job: data.job,
                    lastmodifiedby: data.lastmodifiedby,
                    lastmodifieddate: new Date().toJSON().split('T'),
                    isactive: data.isactive
                };

                console.log("input ============", input);

                employeedetails.update(input, {
                    where: {
                        empid: data.empid
                    }
                }).then(result => {
                    if (result) {
                        res.send({
                            "errorCode": 0,
                            "data": result,
                            "message": "Employee Details Updated."
                        });
                    }
                    else {
                        res.send({
                            "errorCode": -1,
                            "data": [],
                            "message": "Employee Details Not Updated."
                        });
                    }
                });
            }
            else {
                let input = {
                    empid: data.empid,
                    empname: data.empname,
                    emailid: data.emailid,
                    job: data.job,
                    createdby: data.createdby,
                    createddate:  moment(new Date()),
                    isactive: data.isactive
                };

                employeedetails.create(input).then(result => {
                    if (result) {
                        res.send({
                            "errorCode": 0,
                            "data": input,
                            "message": "New Employee created Successfully."
                        });
                    }
                    else {
                        res.send({
                            "errorCode": -1,
                            "data": [],
                            "message": "New Employee Not Created."
                        });
                    }
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            "status": false,
            "errorCOde": 400,
            "message": error.details[0].message
        });
    }
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateAddEmployee,
};