var ToothClass = function () {//基类
    this.m_point = null; //点对象
    this.m_line = null; //线对象
    this.m_face = null; //面对象
    this.m_r = 0; //创建圆柱的半径
    this.m_h = 0; //创建圆柱的高度
    this.m_IMax = 0; //创建的列数
    this.m_JMax = 0; //创建的行数
    this.arr_geometry = null; //存储点数组
    this.arr_mr = null; //存储半径数组
    this.json = null; //json数据
};

var ToothObj = function () {//派生类
    ToothClass.call(this);
    this.m_Pos = new THREE.Vector3(0, 0, 0); //位置
    this.m_Sacle = new THREE.Vector3(1, 1, 1); //缩放
    this.m_Rotate = new THREE.Vector3(0, 0, 0); //旋转

};

ToothObj.prototype = Object.create(ToothClass.prototype);

ToothObj.prototype.initTooth = function (r, hr, row, col) {//初始化创建 r半径，hr行高，row行数，col列数
    this.arr_geometry = new THREE.Geometry(); ;
    this.m_r = r; //半径
    this.m_h = hr; //行高
    this.m_JMax = row; //行数
    this.m_IMax = col; //列数

    for (var j = 0; j < this.m_JMax; j++) {
        var m_jr = this.m_r;
        m_jr = this.Row_r(m_jr, j);
        for (var i = 0; i < this.m_IMax + 1; i++) {
            var m_pos = new THREE.Vector3(0, 0, 0);
            m_pos.x = (m_jr) * Math.sin(Num_Radian((i / this.m_IMax) * 360));
            m_pos.y = j * this.m_h;
            m_pos.z = (m_jr) * Math.cos(Num_Radian((i / this.m_IMax) * 360));
            m_pos = this.Row_pos(m_pos, j);
            this.arr_geometry.vertices.push(m_pos);
        }
    }

    for (var j = 0; j < this.m_JMax; j++) {
        for (var i = 0; i < this.m_IMax + 1; i++) {
            this.SetPoint(this.arr_geometry.vertices[j * (this.m_IMax + 1) + i], j, i, this.m_JMax, this.m_IMax, this.arr_geometry.vertices);
        }
    }

    //this.CreateFaces(); //创建面
    //////////////////显示与隐藏////////////////////
    //this.VisibleFace(true);//显示隐藏面
    //this.RemoveFace();//移除面
    //this.ShowPoint();//显示点
    //this.RemovePoint();//移除点
    //this.ShowLine();//显示线
    //this.RemoveLine()//移除线
    //this.ShowCode(0);//显示点编号
    ////////////////////移动////////////////////
    //this.MovePoint(0, 0, 0, 10);//点编号移动
    //this.pointNumCode(1, 1, 0, 0, 10);//计算点编号移动
    //this.MoveLine_row(0, 0, 0, 10);//移动单行线
    //this.MoveLine_col(0, 0, 0, 10);//移动单列线
    ////////////////////位置////////////////////
    //var m_pos = this.m_Pos;
    //this.SetPostion(m_pos, this.m_face);
    ////////////////////缩放////////////////////
    //var m_sacle = this.m_Sacle;
    //this.SetSacle(m_sacle, this.m_face);
    ////////////////////旋转////////////////////
    //var m_rotate = this.m_Rotate;
    //this.SetRotate(m_rotate, this.m_face);
}

ToothObj.prototype.Row_r = function (m_jr, j) {//每行的半径

    this.arr_mr[j] = m_jr;

    return this.arr_mr[j];

}

ToothObj.prototype.Row_pos = function (m_pos, j) {//每行的位置

    return m_pos;

}

ToothObj.prototype.SetPoint = function (pt, j, i, jmax, imax, arr) {//设置点位

}

