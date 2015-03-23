$(document).ready(function () {

    $("#list").hide();
  $(window).on('load','#sidebar-menu',function() {
  alert("Sds");
  $('#sidebar-menu > li:first-child > ul').show();
  });
  $(document).on('click','#sidebar-menu > li > a',function(){
    if ($(this).attr('class') != 'active'){
      $('#sidebar-menu li ul').slideUp();
	  $('#sidebar-menu li a').removeClass('active');
	  $(this).addClass('active');
      $(this).next().slideDown();
    }
	else{
	  $(this).removeClass('active');
      $(this).next().slideUp(); 
	}
	
  });
  
  $(document).on('click','#main-menu li:nth-child(3) a',function(){
	  $("#pcl_wrapper").css("display","none");
	  $("#pcl").css("display","none");
	  //by default displaying first column pie chart
	  drawchart($("#drop-down").children(":selected").attr("id"));
	  $("#list").css("display","block");
	});  
  
  
   $(document).on('click','#main-menu li:nth-child(1) a',function(){
	 $("#list").css("display","none");
	 $("#pcl").css("display","block");
	 $("#pcl_wrapper").css("display","block");
	}); 
	//drawing pie chart on drop down change
   $("#drop-down").change(function(){
    var id = $("#drop-down").children(":selected").attr("id");
	 drawchart(id);
  });
  function drawchart(id) {
   var param_x=[],sample = new Array();
/*Fetching data from a json file and preprocessing it*/
   $.getJSON('data/content.json', function(data) {
		for(var i=0;i<data.length;i++){  
				 if(!finder(param_x,data[i][id])){ 
						param_x.push(data[i][id]);
						param_x[data[i][id]]=1;
					}else
						param_x[data[i][id]]++;
			}
		/*Constructing the data array*/
		for(var j=0;j<param_x.length;j++){  
	       var myObject = new Object();
    	   myObject.name=param_x[j];
		   myObject.y=param_x[param_x[j]]*1;
		   sample.push(myObject);
		}
	
	    /*Drawing pie chart using data array*/	
		  $('#container').highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: id+' details for PCL'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: id + ' Details',
				data:sample
			}]
		   });	
	});
  }
  function finder(arr,key){
			 for(var i=0;i<arr.length;i++){
				  if(arr[i]==key)
					 return true;
				}
	return false;				
	}	
});
