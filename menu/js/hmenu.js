/**
    * jQuery Multi-Level horizontal dropdown menu
    * Author: Michel Comeau
    * email: redacomm@gmail.com
    * URL: https:redacomm.com
    * Version: 1.0
 */
 
 
$(document).ready(function(){

    var dom;
    
    $('nav.hmenu ul').addClass('list-unstyled');     
        
    $("nav.hmenu li.dropdown").addClass("up");
//----------------------------------------------------------------
//  1st order (top-menu) nodes
    dom = $('nav.hmenu').find('ul:first').children('li.dropdown');
//
//  Add bottom arrow.
    $(dom).children('a').addClass('bottom_arrow_white_png');    
    
//----------------------------------------------------------------
//  2nd and higher order (sub top-menu) nodes
    dom = $('nav.hmenu').find('ul').find('ul').find('ul');

//  Add left or right arrows.    
    $(dom).each(function() {
        if ($(this).hasClass('left')) {
            $(this).parent('li').children('a').addClass('left_arrow_white_png');
        } else {
            $(this).parent('li').children('a').addClass('right_arrow_white_png');
        }
    });        

//=======================================================================      
    $('nav.hmenu ul li > a').mouseenter(function(){
        $(this).replaceArrowColor('white', 'green');
    });
    
    $('nav.hmenu ul li > a').mouseleave(function(){
        if (! $(this).hasClass('clicked_color') ) {         
            $(this).replaceArrowColor('green', 'white');
        }                
    });
    
//===========================================================================
//    Handle click inside the menu.
//===========================================================================
    $('nav.hmenu ul li > a').click(function(event) {
//---------------------------------------------------------------------------
//  A node has been clicked. 
//---------------------------------------------------------------------------
        if($(this).parent('li').hasClass("dropdown")){
//---------------------------------------------------------------------------
//  The target node is associated with currently deployed sub-menus. As a 
//  result the sub-menus associated with it will be retracted.
//---------------------------------------------------------------------------            
            if($(this).parent('li').hasClass("down")){ 
               $(this).parent('li').find(".sub-menu").slideUp("fast");
               $(this).parent('li').removeClass('down').addClass('up');
               $(this).removeClass("clicked_color"); 
//---------------------------------------------------------------------------
//  The target node is associated with currently retracted sub-menus. We'll need
//  to deploy those and retract all other currently deployed sub-menus.
//---------------------------------------------------------------------------                 
            } else { 
//  Get all parent nodes of the current one that was clicked.                
                var parent = $(this).parents("nav.hmenu ul li.dropdown");
//
//  Store the menu deployment sequence in array "dropdown"; in descending order
//  of the hierarchy: from top-most "li.dropdown" element to the descendant
//  "li.dropdown" element that was clicked.
                var dropdown = [];                  
                for (var i = parent.length-1; i >= 0; i--) {
                    dropdown.push(parent[i]);
                }
//--------------------------------------------------------------------------------                
//  Any nodes of the menu that have previously been tagged as down but do not
//  belong to the current deployed set of nodes will be tagged as up and will be
//  retracted.
                $("nav.hmenu").find('li.dropdown').each(function() {
                    if($(this).hasClass("down")){
                        var gotit = 0;
                        for (var i = 0; i < dropdown.length; i++) {
                            if (this == dropdown[i]) {
                                gotit = 1;
                                break;
                            }
                        }
                        if (! gotit) {
                            $(this).removeClass("down").addClass("up");
                            $(this).children(".sub-menu").slideUp("fast");
                            $(this).children('a').first().removeClass("clicked_color");
                            $(this).children('a').first().replaceArrowColor('green', 'white');
                        }
                    }
                });            
//--------------------------------------------------------------------------------                                    
//  Deploy sub-menus of the target's parent nodes and associate corresponding nodes to class "down"                   
                for (var i = 0; i < dropdown.length; i++) { 
                    $(dropdown[i]).removeClass("up").addClass("down");
                    $(dropdown[i]).children('a').first().addClass("clicked_color");
                    $(dropdown[i]).children('a').first().replaceArrowColor('white', 'green');
                    $(dropdown[i]).children(".sub-menu").stop(true,  false, true).slideDown(300);                                            
                }    
            }
            return;
        }
//---------------------------------------------------------------------------
//  A leaf has been clicked. Retract the deployed sequence of nodes.
//---------------------------------------------------------------------------          
        $(this).removeClass("clicked_color");  
        $(this).parents('li.dropdown').each(function() {
            $(this).children('a').removeClass("clicked_color");
            $(this).children('a').replaceArrowColor('green', 'white');
            $(this).removeClass("down").addClass("up");
            $(this).children(".sub-menu").slideUp("fast");
        })                                              
//===========================================================================   
    });   
//===========================================================================
//    Handle click outside the menu.
//===========================================================================    
    $(document).click(function(event){
        var dom = $("nav.hmenu li.dropdown");   
        var len1 = dom.length;
        var len = $(dom).has(event.target).length;
            
        if($(dom) !== event.target && !$(dom).has(event.target).length)
        {  
            $(dom).find(".sub-menu").slideUp("fast");                       
            $(dom).removeClass("down").addClass("up");
            $('nav.hmenu li.dropdown > a').removeClass("clicked_color");           
            $('nav.hmenu li.dropdown > a').replaceArrowColor('green', 'white');
        }
    });
});