var BeiYa = function () {//基类


};
var DiYiBu = function () {//派生类
    BeiYa.call(this);

    this.m_ToothPosArr = [];
    this.m_PartArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    this.m_PartArr_Small = [];
    this.InitPartCube();


};

DiYiBu.prototype.zuoBiao = function (obj_2, m_Max_x, m_Min_x, m_Max_y, m_Min_y, m_Max_z, m_Min_z) {///////根据 点最大值 最小值形成立方体
    var material = new THREE.MeshBasicMaterial({ color: 0x0ff000, side: THREE.DoubleSide });
    material.transparent = true;
    material.opacity = 0.5;

    var m_cube = new THREE.Mesh(new THREE.BoxGeometry(m_Max_x - m_Min_x, m_Max_y - m_Min_y, m_Max_z - m_Min_z), material);


    m_cube.position.x = (m_Max_x + m_Min_x) / 2;
    m_cube.position.y = (m_Max_y + m_Min_y) / 2;
    m_cube.position.z = (m_Max_z + m_Min_z) / 2;


    obj_2.add(m_cube);

    return m_cube;

}
DiYiBu.prototype.judge_OnSelObj_copy = function () {
    var obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_11");

    //    if (m_obj) {
    //   
    //      
    //    }
    //var obj = m_VarGlobal.m_BaseSence.m_dis;

    for (var i = 0; i < obj.children.length; i++) {
        var m_na = obj.children[i].name;
   
        if (m_na.indexOf("tooth_11_copy") != -1) {

            m_child = obj.children[i];
            //alert(m_VarGlobal.m_Mouse.m_SelOldObject)
            //alert(m_VarGlobal.m_Mouse.m_SelectPoint_Local)
            //alert(varToothClass.m_Tool.tool_num)
            //alert(varToothClass.m_Tool.changeimg)
            varToothClass.m_beiYa.judge_OnSelObj(m_child, m_VarGlobal.m_Mouse.m_SelectPoint_Local, varToothClass.m_Tool.tool_num, varToothClass.m_Tool.changeimg);
          

        }

    } 
}




