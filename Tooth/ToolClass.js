var ToolClass = function () {

    this.m_Selobj = null;
    this.m_Selobj_wireframe = null;
    this.backTexture = null;
    this.tool_num = 0;   //工具参数
    this.bgImg = 1; //背景图片序号
    this.kz = 2; //  牙材质编号
    this.t_toolnumber = 0; //牙工具编号
    this.changeimg = 0; //车针方向编号
    this.hide_number_shang = 1; //隐藏编号  上颚
    this.hide_number_xia = 1; //隐藏编号    下颚
    this.hide_number_shetou = 1; //隐藏编号    舌头
    this.hand_num = 0; //手标志  1可以选模型
    this.m_oldCameraPos = new THREE.Vector3(0, 0, 0);
    this.m_moveCameraflag = 0; //镜头
    this.m_InterNumCamera = 0;
    this.faxian_show = 0;  //法线存在是1
    this.shuzu_count = 0;   //  控制数组存储起始
    this.arr_ya = null;
    this.only_show = 0;  // 只显示单颗牙控制变量.
    this.open_mouse = 0;  //张嘴闭嘴的控制变量
};

var Tooth_ToolBar = function () { //派生类
    ToolClass.call(this);


};

Tooth_ToolBar.prototype = Object.create(ToolClass.prototype);

Tooth_ToolBar.prototype.OnSelObj = function (obj, point, num) {
    //  alert(obj.name);

    //    if (m_VarGlobal.m_Tooth_ToolBar.m_Selobj) {
    //       
    //        m_VarGlobal.m_SmallSence.m_Scene.remove(m_VarGlobal.m_Tooth_ToolBar.m_Selobj);

    //    }

    //    if (m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe) {

    //        m_VarGlobal.m_SmallSence.m_Scene.remove(m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe);
    //    }
    if (this.tool_num == 11) {
        m_VarGlobal.m_Tooth_ToolBar.clear();
        m_VarGlobal.m_Tooth_ToolBar.m_Selobj = obj.clone();


        m_VarGlobal.m_Tooth_ToolBar.m_Selobj.position.x = -30;
        //    m_VarGlobal.m_Tooth_ToolBar.m_Selobj.name = "Small_obj";
        m_VarGlobal.m_SmallSence.m_Scene.add(m_VarGlobal.m_Tooth_ToolBar.m_Selobj);




        m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe = obj.clone();
        m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe.name = "Small_wireframe";


        var m_Materials = null;
        if (m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe.material) {
            var m_Materials = m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe.material.clone();
        } else {
            var m_Materials = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0010");
        }

        m_Materials.wireframe = true;

        m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe.position.x = 30;
        m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe.material = m_Materials;
        m_VarGlobal.m_SmallSence.m_Scene.add(m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe);


        //选中 

        varToothClass.Selected = varToothClass[obj.name];
    }

}

Tooth_ToolBar.prototype.clear = function () {

    if (m_VarGlobal.m_Tooth_ToolBar.m_Selobj) {

        m_VarGlobal.m_SmallSence.m_Scene.remove(m_VarGlobal.m_Tooth_ToolBar.m_Selobj);

    }

    if (m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe) {

        m_VarGlobal.m_SmallSence.m_Scene.remove(m_VarGlobal.m_Tooth_ToolBar.m_Selobj_wireframe);
    }
}







