// JavaScript Document
;(function(){
	window.calendar={}
	var target="body";
var data=[];
function clickFn(data){
	console.log(data)
	}
function init(){
	$(target).empty();
	$(target).html('<div class="cl_head_top">'+
    '<div class="cl_head_left">&lt;</div>'+
            '<div class="cl_head_frame">'+
                '<div class="cl_head_frameR">'+
                
                '</div>'+
                
            '</div>'+
          '<div class="cl_head_Right">&gt;</div>'+
          '<div class="clear"></div>'+
'</div>'+
'<table id="calendar" width="678" border="0px" cellpadding="0" cellspacing="0">'+
	'<thead>'+
    '<tr>'+
      '<th scope="col" width="14.2%" style="color:#ff6d00">日</th>'+
      '<th scope="col" width="14.2%">一</th>'+
      '<th scope="col" width="14.2%">二</th>'+
      '<th width="14.2%" scope="col">三</th>'+
      '<th scope="col" width="14.2%">四</th>'+
      '<th scope="col" width="14.2%">五</th>'+
      '<th scope="col" width="14.2%" style="color:#ff6d00">六</th>'+
    '</tr>'+
    '</thead>'+
  '<tbody valign="top">'+

  '</tbody>'+
'</table>');
	var dataObj={};
	$.each(data,function(i,n){
		var dateArry=n.goDate.split("-");
		if(!dataObj[dateArry[0]]){
			dataObj[dateArry[0]]={};
			};
		if(!dataObj[dateArry[0]][dateArry[1]]){
			dataObj[dateArry[0]][dateArry[1]]=[];
			};
			dataObj[dateArry[0]][dateArry[1]].push(n);
		});

	var MArry=["十二","一","二","三","四","五","六","七","八","九","十","十一"]
	var toYea=new Date().getFullYear();
	var toMon=new Date().getMonth()+1;
	for (var i=toMon;i<=toMon+5;i++){
		var showY=toYea;
		if(i>12){showY++};
		var showM=MArry[i%12];
		var countM=i%12||12;
		if(countM<10){
			countM="0"+countM;
			}else{
				countM+="";
				};
		var showP="无报价";
		if(dataObj&&dataObj[showY+""]&&dataObj[showY+""][countM]){
			$.each(dataObj[showY+""][countM],function(j,k){
				if(j==0||showP>Number(k.adultPrice)){showP=Number(k.adultPrice)};
				});
			};
		if(typeof(showP)=="number"){
			showP="$"+showP+"/人"
			}
		$(target).find(".cl_head_frameR").append($('<div class="cl_head_Point" year="'+showY+'" month="'+countM+'">'+
            	'<div class="cl_head_Point_inside">'+
            		'<div class="cl_head_Mname">'+showM+'月</div>'+
					'<div class="cl_head_Mprice">'+showP+'</div>'+
            	'</div>'+
            '</div>'));
		};
		$(target).find(".cl_head_frameR").append($('<div class="clear"></div'));
		$(target).find(".cl_head_Point").unbind("click").bind("click",function(){
			$(target).find(".cl_head_Point").removeClass("hl");
			$(this).addClass("hl");
			$(target).find("tbody").empty();
		for (var i=0;i<6;i++){
			$(target).find("tbody").append($('<tr>'+
			  '<td num="'+(i*7+0)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+1)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+2)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+3)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+4)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+5)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+6)+'" style="border-right:1px solid #e5e5e5">&nbsp;</td>'+
			'</tr>'));
			};
			var totalDay=[0,31,28,31,30,31,30,31,31,30,31,30,31]
			if((Number($(this).attr("year"))%4==0 && Number($(this).attr("year"))%100!=0)||(Number($(this).attr("year"))%100==0 && Number($(this).attr("year"))%400==0)){
				totalDay[2]=29;
				}
			var firstDay=new Date(Number($(this).attr("year")),Number($(this).attr("month"))-1,1).getDay()-1;
			
			for(var i=1;i<=totalDay[Number($(this).attr("month"))];i++){
				var showDay=i;
				if(i<10){
					showDay="0"+i;
					}
				$(target).find("tbody [num='"+(i+firstDay)+"']").empty();
				$(target).find("tbody [num='"+(i+firstDay)+"']").append($('<div class="dayNum">'+i+'</div>'));
				$(target).find("tbody [num='"+(i+firstDay)+"']").attr("date",$(this).attr("year")+"-"+$(this).attr("month")+"-"+showDay);
				}

			if(dataObj&&dataObj[$(this).attr("year")]&&dataObj[$(this).attr("year")][$(this).attr("month")]){
				
				$.each(dataObj[$(this).attr("year")][$(this).attr("month")],function(i,n){
					$(target).find("tbody [date='"+n.goDate+"']").addClass("enable");
					$(target).find("tbody [date='"+n.goDate+"']").append('<div class="adultPrice">￥'+n.adultPrice+'起</div><div class="leaveCt">余位'+n.leaveCt+'</div>');
					$(target).find("tbody [date='"+n.goDate+"']").data("result",n);
					})
				$(target).find("tbody .enable").unbind("click").bind("click",function(){
					$(target).find("tbody .enable").removeClass("hl");
					$(this).addClass("hl");
					clickFn($(this).data("result"));
					})
				$(target).find("tbody .enable").first().click();
				}
			})
		$(target).find(".cl_head_Point").first().click();
		};
		calendar.setTarget=function(t){
			target=t;
			}
		calendar.setData=function(dataA){
			data=dataA;
			}
		calendar.callBack=function(fn){
			clickFn=fn;
			}
		calendar.run=function(){
			init();
			}
	})();