DiYiBu.prototype.judge_OnSelObj = function (hand_select, obj_2, point, tool_num, Dir_num) {//////修牙步骤判断

    //alert(tool_num)


    point = obj_2.worldToLocal(point); //世界坐标系转换为内部坐标系
    //  alert("point.x" + point.x+"||"+"point.y" + point.y+"||"+"point.z" + point.z)

    if (tool_num == 11) { return; }
    //alert(hand_select.m_face.name)
    if (hand_select.name == "tooth_11" || hand_select.m_face.name == "tooth_11") { 

    if (obj_2.name == "tooth_11_copy" || obj_2.name == "tooth_11") {

        for (var i = 0; i < varToothClass.m_beiYa.m_ToothPosArr.length; i++) {
            //
            if (varToothClass.m_beiYa.m_PartArr[0] == 0 || varToothClass.m_beiYa.m_PartArr[1] == 0) {

                if (varToothClass.m_beiYa.m_PartArr[0] == 1 && varToothClass.m_beiYa.m_PartArr[1] == 1) {
                    return
                }
                if (tool_num == 1) {
                    if (Dir_num == 0) {
                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 1) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];
                            // alert("X"+m_arr[2].x + "|" + point.x + "|" + m_arr[3].x)
                            //alert("Y"+m_arr[2].y + "|" + point.y + "|" + m_arr[3].y)

                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                if (varToothClass.m_beiYa.m_PartArr[0] == 1 && varToothClass.m_beiYa.m_PartArr[1] == 1) {
                                    return
                                }
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);
                                
                                return;

                            }
                        }
                    } else if (varToothClass.m_beiYa.m_PartArr_Small=="") { alert("工具方向错误1"); return }
                } else if (varToothClass.m_beiYa.m_PartArr_Small == "") { alert("工具选择错误1"); return }
            }

            if (varToothClass.m_beiYa.m_PartArr[0] == 1 && varToothClass.m_beiYa.m_PartArr[1] == 1) {
               

                if (tool_num == 1) {
                    if (Dir_num == 0) {
                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 2) {
                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                            // alert(m_arr[2].x + "|" + point.x + "|" + m_arr[3].x)
                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                if (m_arr[4] == 3) {
                                    if (varToothClass.m_beiYa.m_PartArr[2] == 1 || varToothClass.m_beiYa.m_PartArr[4] == 1) {
                                        varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                        varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                        varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);
                                        
                                      
                                        return;
                                    } else { return; }
                                }
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);
                                if (varToothClass.m_beiYa.m_PartArr[2] == 1 && varToothClass.m_beiYa.m_PartArr[3] == 1 && varToothClass.m_beiYa.m_PartArr[4] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[0] = 0;
                                    varToothClass.m_beiYa.m_PartArr[1] = 0;
                                    return;

                                }
                                return;
                                //if (varToothClass.m_beiYa.m_PartArr[2] == 1 && varToothClass.m_beiYa.m_PartArr[3] == 1 && varToothClass.m_beiYa.m_PartArr[4] == 1) { return; }

                            }
                        }
                    } else { alert("工具方向错误2"); return }
                } else { alert("工具选择错误2"); return }
                // alert(varToothClass.m_beiYa.m_PartArr[m_arr[4]])
            }

            if (varToothClass.m_beiYa.m_PartArr[2] == 1 && varToothClass.m_beiYa.m_PartArr[3] == 1 && varToothClass.m_beiYa.m_PartArr[4] == 1) {
               

                if (tool_num == 1) {
                    // alert(Dir_num)
                    if (Dir_num == 1) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 3) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }

                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);


                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[5] == 1 && varToothClass.m_beiYa.m_PartArr[6] == 1 && varToothClass.m_beiYa.m_PartArr[7] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[2] = 0;
                                    varToothClass.m_beiYa.m_PartArr[3] = 0;
                                    varToothClass.m_beiYa.m_PartArr[4] = 0;
                                    return;
                                }
                                return;
                            }
                        }
                    } else { alert("工具方向错误3"); return }
                } else { alert("工具选择错误3"); return }
            }

            if (varToothClass.m_beiYa.m_PartArr[5] == 1 && varToothClass.m_beiYa.m_PartArr[6] == 1 && varToothClass.m_beiYa.m_PartArr[7] == 1) {
               

                if (tool_num == 1) {

                    if (Dir_num == 1) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 4) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                //alert(m_arr[4])
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);


                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[8] == 1 && varToothClass.m_beiYa.m_PartArr[9] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[5] = 0;
                                    varToothClass.m_beiYa.m_PartArr[6] = 0;
                                    varToothClass.m_beiYa.m_PartArr[7] = 0;
                                    return;
                                }
                                return;
                            }
                        }
                    } else { alert("工具方向错误4"); return }
                } else { alert("工具选择错误4"); return }
            }


            if (varToothClass.m_beiYa.m_PartArr[8] == 1 && varToothClass.m_beiYa.m_PartArr[9] == 1) {
               

                if (tool_num == 2) {

                    if (Dir_num == 1) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 5) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);

                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[10] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[8] = 0;
                                    varToothClass.m_beiYa.m_PartArr[9] = 0;
                                    return;

                                }
                                return;
                            }
                        }
                    } else { alert("工具方向错误5"); return }
                } else { alert("工具选择错误5"); return }

            }

            if (varToothClass.m_beiYa.m_PartArr[10] == 1) {
              

                if (tool_num == 2) {

                    if (Dir_num == 1) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 6) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);

                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[11] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[10] = 0;

                                    return;

                                }
                                return;
                            }
                        }
                    } else { alert("工具方向错误6"); return }
                } else { alert("工具选择错误6"); return }

            }


            if (varToothClass.m_beiYa.m_PartArr[11] == 1) {
                

                if (tool_num == 3) {

                    if (Dir_num == 1) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 7) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);

                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[12] == 1 && varToothClass.m_beiYa.m_PartArr[13] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[11] = 0;

                                    return;

                                }
                                return;
                            }
                        }
                    } else { alert("工具方向错误7"); return }
                } else { alert("工具选择错误7"); return }

            }
            // alert(varToothClass.m_beiYa.m_ToothPosArr[i][1])

            if (varToothClass.m_beiYa.m_PartArr[12] == 1 && varToothClass.m_beiYa.m_PartArr[13] == 1) {
              

                if (tool_num == 1) {

                    if (Dir_num == 1) {
                        //alert(varToothClass.m_beiYa.m_ToothPosArr[i][1])
                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 8) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];
                            //                            alert(m_arr[2].y + "|" + point.y + "|" + m_arr[3].y)
                            //                            alert(m_arr[2].x + "|" + point.x + "|" + m_arr[3].x)
                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && -60 >= point.y && point.y >= -90) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);

                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[14] == 1 && varToothClass.m_beiYa.m_PartArr[15] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[12] = 0;
                                    varToothClass.m_beiYa.m_PartArr[13] = 0;
                                    return;

                                }
                                return;
                            }
                        }
                    } else { alert("工具方向错误8"); return }
                } else { alert("工具选择错误8"); return }


            }



            if (varToothClass.m_beiYa.m_PartArr[14] == 1 && varToothClass.m_beiYa.m_PartArr[15] == 1) {
               

                if (tool_num == 1) {

                    if (Dir_num == 0) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 9) {
                            //alert(1233)
                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];
                            //alert(point.x + "||" + point.y)
                            //alert(m_arr[2].x + "||" + m_arr[3].x + "||||" + m_arr[2].y + "||" + m_arr[3].y)
                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && (m_arr[2].y + 5) >= point.y && point.y >= (m_arr[3].y - 5)) {

                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);

                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[16] == 1 && varToothClass.m_beiYa.m_PartArr[17] == 1 && varToothClass.m_beiYa.m_PartArr[18] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[14] = 0;
                                    varToothClass.m_beiYa.m_PartArr[15] = 0;
                                    return;

                                }
                                return;
                            }
                        }
                    } else { alert("工具方向错误9"); return }
                } else { alert("工具选择错误9"); return }
            }


            if (varToothClass.m_beiYa.m_PartArr[16] == 1 && varToothClass.m_beiYa.m_PartArr[17] == 1 && varToothClass.m_beiYa.m_PartArr[18] == 1) {
               
                if (tool_num == 1) {

                    if (Dir_num == 0) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 10) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);

                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[19] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[16] = 0;
                                    varToothClass.m_beiYa.m_PartArr[17] = 0;
                                    varToothClass.m_beiYa.m_PartArr[18] = 0;
                                    return;

                                }

                                return;
                            }
                        }
                    } else { alert("工具方向错误10"); return }
                } else { alert("工具选择错误10"); return }

            }



            if (varToothClass.m_beiYa.m_PartArr[19] == 1) {
              

                if (tool_num == 4) {

                    if (Dir_num == 0) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 11) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];
                            //alert(point.x + "||" + point.y)
                            //alert(m_arr[2].x + "||" + m_arr[3].x + "||||" + (m_arr[2].y + 5) + "||" + (m_arr[3].y - 5))
                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && (m_arr[2].y + 5) >= point.y && point.y >= (m_arr[3].y - 5)) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                                //alert(11111)
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);

                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                if (varToothClass.m_beiYa.m_PartArr[20] == 1 && varToothClass.m_beiYa.m_PartArr[21] == 1 && varToothClass.m_beiYa.m_PartArr[22] == 1) {
                                    varToothClass.m_beiYa.m_PartArr[19] = 0;

                                    return;

                                }
                                return;
                            }
                        }
                    } else { alert("工具方向错误11"); return }
                } else { alert("工具选择错误11"); return }
            }




            if (varToothClass.m_beiYa.m_PartArr[20] == 1 && varToothClass.m_beiYa.m_PartArr[21] == 1 && varToothClass.m_beiYa.m_PartArr[22] == 1) {
                //alert(varToothClass.m_beiYa.m_PartArr[23])
                if (varToothClass.m_beiYa.m_PartArr[23] == 1) {
                    varToothClass.m_beiYa.m_PartArr[20] = 0;
                    varToothClass.m_beiYa.m_PartArr[21] = 0;
                    varToothClass.m_beiYa.m_PartArr[22] = 0;
                    return;

                }

                if (tool_num == 5) {

                    if (Dir_num == 0) {

                        if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 12) {

                            var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                            if (m_arr[2].x >= point.x && point.x >= m_arr[3].x && m_arr[2].y >= point.y && point.y >= m_arr[3].y) {
                                if (varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] == m_arr[4]) { return; }
                               // alert(m_arr[4])  
                                varToothClass.m_beiYa.m_PartArr[m_arr[4]] = 1;
                              
                                varToothClass.m_beiYa.ForTooth_1(m_arr[4], obj_2);

                                varToothClass.m_beiYa.m_PartArr_Small[m_arr[4]] = m_arr[4];
                                
                                return;
                            }
                        }
                    } else { alert("工具方向错误12"); return }
                } else { alert("工具选择错误12"); return }

            }


            if (varToothClass.m_beiYa.m_PartArr[23] == 1) {


                if (varToothClass.m_beiYa.m_PartArr[24] == 1) {
                    varToothClass.m_beiYa.m_PartArr[23] = 0;

                    return;

                }

                if (tool_num == 9) {

                    //if (Dir_num == 0) {

                    //if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 13) {

                    var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

                    if (29 >= point.x && point.x >= (-23) && (-80) >= point.y && point.y >= (-100)) {

                        if (varToothClass.m_beiYa.m_PartArr_Small[24] == 24) { return; }
                        //alert("point.x" + point.x + "||" + "point.y" + point.y + "||" + "point.z" + point.z)
                        varToothClass.m_beiYa.m_PartArr[24] = 1;
                        varToothClass.m_beiYa.TheGumLine();
                        //varToothClass.m_beiYa.ForTooth_1(m_arr[4]);
                       
                        varToothClass.m_beiYa.m_PartArr_Small[24] = 24;
                        return;
                    }
                    // }
                    //} else { alert("工具方向错误"); return }
                } else { alert("工具选择错误13"); return }

            }


