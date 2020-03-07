//=============================================================================
/*
    Plugin to perform the following class replacement on the entire
    set of selected DOM elements:
    
    oldClass -> newClass
    
    insertClass:
        1) false: If 'oldClass' does not exist, 'newClass' is not added.
        2) true:  If 'oldClass' does not exist, 'newClass' is added. 
*/
(function ($) {
    $.fn.replaceClass = function (oldClass, newClass, insertClass) 
    {
        if (typeof insertClass === 'undefined') {
            insertClass = false;
        }
//  Loop through the entire set of selected DOM elements   
        return $(this).each(function() {
                
// If 'oldClass' does not exist, 'newClass' is added only if insertClass=true. 
            if (   (typeof $(this).attr('class') === 'undefined') 
               || (! $(this).hasClass(oldClass)) ){ 
                if (insertClass) {
                    $(this).addClass(newClass);
                }
                return;
            }
//  'oldClass' exists and is replaced by 'newClass'            
            var classList = $(this).attr('class').split(/\s+/);
            var gotit = 0;
            var dom = this;
            $.each(classList, function(index, item) {
                if( (item == oldClass) || (item == newClass) ) {
                    $(dom).removeClass(item);
                }    
            });
            $(this).addClass(newClass);
        });       
    };
}(jQuery));
//=============================================================================

//=============================================================================
/*
    Plugin to perform the following class replacement on the entire
    set of selected DOM elements:
    
    prefix_arrow_oldColor[suffix] -> prefix_arrow_newColor[suffix]
    
    In practice, the function is used to change the color of an arrow by
    replacing its associated "oldColor" image by its "newColor" image,
    that differs from the former only in color. By convention, 'prefix' 
    describes the directionality of the arrow (e.g. prefix='left'). 'suffix'
    is optional; it can be included in the classname for description purposes.
    
    Example:    The input DOM element has class 'left_arrow_white_png' that
                renders a white left arrow. We wish to replace that with
                a green left arrow, encapsulated in class 'left_arrow_green_png'.
                The JQuery method:
                
                $(dom).replaceArrowColor('white', 'green')
                
                will perform the following class replacement on the selected
                $(dom) elements:
                
                left_arrow_white_png -> left_arrow_green_png                                 
*/
(function ($) {
    $.fn.replaceArrowColor = function (oldColor, newColor) 
    {

//  Loop through the entire set of selected DOM elements     
        return $(this).each(function() {                  
            var regex_class = "^[^_]+_arrow_" + oldColor;
            if (typeof $(this).attr('class') === 'undefined') {   
                return;
            }        
            var classList = $(this).attr('class').split(/\s+/);
            var oldColorClass;
            var newColorClass;
            var gotit = 0;
            var dom = this;
            $.each(classList, function(index, item) {
                if (item.match(regex_class)) {
                    gotit = 1;
                    var regex = new RegExp("(.+_arrow_)" + oldColor + "(.*)");
                    oldColorClass = item.replace(regex, "$1" + oldColor + "$2");
                    newColorClass = item.replace(regex, "$1" + newColor + "$2");
                    if( (item == oldColorClass) || (item == newColorClass) ) {
                        $(dom).removeClass(item);
                        $(dom).addClass(newColorClass);
                    }
                }    
            });
        });       
    };
}(jQuery));
//=============================================================================
