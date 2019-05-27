var ToolPanelClass = function () {
    this.hide_panel = true; //面板显示隐藏

    this.m_InfoArray = [];
    this.m_InfoArray_change = [];

};
var ToothPanel_Top = function () { //派生类
    ToolPanelClass.call(this);
    this.m_Material_front = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0031");
    this.m_Material_back = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0055");
    //alert(this.InitInfoArray);
    this.InitInfoArray();
   

};
ToothPanel_Top.prototype = Object.create(ToolPanelClass.prototype);
ToothPanel_Top.prototype.OnSelObj = function (obj, point, num) {

    point = obj.worldToLocal(point);
    //alert("ToothPanel_Top:" + obj.name + "|" + point.x + "|" + point.y + "|" + point.z);
    //坐标系图 
    var m_str = obj.name;


    m_str = m_str.substring(6);




  

    for (var i = 0; i < m_VarGlobal.m_ToothPanel_Top.m_InfoArray.length; i++) {

        //alert(m_str);
        if (obj.name == m_VarGlobal.m_ToothPanel_Top.m_InfoArray[i][0]) {
          

            var m_arr = m_VarGlobal.m_ToothPanel_Top.m_InfoArray[i];
           
            if (m_str < 18) {


                document.getElementById("toothnum").innerHTML = "#" + m_str;
                // alert(document.getElementById("tu_1").src);
                document.getElementById("tu_1").innerHTML = "<img src=" + m_arr[2] + "/>";

                document.getElementById("tu_11").innerHTML = m_arr[1];
                document.getElementById("tu_2").innerHTML = "";
                document.getElementById("tu_3").innerHTML = "";
                document.getElementById("tu_4").innerHTML = "";


            }
            else if (m_str < 28 && m_str > 17) {
                document.getElementById("toothnum").innerHTML = "#" + m_str;
                document.getElementById("tu_2").innerHTML = "<img src=" + m_arr[2] + "/>";
                document.getElementById("tu_11").innerHTML = m_arr[1];
                document.getElementById("tu_1").innerHTML = "";
                document.getElementById("tu_3").innerHTML = "";
                document.getElementById("tu_4").innerHTML = "";


            }
            else if (m_str < 40 && m_str > 30) {
                
                document.getElementById("toothnum").innerHTML = "#" + m_str;
                document.getElementById("tu_3").innerHTML = "<img src=" + m_arr[2] + "/>";
                document.getElementById("tu_11").innerHTML = m_arr[1];
                document.getElementById("tu_1").innerHTML = "";
                document.getElementById("tu_2").innerHTML = "";
                document.getElementById("tu_4").innerHTML = "";

            }else if (m_str > 40) {
                //alert(m_str);
                document.getElementById("toothnum").innerHTML = "#" + m_str;
                document.getElementById("tu_4").innerHTML = "<img src=" + m_arr[2] + "/>";
                document.getElementById("tu_11").innerHTML = m_arr[1];
                document.getElementById("tu_1").innerHTML = " ";
                document.getElementById("tu_2").innerHTML = " ";
                document.getElementById("tu_3").innerHTML = " ";
            }
        }
    }


    //alert(m_VarGlobal.m_ToothPanel_Top.setCube)

}
ToothPanel_Top.prototype.OnMoveSelObj = function (obj, point, num) {
   
    var m_cube = m_VarGlobal.m_ToothPanel_Top.setCube(obj);
    m_cube.geometry.computeBoundingBox();
    var m_Min = m_cube.geometry.boundingBox.min;
    var m_Max = m_cube.geometry.boundingBox.max;
    //   alert("ToothPanel_Top:" + obj.name + "|" + point.x + "|" + point.y + "|" + point.z);
  
    m_VarGlobal.m_ToothPanel_Top.setImg(point, m_Max, m_Min, m_cube.position, obj.name)
}
ToothPanel_Top.prototype.setCube = function (obj) {
    var m_Min = new THREE.Vector3(0, 0, 0);
    var m_Max = new THREE.Vector3(0, 0, 0);
    m_Max.copy(obj.geometry.vertices[0]);
    m_Min.copy(obj.geometry.vertices[0]);

    for (var i = 0; i < obj.geometry.vertices.length; i++) {
        if (m_Max.x < obj.geometry.vertices[i].x) {
            m_Max.x = obj.geometry.vertices[i].x;
        }
        if (m_Max.y < obj.geometry.vertices[i].y) {
            m_Max.y = obj.geometry.vertices[i].y;
        }
        if (m_Max.z < obj.geometry.vertices[i].z) {
            m_Max.z = obj.geometry.vertices[i].z;
        }

        if (m_Min.x > obj.geometry.vertices[i].x) {
            m_Min.x = obj.geometry.vertices[i].x;
        }
        if (m_Min.y > obj.geometry.vertices[i].y) {
            m_Min.y = obj.geometry.vertices[i].y;
        }
        if (m_Min.z > obj.geometry.vertices[i].z) {
            m_Min.z = obj.geometry.vertices[i].z;
        }

    }
    //alert(m_Max.y + "|" + m_Min.y);
    var material = new THREE.MeshBasicMaterial({ color: 0x0ff000, side: THREE.DoubleSide });
    material.transparent = true;
    material.opacity = 0.5;
    //变换坐标系
    var m_cube = new THREE.Mesh(new THREE.BoxGeometry(m_Max.x - m_Min.x, m_Max.y - m_Min.y, m_Max.z - m_Min.z), material);
    m_cube.position.x = (m_Max.x + m_Min.x) / 2;
    m_cube.position.y = (m_Max.y + m_Min.y) / 2;
    m_cube.position.z = (m_Max.z + m_Min.z) / 2;


  //  obj.add(m_cube);
    return m_cube;

}
ToothPanel_Top.prototype.setImg = function (point, m_Max, m_Min, position, name) {
    //  alert(cpos.y)
    var m_imgpath = "";
    // alert(point.z + "|" + m_Max.z + "|" + m_Min.z);
    m_Max.x += position.x;
    m_Max.y += position.y;
    m_Max.z += position.z;

    m_Min.x += position.x;
    m_Min.y += position.y;
    m_Min.z += position.z;
    //正面
    if (point.z > 10 && point.x < m_Max.x - 3 && point.x > m_Min.x + 3) {
        m_imgpath += "0";
        var m_xrow = (m_Max.x - m_Min.x) / 3;
        var m_yrow = (m_Max.y - m_Min.y) / 3;
        //alert(m_xrow)
        if (point.x < m_Max.x && point.x > m_Max.x - m_xrow) {
            m_imgpath += "1";
        } else if (point.x < m_Max.x - m_xrow && point.x > m_Max.x - m_xrow * 2) {
            m_imgpath += "2";
        } else if (point.x < m_Max.x - m_xrow * 2 && point.x > m_Min.x) {
            m_imgpath += "3";
        }
        if (point.y < m_Max.y && point.y > m_Max.y - m_yrow) {
            m_imgpath += "1";
        } else if (point.y < m_Max.y - m_yrow && point.y > m_Max.y - m_yrow * 2) {
            m_imgpath += "2";
        } else if (point.y < m_Max.y - m_yrow * 2 && point.y > m_Min.y) {
            m_imgpath += "3";
        }
        // alert(m_imgpath);


    }
    //背面
    if (point.z < -10 && point.x < m_Max.x - 3 && point.x > m_Min.x + 3) {
        m_imgpath += "1";
        var m_xrow = (m_Max.x - m_Min.x) / 3;
        var m_yrow = (m_Max.y - m_Min.y) / 3;
        //alert(m_xrow)
        if (point.x < m_Max.x && point.x > m_Max.x - m_xrow) {
            m_imgpath += "1";
        } else if (point.x < m_Max.x - m_xrow && point.x > m_Max.x - m_xrow * 2) {
            m_imgpath += "2";
        } else if (point.x < m_Max.x - m_xrow * 2 && point.x > m_Min.x) {
            m_imgpath += "3";
        }
        if (point.y < m_Max.y && point.y > m_Max.y - m_yrow) {
            m_imgpath += "1";
        } else if (point.y < m_Max.y - m_yrow && point.y > m_Max.y - m_yrow * 2) {
            m_imgpath += "2";
        } else if (point.y < m_Max.y - m_yrow * 2 && point.y > m_Min.y) {
            m_imgpath += "3";
        }
       // alert(m_imgpath);

    }
    //左侧面
    //  alert(point.x+"|"+ (m_Max.x - 3))
    if (point.x > m_Max.x - 3) {
        //alert(1234);
        m_imgpath += "2";

        var m_zrow = (m_Max.z - m_Min.z) / 3;

        if (point.z < m_Max.z && point.z > m_Max.z - m_zrow) {
            m_imgpath += "1";
        } else if (point.z < m_Max.z - m_zrow && point.z > m_Max.z - m_zrow * 2) {
            m_imgpath += "2";
        } else if (point.y < m_Max.z - m_zrow * 2 && point.z > m_Min.z) {
            m_imgpath += "3";
        }
        //  alert(m_imgpath);

    }
    //右侧面
    if (point.x < m_Min.x + 3) {
        m_imgpath += "3";
        var m_yrow = (m_Max.y - m_Min.y) / 3;
        if (point.y < m_Max.y && point.y > m_Max.y - m_yrow) {
            m_imgpath += "1";
        } else if (point.y < m_Max.y - m_yrow && point.y > m_Max.y - m_yrow * 2) {
            m_imgpath += "2";
        } else if (point.y < m_Max.y - m_yrow * 2 && point.y > m_Min.y) {
            m_imgpath += "3";
        }

    }
    //底面
    //alert(point.x + "|" + (m_Max.y - 2))
    if (point.y > m_Max.y - 6) {

        var m_xrow = (m_Max.x - m_Min.x) / 3;
        if (point.x < m_Max.x && point.x > m_Max.x - m_xrow) {
            m_imgpath += "1";
        } else if (point.x < m_Max.x - m_xrow && point.x > m_Max.x - m_xrow * 2) {
            m_imgpath += "2";
        } else if (point.x < m_Max.x - m_xrow * 2 && point.x > m_Min.x) {
            m_imgpath += "3";
        }

    }

    document.getElementById("tu_0").innerHTML = "<img src=img/nineimge/" + m_imgpath + ".png />"
    for (var i = 0; i < m_VarGlobal.m_ToothPanel_Top.m_InfoArray_change.length; i++) {
        var m_arr = m_VarGlobal.m_ToothPanel_Top.m_InfoArray_change[i];
        if (m_imgpath == m_arr[0]) {
            document.getElementById("tu_12").innerHTML = m_arr[1];
            document.getElementById("tu_13").innerHTML = m_arr[2];
            document.getElementById("tu_14").innerHTML = m_arr[3];
        }
    }
}



