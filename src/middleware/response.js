exports.getStandardResponse = (status,message,data)=>{
    return {
        status: status,
        message : message,
        body : data
     }
}
