var datapcl = can.Model({
    findAll: 'GET http://drupal:81/api/pcl.json',
}, {});

datapcl.findAll({},
function(data){
var listQ = new can.List([]);
 new can.Map(data[0]).each(function(element, index) {
   listQ.push(index); 
});
 var report = can.view('templates/reportlist.mustache',listQ);
 document.getElementById('drop-down').appendChild(report);

 var frag = can.view('templates/pclTable.mustache',{data:data});
 $('#pcl').find('tbody').append(frag);
 $('#pcl').DataTable({
    "info" : false,
    "lengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]]
  });
});


var menudata = can.Model({
    findAll: 'GET data/menu.json',
}, {});

menudata.findAll({},
function(menuitem){
 var frag = can.view('templates/menu.mustache',{menuitem:menuitem});
 document.getElementById('main-menu').appendChild(frag);
});

menudata.findAll({},
function(menuitem){
 var frag = can.view('templates/menu.mustache',{menuitem:menuitem});
 document.getElementById('sidebar-menu').appendChild(frag);
});

var sitedata = can.Model({
    findAll: 'GET data/web.json',
}, {});

sitedata.findAll({},
function(sitedata){
 var frag = can.view('templates/siteinfo.mustache',{sitedata:sitedata});
 document.getElementById('site-head').appendChild(frag);
});