ToolPanelClass.prototype.InitInfoArray = function () {
    var m_arr = new Array();
    m_arr[0] = "tooth_11";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth1/11切牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_12";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth1/12侧切牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_13";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth1/13尖牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_14";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth1/14前磨牙01.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_15";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth1/15前磨牙02.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_16";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth1/16磨牙01.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_17";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth1/17磨牙02.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_21";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth2/21切牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_22";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth2/22侧切牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_23";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth2/23尖牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_24";
    m_arr[1] = "上颚";
    m_arr[2] = "img/tooth2/24前磨牙01.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_25";
    m_arr[1] = "上颚";
    m_arr[2] = "img/Tooth2/25前磨牙02.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_26";
    m_arr[1] = "上颚";
    m_arr[2] = "img/Tooth2/26磨牙01.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_27";
    m_arr[1] = "上颚";
    m_arr[2] = "img/Tooth2/27磨牙02.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_31";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth3/31切牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_32";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth3/32侧切牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_33";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth3/33尖牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_34";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth3/34前磨牙01.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_35";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth3/35前磨牙02.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth36";
    m_arr[1] = "下颚";
    m_arr[2] = "imgTooth3/36磨牙01.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth37";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth3/37磨牙02.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_41";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth4/41切牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_42";
    m_arr[1] = "下颚"
    m_arr[2] = "img/Tooth4/42侧切牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_43";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth4/43尖牙.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_44";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth4/44前磨牙01.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_45";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth4/45前磨牙02.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_46";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth4/46磨牙01.png";
    this.m_InfoArray.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "tooth_47";
    m_arr[1] = "下颚";
    m_arr[2] = "img/Tooth4/47磨牙02.png";
    this.m_InfoArray.push(m_arr);
    

    var m_arr = new Array();
    m_arr[0] = "011";
    m_arr[1] = "唇侧";
    m_arr[2] = "切1-3";
    m_arr[3] = "远中";
    m_arr[4] = "011.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "012";
    m_arr[1] = "唇侧";
    m_arr[2] = "中1-3";
    m_arr[3] = "远中1-3";
    m_arr[4] = "012.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "013";
    m_arr[1] = "唇侧";
    m_arr[2] = "颈1-3";
    m_arr[3] = "远中1-3";
    m_arr[4] = "013.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "021";
    m_arr[1] = "唇侧";
    m_arr[2] = "切1-3";
    m_arr[3] = "中1-3";
    m_arr[4] = "021.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "022";
    m_arr[1] = "唇侧";
    m_arr[2] = "中1-3";
    m_arr[3] = "中1-3";
    m_arr[4] = "022.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "023";
    m_arr[1] = "唇侧";
    m_arr[2] = "颈1-3";
    m_arr[3] = "中1-3";
    m_arr[4] = "023.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "023";
    m_arr[1] = "唇侧";
    m_arr[2] = "颈1-3";
    m_arr[3] = "中1-3";
    m_arr[4] = "023.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "031";
    m_arr[1] = "唇侧";
    m_arr[2] = "切1-3";
    m_arr[3] = "近中1-3";
    m_arr[4] = "031.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "031";
    m_arr[1] = "唇侧";
    m_arr[2] = "切1-3";
    m_arr[3] = "近中1-3";
    m_arr[4] = "031.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "032";
    m_arr[1] = "唇侧";
    m_arr[2] = "中1-3";
    m_arr[3] = "近中1-3";
    m_arr[4] = "032.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "033";
    m_arr[1] = "唇侧";
    m_arr[2] = "颈1-3";
    m_arr[3] = "近中1-3";
    m_arr[4] = "033.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "111";
    m_arr[1] = "舌侧";
    m_arr[2] = "切1-3";
    m_arr[3] = "远中1-3";
    m_arr[4] = "111.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "112";
    m_arr[1] = "舌侧";
    m_arr[2] = "中1-3";
    m_arr[3] = "远中1-3";
    m_arr[4] = "112.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "113";
    m_arr[1] = "舌侧";
    m_arr[2] = "颈1-3";
    m_arr[3] = "远中1-3";
    m_arr[4] = "113.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "121";
    m_arr[1] = "舌侧";
    m_arr[2] = "切1-3";
    m_arr[3] = "中1-3";
    m_arr[4] = "121.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "122";
    m_arr[1] = "舌侧";
    m_arr[2] = "中1-3";
    m_arr[3] = "中1-3";
    m_arr[4] = "122.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "123";
    m_arr[1] = "舌侧";
    m_arr[2] = "颈1-3";
    m_arr[3] = "中1-3";
    m_arr[4] = "123.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "131";
    m_arr[1] = "舌侧";
    m_arr[2] = "切1-3";
    m_arr[3] = "近中1-3";
    m_arr[4] = "131.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "132";
    m_arr[1] = "舌侧";
    m_arr[2] = "中1-3";
    m_arr[3] = "近1-3";
    m_arr[4] = "132.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "133";
    m_arr[1] = "舌侧";
    m_arr[2] = "颈1-3";
    m_arr[3] = "近中1-3";
    m_arr[4] = "133.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "0111";
    m_arr[1] = "切面";
    m_arr[2] = " ";
    m_arr[3] = "近中";
    m_arr[4] = "0111.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "0212";
    m_arr[1] = "切面";
    m_arr[2] = " ";
    m_arr[3] = "远中1-3";
    m_arr[4] = "0212.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "0313";
    m_arr[1] = "切面";
    m_arr[2] = " ";
    m_arr[3] = "中-3";
    m_arr[4] = "0313.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "1111";
    m_arr[1] = "切面";
    m_arr[2] = " ";
    m_arr[3] = "近中";
    m_arr[4] = "1111.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "1212";
    m_arr[1] = "切面";
    m_arr[2] = " ";
    m_arr[3] = "远中1-3";
    m_arr[4] = "1212.png";
    this.m_InfoArray_change.push(m_arr);

    var m_arr = new Array();
    m_arr[0] = "1313";
    m_arr[1] = "切面";
    m_arr[2] = " ";
    m_arr[3] = "中-3";
    m_arr[4] = "1313.png";
    this.m_InfoArray_change.push(m_arr);



//    for (var i = 0; i < this.m_InfoArray_change.length; i++) {

//        if (this.m_InfoArray[i][0] == m_imgpath) {
//           // alert(this.m_InfoArray[i][2])
//            document.getElementById("sel_panel").src = "img/'" + m_arr[3] + "' "
//            
//        }
//    }

    //alert(m_str);
}
//变换颜色