//            if (varToothClass.m_beiYa.m_PartArr[24] == 1) {


//                if (varToothClass.m_beiYa.m_PartArr[25] == 1) {
//                    varToothClass.m_beiYa.m_PartArr[24] = 0;

//                    return;

//                }

//                if (tool_num == 9) {

//                    //if (Dir_num == 0) {

//                    //if (varToothClass.m_beiYa.m_ToothPosArr[i][1] == 13) {

//                    var m_arr = varToothClass.m_beiYa.m_ToothPosArr[i];

//                    if (29 >= point.x && point.x >= (-23) && (-80) >= point.y && point.y >= (-100)) {

//                        if (varToothClass.m_beiYa.m_PartArr_Small[25] == 25) { return; }
//                        //alert("point.x" + point.x + "||" + "point.y" + point.y + "||" + "point.z" + point.z)
//                        //varToothClass.m_beiYa.TheGumLine();
//                        //varToothClass.m_beiYa.ForTooth_1(m_arr[4]);
//                        varToothClass.m_beiYa.m_PartArr[25] = 1;
//                        varToothClass.m_beiYa.m_PartArr_Small[25] = 25;
//                        return;
//                    }
//                    // }
//                    //} else { alert("工具方向错误"); return }
//                } else { alert("工具选择错误14"); return }

