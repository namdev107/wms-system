const userlogindetail = require("../models").userlogindetail;
const Joi = require('joi');
const jwt = require("jsonwebtoken");

async function generateWebToken(req, res) {
    const data = req.body;
    const schema = Joi.object().keys({
        emailaddress: Joi.string().required().description('email').email().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).lowercase().trim().replace(`'`, ``)

    });

    try {
        const verifySchema = await schema.validateAsync(data);

        const getUserDetail = userlogindetail.findOne({
            where: {
                emailaddress: data.emailaddress
            }
        }).then(result => {

            if (result.length > 0) {
                let secretKey = "";
                // -------------------
                let payloadData ={
                    // -----------------
                    // this is sample text..............
                };

                const options = {
                    // ------------------
                };
            }
            else {

            }
        });
    } catch (error) {

    }
}