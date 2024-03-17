const validator = require('node-validator');

let emptycheck = /([^\s])/;

exports.postValidation = (req, res, next) => {

    try {
        let path = req.route.path;
        let data = req.body;
        let check;
        if (path == '/crtOrg') {
            check = validator.isObject()
                .withRequired('orgName', validator.isString({ regex: emptycheck, message: "orgName is required" }))
                .withRequired('orgAddress', validator.isString({ regex: emptycheck, message: "orgAddress is required" }))
                .withRequired('orgCity', validator.isString({ regex: emptycheck, message: "orgCity is required" }))
                .withRequired('orgCountry', validator.isString({ regex: emptycheck, message: "orgCountry is required" }))
                .withRequired('postalCode', validator.isNumber({ regex: emptycheck, message: "postalCode is required" }))
                
        }else if(path == '/signUp'){
            check = validator.isObject()
            .withRequired('firstName', validator.isString({ regex: emptycheck, message: "firstName is required" }))
            .withRequired('lastName', validator.isString({ regex: emptycheck, message: "lastName is required" }))
            .withRequired('emailId', validator.isString({ regex: emptycheck, message: "emailId is required" }))
            .withRequired('password', validator.isString({ regex: emptycheck, message: "password is required" }))
            .withRequired('role', validator.isString({ regex: emptycheck, message: "role is required" }))
            .withOptional('companyId')
            
        }else if(path == '/login'){
            check = validator.isObject()
            .withRequired('emailId', validator.isString({ regex: emptycheck, message: "emailId is required" }))
            .withRequired('password', validator.isString({ regex: emptycheck, message: "password is required" }))
            
        }else if(path == '/mapOrgToUsr'){
            check = validator.isObject()
            .withRequired('companyId', validator.isString({ regex: emptycheck, message: "companyId is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
            
        }
        validator.run(check, data, (errorcount, errors) => {
            if (errorcount == 0) {
                next();
            } else {
                console.log(errors,"errors")
                let errormsg = '';
                for (let i = 0; i < errors.length; i++) {
                    if (errormsg != '') {
                        errormsg += ', ';
                    }
                    if (errors[i].message == 'Required value.' && errors[i].value == undefined) {
                        errors[i].message = errors[i].parameter + ' is required'
                    } else if (errors[i].value != undefined || errors[i].value == "" || errors[i].value == [] || errors[i].message == "Unexpected value.") {
                        errors[i].message = "Not a valid " + errors[i].parameter
                    } else {
                        errors[i].message = errors[i].message;
                    }
                    errormsg += errors[i].message;
                }
                res.json({ "status": false, "message": errormsg })
            }
        })
    } catch (e) {
        console.log("Error catched in validation", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}