//            }








        }

        // alert(varToothClass.m_beiYa.m_PartArr);
    }
    else { alert("触碰邻牙") }
}
}
DiYiBu.prototype.InitPartCube = function () {//判断点
   

    var obj_1 = varToothClass.tooth_11.json;

    var obj_2 = Global_SeachObj("tooth_11");

    if (!obj_2) {
        return;
    }



    for (var j = 0; j < 24; j++) {
        var m_Min = new THREE.Vector3(0, 0, 0);
        var m_Max = new THREE.Vector3(0, 0, 0);
        var vertices_num = obj_1.init.face_1[j][0][0];

        m_Max.copy(obj_2.geometry.vertices[vertices_num]);
        m_Min.copy(obj_2.geometry.vertices[vertices_num]);

        for (var i = 0; i < obj_1.init.face_1[j].length; i++) {

            var vertices_num = obj_1.init.face_1[j][i][0];
            var m_point1 = obj_2.geometry.vertices[vertices_num];

            if (m_Max.x < m_point1.x) {
                m_Max.x = m_point1.x;
            }
            if (m_Max.y < m_point1.y) {
                m_Max.y = m_point1.y;
            }
            if (m_Max.z < m_point1.z) {
                m_Max.z = m_point1.z;
            }

            if (m_Min.x > m_point1.x) {
                m_Min.x = m_point1.x;
            }
            if (m_Min.y > m_point1.y) {
                m_Min.y = m_point1.y;
            }
            if (m_Min.z > m_point1.z) {
                m_Min.z = m_point1.z;
            }


        };
        var m_arr = new Array();
        m_arr[0] = obj_2.name;
        if (j < 2) {
            m_arr[1] = 1;
        } else if (j < 5) {
            m_arr[1] = 2;
        } else if (j < 8) {
            m_arr[1] = 3;
        } else if (j < 10) {
            m_arr[1] = 4;
        } else if (j < 11) {
            m_arr[1] = 5;
        } else if (j < 12) {
            m_arr[1] = 6;
        } else if (j < 14) {
            m_arr[1] = 7;
        } else if (j < 16) {
            m_arr[1] = 8;
        } else if (j < 19) {
            m_arr[1] = 9;
        } else if (j < 20) {
            m_arr[1] = 10;
        } else if (j < 23) {
            m_arr[1] = 11;
        } else if (j < 24) {
            m_arr[1] = 12;
        }

        m_arr[2] = m_Max;
        m_arr[3] = m_Min;
        m_arr[4] = j;
       


        this.m_ToothPosArr.push(m_arr);
        

    }

    //  });
}

