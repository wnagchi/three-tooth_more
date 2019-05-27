var PatternClass = function () {//基类

    this.pattern = 1; //模式编号
    this.prompt = false; //提示开关
    this.part = 0; //正确操作步骤计数
    this.teaching_demo = [1]; //教学演示数组
    this.hide_panel = true; //面板显示隐藏
    this.examination_count = 0; //考试步骤计数
    this.examination_fraction = 0; //考试分数
    this.prompt_line = null; //提示线连线点编号
    this.prompt_line_pos = new Array(); //提示线连线点坐标
    this.m_line = null; //提示线
    this.arr_prompt_line = new Array();//提示线步骤数组
};

var PatternObj = function () {//派生类

    PatternClass.call(this);

};

PatternObj.prototype = Object.create(PatternClass.prototype);

PatternObj.prototype.Format = function () {//格式化数据
    this.prompt = false; //提示开关
    this.arr_prompt_line = new Array();//提示线步骤数组
    this.Remove_prompt_line(); //移除提示线
    document.getElementById("Prompt_line").style.display = ""; //显示提示线按钮
    document.getElementById("Prompt_line").src = "img/dengpao3.png"; //提示按钮图片还原
    this.part = 0; //操作步骤编号
    varToothClass.m_Record.num[0] = 0; //记录编号
    varToothClass.m_Record.standard_text = ""; //起始空文本
    document.getElementById("Table_Record").innerHTML = varToothClass.m_Record.standard_text; //清空记录文本

    varToothClass.m_beiYa.m_PartArr_Small = [];
    varToothClass.m_beiYa.m_PartArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    varToothClass.m_Tool.Lens_reset();//镜头复位
    
    if (varToothClass.m_Tool.changeimg == 1) {
        varToothClass.m_Tool.Choose_yazhen();//车针方向还原
    }
    if (varToothClass.m_Tool.faxian_show == 1) {
        varToothClass.m_Tool.Choose_fuck();//法线还原
    }
    if (varToothClass.m_Tool.kz != 2) {
        varToothClass.m_Tool.change_ya_other("code_0031", "code_0032", "code_0031", "code_0032", "code_0033");//材质还原
        varToothClass.m_Tool.kz = 2;
    }
    if (varToothClass.m_Tool.only_show == 1) {
        varToothClass.m_Tool.select_dangqianya();//当前牙还原
    }
    
    this.Tooth_resetting();//牙体重置
}

PatternObj.prototype.Pattern = function (value) {//模式切换
    this.Format();//格式化数据
    this.pattern = value; //模式编号
    if (this.pattern == 1) {
        this.Practice();
    } else if (this.pattern == 2) {
        this.Teaching();
    } else if (this.pattern == 3) {
        this.Examination();
    }
}

PatternObj.prototype.Practice = function () {//练习模式
    var rows = document.getElementById("Practice_table").rows.length;
    for (var i = 1; i <= rows; i++) {
        document.getElementById("Practice_part" + i).style.color = "white";
    }
    document.getElementById("Practice_a").style.backgroundColor = "#535353";
    document.getElementById("Teaching_a").style.backgroundColor = "#3a3a3a";
    document.getElementById("Examination_a").style.backgroundColor = "#3a3a3a";
    document.getElementById("Panel_Practice").style.display = "";
    document.getElementById("Panel_Teaching").style.display = "none";
    document.getElementById("Panel_Examination").style.display = "none";
}

PatternObj.prototype.Teaching = function () {//教学模式
    varToothClass.Selected = varToothClass["tooth_11"];//默认选择11号牙
    this.teaching_demo = [1]; //教学演示数组
    var rows = document.getElementById("Teaching_table").getElementsByTagName("a").length;
    for (var i = 1; i <= rows; i++) {
        document.getElementById("Teaching_demo_part" + i).style.color = "white";
    }
    document.getElementById("Practice_a").style.backgroundColor = "#3a3a3a";
    document.getElementById("Teaching_a").style.backgroundColor = "#535353";
    document.getElementById("Examination_a").style.backgroundColor = "#3a3a3a";
    document.getElementById("Panel_Practice").style.display = "none";
    document.getElementById("Panel_Teaching").style.display = "";
    document.getElementById("Panel_Examination").style.display = "none";
}

PatternObj.prototype.Examination = function () {//考试模式
    this.examination_count = 0; //考试步骤计数
    this.Examination_fraction();//计算考试得分
    document.getElementById("Practice_a").style.backgroundColor = "#3a3a3a";
    document.getElementById("Teaching_a").style.backgroundColor = "#3a3a3a";
    document.getElementById("Examination_a").style.backgroundColor = "#535353";
    document.getElementById("Panel_Practice").style.display = "none";
    document.getElementById("Panel_Teaching").style.display = "none";
    document.getElementById("Panel_Examination").style.display = "";
    document.getElementById("Prompt_line").style.display = "none";
}

