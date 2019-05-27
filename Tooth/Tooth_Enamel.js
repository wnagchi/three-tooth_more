var EnamelObj = function () {//派生类

    ToothObj.call(this);
    this.m_Pos = new THREE.Vector3(0, 0, 0); //位置
    this.m_Sacle = new THREE.Vector3(1, 1, 1); //缩放
    this.m_Rotate = new THREE.Vector3(0, 0, 0); //旋转
};

EnamelObj.prototype = Object.create(ToothObj.prototype);

EnamelObj.prototype.initTooth = function (json, type) {//初始化创建，json参数,type牙齿类型，后槽牙为1///圆柱   
    this.json = json; //json数据
    this.arr_geometry = new THREE.Geometry(); //存储点数组
    this.arr_mr = new Array(); //存储半径数组
    this.m_r = json.init.Tooth[0]; //半径
    this.m_h = json.init.Tooth[1]; //行高
    this.m_JMax = json.init.Tooth[2]; //行数
    this.m_IMax = json.init.Tooth[3]; //列数
    this.m_Pos = new THREE.Vector3(json.init.Tooth[6][0], json.init.Tooth[6][1], json.init.Tooth[6][2]); //位置
    this.m_Sacle = new THREE.Vector3(json.init.Tooth[7][0], json.init.Tooth[7][1], json.init.Tooth[7][2]); //缩放
    this.m_Rotate = new THREE.Vector3(json.init.Tooth[8][0], json.init.Tooth[8][1], json.init.Tooth[8][2]); //旋转
    for (var j = 0; j < this.m_JMax; j++) {//创建圆柱
        var m_jr = this.m_r;
        this.arr_mr.push(m_jr);
        for (var r_i = 0; r_i < json.init.r.length; r_i++) {//设置半径
            this.Row_r(json.init.r[r_i][0], json.init.r[r_i][1]);
        }
        m_jr = this.arr_mr[j];
        for (var i = 0; i < this.m_IMax + 1; i++) {
            var m_pos = new THREE.Vector3(0, 0, 0);
            m_pos.x = (m_jr) * Math.sin(Num_Radian((i / this.m_IMax) * 360));
            m_pos.y = -j * this.m_h;
            m_pos.z = (m_jr) * Math.cos(Num_Radian((i / this.m_IMax) * 360));
            this.arr_geometry.vertices.push(m_pos);
        }
    }
    this.CreateFaces(json.init.Tooth[4], json.init.Tooth[5], json.init.Tooth[9]); //创建面
    for (var row_i = 0; row_i < json.init.row.length; row_i++) {//移动行
        this.MoveLine_row(json.init.row[row_i][0], json.init.row[row_i][1], json.init.row[row_i][2], json.init.row[row_i][3], json.init.row[row_i][4], json.init.row[row_i][5]);
    }
    for (var col_i = 0; col_i < json.init.col.length; col_i++) {//移动列
        this.MoveLine_col(json.init.col[col_i][0], json.init.col[col_i][1], json.init.col[col_i][2], json.init.col[col_i][3], json.init.col[col_i][4], json.init.col[col_i][5]);
    }
    for (var point_i = 0; point_i < json.init.point.length; point_i++) {//移动点
        this.pointNumCode(json.init.point[point_i][0], json.init.point[point_i][1], json.init.point[point_i][2], json.init.point[point_i][3], json.init.point[point_i][4], json.init.point[point_i][5], json.init.point[point_i][6]);
    }
    //this.ShowCode(0, 1); //显示点编号
    //this.m_face.visible = false;
    //this.ShowLine(); //显示线

    if (type == 1) {
        this.arr_geometry = new THREE.Geometry(); //存储点数组
        this.arr_mr = new Array(); //存储半径数组
        this.m_r = json.init.Tooth_1[0]; //半径
        this.m_h = json.init.Tooth_1[1]; //行高
        this.m_JMax = json.init.Tooth_1[2]; //行数
        this.m_IMax = json.init.Tooth_1[3]; //列数
        for (var j = 0; j < this.m_JMax; j++) {//创建平面
            var m_jr = this.m_r;
            this.arr_mr.push(m_jr);
            for (var r_i = 0; r_i < json.init.r_1.length; r_i++) {//设置半径
                this.Row_r(json.init.r_1[r_i][0], json.init.r_1[r_i][1]);
            }
            m_jr = this.arr_mr[j];
            for (var i = 0; i < this.m_IMax + 1; i++) {
                var m_pos = new THREE.Vector3(0, 0, 0);
                m_pos.x = m_jr * i;
                m_pos.y = 0;
                m_pos.z = -j * this.m_h;
                this.arr_geometry.vertices.push(m_pos);
            }
        }
        this.CreateFaces_1(json.init.Tooth[4], json.init.Tooth[5], json.init.Tooth[9]); //创建面
        for (var row_i = 0; row_i < json.init.row_1.length; row_i++) {//移动行
            this.MoveLine_row(json.init.row_1[row_i][0], json.init.row_1[row_i][1], json.init.row_1[row_i][2], json.init.row_1[row_i][3], json.init.row_1[row_i][4], json.init.row_1[row_i][5]);
        }
        for (var col_i = 0; col_i < json.init.col_1.length; col_i++) {//移动列
            this.MoveLine_col(json.init.col_1[col_i][0], json.init.col_1[col_i][1], json.init.col_1[col_i][2], json.init.col_1[col_i][3], json.init.col_1[col_i][4], json.init.col_1[col_i][5]);
        }
        for (var point_i = 0; point_i < json.init.point_1.length; point_i++) {//移动点
            this.pointNumCode(json.init.point_1[point_i][0], json.init.point_1[point_i][1], json.init.point_1[point_i][2], json.init.point_1[point_i][3], json.init.point_1[point_i][4], json.init.point_1[point_i][5], json.init.point_1[point_i][6]);
        }
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + json.init.Tooth[9]);
        this.SetObjMatrix(m_obj, this.m_face, json);
        this.CreateObj(m_obj, this.m_face, json);
        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + json.init.Tooth[9]);
        this.m_face = m_obj;
       
        //this.ShowCode_1(this.m_face, 0, 10, json); //显示点编号
        //this.m_face.visible = false; //隐藏
        //this.ShowLine(); //显示线
    }
    ////////////////////位置缩放旋转////////////////////
    this.SetPostion(this.m_Pos);
    this.SetSacle(this.m_Sacle);
    this.SetRotate(this.m_Rotate);
    //this.m_face.visible = false;
    //this.ShowLine(); //显示线
    this.copy_image();
    //this.m_face.geometry.computeVertexNormals();


}