//DiYiBu.prototype.OnSelObj = function (obj_2, point, num, tooth_num) {

//    //point = obj_2.worldToLocal(point); //世界坐标系转换为内部坐标系
//  






//    for (var i = 0; i < obj_1.init.face_1[num - 1].length; i++) {

//        var vertices_num = obj_1.init.face_1[num - 1][i][0];
//        var m_point1 = obj_2.geometry.vertices[vertices_num];

//        if (m_Max.x < m_point1.x) {
//            m_Max.x = m_point1.x;
//        }
//        if (m_Max.y < m_point1.y) {
//            m_Max.y = m_point1.y;
//        }
//        if (m_Max.z < m_point1.z) {
//            m_Max.z = m_point1.z;
//        }

//        if (m_Min.x > m_point1.x) {
//            m_Min.x = m_point1.x;
//        }
//        if (m_Min.y > m_point1.y) {
//            m_Min.y = m_point1.y;
//        }
//        if (m_Min.z > m_point1.z) {
//            m_Min.z = m_point1.z;
//        }
//        m_arr.splice(3, 0, m_Max)
//        m_arr.splice(4, 0, m_Min)
//        
//    };
//   






//}





DiYiBu.prototype.ForTooth_1 = function (num, obj_2) {

    var obj = varToothClass.tooth_11.json;


    var obj_2 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_11");

    var obj_m_child = 0;
    for (var i = 0; i < obj_2.children.length; i++) {
        var m_na = obj_2.children[i].name;

        if (m_na.indexOf("tooth_11_copy") != -1) {

            m_child = obj_2.children[i];
            obj_m_child = 1;

        }
        else { obj_m_child = 0; }
    }

    //alert(obj_m_child)
    varToothClass.tooth_11.m_face.geometry.verticesNeedUpdate = true;
    if (obj_m_child == 1) {
        m_child.geometry.verticesNeedUpdate = true;
    }


    var obj_2 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_11");



    for (var i = 0; i < obj.init.face_1[num].length; i++) {

        //alert("A" + obj_2.geometry.vertices[i].x + "||" + obj_2.geometry.vertices[i].y + "||" + obj_2.geometry.vertices[i].z);

        varToothClass.tooth_11.MovePoint(obj.init.face_1[num][i][0], obj.init.face_1[num][i][1], obj.init.face_1[num][i][2], obj.init.face_1[num][i][3], obj.init.face_1[num][i][4], obj.init.face_1[num][i][5]);

        if ((i - obj.init.face_1[num].length) >= 0) { var small_value = i - obj.init.face_1[num].length; }

        if (obj_m_child == 1) {
            m_child.geometry.vertices[obj.init.face_1[num][i][0]].x = obj_2.geometry.vertices[obj.init.face_1[num][i][0]].x;
            m_child.geometry.vertices[obj.init.face_1[num][i][0]].y = obj_2.geometry.vertices[obj.init.face_1[num][i][0]].y;
            m_child.geometry.vertices[obj.init.face_1[num][i][0]].z = obj_2.geometry.vertices[obj.init.face_1[num][i][0]].z;
        }
        //alert(hdd.geometry.vertices[i] == obj_2.geometry.vertices[i])

    }


    varToothClass.m_Pattern.arr_prompt_line[num] = 1;

    varToothClass.tooth_11.m_face.geometry.computeVertexNormals();
    if (obj_m_child == 1) {
        m_child.geometry.computeVertexNormals();
    }

    varToothClass.m_Pattern.Practice_Part();
}






