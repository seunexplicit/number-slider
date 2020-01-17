sliderApp = angular.module('slider', ['hmTouchEvents']);

sliderApp.directive('numberSlider', function(){

	return {
		restrict: 'E',
		scope:{
			width:'@?sliderWidth',
			height:'@?sliderHeight',
			color:'@?sliderColor',
			maxRange:'=?sliderMaxRange',
			minRange:'=?sliderMinRange',
			upperLimit:'@?sliderUpperLimit',
			lowerLimit:'@?sliderLowerLimit',
			decimal:'@?',
			range:'=?sliderRange',
			detectaction:'&'
		},
		template:
			'<div>'+
				'<div class="slider" hm-panleft="detectaction(event)" hm-panright="detectaction(event)" hm-tap="detectaction(event)">'+
					'<div id="ridge">'+
						'<div id="knob" hm-press="detectaction(event)" hm-pressup="detectaction(event)">'+
						'</div>'+
					'</div>'+
					'<div id="ridge2"></div>'+
				'</div>'+
			'</div>',
		link: function(scope, element, attri, transclude){

			var numRegex = /^([0-9]*\.)?[0-9]+$/;
			element.css({
				float:'left',
				clear:'right',
			});
			var sliderElement = angular.element(angular.element(element.children()[0]).children()[0]);
			var ridgeElement = angular.element(sliderElement.children()[0]);
			var ridgeElement2 = angular.element(sliderElement.children()[1]);
			var knobElement = angular.element(ridgeElement.children()[0]);
			var sliderWidth = 200; var decimal  = 0; 
			var rW1 = 0, rW2 = sliderWidth;
			var rh = 10;
			var kwh = rh*2;
			var uL = 100, lL = 0, mnR = 0, mxR = 100, r = 0; var kP, kU, sP;

			var color = "rgb(40%, 40%, 80%)";

			var testScope = {};
			testScope.width = function(){
				var len = scope.width.length;
				var pxString = ((scope.width)+'').substring(len-3, len);
				if(pxString =='px'){
					scope.width = scope.width.substring(0, len-2);
				}
				if(numRegex.test(scope.width)){
					if(Number(scope.width)>0){
						sliderWidth = Number(scope.width);
						rW1 = ((r-lL)/(uL-lL))*sliderWidth;
						rW2 = sliderWidth - rW1;
						updateDOM();
					}
				}
			}
			testScope.range = function(){
				if(numRegex.test(scope.range)){
					if(scope.range<=mxR&&scope.range>=mnR){
						r = Number(scope.range);
						rW1 = ((r-lL)/(uL-lL))*sliderWidth;
					}
					else if(Number(scope.range)>mxR){
						scope.range = mxR + '';
						r = mxR;
						rW1 = ((mxR-lL)/(uL-lL))*sliderWidth;
					}
					else{
						scope.range = mnR + '';
						r = mnR;
						rW1 = ((mxR-lL)/(uL-lL))*sliderWidth;
						
					}
					rW2 = sliderWidth - rW1;
					updateDOM();
				}
				else{
					scope.range = r;
				}
			}
			testScope.height = function(){
				var len = scope.height.length;
				var pxString = ((scope.height)+'').substring(len-3, len);
				if(pxString =='px'){
					scope.width = scope.width.substring(0, len-2);
				}
				if(numRegex.test(scope.height)){
					if(Number(scope.height)>0){
						rh = Number(scope.height);
						kwh = rh * 2;
						updateDOM();

					}
				}
			}
			testScope.upperLimit = function(){
				if(!numRegex.test(scope.upperLimit)){
						console.error('RangeSlider: upper-limit and lower-limit must be number \n', 'lower-limit = '+lL 
							+'\n upper-limit = '+ scope.upperLimit);
						scope.upperLimit = uL;
					}
				else if(scope.lowerLimit<lL){
					console.error('RangeSlider: upper-limit can not be less than or equal to lower-limit \n', 'lower-limit = '+lL 
						+'\n upper-limit = '+ scope.upperLimit);
						scope.upperLimit = uL;	
				}
				else{
					uL = Number(scope.upperLimit);
					if(!scope.maxRange||uL<scope.maxRange){mxR = uL; scope.maxRange = uL};
					//testScope.range();
				}
			}
			testScope.lowerLimit = function(){
				if(!numRegex.test(scope.lowerLimit)){
						console.error('RangeSlider: upper-limit and lower-limit must be number \n', 'lower-limit = '+scope.lowerLimit 
							+'\n upper-limit = '+ uL);
						scope.lowerLimit = lL;
					}
				else if(scope.lowerLimit>uL){
					console.error('RangeSlider: upper-limit can not be less than or equal to lower-limit \n', 'lower-limit = '+scope.lowerLimit 
						+'\n upper-limit = '+ uL);
						scope.lowerLimit = lL;	
				}
				else{
					lL = Number(scope.lowerLimit);
					if(!scope.minRange||lL>scope.minRange){mnR = lL; scope.minRange = lL}; 
					if(!scope.range){scope.range = mnR; r = mnR};
				}
			}
			testScope.minRange = function(){
				if(scope.minRange){
					if(!numRegex.test(scope.minRange)){
						console.error('RangeSlider: min-range must be number \n', 'min-range = '+scope.minRange);
					}
					else if(scope.minRange>mxR){
						console.error('RangeSlider: max-range can not be less than min-range \n', 'min-range = '+scope.minRange 
							+'\n max-range = '+ mxR);	
					}
					else if(scope.minRange>uL||scope.minRange<lL){
						console.error('RangeSlider: upper-limit can not be less than min-range and lower-limit can not be greater than min-range \n', 'min-range = '+scope.minRange 
							+'\n upper-limit = '+ uL+'\n lower-limit = '+ lL);	
					}
					else{
						mnR = Number(scope.minRange);
						if(mnR>scope.range){
							scope.range = mnR;  testScope.range();
						};
					}
				}
			}
			testScope.maxRange = function(){
				if(scope.maxRange){
					if(!numRegex.test(scope.maxRange)){
						console.error('RangeSlider: max-range must be number \n', 'max-range = '+scope.maxRange);
					}
					else if(scope.maxRange<mnR){
						console.error('RangeSlider: max-range can not be less than min-range \n', 'max-range = '+scope.maxRange 
							+'\n min-range = '+ mnR);	
					}
					else if(scope.maxRange>uL||scope.maxRange<lL){
						console.error('RangeSlider: upper-limit can not be less than max-range and lower-limit can not be greater than max-range \n', 'min-range = '+scope.maxRange 
							+'\n upper-limit = '+ uL+'\n lower-limit = '+ lL);	
					}
					else{
						mxR = Number(scope.maxRange);
						if(scope.maxRange > mxR){
							scope.maxRange = mxR; testScope.range();
						};
					}
				}	
			}

			testScope.upperLimit();
			testScope.lowerLimit();
			testScope.maxRange();
			testScope.minRange();



			attri.$observe('decimal', function(value){
				if(value) decimal = value;
			});

			attri.$observe('sliderWidth', function(){testScope.width()});
			attri.$observe('sliderHeight',function(){testScope.height()});
			attri.$observe('sliderUpperLimit', function(){testScope.upperLimit()});
			attri.$observe('sliderLowerLimit',function(){testScope.lowerLimit()});
			attri.$observe('color', function(value){
				ridgeElement.css('background-color', value+'');
				knobElement.css('background-color', value+'');
			});
			scope.$watch('minRange', testScope.minRange());
			scope.$watch('range', function(){
				testScope.range();
			});
			scope.$watch('maxRange', testScope.maxRange());



			
			sliderElement.css({
				float: 'left',
				clear:'right',
			});
			sliderElement.children().css({
				display: 'inline-block',
				float: 'left',
				clear:'right',
				height: rh+'px',
			});
			ridgeElement.css({
				'background-color':'#6666cc',
				 width:rW1+'px',
				'border-radius':'25px 0px 0px 25px',
			});
			ridgeElement2.css({
				width:rW2+'px',
				'border-radius':'0px 25px 25px 0px',
				'background-color':'rgb(70%, 70%, 70%)',
			});

			knobElement.css({
				'background-color':'#6666cc',
				width:kwh+'px',
				height:kwh+'px',
				borderRadius:'50%',
				boxShadow:'inset 0px 0px 15px rgb(30%, 30%, 30%)',
				top:(0-(rh/2))+'px',
				left:(rW1-(kwh/2))+'px',
				position:'relative',
			});


			var cX, sBR, mnKL, mxKL;
			

			scope.detectaction = function(event){
				
				if(event.type=='press'||(!kP&&event.type=='tap')){
					kP = true; kU = false;
					sBR = sliderElement[0].getBoundingClientRect();
					mnKL = sBR.left - (kwh/2);
					mxKL = sBR.left + sBR.width + (kwh/2);
				}
				else if(event.type=='pressup'){
					kP = false; kU = true;
				}

				else if(((event.type='panleft'||event.type=='panright')&&kP)||event.type=='tap'){

					if(event.center.x<=mnKL){
					}
					else if(event.center.x>=mxKL){
					}
					else {
						var diff = event.center.x - sBR.left;
						var ratio = diff/sBR.width;
						var diffLimit = uL - lL;
						r = (diffLimit * ratio)+lL;
						
						
						rW1 = ((r-lL)/(uL-lL))*sliderWidth;

						//console.log(scope.range, '--', uL, '--', r, '--mxR', mxR);

						if(r>=mxR){
							rW1 = ((mxR - lL)/(uL-lL))*sliderWidth;
							r = mxR;
						}
						else if(r<=mnR){
							rW1 = ((mnR-lL)/(uL-lL))*sliderWidth;
							r = mnR;
						}

						if(decimal&&Number(decimal)){
							r = r.toFixed(decimal);
						}
						else{
							r = Math.round(r);
						}
						rW2 = sliderWidth - rW1;
						scope.range=r;
						updateDOM();
					}
				}
			}

			function updateDOM(){
				ridgeElement.css('width', rW1+'px');
				ridgeElement2.css('width', rW2 + 'px');
				sliderElement.children().css('height', rh+'px');
				knobElement.css({
					left:(rW1 - (kwh/2))+'px',
					top:(0-(rh/2))+'px',
					height:kwh+'px',
					width:kwh+'px',
				});
			}

			
		}
	}

});