ToothObj.prototype.CreateFaces = function (material, transparency,num) {//创建面
    var geometry = new THREE.Geometry();
    geometry.vertices = this.arr_geometry.vertices;
    var m_rowNum = geometry.vertices.length / (this.m_IMax + 1);
    var m_colNum = (this.m_IMax + 1);
    m_rowNum = m_rowNum - 1;
    for (var i = 0; i < m_colNum * m_rowNum - 1; i++) {
        //        if (i + (this.m_IMax + 1) >= geometry.vertices.length) {
        //            break;
        //        }
        //        var face = new THREE.Face3(i, i + 1, i + this.m_IMax + 1);
        //        geometry.faces.push(face);
        //        var face = new THREE.Face3(i + this.m_IMax + 2, i + this.m_IMax + 1, i + 1);
        //        geometry.faces.push(face);

        if (i + (this.m_IMax + 1) >= geometry.vertices.length) {
            break;
        }
        if (i % m_colNum < 63) {
            //alert(i)
            var face = new THREE.Face3(i, i + 1, i + this.m_IMax + 1);
            geometry.faces.push(face);
            var face = new THREE.Face3(i + this.m_IMax + 2, i + this.m_IMax + 1, i + 1);
            geometry.faces.push(face);
        } else if (i % m_colNum < 64) {
            //alert(i)
            var face = new THREE.Face3(i, i - 63, i + this.m_IMax + 1);
            geometry.faces.push(face);

            // alert(i + this.m_IMax)
            var face = new THREE.Face3(i - 63, i - 63 + this.m_IMax + 1, i + this.m_IMax + 1);
            geometry.faces.push(face);
        }

    }
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    var texture = THREE.ImageUtils.loadTexture("mode/bgchangfang.png");
    var m_Materials = this.CreateMaterial(material, transparency);
    //  m_Materials.wireframe = true
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    var m_Obj_dis = new THREE.Mesh(geometry, m_Materials);
    this.m_face = m_Obj_dis;
    this.m_face.visible = true;
    this.m_face.name = "tooth_" + num;
    Obj_Add(m_Obj_dis); //添加牙面
    return m_Obj_dis;
}

ToothObj.prototype.CreateFaces_1 = function (material, transparency, num) {//创建面
    var geometry = new THREE.Geometry();
    geometry.vertices = this.arr_geometry.vertices;
    var m_rowNum = geometry.vertices.length / (this.m_IMax + 1);
    var m_colNum = (this.m_IMax + 1);
    m_rowNum = m_rowNum - 1;
    for (var i = 0; i < m_colNum * m_rowNum - 1; i++) {
        if (i + (this.m_IMax + 1) >= geometry.vertices.length) {
            break;
        } else if ((i + 1) % (this.m_IMax + 1) == 0 && i != 0) {

        } else {
            var face = new THREE.Face3(i, i + 1, i + this.m_IMax + 1);
            geometry.faces.push(face);
            var face = new THREE.Face3(i + this.m_IMax + 2, i + this.m_IMax + 1, i + 1);
            geometry.faces.push(face);
        }
    }
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    var texture = THREE.ImageUtils.loadTexture("mode/bgchangfang.png");
    var m_Materials = this.CreateMaterial(material, transparency);
    //  m_Materials.wireframe = true
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    var m_Obj_dis = new THREE.Mesh(geometry, m_Materials);
    this.m_face = m_Obj_dis;
    this.m_face.visible = true;
    this.m_face.name = "tooth_1_" + num;
    Obj_Add(m_Obj_dis); //添加牙面
    return m_Obj_dis;
}

ToothObj.prototype.VisibleFace = function (state) {//显示隐藏牙面，state为true或false
    if (this.m_face) {
        this.m_face.visible = state;
    }
}

ToothObj.prototype.RemoveFace = function () {//移除面
    if (this.m_face) {
        m_VarGlobal.m_BaseSence.m_dis.remove(this.m_face);
    }
}

ToothObj.prototype.CreateMaterial = function (material, transparency) {//创建材质，material材质编号，transparency透明度

    var m_Materials = new m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(material);
    m_Materials.transparent = true;
    m_Materials.opacity = transparency;

    return m_Materials;
}

ToothObj.prototype.ShowPoint = function () {//显示点
    particles = new THREE.Geometry();
    var pMaterial = new THREE.ParticleBasicMaterial({ color: 0xffffff, size: 2, transparent: true });
    for (var p = 0; p < this.arr_geometry.vertices.length; p++) {
        particle = new THREE.Vertex(new THREE.Vector3(this.arr_geometry.vertices[p].x, this.arr_geometry.vertices[p].y, this.arr_geometry.vertices[p].z));
        particles.vertices.push(particle);
    }
    var particleSystem = new THREE.ParticleSystem(particles, pMaterial);
    this.m_point = particleSystem;
    this.m_point.sortParticles = true;
    this.m_point.name = "point_test";
    this.m_point.sortParticles = true;
    this.m_point.visible = true;
    this.m_point.position.x = 0;
    this.m_point.position.y = 0;
    this.m_point.position.z = 0;
    this.m_point.scale.set(1, 1, 1);
    Obj_Add(particleSystem);
}

ToothObj.prototype.RemovePoint = function () {//移除点
    if (this.m_point) {
        m_VarGlobal.m_BaseSence.m_dis.remove(this.m_point);
    }
}

ToothObj.prototype.ShowLine = function () {//显示线
    //    var material = new THREE.LineBasicMaterial({
    //        color: 0xff0000
    //    });
    //    var line = new THREE.Line(this.arr_geometry, material, THREE.LineStrip);
    //    this.m_line = line;
    //    this.m_line.name = "line_test"
    //    this.m_line.visible = true;
    //    Obj_Add(line);
    // alert(this.m_face.material.wireframe)
    this.m_face.material.wireframe = true
}

