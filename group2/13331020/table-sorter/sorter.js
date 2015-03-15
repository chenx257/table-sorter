window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	//一次性获取所有的表格
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var index = 0; index < tables.length; index++) {
		//分别对每一个表格进行处理
		makeEachTableSortable(tables[index]);
	}
}

function makeEachTableSortable(table) {
	//count:记录点击次数
	var count = 0;
	var ths = table.getElementsByTagName("th");

	//点击表格时，触发操作
	table.onclick = function() {
		var events = window.event.target;
		//row:记录所被点击的列的下标
		var row;

		//如果点击的是表格中的th标签元素，则执行操作
		if (events.tagName == "TH") {
			for (var i = 0; i < ths.length; i++) {
				//更改被点击的th标签元素的背景颜色并还原没被点击的标签的默认背景色
				if (ths[i] == events) {
					ths[i].style.backgroundColor = "rgb(164, 176, 252)";
					//获取row
					row = i;
				} else {
					ths[i].style.backgroundColor = "rgb(3, 27, 125)";
				}
			}

			//tds:二维数组，存储的是每一行的td标签的内容
			var tds = [];
			for (var i = 1; i < table.rows.length; i ++) {
				var TD = table.rows[i].getElementsByTagName("td");
				var td = [];
				for (var j = 0; j < TD.length; j++) {
					td.push(TD[j].innerHTML);
				}
				tds.push(td);
			}

			//若为奇数次点击则为降序，偶数次点击则为升序
			if (count%2 == 0) {
				tds.sort(function(x, y) {return x[row].localeCompare(y[row]);});
				//设置icon
				ths[row].style.backgroundImage = "url('ascend.png')";
			} else {
				tds.sort(function(x, y) {return y[row].localeCompare(x[row]);});
				ths[row].style.backgroundImage = "url('descend.png')";
			}
			count++;

			//将排序后的结果放到原table中
			var new_tds = table.getElementsByTagName("td");
			var k = 0;
			for (var i = 0; i < tds.length; i ++) {
				for (var j = 0; j < tds[i].length; j++) {
					new_tds[k].innerHTML = tds[i][j];
					k++;
				}
			}
		}		
	}
}