Tooth_ToolBar.prototype.Choose_Tool = function (num) {



    for (var i = 1; i < 11; i++) {
        if (i == num) {

            document.getElementById("Tool_btn" + i).style.backgroundColor = "#282828";


            if (i < 8) {
                document.getElementById("Tool_img").src = "img/gongju/tnc-1" + i + ".png";
                document.getElementById("Tool_Text").innerText = "TNC_0" + i;
                this.tool_num = i;

            }
            else if (i < 9) {
                document.getElementById("Tool_img").src = "img/gongju/tnc-1" + i + ".png";
                document.getElementById("Tool_Text").innerText = "釉质凿";
                this.tool_num = i;
            }
            else if (i < 10) {
                document.getElementById("Tool_img").src = "img/gongju/tnc-1" + i + ".png";
                document.getElementById("Tool_Text").innerText = "排龈线";
                this.tool_num = i;
            }

        } else {
            document.getElementById("Tool_btn" + i).style.backgroundColor = "#535353";
        }

        if (num == 10) {
            document.getElementById("hand_move").src = "img/shubiao_click.png";

            document.getElementById("Tool_img").src = "img/gongju/adjust.png";
            document.getElementById("Tool_Text").innerText = "调整";

            m_VarGlobal.m_Mouse.m_SelectObj_flag = 0;

            this.hand_num = 0;
            this.tool_num = 10;
        } else {
            document.getElementById("hand_move").src = "img/shubiao.png";
        }
        if (num == 11) {
            document.getElementById("hand_click").src = "img/hand_click.png";

            document.getElementById("Tool_img").src = "img/gongju/select.png";
            document.getElementById("Tool_Text").innerText = "选取";

            m_VarGlobal.m_Mouse.m_SelectObj_flag = 1;
            this.tool_num = 11;
            this.hand_num = 1;
        } else {
            document.getElementById("hand_click").src = "img/shou.png";

        }
        if (num < 10) {

            document.getElementById('webgl').style.cursor = 'crosshair';
            // alert(34);
        } else if (num == 10) {
            document.getElementById('webgl').style.cursor = 'default';

        } else {

            document.getElementById('webgl').style.cursor = 'pointer';
        }
    }



}





//换背景
Tooth_ToolBar.prototype.Choose_back = function () {

    var loader = new THREE.TextureLoader();
    for (i = 1; i < 5; i++) {
        if (this.bgImg == i) {
            this.backTexture = loader.load("mode/bg_" + this.bgImg + ".jpg");
            this.backTexture.wrapS = this.backTexture.wrapT = THREE.RepeatWrapping;
            this.backTexture.repeat.set(1, 1);
            this.backTexture.anisotropy = 16;
        }
    }
    this.bgImg++;

    if (this.bgImg == 5) {
        this.bgImg = 1;
    }
    m_VarGlobal.m_BaseSence.m_Scene.background = this.backTexture;

}


//改变车针方向
Tooth_ToolBar.prototype.Choose_yazhen = function () {


    if (this.changeimg == 0) {
        document.getElementById("img_Tool_1").src = "img/fangxiang_0.png";
        this.changeimg = 1;
    } else {
        document.getElementById("img_Tool_1").src = "img/fangxiang_1.png";
        this.changeimg = 0;
    }
}



//添加法线
Tooth_ToolBar.prototype.Choose_fuck = function () {


    if (this.faxian_show == 0) {
        if (this.kz == 1) {
            for (var i = 11; i < 18; i++) {
                this.add_faxian(i, "code_0055");
            }
            for (var i = 21; i < 28; i++) {
                this.add_faxian(i, "code_0055");
            }
            for (var i = 31; i < 38; i++) {
                this.add_faxian(i, "code_0055");
            }
            for (var i = 41; i < 48; i++) {
                this.add_faxian(i, "code_0055");
            }
        } else if (this.kz == 2) {
            for (var i = 11; i < 18; i++) {
                this.add_faxian(i, "code_0044");
            }
            for (var i = 21; i < 28; i++) {
                this.add_faxian(i, "code_0044");
            }
            for (var i = 31; i < 38; i++) {
                this.add_faxian(i, "code_0044");
            }
            for (var i = 41; i < 48; i++) {
                this.add_faxian(i, "code_0044");
            }

        } else if (this.kz == 3) {
            for (var i = 11; i < 18; i++) {
                this.add_faxian(i, "code_0044");
            }
            for (var i = 21; i < 28; i++) {
                this.add_faxian(i, "code_0044");
            }
            for (var i = 31; i < 38; i++) {
                this.add_faxian(i, "code_0044");
            }
            for (var i = 41; i < 48; i++) {
                this.add_faxian(i, "code_0044");
            }
        }
        this.faxian_show = 1;
    } else {
        if (this.kz == 1) {
            for (var i = 11; i < 18; i++) {
                this.delete_faxian(i, "code_0001"); // code  是删除之后  原型变成面的颜色
            }
            for (var i = 21; i < 28; i++) {
                this.delete_faxian(i, "code_0001");
            }
            for (var i = 31; i < 38; i++) {
                this.delete_faxian(i, "code_0001");
            }
            for (var i = 41; i < 48; i++) {
                this.delete_faxian(i, "code_0001");
            }
        } else if (this.kz == 2) {
            for (var i = 11; i < 18; i++) {
                this.delete_faxian(i, "code_0001");
            }
            for (var i = 21; i < 28; i++) {
                this.delete_faxian(i, "code_0001");
            }
            for (var i = 31; i < 38; i++) {
                this.delete_faxian(i, "code_0001");
            }
            for (var i = 41; i < 48; i++) {
                this.delete_faxian(i, "code_0001");
            }

        } else if (this.kz == 3) {
            for (var i = 11; i < 18; i++) {
                this.delete_faxian(i, "code_0055");
            }
            for (var i = 21; i < 28; i++) {
                this.delete_faxian(i, "code_0055");
            }
            for (var i = 31; i < 38; i++) {
                this.delete_faxian(i, "code_0055");
            }
            for (var i = 41; i < 48; i++) {
                this.delete_faxian(i, "code_0055");
            }

        }

        this.faxian_show = 0;
    }
}