EnamelObj.prototype.SetObjMatrix = function (obj_1, obj_2, json) {//设置json模型变换 obj_1 模型1 obj_2 模型2
    obj_2.geometry.mergeVertices(); //去掉重复点
    var m_matrix = obj_2.matrix; //变换参数 elements是16位数组[]
    m_matrix.elements[12] = json.init.Tooth[10][0]; //x 位置
    m_matrix.elements[13] = json.init.Tooth[10][1]; //y 位置
    m_matrix.elements[14] = json.init.Tooth[10][2]; //z 位置
    obj_2.geometry.applyMatrix(m_matrix)
    var m_matrix1 = obj_1.matrix;
    m_matrix1.elements[13] = json.init.Tooth[10][1] - 2;
    obj_1.geometry.applyMatrix(m_matrix1)
}

EnamelObj.prototype.CreateObj = function (obj_1, obj_2, json) {//创建新模型 obj_1 模型1 obj_2 模型2
    var geometry = new THREE.Geometry();
    var m_Materials = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(json.init.Tooth[4]);
    //m_Materials.wireframe = true;/////////////////////////显示线
    var m_tobj = new THREE.Mesh(geometry, m_Materials);
    m_tobj.geometry.mergeMesh(obj_1); //添加模型1
    m_tobj.geometry.mergeMesh(obj_2); //添加模型2
    this.Newface(m_tobj.geometry, obj_1.geometry, obj_2.geometry, json)
    Obj_Add(m_tobj);
    m_tobj.geometry.computeVertexNormals(); //渲染材质
    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + json.init.Tooth[9]);
    if (m_obj) {
        m_VarGlobal.m_BaseSence.m_dis.remove(m_obj);
    }
    var m_obj_1 = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_1_" + json.init.Tooth[9]);
    if (m_obj_1) {
        m_VarGlobal.m_BaseSence.m_dis.remove(m_obj_1);
    }
    m_tobj.name = "tooth_" + json.init.Tooth[9];
}

EnamelObj.prototype.Newface = function (geometry, geometry1, geometry2, json) {//建立新模型面 geometry 新模型点  geometry1 模型1点 geometry2 模型2点 
    geometry.faces = [];
    var m_num = json.init.Tooth[2] * (json.init.Tooth[3] + 1); //圆柱模型点长度
    var m_IMax = json.init.Tooth[3] + 1; //圆柱模型行点长度
    var m_codenum = m_num - m_IMax; //圆柱模型faces点长度
    for (var i = 0; i < geometry1.faces.length; i++) {//添加圆柱面
        var face = new THREE.Face3(geometry1.faces[i].a, geometry1.faces[i].b, geometry1.faces[i].c);
        geometry.faces.push(face);
    }
    for (var i = 0; i < json.init.face.length; i++) {//增加连接面
        var face = new THREE.Face3(json.init.face[i][0], json.init.face[i][1], json.init.face[i][2]);
        geometry.faces.push(face);
    }
    for (var i = 0; i < geometry2.faces.length; i++) {//添加牙面
        var face = new THREE.Face3(geometry2.faces[i].c += m_num, geometry2.faces[i].b += m_num, geometry2.faces[i].a += m_num);
        geometry.faces.push(face);
    }
}

