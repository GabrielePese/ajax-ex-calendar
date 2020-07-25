// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all'api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista
var mese = 1
function tastoAvanti (currentMonth){
    var btnTarget = $("#btnAvanti");
    btnTarget.click(function (){
      var meseClick = mese += 1
      var currentMonth = moment("2018-"+(meseClick)+"-01");
      var daysInMonth = currentMonth.daysInMonth()
      printMonth (currentMonth)
      printHoliday(currentMonth)

      var tgtMese = $("h1.active")
      tgtMese.removeClass("active")
      tgtMese.next().addClass("active")


      if (tgtMese.hasClass("last")){
        alert("Puoi guardare solo il 2018")

      }

    })
    }



    function tastoIndietro (currentMonth){
      var btnIndietroTarget = $('#btnIndietro')
      btnIndietroTarget.click(function () {
        var meseClick = mese -= 1
        var currentMonth = moment("2018-"+(meseClick)+"-01");
        var daysInMonth = currentMonth.daysInMonth()
        printMonth (currentMonth)
        printHoliday(currentMonth)

        var tgtMese = $("h1.active")
        tgtMese.removeClass("active")
        tgtMese.prev().addClass("active")

        if (tgtMese.hasClass("first")){
          alert("Puoi guardare solo il 2018")

        }
      })
    }





function printMonth (currentMonth){
   var daysInMonth = currentMonth.daysInMonth()
   console.log(daysInMonth);
   var template = $("#template").html();
   var compiled = Handlebars.compile(template);
   var target = $(".giorni-mese");
   target.html("")
   for (var i = 1; i <= daysInMonth; i++) {
     var datecomplete = moment({year: currentMonth.year(), month: currentMonth.month(), day:i});
     var daysHTML = compiled({
       "value": i,
       "datecomplete": datecomplete.format("YYYY-MM-DD")
   });
   target.append(daysHTML);
}
}

function printHoliday(currentMonth){
  var year = currentMonth.year();
  var month = currentMonth.month();
  $.ajax({
    url:"https://flynn.boolean.careers/exercises/api/holidays",
    method:"GET",
    data: {
      "year" : year,
      "month": month
    },

    success: function (data){
      var holidays = data["response"]
      for (var i = 0; i < holidays.length; i++) {
        var element = $(".giorni-mese li[data-datecomplete='"+ holidays[i]["date"]+"']")
        element.addClass("holidays");
        element.append(" " +holidays[i]["name"])
      }
    },
    error: function (){
      console.log("erorre!!");
    }
  })
}





 function init(){

   var currentMonth = moment("2018-01-01");
   console.log(currentMonth.year());
   printMonth(currentMonth)
   printHoliday(currentMonth)
   tastoAvanti()
   tastoIndietro()
   cambiaMeseScritta()
 }



$(document).ready(init)