ToothPanel_Top.prototype.ToothColor = function (na) {



    // var m_Material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0001")
    for (j = 1; j <= 4; j++) {
        for (var i = 1; i <= 7; i++) {
            var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + j + i);
            //alert(m_obj.name);
            if (m_obj) {

                m_obj.traverse(function (child) {

                    if (child instanceof THREE.Mesh) {

                        child.material = m_VarGlobal.m_ToothPanel_Top.m_Material_front;
                    }

                })

            }
        }
    }

    //var m_Material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0010")

    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + na);

    if (m_obj) {
        //  alert(this.m_Material_back);
        m_obj.traverse(function (child) {

            if (child instanceof THREE.Mesh) {

                child.material = m_VarGlobal.m_ToothPanel_Top.m_Material_back;


            }
        })
    }
}

//导向 择齿  微观 隐藏
ToothPanel_Top.prototype.ToolSelect = function (num) {
  
    if (num == 0) {
        document.getElementById("guide").style.display = "";
        document.getElementById("selec").style.display = "none";
        document.getElementById("webPanel").style.display = "none";
       
    }
    else if (num == 1) {
        document.getElementById("guide").style.display = "none";
        document.getElementById("selec").style.display = "";
        document.getElementById("webPanel").style.display = "none";
       
    }
    else if (num == 2) {
        document.getElementById("guide").style.display = "none";
        document.getElementById("selec").style.display = "none";
        document.getElementById("webPanel").style.display = "";
    }

}

