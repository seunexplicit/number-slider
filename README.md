# number-slider
Angular js dynamic number slider API for both mobile and desktop web page; 

#Usage
import the following script into your project which are available in the repositories

<html>
  
  <head>
  
    <script type="text/javascript" src="**containing folder**/hammer.min.js"></script>
  
    <script type="text/javascript" src="**containing folder**/angular.min.js"></script>

    <script type="text/javascript" src="**containing folder**/angular.hammer.js"></script>

    <script type="text/javascript" src="slider.js"></script>

  </head>
  
</html>
  
then create an html element using this 

<body>
  
    <number-slider></number-slider>
  
</body

the following attribute are available on the element;

1 slider-upper-limit (optional):- it sets the slider upper value, say the slider range is to be 100-600; the slider-upper-limit is set to 600. it receives number type value and the default value = 100;

2 slider-lower-limit (optional):- it sets the slider lower value, say the slider range is to be 100-600; the slider-lower-limit is set to 100. it receives number type value and the default value = 0;

3. range = it holds the current value of the slider & retrieves the user's input, a default range value can be set, if not set it is set to the slider-lower-limit value before action on the slide; it also pass the current slide value into your body of code. Accepts variable or number value

4. slider-max-range (optional):- it sets the maximum range of the slider; the slider max range <= the slider upper limit and > the slider lower limit and slider minimum range; this is used in case where you have two alternating slider, e.g.to sorting a goods using price range: one slider set the maximum price of the goods  and the other slide set the minimum price of the goods; if the user already set maximum price of the goods to $60 the alternating slider miximum range could now be 59$ for the minimum price of the goods;

5. slider-min-range (optional):- it sets the minimum range of the slider; the slider min range < the slider upper limit and slider max range  and >= the slider lower limit; this is used in case where you have two alternating slider, e.g.sorting a goods using price range: one slider set the minimum price of goods and the other slider set the maximum price of the goods; if the user already set minimum price of the goods to $10 the alternating slider minimum range could now be set to $11 for the maximum price of the goods;

6.decimal (optional): if not set, the slider returns integer(whole number) value, it accepts number to determine the decimal place of the return value; when set to 2, it return value equivalent to 10.00 (2 decimal place), when set to 3 return value equivalent to 10.000(3 decimal places) etc.

7. width (optional): set the width of the slider, receives either plain number or number with px suffix; (100/100px);

8. height (optional): set the height of the slider, receives either plain number or number with px suffix; (10/10px);

9. color (optional): set the color of the slider, default is blue;


****complete code*****************
  

<html>
  
  <body>
    
    <script type="text/javascript" src="**containing folder**/hammer.min.js">
    
    <script type="text/javascript" src="**containing folder**/angular.min.js"></script>
    
    <script type="text/javascript" src="**containing folder**/angular.hammer.js"></script>
    
    <script type="text/javascript" src="slider.js"></script>
     
     <script type="text/javascript">
        
        angular.module("sliderApp", ['slider'])
        
        .controller("sliderCtrl", ["$scope", function($scope){
          
          $scope.userValue = 180;
        
        }]);
      
      </script>
  
      
      <div ng-app="sliderApp" ng-controller="sliderCtrl">
       
       <number-slider slider-upper-limit="300" slider-lower-limit="100" slider-max-range="280" slider-min-range="120" range="userValue" width="200" height="7px" color="#f3e4d5"></number-slider>
      
      </div>
  
  </body

</html>
