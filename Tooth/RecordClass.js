var RecordClass = function () {//基类

    this.standard_text = "";//起始空文本

    this.hide_panel = true; //面板显示隐藏

    this.tooth_tool = new Array(); //工具
    this.tooth_tool[0] = 0;//工具编号
    this.tooth_tool[1] = "TNC_01";//工具名称
    this.tooth_tool[2] = "TNC_02";
    this.tooth_tool[3] = "TNC_03";
    this.tooth_tool[4] = "TNC_04";
    this.tooth_tool[5] = "TNC_05";
    this.tooth_tool[6] = "TNC_06";
    this.tooth_tool[7] = "TNC_07";
    this.tooth_tool[8] = "釉质凿";
    this.tooth_tool[9] = "排龈线";

    this.num = new Array();//记录编号
    this.num[0] = 0; 
    this.num[1] = "01";
    this.num[2] = "02";
    this.num[3] = "03";
    this.num[4] = "04";
    this.num[5] = "05";
    this.num[6] = "06";
    this.num[7] = "07";
    this.num[8] = "08";
    this.num[9] = "09";
};

var RecordObj = function () {//派生类

    RecordClass.call(this);

};

RecordObj.prototype = Object.create(RecordClass.prototype);

RecordObj.prototype.Hide_Panel = function () {//隐藏记录面板
    if (this.hide_panel) {
        document.getElementById("Panel_Record").style.display = "none";
        document.getElementById("Hide_Panel_2").src = "img/shouqi_1.png"
        this.hide_panel = !this.hide_panel;
    }
    else {
        document.getElementById("Hide_Panel_2").src = "img/shouqi.png"
        document.getElementById("Panel_Record").style.display = "";
        this.hide_panel = !this.hide_panel;
    }
}

RecordObj.prototype.Teaching_demo_text = function (value) {//教学演示文本
    this.standard_text[0] += "<tr><td class='td'>" + this.standard_text[value] + "</td></tr>";
    document.getElementById("Table_Record").innerHTML = this.standard_text[0];
}

RecordObj.prototype.Generate_record_text = function (value) {//生成记录文本
    this.num[0]++;
    this.tooth_tool[0] = varToothClass.m_Tool.tool_num;
    var tooth_num = document.getElementById("toothnum").innerHTML;
    var pos_1 = document.getElementById("tu_12").innerHTML;
    var pos_2 = document.getElementById("tu_13").innerHTML;
    var pos_3 = document.getElementById("tu_14").innerHTML;
    if (this.num[0] <= 9) {
        this.standard_text += "<tr><td class='td'>" + this.num[this.num[0]] + "." + this.tooth_tool[this.tooth_tool[0]] + " " + tooth_num + "." + pos_1 + "." + pos_2 + "." + pos_3 + "</td></tr>";
    } else {
        this.standard_text += "<tr><td class='td'>" + this.num[0] + "." + this.tooth_tool[this.tooth_tool[0]] + " " + tooth_num + "." + pos_1 + "." + pos_2 + "." + pos_3 + "</td></tr>";
    }
    document.getElementById("Table_Record").innerHTML = this.standard_text;
}