EnamelObj.prototype.ShowCode_1 = function (obj, start, end, json) {//显示点编号，rownum行，type每几个显示
    var arr = obj.geometry.vertices;
    var loader = new THREE.FontLoader();
    var x = 0, y = 0, z = 0;
    var m_scope = this;
    loader.load('fonts/helvetiker_bold.typeface.js', function (font) {
        var m_num = json.init.Tooth[2] * (json.init.Tooth[3] + 1); //圆柱模型点长度
        for (var i = start + m_num; i < end + m_num; i++) {
            var m_t = Create3dText("" + (i), 1, font);
            m_t.position.x = arr[i].x + obj.position.x - 0.0;
            m_t.position.y = arr[i].y + obj.position.y + 0.5;
            m_t.position.z = arr[i].z + obj.position.z + 0.5;
            Obj_Add(m_t);
        }
    });
}

EnamelObj.prototype.copy_image = function () {//镜像
    var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "tooth_" + this.json.init.Tooth[9]);
    m_VarGlobal.GoodsList.push(m_obj);//
    if (m_obj) {
        var m_copy = m_obj.clone();
        m_copy.position.copy(m_obj.position);
        m_copy.geometry = this.m_face.geometry.clone();
        m_copy.position.x = -m_copy.position.x;
        m_copy.name = "tooth_" + (this.json.init.Tooth[9] + 10);
        for (var i = 0; i < m_copy.geometry.vertices.length; i++) {
            m_copy.geometry.vertices[i].x = -m_copy.geometry.vertices[i].x;
        }
        //m_copy.rotateX(Num_Radian(-(this.json.init.Tooth[8][0])));//x旋转
        m_copy.rotateY(Num_Radian(-2*(this.json.init.Tooth[8][1])));//y旋转
        m_copy.rotateZ(Num_Radian(-2*(this.json.init.Tooth[8][2])));//z旋转
        m_copy.geometry.computeVertexNormals();
        Obj_Add(m_copy);
        m_VarGlobal.GoodsList.push(m_copy);
        this.copy_image_pos(m_copy);
    }
}

EnamelObj.prototype.copy_image_pos = function (obj) {//镜像位置
    //alert(obj.name)
    if (obj.name == "tooth_21") {
        obj.position.x = 14.5;
        varToothClass.tooth_21 = obj;
    } else if (obj.name == "tooth_22") {

        obj.position.x = obj.position.x - 9.5;
        obj.position.y = obj.position.y + 0.5;
        obj.position.z = obj.position.z - 0.5;
        obj.rotateX(Num_Radian(10));
        obj.rotateZ(Num_Radian(346));
        varToothClass.tooth_22 = obj;

    } else if (obj.name == "tooth_23") {

        obj.position.x = obj.position.x - 3;
        obj.position.y = obj.position.y - 1;
        obj.position.z = obj.position.z + 5;
        obj.rotateX(Num_Radian(15));

        varToothClass.tooth_23 = obj;

    } else if (obj.name == "tooth_24") {

        obj.position.x = obj.position.x - 8;
        obj.position.z = obj.position.z + 0;
        varToothClass.tooth_24 = obj;

    } else if (obj.name == "tooth_25") {

        obj.position.x = obj.position.x - 8;
        obj.position.z = obj.position.z ;
        varToothClass.tooth_25 = obj;

    } else if (obj.name == "tooth_26") {

        obj.position.x = obj.position.x - 6;
   
        varToothClass.tooth_26 = obj;

    } else if (obj.name == "tooth_27") {

        obj.position.x = obj.position.x - 7;

        varToothClass.tooth_27 = obj;

    } 
    
    
    else if (obj.name == "tooth_41") {
        obj.position.x = 8.2;
        obj.position.z = obj.position.z + 0;
        varToothClass.tooth_41 = obj;

    } else if (obj.name == "tooth_42") {
        obj.position.x = obj.position.x - 5;
        obj.position.z = obj.position.z + 5;
        obj.rotateY(Num_Radian(350));
        obj.rotateX(Num_Radian(350));
        varToothClass.tooth_42 = obj;


    } else if (obj.name == "tooth_43") {

        obj.position.x = obj.position.x - 5.5;
        obj.position.y = obj.position.y + 1;
        obj.position.z = obj.position.z + 5.5;
        obj.rotateY(Num_Radian(360));
        obj.rotateX(Num_Radian(15));
        varToothClass.tooth_43 = obj;

    } else if (obj.name == "tooth_44") {

        obj.position.x = obj.position.x - 7;
        obj.position.z = obj.position.z + 2;
        obj.rotateY(Num_Radian(360));
        obj.rotateZ(Num_Radian(350));
        obj.rotateX(Num_Radian(350));
        
        varToothClass.tooth_44 = obj;

    } else if (obj.name == "tooth_45") {

        obj.position.x = obj.position.x - 8;
        obj.position.z = obj.position.z + 1;
        varToothClass.tooth_45 = obj;

    } else if (obj.name == "tooth_46") {

        obj.position.x = obj.position.x - 5;
        obj.position.y = obj.position.y - 2;
        varToothClass.tooth_46 = obj;

    } else if (obj.name == "tooth_47") {

        obj.position.x = obj.position.x - 5;

        varToothClass.tooth_47 = obj;

    } 

}