//加法线的方法
Tooth_ToolBar.prototype.add_faxian = function (i, cood) {
    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
    var geometry = m_obj.geometry.clone();
    var m_Materials = m_obj.material.clone();
    var m_obj_copy = new THREE.Mesh(geometry, m_Materials);
    m_obj_copy.name = "tooth_" + i + "_copy";
    m_obj_copy.scale.set(m_obj_copy.scale.x - 0.002, m_obj_copy.scale.x - 0.002, m_obj_copy.scale.x - 0.002);
    m_obj.add(m_obj_copy);
    var m_Materials = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood);
    m_Materials.wireframe = true;
    m_obj.material = m_Materials;
    m_obj.geometry.computeVertexNormals();

}
//删法线的方法   
Tooth_ToolBar.prototype.delete_faxian = function (i, cood) {
    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
    var m_obj_copy = SeachObj(m_obj, "tooth_" + i + "_copy");
    m_obj.remove(m_obj_copy);
    var m_Materials = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood);
    m_Materials.wireframe = false;
    m_obj.material = m_Materials;
}
//更换材质
Tooth_ToolBar.prototype.Choose_caizhi = function () {
    if (this.faxian_show == 0) {
        if (this.kz == 1) {
            for (var i = 11; i < 18; i++) {
                this.change_ya(i, "code_0001", false);
            }
            for (var i = 21; i < 28; i++) {
                this.change_ya(i, "code_0001", false);
            }
            for (var i = 31; i < 38; i++) {
                this.change_ya(i, "code_0001", false);
            }
            for (var i = 41; i < 48; i++) {
                this.change_ya(i, "code_0001", false);
            }
            this.change_ya_other("code_0031", "code_0032", "code_0031", "code_0032", "code_0033");
            this.kz = 2;
        } else if (this.kz == 2) {
            for (var i = 11; i < 18; i++) {
                this.change_ya(i, "code_0055", false);
            }
            for (var i = 21; i < 28; i++) {
                this.change_ya(i, "code_0055", false);
            }
            for (var i = 31; i < 38; i++) {
                this.change_ya(i, "code_0055", false);
            }
            for (var i = 41; i < 48; i++) {
                this.change_ya(i, "code_0055", false);
            }
            this.change_ya_other("code_0055", "code_0055", "code_0055", "code_0055", "code_0055");
            this.kz = 3;
        } else if (this.kz == 3) {
            for (var i = 11; i < 18; i++) {
                this.change_ya(i, "code_0001", false);
            }
            for (var i = 21; i < 28; i++) {
                this.change_ya(i, "code_0001", false);
            }
            for (var i = 31; i < 38; i++) {
                this.change_ya(i, "code_0001", false);
            }
            for (var i = 41; i < 48; i++) {
                this.change_ya(i, "code_0001", false);
            }
            this.change_ya_other("code_0001", "code_0001", "code_0001", "code_0001", "code_0001");
            this.kz = 1;
        }
    } else if (this.faxian_show == 1) {
        if (this.kz == 1) {
            for (var i = 11; i < 18; i++) {
                this.change_ya_faxian(i, "code_0055", "code_0001", true);
            }
            for (var i = 21; i < 28; i++) {
                this.change_ya_faxian(i, "code_0055", "code_0001", true);
            }
            for (var i = 31; i < 38; i++) {
                this.change_ya_faxian(i, "code_0055", "code_0001", true);
            }
            for (var i = 41; i < 48; i++) {
                this.change_ya_faxian(i, "code_0055", "code_0001", true);
            }
            this.change_ya_other("code_0031", "code_0032", "code_0031", "code_0032", "code_0033");
            this.kz = 2;
        } else if (this.kz == 2) {
            for (var i = 11; i < 18; i++) {
                this.change_ya_faxian(i, "code_0044", "code_0055", true);
            }
            for (var i = 21; i < 28; i++) {
                this.change_ya_faxian(i, "code_0044", "code_0055", true);
            }
            for (var i = 31; i < 38; i++) {
                this.change_ya_faxian(i, "code_0044", "code_0055", true);
            }
            for (var i = 41; i < 48; i++) {
                this.change_ya_faxian(i, "code_0044", "code_0055", true);
            }
            this.change_ya_other("code_0055", "code_0055", "code_0055", "code_0055", "code_0055");
            this.kz = 3;
        } else if (this.kz == 3) {
            for (var i = 11; i < 18; i++) {
                this.change_ya_faxian(i, "code_0055", "code_0001", true);
            }
            for (var i = 21; i < 28; i++) {
                this.change_ya_faxian(i, "code_0055", "code_0001", true);
            }
            for (var i = 31; i < 38; i++) {
                this.change_ya_faxian(i, "code_0055", "code_0001", true);
            }
            for (var i = 41; i < 48; i++) {
                this.change_ya_faxian(i, "code_0055", "code_0001", true);
            }
            this.change_ya_other("code_0001", "code_0001", "code_0001", "code_0001", "code_0001");
            this.kz = 1;

        }

    }

}