PatternObj.prototype.Hide_Panel = function () {//隐藏模式面板
    if (this.hide_panel) {
        document.getElementById("Panel_Practice").style.display = "none";
        document.getElementById("Panel_Teaching").style.display = "none";
        document.getElementById("Panel_Examination").style.display = "none";
        document.getElementById("Hide_Panel_1").src = "img/shouqi_1.png"
        this.hide_panel = !this.hide_panel;
    }
    else {
        if (this.pattern == 1) {
            document.getElementById("Panel_Practice").style.display = "";
            document.getElementById("Panel_Teaching").style.display = "none";
            document.getElementById("Panel_Examination").style.display = "none";
        } else if (this.pattern == 2) {
            document.getElementById("Panel_Practice").style.display = "none";
            document.getElementById("Panel_Teaching").style.display = "";
            document.getElementById("Panel_Examination").style.display = "none";
        } else if (this.pattern == 3) {
            document.getElementById("Panel_Practice").style.display = "none";
            document.getElementById("Panel_Teaching").style.display = "none";
            document.getElementById("Panel_Examination").style.display = "";
        }
        document.getElementById("Hide_Panel_1").src = "img/shouqi.png"
        this.hide_panel = !this.hide_panel;
    }
}

PatternObj.prototype.Teaching_demo = function (value) {//教学演示
    if (this.teaching_demo[value] != 1 && this.teaching_demo[value - 1] == 1) {
        this.teaching_demo[value] = 1;
        document.getElementById("Teaching_demo_part" + value).style.color = "#00a3cd";
        varToothClass.m_beiYa.ForTooth_1(value - 1);
        //this.Practice_Part();
    }
}

PatternObj.prototype.Examination_fraction = function () {//考试分数
    var rows = document.getElementById("Teaching_table").getElementsByTagName("a").length;
    this.examination_fraction = Math.round(this.examination_count / rows * 100);
    document.getElementById("Fraction_div").innerHTML = this.examination_fraction + "分";
}

PatternObj.prototype.Practice_text_discoloration = function () {//练习文字变色
    //alert(this.part)
    if (this.part == 2) {
        document.getElementById("Practice_part1").style.color = "#00a3cd";
    } else if (this.part == 5) {
        document.getElementById("Practice_part2").style.color = "#00a3cd";
    } else if (this.part == 8) {
        document.getElementById("Practice_part3").style.color = "#00a3cd";
    } else if (this.part == 10) {
        document.getElementById("Practice_part4").style.color = "#00a3cd";
    } else if (this.part == 11) {
        document.getElementById("Practice_part5").style.color = "#00a3cd";
    } else if (this.part == 12) {
        document.getElementById("Practice_part6").style.color = "#00a3cd";
    } else if (this.part == 14) {
        document.getElementById("Practice_part7").style.color = "#00a3cd";
    } else if (this.part == 16) {
        document.getElementById("Practice_part8").style.color = "#00a3cd";
    } else if (this.part == 19) {
        document.getElementById("Practice_part9").style.color = "#00a3cd";
    } else if (this.part == 20) {
        document.getElementById("Practice_part10").style.color = "#00a3cd";
    } else if (this.part == 23) {
        document.getElementById("Practice_part11").style.color = "#00a3cd";
    } else if (this.part == 24) {
        document.getElementById("Practice_part12").style.color = "#00a3cd";
    } else if (this.part == 25) {
        document.getElementById("Practice_part13").style.color = "#00a3cd";
    } else if (this.part == 26) {
        document.getElementById("Practice_part14").style.color = "#00a3cd";
    } else if (this.part == 27) {
        document.getElementById("Practice_part15").style.color = "#00a3cd";
    }
}

PatternObj.prototype.Operation_prompt_line = function () {//操作提示线
    if (!this.prompt) {
        this.prompt = !this.prompt;
        this.Show_prompt_line();
        document.getElementById("Prompt_line").src = "img/dengpao1.png";
        //alert("开启提示")
    } else {
        this.Remove_prompt_line();
        this.prompt = !this.prompt;
        document.getElementById("Prompt_line").src = "img/dengpao3.png";
        //alert("关闭提示")
    }
}

