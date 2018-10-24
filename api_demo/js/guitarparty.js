var API_KEY = 'ed09cac3481bed883129a60d90b65b9af0b435be';
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Guitarparty-Api-Key', API_KEY);
    }
});