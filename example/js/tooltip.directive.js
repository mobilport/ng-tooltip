angular.module('myApp')
    .directive('ngTooltip', function () {
        return {
            link: function (scope, element, attribute) {
                //Our tooltip element
                var $target = angular.element('#tooltipcontent');
                var innerHtml = '';

                //Here you can customize what attributes you accept and how you show them on tooltip
                if (attribute.tooltipTitle) {
                    innerHtml += '<h2>' + attribute.tooltipTitle + '</h2>';
                }

                if (attribute.tooltipBody) {
                    innerHtml += '<p>' + attribute.tooltipBody + '</p>';
                }

                if (attribute.tooltipFooter) {
                    innerHtml += '<p class="info">' + attribute.tooltipFooter + '</p>';
                }

                element.hover(function (e) {

                    //Set inner content
                    angular.element($target).html(innerHtml);

                    //Show tooltip
                    angular.element($target).show();
                    
                    //Distance X from the cursor
                    moveLeft = 10;
                    
                    //Distance Y from the cursor
                    moveDown = -10;
                }, function () {

                    //Hide tooltip upon element mouseleaving
                    angular.element($target).hide();
                });

                element.mousemove(function (e) {

                    //Calculating positions
                    leftD = e.pageX + parseInt(moveLeft);
                    maxRight = leftD + angular.element($target).outerWidth();
                    windowLeft = angular.element(window).width() - 40;
                    windowRight = 0;
                    maxLeft = e.pageX - (parseInt(moveLeft) + angular.element($target).outerWidth() + 20);

                    if (maxRight > windowLeft && maxLeft > windowRight) {
                        leftD = maxLeft;
                    }

                    topD = e.pageY - parseInt(moveDown);
                    maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
                    windowBottom = parseInt(parseInt(angular.element(document).scrollTop()) + parseInt(angular.element(window).height()));
                    maxTop = topD;
                    windowTop = parseInt(angular.element(document).scrollTop());
                    if (maxBottom > windowBottom) {
                        topD = windowBottom - angular.element($target).outerHeight() - 20;
                    } else if (maxTop < windowTop) {
                        topD = windowTop + 20;
                    }

                    angular.element($target).css('top', topD).css('left', leftD);
                });
            }
        }
    });