PatternObj.prototype.Show_prompt_line = function () {//显示提示线
    if (this.prompt) {
        //this.Selected = varToothClass.tooth_11; //当前选中牙///////////////////////////
        this.Remove_prompt_line();
        for (var i = 0; i <= varToothClass.Selected.json.init.line.length; i++) {
            if (this.arr_prompt_line[i] != 1) {
                this.prompt_line = varToothClass.Selected.json.init.line[i]; //提示线连线点编号
                break;
            }
        }
        if (!this.prompt_line){
            this.Operation_prompt_line();
        }
        //this.prompt_line = varToothClass.Selected.json.init.line[this.part]; //提示线连线点编号
        this.prompt_line_pos = new Array(); //提示线连线点坐标
        for (var i = 0; i < this.prompt_line.length; i++) {
            var m_pos = new THREE.Vector3(0, 0, 0);
            m_pos.x = varToothClass.Selected.arr_geometry.vertices[this.prompt_line[i]].x;
            m_pos.y = varToothClass.Selected.arr_geometry.vertices[this.prompt_line[i]].y;
            m_pos.z = varToothClass.Selected.arr_geometry.vertices[this.prompt_line[i]].z;
            this.prompt_line_pos.push(m_pos);
        }
        var m_line = this.Create_prompt_line();
        m_line.name = "Prompt_line" + varToothClass.Selected.json.init.Tooth[9];
        m_line.position.x = varToothClass.Selected.m_Pos.x;
        m_line.position.y = varToothClass.Selected.m_Pos.y;
        m_line.position.z = varToothClass.Selected.m_Pos.z;
        m_line.rotateX(Num_Radian(varToothClass.Selected.m_Rotate.x));
        m_line.rotateY(Num_Radian(varToothClass.Selected.m_Rotate.y));
        m_line.rotateZ(Num_Radian(varToothClass.Selected.m_Rotate.z));
        m_line.scale.set(varToothClass.Selected.m_Sacle.x, varToothClass.Selected.m_Sacle.y, varToothClass.Selected.m_Sacle.z)
        this.m_line = m_line;
        m_VarGlobal.m_BaseSence.m_dis.add(m_line);
    }
}

PatternObj.prototype.Create_prompt_line = function () {//创建提示线
    var sampleClosedSpline = new THREE.CatmullRomCurve3([]);
    for (var i = 0; i < this.prompt_line_pos.length; i++) {
        sampleClosedSpline.points.push(this.prompt_line_pos[i]);
    }
    sampleClosedSpline.closed = true;
    var material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
    var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.3, wireframe: true, transparent: true });
    var tubeGeometry = new THREE.TubeBufferGeometry(sampleClosedSpline, 100, 0.5, 10, sampleClosedSpline.closed);
    var m_line = THREE.SceneUtils.createMultiMaterialObject(tubeGeometry, [material, wireframeMaterial]);
    m_VarGlobal.m_BaseSence.m_dis.add(m_line);
    return m_line;
}

PatternObj.prototype.Remove_prompt_line = function () {//移除提示线
    for (var i = 11; i < 48; i++){
        var m_line = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "Prompt_line"+i);
        if (m_line) {
            m_VarGlobal.m_BaseSence.m_dis.remove(m_line);
        }
    }
    
}

PatternObj.prototype.Practice_Part = function () {//练习(考试)模式正确操作步骤
    this.part++; //正确操作步骤计数
    this.examination_count++; //考试步骤计数
    this.Examination_fraction(); //考试分数
    this.Practice_text_discoloration(); //练习文字变色
    this.Show_prompt_line();//显示提示线
    ///////////////////////////////////////////////////////
    //varToothClass.m_Record.Generate_record_text(); //记录文本
}

PatternObj.prototype.Tooth_resetting = function () {//牙体重置
    for (var i = 11; i < 48; i++) {
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
        if (m_obj) {
            m_VarGlobal.m_BaseSence.m_dis.remove(m_obj);
        }
    }
    m_VarGlobal.GoodsList = [];
    for (var i = 1; i < 8; i++) {
        varToothClass["tooth_1" + i] = new EnamelObj();
        var m_load = new ObjectLoader();
        m_load.load("Tooth/m_Json_1" + i + ".json", function (text, url) {
            var obj = JSON.parse(text);
            var m_str = url;
            m_str = m_str.substring(13, 15);
            if (Number(m_str) < 14) {
                varToothClass["tooth_" + m_str].initTooth(obj);
            } else {
                varToothClass["tooth_" + m_str].initTooth(obj, 1);
            }
        });
    }
    for (var i = 1; i < 8; i++) {
        varToothClass["tooth_3" + i] = new EnamelObj();
        var m_load = new ObjectLoader();
        m_load.load("Tooth/m_Json_3" + i + ".json", function (text, url) {
            var obj = JSON.parse(text);
            var m_str = url;
            m_str = m_str.substring(13, 15);
            if (Number(m_str) < 34) {
                varToothClass["tooth_" + m_str].initTooth(obj);
            } else {
                varToothClass["tooth_" + m_str].initTooth(obj, 1);
            }
        });
    }
}