//更换材质 牙的更换方法
Tooth_ToolBar.prototype.change_ya = function (i, cood, boolean) {
    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
    var m_Materials = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood);
    m_Materials.wireframe = boolean;
    m_obj.material = m_Materials;
    m_obj.geometry.computeVertexNormals();
}
//更换材质 牙带法线的更换方法
Tooth_ToolBar.prototype.change_ya_faxian = function (i, cood, cood1, boolean) {

    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
    var m_obj_copy = SeachObj(m_obj, "tooth_" + i + "_copy");
    var m_Materials = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood);
    var m_Materialss = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood1);
    m_Materials.wireframe = boolean;
    m_obj.material = m_Materials;
    m_obj_copy.material = m_Materialss;
    m_obj.geometry.computeVertexNormals();
}


//更换材质  上颚下颚舌头的更换方法
Tooth_ToolBar.prototype.change_ya_other = function (cood1, cood2, cood3, cood4, cood5) {

    var m_obj_1 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage1");
    var m_obj_2 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage2");
    var m_obj_3 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage3");
    var m_obj_4 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage4");
    var m_obj_5 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage5");

    var m_Materials_ss = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood1);
    var m_Materials_sx = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood2);
    var m_Materials_xs = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood3);
    var m_Materials_xx = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood4);
    var m_Materials_se = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(cood5);

    m_obj_1.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = m_Materials_ss;
        }
    })
    m_obj_2.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = m_Materials_sx;
        }
    })
    m_obj_3.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = m_Materials_xs;
        }
    })
    m_obj_4.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = m_Materials_xx;
        }
    })
    m_obj_5.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = m_Materials_se;
        }
    })

}







Tooth_ToolBar.prototype.Lens_reset = function () {//镜头复位

    this.m_oldCameraPos.x = m_VarGlobal.m_Controls.object.position.x;
    this.m_oldCameraPos.y = m_VarGlobal.m_Controls.object.position.y;
    this.m_oldCameraPos.z = m_VarGlobal.m_Controls.object.position.z;

    if (this.m_moveCameraflag == 0) {
        this.m_moveCameraflag = 1;

        this.m_InterNumCamera = setInterval(this.moveCamera, 50, 0);


    }
    m_VarGlobal.m_Mouse.m_SelOldObject = null;
}

