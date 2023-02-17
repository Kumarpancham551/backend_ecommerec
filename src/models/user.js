const sqlConnection = require("../services/sqlConnection");

module.exports  = {
    login: function(data,callback){
        var sql = "Select ID as userId, userName from Users where Username = ? And Password = ?";
        var values = [];
        values.push(data.username);
        values.push(data.password);
        sqlConnection.executeQuery(sql,values,function(err,result){
            callback(err,result);
        });
    },

    getUserSignUpDetails: function(data,callback){
        var sql = "Select * from Users where Username =?";
        var values = [];
        values.push(data.username);
        sqlConnection.executeQuery(sql,values,function(err,result){
            callback(err,result);
        });
    },
    signup: function(data,callback){
        var sql = "INSERT into Users (Username, Password, CreatedAt, UpdateAT)"
        + "values (?,?,now(),now())";
        var values = [];
        values.push(data.username);
        values.push(data.password);
        sqlConnection.executeQuery(sql,values,function(err,result){
            callback(err, result);
        });
    }
}