ToothObj.prototype.RemoveLine = function () {//移除线
    if (this.m_line) {
        m_VarGlobal.m_BaseSence.m_dis.remove(this.m_line);
    }
}

ToothObj.prototype.ShowCode = function (rownum, type) {//显示点编号，rownum行，type每几个显示
    var step = type || 1;
    var arr = this.arr_geometry.vertices;
    var m_num = this.m_IMax + 1;
    var loader = new THREE.FontLoader();
    var x = 0, y = 0, z = 0;
    var m_scope = this;
    loader.load('fonts/helvetiker_bold.typeface.js', function (font) {

        for (var i = 0; i < arr.length; i++) {

            if (i >= rownum * (m_scope.m_IMax + 1) && i < (rownum + 1) * (m_scope.m_IMax + 1) && i % step == 0) {
                var m_t = Create3dText("" + i % m_num, 1, font);
                m_t.position.x = arr[i].x + m_scope.m_Pos.x - 0.5;
                m_t.position.y = arr[i].y + m_scope.m_Pos.y + 0.5;
                m_t.position.z = arr[i].z + m_scope.m_Pos.z - 0.5;
                Obj_Add(m_t);
            }
            if (i % m_num == 0) {
                var m_t = Create3dText("" + i / m_num, 1, font);
                m_t.position.x = 40;
                m_t.position.y = arr[i].y + m_scope.m_Pos.y;
                m_t.position.z = 30;
                Obj_Add(m_t);
            }
        }
    });
}

ToothObj.prototype.MovePoint = function (num, x, y, z, type, coor) {//点编号移动，num点编号，x,y,z移动距离，type移动类型，0为加，1为等于,coor为调整的坐标
    if (this.arr_geometry.vertices != null) {
        if (num >= 0 && num <= this.arr_geometry.vertices.length) {
            if (!type) {
                this.arr_geometry.vertices[num].x += x;
                this.arr_geometry.vertices[num].y += y;
                this.arr_geometry.vertices[num].z += z;
            }
            else {
                if (coor == "x") {
                    this.arr_geometry.vertices[num].x = x;
                    this.arr_geometry.vertices[num].y += y;
                    this.arr_geometry.vertices[num].z += z;
                }
                else if (coor == "y") {
                    this.arr_geometry.vertices[num].x += x;
                    this.arr_geometry.vertices[num].y = y;
                    this.arr_geometry.vertices[num].z += z;
                }
                else if (coor == "z") {
                    this.arr_geometry.vertices[num].x += x;
                    this.arr_geometry.vertices[num].y += y;
                    this.arr_geometry.vertices[num].z = z;
                }
                else {
                    this.arr_geometry.vertices[num].x = x;
                    this.arr_geometry.vertices[num].y = y;
                    this.arr_geometry.vertices[num].z = z;
                }
            }
            return this.arr_geometry.vertices;
        }
        else {
            varToothClass.m_Error.Info(1); //点编号错误
        }
    }
    else {
        varToothClass.m_Error.Info(0); //存储点数组为空
    }

    return -1;
}

ToothObj.prototype.pointNumCode = function (row, col, x, y, z, type, coor) {//计算点编号移动，row行，col列，x,y,z移动距离,type移动类型,coor为调整的坐标
    if (row >= 0 && row <= this.m_JMax) {
        if (col >= 0 && col <= this.m_IMax) {
            var m_num = row * (this.m_IMax + 1) + col;
            this.MovePoint(m_num, x, y, z, type, coor);
        }
        else {
            varToothClass.m_Error.Info(3); //列编号错误
        }
    }
    else {
        varToothClass.m_Error.Info(2); //行编号错误
    }
    return -1;
}

ToothObj.prototype.MoveLine_row = function (row, x, y, z, type, coor) {//移动单行线,row第几行，x,y,z移动距离，type移动类型,coor为调整的坐标
    if (this.arr_geometry.vertices != null) {
        if (row >= 0 && row <= this.m_JMax) {
            for (var i = 0; i <= this.m_IMax; i++) {
                this.pointNumCode(row, i, x, y, z, type, coor);
            }
            return this.arr_geometry.vertices;
        }
        else {
            varToothClass.m_Error.Info(2); //行编号错误
        }
    }
    else {
        varToothClass.m_Error.Info(0); //存储点数组为空
    }
    return -1;
}

