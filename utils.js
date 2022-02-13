function getDate(days){
    var today = new Date();
    today.setDate(today.getDate() + days);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var hh=String(today.getHours()).padStart(2,'0');
    var MM=String(today.getMinutes()).padStart(2,'0');
    var ss=String(today.getSeconds()).padStart(2,'0')
    var yyyy = today.getFullYear();

   let date1=  yyyy+'-'+mm+'-'+dd+" "+hh+':'+MM+':'+ss;
    return date1;
//2021-12-27 12:23:48
}
module.exports={getDate};