DiYiBu.prototype.TheGumLine = function () {

    var sampleClosedSpline = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.8, -108, 31),
    new THREE.Vector3(-17, -105, 29),
    new THREE.Vector3(-30, -90, 10),
    new THREE.Vector3(-39, -90, 8),
    new THREE.Vector3(-38, -90, -6),
    new THREE.Vector3(-27, -84, -21),
    new THREE.Vector3(-25, -80, -23),
    new THREE.Vector3(-19, -82, -33),
    new THREE.Vector3(3.3, -90, -40),
     new THREE.Vector3(8, -91, -39),
     new THREE.Vector3(20, -85, -31),
      new THREE.Vector3(31, -76, -23),
      new THREE.Vector3(34.6, -83, 21),
      new THREE.Vector3(20, -105, 28),
      new THREE.Vector3(9.5, -109, 31),
//			new three.vector3(34.6, -83, 21),
//			new three.vector3(20, -105, 28),
//			new three.vector3(9.5, -109, 31),
//			new three.vector3(-19, -105, 28),
//            new three.vector3(-28, -95, 25),
//            new three.vector3(-33, -87, 22),
//            new three.vector3(-37, -77, 16),
//             new three.vector3(-31, -67, -24),
//               new three.vector3(-26, -77, -28),
//                new three.vector3(-9, -86, -37),
//                 new three.vector3(8, -91, -39),
//                  new three.vector3(20, -85, -31),
//                   new three.vector3(31, -76, -23),
		]);
    // sampleClosedSpline.points.push(new THREE.Vector3(0, -40, -40));
    //  sampleClosedSpline.curveType = 'catmullrom';
    sampleClosedSpline.closed = true;
    var material = new THREE.MeshLambertMaterial({ color: 0xff00ff });

    var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.3, wireframe: true, transparent: true });

    //alert(1213)
    var tubeGeometry = new THREE.TubeBufferGeometry(sampleClosedSpline, 100, 2, 3, sampleClosedSpline.closed);
    var group = THREE.SceneUtils.createMultiMaterialObject(tubeGeometry, [material, wireframeMaterial]);
    varToothClass.tooth_11.m_face.add(group);

}













