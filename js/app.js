var app = angular.module("MPinstallments", ['MPinstallments.services','angular-carousel']).run(function($http,ws){

 
  
});

app.controller("ListCtrl", function($scope, $http, $window, ws) {
  $scope.payment_methods=[];
  $scope.selectedInstallment={};
   $scope.selectedPayerCost={
    labels:''
   };

  ws.getPaymentMethods().then(function(response){
    $scope.payment_methods=response.data;

  });

  $scope.installments=function(index){
    ws.getInstallments($scope.payment_methods[index].id,1000).then(function(response){
      ordered_installments=[];

      for(i=0;i<response.data.length;i++){
        var max_detected=1;
        for(c=0;c<response.data[i].payer_costs.length;c++){
          pc=response.data[i].payer_costs[c];
          if(pc.installments>1 && pc.installment_rate==0){
            max_detected=pc.installments;
          }
        }

        if(!ordered_installments[max_detected]){
          ordered_installments[max_detected]=[];
        }
        ordered_installments[max_detected].push(response.data[i]);
      }

      
      $scope.payment_methods[index].installments=response.data;

    });
  }

  $scope.selectInstallment=function(installment){
    $scope.selectedInstallment=installment;
  }

  $scope.selectPayerCost=function(cost){
    $scope.selectedPayerCost=cost;
  }


});


// app.controller("foxCtrl", function($scope, $http, $window, ws) {
//   ws.getGrilla('fox.json').then(function(res){
//     $scope.grilla = res.data;
//     console.log(res.data);
//   })
// });


function utf8_encode (argString) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/utf8_encode/
  // original by: Webtoolkit.info (https://www.webtoolkit.info/)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: sowberry
  // improved by: Jack
  // improved by: Yves Sucaet
  // improved by: kirilloid
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Ulrich
  // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
  // bugfixed by: kirilloid
  //   example 1: utf8_encode('Kevin van Zonneveld')
  //   returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === 'undefined') {
    return ''
  }

  // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var string = (argString + '')
  var utftext = ''
  var start
  var end
  var stringl = 0

  start = end = 0
  stringl = string.length
  for (var n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n)
    var enc = null

    if (c1 < 128) {
      end++
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(
        (c1 >> 6) | 192, (c1 & 63) | 128
        )
    } else if ((c1 & 0xF800) !== 0xD800) {
      enc = String.fromCharCode(
        (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
        )
    } else {
      // surrogate pairs
      if ((c1 & 0xFC00) !== 0xD800) {
        throw new RangeError('Unmatched trail surrogate at ' + n)
      }
      var c2 = string.charCodeAt(++n)
      if ((c2 & 0xFC00) !== 0xDC00) {
        throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
      }
      c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
      enc = String.fromCharCode(
        (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
        )
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end)
      }
      utftext += enc
      start = end = n + 1
    }
  }

  if (end > start) {
    utftext += string.slice(start, stringl)
  }

  return utftext
}

app.filter('tea', function () {
  return function (tax) {
      if(tax.length > 0){
              for (var l = 0; l < tax.length; l++) {
                if (tax[l].indexOf('CFT_') !== -1){
                  var tax_split = tax[l].split('|');
                  var TEA = tax_split[1].replace('TEA_', '');
                 
                        return TEA;
                    
                }
              }
            }
  };
});

app.filter('cft', function () {
  return function (tax) {
      if(tax.length > 0){
              for (var l = 0; l < tax.length; l++) {
                if (tax[l].indexOf('CFT_') !== -1){
                  var tax_split = tax[l].split('|');
                  var CFT = tax_split[0].replace('CFT_', '');
                 
                        return CFT;
                }
              }
            }
  };
});
