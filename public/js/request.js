function request(route,info,funzione){ 
    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
    /* the route pointing to the post function */
    url: route,
    type: 'POST',
    /* send the csrf-token and the input to the controller */
    data:"_token="+ CSRF_TOKEN +"&"+ info,
    dataType: 'JSON',
    /* remind that 'data' is the response of the AjaxController */
    success: function (data) { 
      funzione(data);
    }
  });
}