Tooth_ToolBar.prototype.moveCamera = function (part) {//镜头归位

    if (varToothClass.m_Tool.m_moveCameraflag) {
        // alert(part);
        clearInterval(varToothClass.m_Tool.m_InterNumCamera);

        var m_px = ((m_initArr[2]) - (varToothClass.m_Tool.m_oldCameraPos.x)) / 10
        var m_py = ((m_initArr[3]) - (varToothClass.m_Tool.m_oldCameraPos.y)) / 10;
        var m_pz = ((m_initArr[4]) - (varToothClass.m_Tool.m_oldCameraPos.z)) / 10;

        m_VarGlobal.m_Controls.object.position.x += m_px;
        m_VarGlobal.m_Controls.object.position.y += m_py;
        m_VarGlobal.m_Controls.object.position.z += m_pz;
        m_VarGlobal.m_Controls.update();

        if (part >= 10) {
            m_VarGlobal.m_Controls.object.position.x = m_initArr[2];
            m_VarGlobal.m_Controls.object.position.y = m_initArr[3];
            m_VarGlobal.m_Controls.object.position.z = m_initArr[4];

            m_VarGlobal.m_Controls.update();
            varToothClass.m_Tool.m_moveCameraflag = 0;
            return;
        } else {
            varToothClass.m_Tool.m_InterNumCamera = setInterval(varToothClass.m_Tool.moveCamera, 100, part + 1);
        }

    }

}


//张嘴闭嘴
//Tooth_ToolBar.prototype.move_obj = function () {
//    if (this.open_mouse == 0) {
//        document.getElementById("open_mouse").src = "img/youce/zhangzui.png";
//        this.open_mouse = 1;
//        this.Obj_Box(0);
//        this.Obj_Box(1);
//        //var m_obj = Global_SeachObj("tooth_11");
//    } else {
//        document.getElementById("open_mouse").src = "img/youce/bizui1.png";
//        this.open_mouse = 0;
//    }
//}

//Tooth_ToolBar.prototype.Obj_Box = function (num) {
//    var geometry = new THREE.PlaneGeometry(50, 50); // Create a 20 by 20 by 20 cube.	  
//    	m_Material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
//    var m_box = new THREE.Mesh(geometry, m_Material);
//    	m_box.name = 'obj_box'+num;
//    	m_box.visible = true;
//	if(num == 0){
//		m_box.position.x = 0;
//		m_box.position.y = 0;
//		m_box.position.z = -100;
//	}
//    Obj_Add(m_box);
//	if(num == 0){
//		this.SetBox("garbage1", m_box);
//		this.SetBox("garbage2", m_box);
//        for(var i = 1;i<8;i++){
//            this.SetBox("tooth_1"+i, m_box);
//        }
//        for(var i = 1;i<8;i++){
//            this.SetBox("tooth_2"+i, m_box);
//        }
//        //this.RemoveBox("garbage1",m_box);
//        m_box.rotation.x = Num_Radian(-30);
//	}
//    if(num == 1){
//		this.SetBox("garbage3", m_box);
//		this.SetBox("garbage4", m_box);
//        this.SetBox("garbage5", m_box);
//        for(var i = 1;i<8;i++){
//            this.SetBox("tooth_3"+i, m_box);
//        }
//        for(var i = 1;i<8;i++){
//            this.SetBox("tooth_4"+i, m_box);
//        }
//        m_box.rotation.x = Num_Radian(30);
//	}
//}

//Tooth_ToolBar.prototype.SetBox = function (name, dis) {
//    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, name);
//    if (m_obj) {
//		//alert(m_obj.name)
//        m_obj.position.x = m_obj.position.x - dis.position.x;
//        m_obj.position.y = m_obj.position.y - dis.position.y;
//        m_obj.position.z = m_obj.position.z - dis.position.z;
//        m_VarGlobal.m_BaseSence.m_dis.remove(m_obj);
//        dis.add(m_obj);
//    }
//}

