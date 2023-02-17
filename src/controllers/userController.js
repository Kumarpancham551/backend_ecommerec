const {httpCodes}=require("../constants/backendConfig");

module.exports = {

    login: function(req,res){
        var data = req.body;
        var responseData = {
            succcess:false,
            msg: "Invalid params for login"
        };
        if(data.username && data.passsword){
            User.login(data,function(err,result){
                if(err){
                    responseData.msg = "Error in login";
                    return res.status(httpCodes.internalServerError).send(responseData);
                }if(result.length == 0){
                    responseData.msg = "Invalid Email or Passsword";
                    return res.status(httpCodes.internalServerError).send(responseData);
                }
                responseData.succcess = true;
                responseData.msg = "Successfully logged in";
                return res.status(httpCodes.success).send(responseData);
            })
        }else{
            return res.status(httpCodes.badRequest).send(responseData)
        }
    },
    signup: function(req,res){
        var data = req.body;
        var responseData = {
            succcess:false,
            msg: "InValid params for signup"
        };

        if(data.username && data.passsword){
            User.getUserSignUpDetails(data,function(err,result){
                if(err){
                    responseData.msg = "Error in signup";
                    return res.status(httpCodes.internalServerError).send(responseData);
                }
                if(result.length > 0){
                    responseData.msg = "User already exist";
                    return res.status(httpCodes.internalServerError).send(responseData);
 
                }else{
                    User.signup(data,function(err1){
                       if(err1){
                        responseData.msg = "Error in signup";
                        return res.status(httpCodes.internalServerError).send(responseData);
                       } 
                       responseData.succcess = true;
                       responseData.msg = "Successfully signed up";
                       return res.status(httpCodes.success).send(responseData);
                    })
                }
            })
        }else{
            return res.status(httpCodes.badRequest).send(responseData)
        }
    }
}