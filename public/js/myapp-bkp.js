var myApp = angular.module('myApp',[]);

myApp.controller('SignCtrl', ['$scope', function($scope) {

}]);

myApp.directive('singIn', function(){
    return {
        restrict: 'A',
        scope:{'onChange':'=' },
        link: function(scope, element, attrs) {
            var hello = element($('.already'));
            console.log(hello)
            $(hello).on("click", function() {
                alert('auoifhduiosh')
            });
        },
    }
});