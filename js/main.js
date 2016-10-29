$(function(){

  $(".container").ready(function(){
    var margin_t = Math.round(($(window).width()-$(".container").width()-14) / 2);
    $(".control-panel").css("marginBottom", margin_t+"px");
    $(".container").css("marginTop", margin_t+"px");
    addProd("Помідори"); addProd("Печиво"); addProd("Сир");
  });

  var id = 0;

  $("form input[type=submit]").click(
    function(){
      var prodName = $(".prod-name").val();
      if(prodName) {
        $(".prod-name").val("").focus();
        addProd(prodName);
      }
      return false;
    }
  );

  function addProd(prodName){
    var names = $("input[placeholder='Нова назва']").toArray();
    var labels = $(".count-label").toArray();
    var nameId = -1;
    for (var i = 0; i < names.length; i++) {
      if ($(names[i]).val().toLowerCase() === prodName.toLowerCase()) {
        nameId = i;
        break;
      }
    }
    if (nameId > -1) {
      var quantity = parseInt($(labels[nameId]).text());
      $(labels[nameId]).text(++quantity);
      var ind = parseInt($(labels[nameId]).attr("id").charAt(5));
      changeLabel(ind);
    } else {
      $(wrapProduct(prodName)).appendTo($(".control-panel")).stop().hide().slideDown();
      addKeyUp($(".product input[value="+prodName+"]"));
      btnIncEvent($("#label"+(id-1)).parent().find(".btn-increment"));
      btnDecEvent($("#label"+(id-1)).parent().find(".btn-decrement"));
      btnBoughtedEvent($("#label"+(id-1)).parent().find(".boughted"));
      deleteEvent($("#label"+(id-1)).parent().find(".delete"));
      pickLabel(prodName, (id-1));
    }
  }


  function wrapProduct(prodName){
    var product = "<div class='product top-line'>"+
          "<input type='text' placeholder='Нова назва'' value="+prodName+">"+
          "<div class='controller'>"+
            "<button class='circle-btn btn-decrement btn-sign' id='bi"+id+"' disabled>-</button>"+
            "<span class='count-label' id='label"+(id++)+"'>1</span>"+
            "<button class='circle-btn btn-increment btn-sign'>+</button>"+
            "<button type='button' class='delete btn-sign'>x</button>"+
            "<button type='button' class='boughted btn-sign'>Куплено</button>"+
          "</div>"+
        "</div>"
    return product;
  }

  function pickLabel(prodName, id){
    var label = "<div class=\"label\">"+"<span>"+prodName+"</span>"
    +"<div class=\"quantity\" id=\"tag"+id+"\">1</div></div>"
    $(".left-res").append(label);
  }

  function changeLabel(idl){
    var quantity = parseInt($("#tag"+idl).text());
    $("#tag"+idl).text(++quantity);
  }

  function addKeyUp(obj) {
    $(obj).keyup(function(){
      var index = parseInt(($(this).parent().find(".count-label").attr("id")).charAt(5));
      $("#tag"+index).parent().find("span").text($(this).val());
    });
  }

  function btnIncEvent(btn) {
    $(btn).click(function(){
      var n = parseInt($(this).parent().find(".count-label").text());
      $(this).parent().find(".count-label").text(++n);
      if(n > 1){
        $(this).parent().find(".btn-decrement").attr("disabled", false);
      }
      var label_id = "#tag"+$(this).parent().find(".count-label").attr("id").charAt(5);
      $(label_id).text(n);
    });
  }

  function btnDecEvent(btn){
    $(btn).click(function(){
      var n = parseInt($(this).parent().find(".count-label").text());
      $(this).parent().find(".count-label").text(--n);
      if (n<=1) {
        $(this).attr("disabled", true);
      }
      var label_id = "#tag"+$(this).parent().find(".count-label").attr("id").charAt(5);
      $(label_id).text(n);
    });
  }

  function btnBoughtedEvent(btn){
    $(btn).click(function(){
      var div = $(btn).parent();
      if($(this).text()==="Куплено") {
        //properties for boughted product in control-panel
        $(div).find(".btn-decrement").addClass("display-none");
        $(div).find(".btn-increment").addClass("display-none");
        $(div).find(".delete").addClass("display-none");
        $(div).find(".count-label").addClass("centered");
        $(div).parent().find("input").addClass("boughted-text-style");
        $(this).text("Не куплено");
        //make tag boughted
        var label_id = "#tag"+$(div).find(".count-label").attr("id").charAt(5);
        var label = $(".banner").find(".left-res").find(label_id).parent().remove();
        $(label).find(".quantity").addClass("boughted-text-style");
        $(label).find("span").addClass("boughted-text-style");
        //console.log(label);
        $(".banner").find(".bought-res").append(label);
      } else {
        //make product unboughted)
        $(div).find(".btn-decrement").removeClass("display-none");
        $(div).find(".btn-increment").removeClass("display-none");
        $(div).find(".delete").removeClass("display-none");
        $(div).find(".count-label").removeClass("centered");
        $(div).parent().find("input").removeClass("boughted-text-style");
        $(this).text("Куплено");
        //make tag unboughted
        var label_id = "#tag"+$(div).find(".count-label").attr("id").charAt(5);
        var label = $(".banner").find(".bought-res").find(label_id).parent().remove();
        $(label).find(".quantity").removeClass("boughted-text-style");
        $(label).find("span").removeClass("boughted-text-style");
        //console.log(label);
        $(".banner").find(".left-res").append(label);
      }
    });
  }

  function deleteEvent(btn){
    $(btn).click(function(){
      var label_id = "#tag"+$(this).parent().find(".count-label").attr("id").charAt(5);
      $(this).parent().parent().stop().slideUp("normal", function(){$(this).remove();});
      $(label_id).parent().fadeOut("normal", function(){$(this).remove()});
    });
  }

});