var notification = (function () {
    
    function success(message) {
        notie.alert(1, message, 2);
    }
    
    function error(message) {
        notie.alert(3, message, 2);
    }

    return {
        success: success,
        error: error
    }
}());