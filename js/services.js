angular.module('MPinstallments.services',[]).factory('ws',  function($http){
  //const API_URL = 'https://apistg.intrabus.com.ar/ROSBUS.WebService.Admin';
  const API_URL = 'https://api.mercadopago.com/v1/';
  const PUBLIC_KEY = 'APP_USR-e7d5870a-e2f9-4f5b-8820-afbac8685dc3';
  const PK_GET = '?public_key='+PUBLIC_KEY;
  var service = {
    
      getPaymentMethods: function(){//trae las formas de pago posibles (nos interesan las tarjetas de crédito)
      return $http.get(API_URL+'payment_methods/'+PK_GET);
    },
    getInstallments: function(payment_method_id,ammount){//trae las formas de pago posibles (nos interesan las tarjetas de crédito)
      return $http.get(API_URL+'payment_methods/installments/'+PK_GET+'&amount='+ammount+'&payment_method_id='+payment_method_id);
    },

  }
  return service;
});