ToothObj.prototype.MoveLine_col = function (col, x, y, z, type, coor) {//移动单列线，colnum第几列，x,y,z移动的距离，type移动类型,coor为调整的坐标
    if (this.arr_geometry.vertices != null) {
        if (col >= 0 && col <= this.m_IMax) {
            for (var i = 0; i < this.m_JMax; i++) {
                this.pointNumCode(i, col, x, y, z, type, coor);
            }
            return this.arr_geometry.vertices;
        }
        else {
            varToothClass.m_Error.Info(3); //列编号错误
        }
    }
    else {
        varToothClass.m_Error.Info(0); //存储点数组为空
    }
    return -1;
}

ToothObj.prototype.MoveLine_Partcol = function (row1, row2, col, x, y, z, type, coor) {//移动部分单列线，row1起始行，row2结束行，row1<row2，col第几列，x,y,z移动的距离，type移动类型,coor为调整的坐标
    if (this.arr_geometry.vertices != null) {
        if (col >= 0 && col <= this.m_IMax) {
            if (row1 >= 0 && row1 <= this.m_JMax) {
                if (row2 >= 0 && row2 <= this.m_JMax) {
                    for (var i = row1; i <= row2; i++) {
                        this.pointNumCode(i, col, x, y, z, type, coor);
                    }
                    return this.arr_geometry.vertices;
                } else {
                    varToothClass.m_Error.Info(2); //行编号错误
                }
            } else {
                varToothClass.m_Error.Info(2); //行编号错误
            }

        }
        else {
            varToothClass.m_Error.Info(3); //列编号错误
        }
    }
    else {
        varToothClass.m_Error.Info(0); //存储点数组为空
    }
    return -1;
}

ToothObj.prototype.MoveFace = function (arr_face, x, y, z, type, coor) {//移动面，arr_face移动点数组，x, y, z移动的距离，type移动类型,coor为调整的坐标
    if (this.arr_geometry.vertices != null) {
        if (arr_face.length > 0) {
            for (var i = 0; i < arr_face.length; i++) {
                if (arr_face[i] <= this.arr_geometry.vertices.length) {
                    var row = parseInt(arr_face[i] / (this.m_IMax + 1));
                    var col = arr_face[i] - row * (this.m_IMax + 1);
                    this.pointNumCode(row, col, x, y, z, type, coor);
                }
            }
            return this.arr_geometry.vertices;
        }
        else {
            varToothClass.m_Error.Info(4); //移动面数组为空
        }
    }
    else {
        varToothClass.m_Error.Info(0); //存储点数组为空
    }
    return -1;
}

ToothObj.prototype.SetPostion = function (pos, m_obj) {//设置位置
    if (!m_obj) {
        if (this.m_face) {
            this.m_face.position.x = pos.x;
            this.m_face.position.y = pos.y;
            this.m_face.position.z = pos.z;
        }
    }
    else {
        if (m_obj) {
            m_obj.position.x = pos.x;
            m_obj.position.y = pos.y;
            m_obj.position.z = pos.z;
        }
    }
}

ToothObj.prototype.SetSacle = function (m_Sacle, m_obj) {//设置缩放
    if (!m_obj) {
        if (this.m_face) {
            this.m_face.scale.set(m_Sacle.x, m_Sacle.y, m_Sacle.z);
        }
        if (this.m_line) {
            this.m_line.scale.set(m_Sacle.x, m_Sacle.y, m_Sacle.z);
        }
        if (this.m_point) {
            this.m_point.scale.set(m_Sacle.x, m_Sacle.y, m_Sacle.z);
        }
    }
    else {
        if (m_obj) {
            m_obj.scale.set(m_Sacle.x, m_Sacle.y, m_Sacle.z);
        }
    }
}

ToothObj.prototype.SetRotate = function (m_Rotate, m_obj) {//设置旋转
    if (!m_obj) {
        if (this.m_face) {
            this.m_face.rotateX(Num_Radian(m_Rotate.x));
            this.m_face.rotateY(Num_Radian(m_Rotate.y));
            this.m_face.rotateZ(Num_Radian(m_Rotate.z));
        }
        if (this.m_line) {
            this.m_line.rotateX(Num_Radian(m_Rotate.x));
            this.m_line.rotateY(Num_Radian(m_Rotate.y));
            this.m_line.rotateZ(Num_Radian(m_Rotate.z));
        }
        if (this.m_point) {
            this.m_point.rotateX(Num_Radian(m_Rotate.x));
            this.m_point.rotateY(Num_Radian(m_Rotate.y));
            this.m_point.rotateZ(Num_Radian(m_Rotate.z));
        }
    }
    else {
        if (m_obj) {
            m_obj.rotateX(Num_Radian(m_Rotate.x));
            m_obj.rotateY(Num_Radian(m_Rotate.y));
            m_obj.rotateZ(Num_Radian(m_Rotate.z));
        }
    }
}