//Tooth_ToolBar.prototype.RemoveBox = function (name, dis) {
//    var m_obj=SeachObj(dis, name);
//    var m_dis=SeachObj(m_VarGlobal.m_BaseSence.m_dis, "obj_box0");
//    if (m_obj && m_dis) {
//        m_obj.position.x = m_obj.position.x - dis.position.x;
//        m_obj.position.y = m_obj.position.y - dis.position.y;
//        m_obj.position.z = m_obj.position.z - dis.position.z;
//        m_dis.remove(m_obj);
//        m_VarGlobal.m_BaseSence.m_dis.add(m_obj);
//    }
//}

//Tooth_ToolBar.prototype.SetCenterRotateX = function (obj, point, angle) {
//    var geometry = new THREE.BoxGeometry(10, 10,10); // Create a 20 by 20 by 20 cube.	  
//     m_material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
//     var m_testobj = new THREE.Mesh(geometry, m_material);
//     Obj_Add(m_testobj)
//    var m_r = obj.position.z;

//    var m_z = m_r * Math.cos(Num_Radian(angle));
//    var m_y = m_r * Math.sin(Num_Radian(angle));

//    obj.position.z = m_z;

//    obj.position.y = m_y;
//    obj.rotateX(Num_Radian(-angle));
//   /// alert(m_z);
//}

//function SetCenterRotateX(obj, point, angle) {
//    var geometry = new THREE.BoxGeometry(10, 10,10); // Create a 20 by 20 by 20 cube.	  
//     m_material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
//     var m_testobj = new THREE.Mesh(geometry, m_material);
//     Obj_Add(m_testobj)
//    var m_r = obj.position.z - point.z;

//    var m_z = m_r * Math.cos(Num_Radian(angle));
//    var m_y = m_r * Math.sin(Num_Radian(angle));

//    obj.position.z = m_z;

//    obj.position.y = m_y;
//    obj.rotateX(Num_Radian(-angle));
//   /// alert(m_z);
//}


// if (object.name == "garbage5") {
//      //  alert(m_Max.y * m_data[8]);
//        var m_pt = new THREE.Vector3(0, 0, -300)
//        SetCenterRotateX(object, m_pt, 45);
//    }




Tooth_ToolBar.prototype.select_dangqianya = function () {//当前牙
    if (this.only_show == 0) {
        for (var i = 1; i < 6; i++) {
            var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage" + i);
            if (m_obj) {
                m_obj.visible = false;
            }
        }
        for (var i = 10; i < 50; i++) {
            var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
            if (m_obj) {
                m_obj.visible = false;
            }
        }
        if (varToothClass.Selected) {
            if (varToothClass.Selected.m_face) {
                varToothClass.Selected.m_face.visible = true;
            } else {
                varToothClass.Selected.visible = true;
            }
        }
        this.only_show = 1;
    } else {
        for (var i = 1; i < 6; i++) {
            var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage" + i);
            if (m_obj) {
                m_obj.visible = true;
            }
        }
        for (var i = 11; i < 48; i++) {
            var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
            if (m_obj) {
                m_obj.visible = true;
            }
        }
        this.only_show = 0;
    }
}

Tooth_ToolBar.prototype.Choose_hide_shange = function () {//上颌显示/隐藏
    for (var i = 11; i < 28; i++) {
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
        if (m_obj) {
            m_obj.visible = !m_obj.visible;
        }
        var m_line = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "Prompt_line" + i);
        if (m_line) {
            m_line.visible = !m_line.visible;
        }
    }
    if (this.only_show == 1) {
        for (var i = 11; i < 28; i++) {
            var m_line = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "Prompt_line" + i);
            if (m_line) {
                m_line.visible = !m_line.visible;
            }
        }
        if (varToothClass.Selected) {
            if (varToothClass.Selected.m_face) {
                varToothClass.Selected.m_face.visible = true;
            } else {
                varToothClass.Selected.visible = true;
            }
        }
    }

    var m_obj_1 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage1");
    var m_obj_2 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage2");
    m_obj_1.visible = !m_obj_1.visible;
    m_obj_2.visible = !m_obj_2.visible;
}

