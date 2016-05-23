// JavaScript Document
var calendar=function(){};
calendar.prototype.target = "body";
calendar.prototype.MArry=["十二","一","二","三","四","五","六","七","八","九","十","十一"];
calendar.prototype.toYea=new Date().getFullYear();
calendar.prototype.toMon=new Date().getMonth()+1;
calendar.prototype.totalDay=[0,31,28,31,30,31,30,31,31,30,31,30,31];
calendar.prototype.offset=0;
calendar.prototype.callback=function(data){
	console.log(data);
};
calendar.prototype.init=function(){
	var that=this;
	$(this.target).empty();
	$(this.target).html('<div class="cl_head_top">'+
    	  '<div class="yearChange">2016年</div>'+
    	  '<div class="monthChange">5月</div>'+
    	  '<div class="up">&and;</div>'+
    	  '<div class="down">&or;</div>'+
          '<div class="clear"></div>'+
'</div>'+
'<table id="calendar" width="750" border="0px" cellpadding="0" cellspacing="0">'+
	'<thead>'+
    '<tr>'+
      '<th scope="col" width="14.2%" style="color:#ff6d00">日</th>'+
      '<th scope="col" width="14.2%">一</th>'+
      '<th scope="col" width="14.2%">二</th>'+
      '<th width="14.2%" scope="col">三</th>'+
      '<th scope="col" width="14.2%">四</th>'+
      '<th scope="col" width="14.2%">五</th>'+
      '<th scope="col" width="14.2%" style="color:#ff6d00; border-right:1px solid #e4f5ff">六</th>'+
    '</tr>'+
    '</thead>'+
  '<tbody valign="top">'+

  '</tbody>'+
'</table>');
	for (var i=0;i<6;i++){
			$(this.target).find("tbody").append($('<tr>'+
			  '<td num="'+(i*7+0)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+1)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+2)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+3)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+4)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+5)+'">&nbsp;</td>'+
			  '<td num="'+(i*7+6)+'" style="border-right:1px solid #e5e5e5">&nbsp;</td>'+
			'</tr>'));
			};
	$(this.target).find(".yearChange").unbind("click").bind("click",function(){
		that.drawYear();
	});
	$(this.target).find(".monthChange").unbind("click").bind("click",function(){
		that.drawMonth();
	});
	this.drawDay();
}
calendar.prototype.drawDay = function(){
	$(this.target).find(".up").show();
	$(this.target).find(".down").show();
	var that=this;
	$(this.target).find(".up").unbind("click").bind("click",function(){
		if(that.toMon>1){
			that.toMon--;
			that.drawDay();
		}else{
			that.toYea--;
			that.toMon=12;
			that.drawDay();
		}
	});
	$(this.target).find(".down").unbind("click").bind("click",function(){
		if(that.toMon<12){
			that.toMon++;
			that.drawDay();
		}else{
			that.toYea++;
			that.toMon=1;
			that.drawDay();
		}
	});
	$(this.target).find(".yearChange").html(this.toYea+"年");
	$(this.target).find(".monthChange").html(this.toMon+"月");
	$(this.target).find("tbody td").empty();
	if((this.toYea%4==0 && this.toYea%100!=0)||(this.toYea%100==0 && this.toYea%400==0)){
				this.totalDay[2]=29;
				}
	var firstDay=new Date(this.toYea,this.toMon-1,1).getDay()-1;
	for(var i=1;i<=this.totalDay[this.toMon];i++){
				var showDay=i;
				if(i<10){
					showDay="0"+i;
					}
				$(this.target).find("tbody [num='"+(i+firstDay)+"']").empty();
				$(this.target).find("tbody [num='"+(i+firstDay)+"']").append($('<div class="dayNum">'+i+'</div>'));
				$(this.target).find("tbody [num='"+(i+firstDay)+"']").attr("date",showDay);
				}
	$(this.target).find("td").unbind("click").bind("click",function(){
		if(that.callback){
			that.callback([that.toYea,that.toMon,Number($(this).attr("date"))]);
		}
	});
}
calendar.prototype.drawYear=function(){
	$(this.target).find(".up").show();
	$(this.target).find(".down").show();
	var that=this;
	$(this.target).find(".up").unbind("click").bind("click",function(){
			that.offset--;
			that.drawYear();
	});
	$(this.target).find(".down").unbind("click").bind("click",function(){	
			that.offset++;
			that.drawYear();
	});
	$(this.target).find("tbody td").empty();
	for(var i=0;i<42;i++){
		$(this.target).find("tbody [num='"+i+"']").append($('<div class="dayNum">'+(that.offset*42+i+that.toYea)+'</div>'));
		$(this.target).find("tbody [num='"+i+"']").attr("date",that.offset*42+i+that.toYea);
	}
	$(this.target).find("td").unbind("click").bind("click",function(){
		that.toYea = Number($(this).attr("date"));
		that.drawDay();
	});
}
calendar.prototype.drawMonth=function(){
	var that=this;
	$(this.target).find(".up").hide();
	$(this.target).find(".down").hide();
	$(this.target).find("tbody td").empty();
	for(var i=1;i<=12;i++){
		$(this.target).find("tbody [num='"+(i-1)+"']").append($('<div class="dayNum">'+i+'</div>'));
		$(this.target).find("tbody [num='"+(i-1)+"']").attr("date",i);
	}
	$(this.target).find("td").unbind("click").bind("click",function(){
		that.toMon = Number($(this).attr("date"));
		that.drawDay();
	});
}