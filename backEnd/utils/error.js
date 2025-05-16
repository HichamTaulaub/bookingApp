const creatError = (status, message) => {
    const err = Error();
    err.status= status
    err.message= message
     return err;
}

module.exports = creatError