Tooth_ToolBar.prototype.Choose_shetou = function () {//舌头显示/隐藏
    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage5");
    if (m_obj) {
        m_obj.visible = !m_obj.visible;
    }
}

Tooth_ToolBar.prototype.Choose_hide_xiae = function () {//下颌显示/隐藏
    for (var i = 31; i < 48; i++) {
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
        if (m_obj) {
            m_obj.visible = !m_obj.visible;
        }
        var m_line = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "Prompt_line" + i);
        if (m_line) {
            m_line.visible = !m_line.visible;
        }
    }
    if (this.only_show == 1) {
        for (var i = 31; i < 48; i++) {
            var m_line = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "Prompt_line" + i);
            if (m_line) {
                m_line.visible = !m_line.visible;
            }
        }
        if (varToothClass.Selected) {
            if (varToothClass.Selected.m_face) {
                varToothClass.Selected.m_face.visible = true;
            } else {
                varToothClass.Selected.visible = true;
            }
        }
    }

    var m_obj_3 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage3");
    var m_obj_4 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage4");
    m_obj_3.visible = !m_obj_3.visible;
    m_obj_4.visible = !m_obj_4.visible;
}

//张嘴闭嘴
Tooth_ToolBar.prototype.move_obj = function () {

    this.open_mouth();


}

Tooth_ToolBar.prototype.open_mouth = function () {
    for (var i = 1; i < 3; i++) {
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage" + i);
        if (m_obj) {
            var m_pt0 = new THREE.Vector3(m_obj.position.x, 0, -200)
            this.SetCenterRotateX(m_obj, m_pt0, 15);
        }
    }
    for (var i = 11; i < 28; i++) {
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
        if (m_obj) {
            var m_pt0 = new THREE.Vector3(m_obj.position.x, 0, -200)
            this.SetCenterRotateX(m_obj, m_pt0, 15);
        }
    }

    for (var i = 31; i < 48; i++) {
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + i);
        if (m_obj) {
            var m_pt0 = new THREE.Vector3(m_obj.position.x, 0, -100)
            this.SetCenterRotateX(m_obj, m_pt0, -30);
        }
    }
    for (var i = 3; i < 6; i++) {
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "garbage" + i);
        if (m_obj) {
            var m_pt0 = new THREE.Vector3(m_obj.position.x, 0, -100)
            this.SetCenterRotateX(m_obj, m_pt0, -30);
        }
    }
}

Tooth_ToolBar.prototype.SetCenterRotateX = function (obj, point, angle) {
    var geometry = new THREE.BoxGeometry(10, 10, 10); // Create a 20 by 20 by 20 cube.	  
    m_material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    var m_testobj = new THREE.Mesh(geometry, m_material);
    Obj_Add(m_testobj)
    var m_r = obj.position.z - point.z;

    var m_z = m_r * Math.cos(Num_Radian(angle));
    var m_y = m_r * Math.sin(Num_Radian(angle));
    obj.position.z = obj.position.z - (m_r - m_z);
    obj.position.y = obj.position.y + m_y;

    obj.rotateX(Num_Radian(-angle));

}


//var m_InterNumSecond_rotateX = 0; //旋转参数
//function Second_rotateX(part, m_obj, num) {//模型旋转
//    if (num == 0) {
//        clearInterval(m_InterNumSecond_rotateX);
//        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, m_obj);
//        m_obj.rotateX(Num_Radian(-4));//角度
//        if (part >= 5) {
//            //位置函数
//            return;
//        }
//        m_InterNumSecond_rotateX = setInterval(Second_rotateX, 100, part + 1, "Sys_PaoGuan0", 0);//盒子名
//    }
//    if (num == 1) {
//        clearInterval(m_InterNumSecond_rotateX);
//        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, m_obj);
//        m_obj.rotateX(Num_Radian(4));
//        if (part >= 5) {
//            return;
//        }
//        m_InterNumSecond_rotateX = setInterval(Second_rotateX, 100, part + 1, "Sys_PaoGuan0", 1)
//    }
//}

//m_InterNumSecond_rotateX = setInterval(Second_rotateX, 100, 0, "Sys_PaoGuan5", 2);