// 择齿 隐藏
ToothPanel_Top.prototype.imgSelectup = function () {
    
    var m_str = document.getElementById("sel_panel").src;
    //alert(m_str.indexOf("img/chaoshang.png"))
    if (m_str.indexOf("img/chaoshang.png") != -1) {
        document.getElementById("sel_panel").src = "img/chaoxia.png"
        document.getElementById("up").style.display = "none";
        document.getElementById("down").style.display = "";
    }

    else if (m_str.indexOf("img/chaoxia.png")!=-1) {

        document.getElementById("sel_panel").src = "img/chaoshang.png"
        document.getElementById("down").style.display = "none";
        document.getElementById("up").style.display = "";
    }

}


ToothPanel_Top.prototype.Hide_Panel = function () {//隐藏顶部面板
    if (this.hide_panel) {
        document.getElementById("Panel_Top").style.display = "none";
        document.getElementById("Hide_Panel_0").src = "img/shouqi_1.png"
        this.hide_panel = !this.hide_panel;
    }
    else {
        document.getElementById("Hide_Panel_0").src = "img/shouqi.png"
        document.getElementById("Panel_Top").style.display = "";
        this.hide_panel = !this.hide_panel;
    }
}


//滑动条

function Setzoom(value) {
    //alert(m_VarGlobal.m_Controls);\
    //  alert(m_VarGlobal.m_Controls.getZoomScale())
  //  alert(value);
   
        m_VarGlobal.m_Controls.SetWheel(-value);
   
}


 


