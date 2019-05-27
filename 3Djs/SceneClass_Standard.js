var SceneClass = function () {
    this.m_Scene = new THREE.Scene();  
   
    this.m_SceneCube = new THREE.Scene();

    this.m_dis = null;
    this.m_TextureCube = null;


};

////基础场景
var BaseScene = function () {
    SceneClass.call(this);

   // this.m_ToolBar = new CtrlTool();
   // this.m_ViewTool = new ViewTool();
    // this.m_TestMTL = new Obj_MTL();
    //this.m_BaseColor = new BaseColor();

    //this.m_TestShapes = new BaseShapes();


    this.CreateDis();
   
    this.m_BaseMaterial = new BaseColor();
 
    //this.m_men = null;
    //  this.m_peng = null;

}
   
BaseScene.prototype = Object.create(SceneClass.prototype);
BaseScene.prototype.CreateDis = function () {

    // var geometry = new THREE.PlaneGeometry(50, 50); // Create a 20 by 20 by 20 cube.	  
    // m_Material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });


    this.m_dis = new THREE.Group();
    this.m_dis.name = 'Sys_Sence';
    //this.m_dis.visible = false;
    //   this.m_dis.scale.set(2,2,2);
    //  this.m_dis.position.y = -1000;

    this.m_dis.position.x = m_SceneArr[2];
    this.m_dis.position.y = m_SceneArr[3];
    this.m_dis.position.z = m_SceneArr[4];

    this.m_dis.rotation.x = Num_Radian(m_SceneArr[5]);
    this.m_dis.rotation.y = Num_Radian(m_SceneArr[6]);
    this.m_dis.rotation.z = Num_Radian(m_SceneArr[7]);

    this.m_dis.scale.set(m_SceneArr[8], m_SceneArr[9], m_SceneArr[10]); //模型缩放 X,Y,Z

    this.m_Scene.add(this.m_dis);



    // this.m_dis.position.y = -80;
    //this.m_dis.rotation.y = Num_Radian(180);
    // this.m_dis.rotation.x = Num_Radian(30);
    //this.m_dis.rotation.z = Num_Radian(-5);
    //  this.m_Scene.add(this.m_dis);


    this.m_skyobj = this.makeSkybox([
                    m_initArr[8], // right
                    m_initArr[9], // left
                    m_initArr[10], // top
                    m_initArr[11], // bottom
                   m_initArr[12], // back
                    m_initArr[13]  // front
                ], m_initArr[14]);

    if (m_initArr[7]) {

        this.m_SceneCube.add(this.m_skyobj);

    }

    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {
        var m_arr = m_VarGlobal.m_XMLWall[i];

        if (m_arr != "") {
            if (m_arr[0] == "Psarticle") {

                m_VarGlobal.m_Psarticle.push(new Psarticle_Effect());

                m_VarGlobal.m_Psarticle[m_VarGlobal.m_Psarticle.length - 1].Create(this.m_dis, m_arr, m_arr[2], m_arr[3], m_arr[4], m_arr[5], m_arr[6], m_arr[7], m_arr[8], m_arr[9], m_arr[10], m_arr[11], m_arr[12], m_arr[13], m_arr[14], m_arr[15], m_arr[16], m_arr[1], m_arr[20], m_arr[21], m_arr[23], m_arr[22]);

            }
        }
    }

    // m_VarGlobal.m_Obj_Rotate_Type = 1;
   
    return;

};
BaseScene.prototype.CreateFog = function (color,min,max) {//场景羽化设置
    this.m_Scene.fog = new THREE.Fog(color, min, max);
}
BaseScene.prototype.CreateBackGround = function (m_arr) {
   
    if (m_arr[5] != "") {
        if (m_arr[7]) {
            return;
        }
       
        var m_color = parseInt(m_arr[5]);

        this.m_Scene.background = new THREE.Color(m_color);

    }
    if (m_arr[6] != "") {
        if (m_arr[7]) {
            return;
        }
        var loader = new THREE.TextureLoader();
        var backTexture = loader.load(m_arr[6]);
        backTexture.wrapS = backTexture.wrapT = THREE.RepeatWrapping;
        backTexture.repeat.set(1, 1);
        backTexture.anisotropy = 16;

        this.m_Scene.background = backTexture;

    }
}
BaseScene.prototype.CreateModeChild = function () {
    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {
        var m_arr = m_VarGlobal.m_XMLWall[i];

        if (m_arr != "") {
            if (m_arr[0] == "ModeChild") {

                var m_obj = Global_SeachObj(m_arr[2]);

                m_obj = Global_SeachObj(m_arr[1], m_obj)
                var m_Material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_arr[4]);
                if (m_arr[3]!=="") {
                    var texture = THREE.ImageUtils.loadTexture(m_arr[3]);
                    texture.repeat.set(m_arr[5], m_arr[6]);
                }
                m_Material.map = texture
                m_obj.material = m_Material;
               // alert(m_obj.name);
            }
        }
    }
}
BaseScene.prototype.CreateSysWall = function () {
    //alert(m_VarGlobal.m_XMLWall.length)
    var m_Wall = new THREE.Object3D();
    m_Wall.name = "Sys_Wall"
    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {

        if (m_VarGlobal.m_XMLWall[i][0] == "Wall") {
            
            var geometry = new THREE.BoxGeometry(m_VarGlobal.m_XMLWall[i][8], m_VarGlobal.m_XMLWall[i][9], m_VarGlobal.m_XMLWall[i][10]);
           
            if (m_VarGlobal.m_XMLWall[i][11] != "") {
                var texture = THREE.ImageUtils.loadTexture(m_VarGlobal.m_XMLWall[i][11]);
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                texture.repeat.set(m_VarGlobal.m_XMLWall[i][13], m_VarGlobal.m_XMLWall[i][14]);
                //  var m_material = new THREE.MeshPhongMaterial({ map: texture, color: 0xffffff, ambient: 0x808080, emissive: 0xdfd2cc, specular: 0x111111, shininess: 30, perPixel: true, skinning: false });
                var m_material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_VarGlobal.m_XMLWall[i][12]);
                m_material.map = texture;
            } else {
                //var m_material = new THREE.MeshPhongMaterial({ color: 0xffffff, ambient: 0x808080, emissive: 0xdfd2cc, specular: 0x111111, shininess: 30, perPixel: true, skinning: false });
                var m_material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_VarGlobal.m_XMLWall[i][12]);

            }
            // m_material.transparent = true;
            /// m_material.opacity = 0.2;
            //             // m_material.opacity = 0.99999;

            var m_PWall = new THREE.Mesh(geometry, m_material);
            //  alert(this.m_TestShapes)
            //         var m_PWall= this.m_TestShapes.CreateMyCubeObj(m_material, m_VarGlobal.m_XMLWall[i][8], m_VarGlobal.m_XMLWall[i][9], m_VarGlobal.m_XMLWall[i][10]);
            m_PWall.name = m_VarGlobal.m_XMLWall[i][1];

            m_PWall.position.x = m_VarGlobal.m_XMLWall[i][2];
            m_PWall.position.y = m_VarGlobal.m_XMLWall[i][3];
            m_PWall.position.z = m_VarGlobal.m_XMLWall[i][4];
            m_PWall.rotation.set(Num_Radian(m_VarGlobal.m_XMLWall[i][5]), Num_Radian(m_VarGlobal.m_XMLWall[i][6]), Num_Radian(m_VarGlobal.m_XMLWall[i][7]));
            //
            if (m_VarGlobal.m_XMLWall[i][15] != null) {
                m_material.depthTest = true;
                m_PWall.renderDepth = m_VarGlobal.m_XMLWall[i][15];
            }
            // alert(m_PWall.renderDepth)
            m_Wall.add(m_PWall)
            // alert(m_PWall)

        }

    }
    this.m_dis.add(m_Wall);

}
BaseScene.prototype.CreateSysCylinder = function () {
    //alert(m_VarGlobal.m_XMLWall.length)

    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {

        if (m_VarGlobal.m_XMLWall[i][0] == "Cylinder") {

            var geometry = new THREE.CylinderGeometry(m_VarGlobal.m_XMLWall[i][8], m_VarGlobal.m_XMLWall[i][9], m_VarGlobal.m_XMLWall[i][10], m_VarGlobal.m_XMLWall[i][15], m_VarGlobal.m_XMLWall[i][16]);
           // alert(34);
            if (m_VarGlobal.m_XMLWall[i][11] != "") {
                var texture = THREE.ImageUtils.loadTexture(m_VarGlobal.m_XMLWall[i][11]);
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                texture.repeat.set(m_VarGlobal.m_XMLWall[i][13], m_VarGlobal.m_XMLWall[i][14]);
                //  var m_material = new THREE.MeshPhongMaterial({ map: texture, color: 0xffffff, ambient: 0x808080, emissive: 0xdfd2cc, specular: 0x111111, shininess: 30, perPixel: true, skinning: false });
                var m_material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_VarGlobal.m_XMLWall[i][12]);
                m_material.map = texture;
            } else {
                //var m_material = new THREE.MeshPhongMaterial({ color: 0xffffff, ambient: 0x808080, emissive: 0xdfd2cc, specular: 0x111111, shininess: 30, perPixel: true, skinning: false });
                var m_material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_VarGlobal.m_XMLWall[i][12]);

            }
            // m_material.transparent = true;
            /// m_material.opacity = 0.2;
            //             // m_material.opacity = 0.99999;

            var m_Cylinder = new THREE.Mesh(geometry, m_material);
            m_Cylinder.name = m_VarGlobal.m_XMLWall[i][1];

            m_Cylinder.position.x = m_VarGlobal.m_XMLWall[i][2];
            m_Cylinder.position.y = m_VarGlobal.m_XMLWall[i][3];
            m_Cylinder.position.z = m_VarGlobal.m_XMLWall[i][4];
            m_Cylinder.rotation.set(Num_Radian(m_VarGlobal.m_XMLWall[i][5]), Num_Radian(m_VarGlobal.m_XMLWall[i][6]), Num_Radian(m_VarGlobal.m_XMLWall[i][7]));
            m_Cylinder.castShadow = true;
            if (m_VarGlobal.m_XMLWall[i][17] != null) {
                m_material.depthTest = true;
                m_Cylinder.renderDepth = m_VarGlobal.m_XMLWall[i][17];
            }
            this.m_dis.add(m_Cylinder);


        }

    }


}
BaseScene.prototype.CreateSysLight = function () {
  
    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {

        if (m_VarGlobal.m_XMLWall[i][0] == "Light") {
           
            if (m_VarGlobal.m_XMLWall[i][2] == "AmbientLight") {
                var m_Light = new AmbientLight(m_VarGlobal.m_XMLWall[i][6]); //灯光
                m_Light.SetPostion(m_VarGlobal.m_XMLWall[i][3], m_VarGlobal.m_XMLWall[i][4], m_VarGlobal.m_XMLWall[i][5]);
                
                m_VarGlobal.m_Light_child.push(m_Light);

            } else if (m_VarGlobal.m_XMLWall[i][2] == "DirectionLight") {
                var m_Light = new DirectionLight(m_VarGlobal.m_XMLWall[i][6], m_VarGlobal.m_XMLWall[i][7]); //灯光
                m_Light.SetPostion(m_VarGlobal.m_XMLWall[i][3], m_VarGlobal.m_XMLWall[i][4], m_VarGlobal.m_XMLWall[i][5]);
                m_VarGlobal.m_Light_child.push(m_Light);

            } else if (m_VarGlobal.m_XMLWall[i][2] == "PointLight") {

                var m_Light = new PointLight(m_VarGlobal.m_XMLWall[i][6], m_VarGlobal.m_XMLWall[i][7], m_VarGlobal.m_XMLWall[i][8], m_VarGlobal.m_XMLWall[i][9]); //灯光
                m_Light.SetPostion(m_VarGlobal.m_XMLWall[i][3], m_VarGlobal.m_XMLWall[i][4], m_VarGlobal.m_XMLWall[i][5]);
                m_VarGlobal.m_Light_child.push(m_Light);

            } else if (m_VarGlobal.m_XMLWall[i][2] == "SpotLight") {


                var m_Light = new SpotLight(m_VarGlobal.m_XMLWall[i][6], m_VarGlobal.m_XMLWall[i][7], m_VarGlobal.m_XMLWall[i][9], Math.PI / 3, m_VarGlobal.m_XMLWall[i][10]);
                if (m_VarGlobal.m_XMLWall[i][16]) {
                    m_Light.SetLightShadow(true);
                }

                m_Light.SetCameraArea(m_VarGlobal.m_XMLWall[i][14], m_VarGlobal.m_XMLWall[i][15]);
                m_Light.SetTargetPos(m_VarGlobal.m_XMLWall[i][11], m_VarGlobal.m_XMLWall[i][12], m_VarGlobal.m_XMLWall[i][13]);
                m_Light.SetPostion(m_VarGlobal.m_XMLWall[i][3], m_VarGlobal.m_XMLWall[i][4], m_VarGlobal.m_XMLWall[i][5]);
                m_Light.SetCameraFov(m_VarGlobal.m_XMLWall[i][8]);
                m_VarGlobal.m_Light_child.push(m_Light);


            }
        }
    }
    ;
}

BaseScene.prototype.CreateSysPic = function () {

    var m_Pic = new THREE.Object3D();
    m_Pic.name = "Sys_Pic";

    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {

        if (m_VarGlobal.m_XMLWall[i][0] == "Pic") {
          
            var geometry = new THREE.PlaneGeometry(m_VarGlobal.m_XMLWall[i][8], m_VarGlobal.m_XMLWall[i][9]);

            if (m_VarGlobal.m_XMLWall[i][11] != "") {
                var texture = THREE.ImageUtils.loadTexture(m_VarGlobal.m_XMLWall[i][11]);
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(m_VarGlobal.m_XMLWall[i][12], m_VarGlobal.m_XMLWall[i][13]);
                // var m_material = new THREE.MeshPhongMaterial({ refractionRatio: 0.98, reflectivity: 0.5, envMap: m_VarGlobal.m_BaseSence.m_TextureCube, map: texture, color: 0xffffff, ambient: 0xffffff, emissive: 0x999999, specular: 0x888888, shininess: 30, perPixel: true, skinning: false });
                
                var m_material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_VarGlobal.m_XMLWall[i][14]);

                m_material.map = texture;
            } else {
                var m_material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_VarGlobal.m_XMLWall[i][14]);

            }
           
            m_material.transparent = true;

            var m_PPic = new THREE.Mesh(geometry, m_material);
            m_PPic.name = m_VarGlobal.m_XMLWall[i][1];
            //  alert(m_PPic.name);
            m_PPic.position.x = m_VarGlobal.m_XMLWall[i][2];
            m_PPic.position.y = m_VarGlobal.m_XMLWall[i][3];
            m_PPic.position.z = m_VarGlobal.m_XMLWall[i][4];
            m_PPic.rotation.set(Num_Radian(m_VarGlobal.m_XMLWall[i][5]), Num_Radian(m_VarGlobal.m_XMLWall[i][6]), Num_Radian(m_VarGlobal.m_XMLWall[i][7]));
            // alert(this.m_dis);
            m_PPic.receiveShadow = true;
            if (m_VarGlobal.m_XMLWall[i][15] != null) {
                m_material.depthTest = true;
                m_PPic.renderDepth = m_VarGlobal.m_XMLWall[i][15];
            }

            m_Pic.add(m_PPic);
           

        }

    }

    //  m_VarGlobal.m_Obj_Goods.push(m_Pic);
    this.m_dis.add(m_Pic);
  
}
//////////////////////////////
////替换为 CreateSysPic 函数
/////////////////////////////////
//BaseScene.prototype.CreateSysFloor = function () {

//    var m_Floor = new THREE.Object3D();
//    m_Floor.name = "Sys_Floor"

//    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {

//        if (m_VarGlobal.m_XMLWall[i][0] == "Floor") {

//            var geometry = new THREE.PlaneGeometry(m_VarGlobal.m_XMLWall[i][8], m_VarGlobal.m_XMLWall[i][9]);

//            if (m_VarGlobal.m_XMLWall[i][11] != "") {
//                var texture = THREE.ImageUtils.loadTexture(m_VarGlobal.m_XMLWall[i][11]);
//                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//                texture.repeat.set(m_VarGlobal.m_XMLWall[i][12], m_VarGlobal.m_XMLWall[i][13]);
//              
//                var m_material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, color: 0xffffff, ambient: 0x808080, emissive: 0xdfd2cc, specular: 0x111111, shininess: 30, perPixel: true, skinning: false });

//            } else {
//                var m_material = new THREE.MeshPhongMaterial({ color: 0xffffff, ambient: 0x808080, emissive: 0xdfd2cc, specular: 0x111111, shininess: 30, perPixel: true, skinning: false });

//            }
//            m_material.transparent = true;
//            var m_PFloor = new THREE.Mesh(geometry, m_material);
//            m_PFloor.name = m_VarGlobal.m_XMLWall[i][1];
//            m_PFloor.position.x = m_VarGlobal.m_XMLWall[i][2];
//            m_PFloor.position.y = m_VarGlobal.m_XMLWall[i][3];
//            m_PFloor.position.z = m_VarGlobal.m_XMLWall[i][4];
//            m_PFloor.rotation.set(Num_Radian(m_VarGlobal.m_XMLWall[i][5]), Num_Radian(m_VarGlobal.m_XMLWall[i][6]), Num_Radian(m_VarGlobal.m_XMLWall[i][7]));
//            // alert(this.m_dis);
//            m_PFloor.receiveShadow = true;
//           
//            m_Floor.add(m_PFloor)


//        }

//    }
//   
//    //  m_VarGlobal.m_Obj_Goods.push(m_Floor);
//    this.m_dis.add(m_Floor);
//    
//}
BaseScene.prototype.SetCubeMaterials = function (color, Arr) {

    var materials = [];

    for (var i = 0; i < 6; i++) {

        var texture = THREE.ImageUtils.loadTexture(Arr[i]);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);


        materials[i] = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, color: 0xffffff, ambient: color, emissive: color, specular: color, shininess: 30, perPixel: true, skinning: false, side: THREE.DoubleSide });
    }
    return materials;
}

BaseScene.prototype.CreatePsarticle = function (x, y, z, rx, ry, rz, velx, vely, velz, tpx, tpy, tpz, img, size, count, name,color) {
    // 创建粒子geometry 
    
    var particleCount = count,
    particles = new THREE.Geometry();
    var pMaterial = new THREE.ParticleBasicMaterial({ color: color, size: size, map: THREE.ImageUtils.loadTexture(img), blending: THREE.AdditiveBlending, transparent: true });

    // 依次创建单个粒子 
    // var m_tp = 20;
    for (var p = 0; p < particleCount; p++) {
        // 粒子范围在-250到250之间 

        var pX = Math.random() * tpx,
        pY = Math.random() * tpy,
        pZ = Math.random() * tpz,
        particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
        // 将粒子加入粒子geometry 
        particles.vertices.push(particle);
        particle.velocity = new THREE.Vector3(velx, vely, velz);
    }


    // 创建粒子系统 
    var particleSystem = new THREE.ParticleSystem(particles, pMaterial);
   // alert(name);
    particleSystem.name = name;
    particleSystem.position.x = x;
    particleSystem.position.y = y;
    particleSystem.position.z = z;
    particleSystem.rotation.x = Num_Radian(rx);
    particleSystem.rotation.y = Num_Radian(ry);
    particleSystem.rotation.z = Num_Radian(rz);
    // 将粒子系统加入场景 
    particleSystem.sortParticles = true;
    this.m_dis.add(particleSystem);

}
BaseScene.prototype.init = function () {
    // Obj_Add(this.CreateObject());

    //  this.m_TestImageObj = new Image_JPG();
    this.m_TestLoadObj = new LoadObj_OBJ();

    //  var loader = new LoadObj_OBJ();
    // alert(loader.load)
    //loader.load('tet', 'mode/upcera/洗手台.zlf', this.CreateTestLoadObj);
    //object.position.y = - 95;
    //scene.add( object );
    //	Obj_Add(object);


    // this.m_TestLoadSTL = new LoadObj_STL();

    //this.m_TestLoadSTL.load('mode/right_hand.stl', this.CreateTestLoadSTL);//加载MTL文件 CreateTestLoadSTL 回调函数
    // for (var i = 0; i < m_node.length; i++) {
    //  this.m_TestLoadObj.load(m_node[i][12], this.CreateTestLoadObj); 
    //  }
    //加载OBJ文件 CreateTestLoadObj 回调函数

    //m_VarGlobal.m_Obj_Rotate_Type = 1;
    // return;
    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {
        if (m_VarGlobal.m_XMLWall[i][0] == "Mode") {
            //  alert(m_VarGlobal.m_XMLWall[i][1])
        
            this.m_TestLoadObj.load(m_VarGlobal.m_XMLWall[i][1], m_VarGlobal.m_XMLWall[i][12], this.CreateTestLoadObj);

        }
    }

}

BaseScene.prototype.CreateTestLoadObj = function (content, url, name) {

    //  Obj_Add(content);



    var m_name = name;

    //url = url.replace('.obj', '0.jpg'); //贴图 加载
    var m_data = new Array();

    for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {
        if (m_VarGlobal.m_XMLWall[i][1] == name) {
            m_data = m_VarGlobal.m_XMLWall[i];
            break;
        }
    }
    // alert(m_data);
    //材质贴图

    // var m_Material = new THREE.MeshPhongMaterial({ refractionRatio: 0.98, reflectivity: 0.3, envMap: m_VarGlobal.m_BaseSence.m_TextureCube, color: 0xffffff, side: THREE.DoubleSide, ambient: 0xffffff, emissive: 0xc2b3ae, specular: 0xd2cac7, shininess: 70, perPixel: true, skinning: false });
    var m_Material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_data[18]);
    var textureLoader = new THREE.TextureLoader();
    // m_Material.specularMap = textureLoader.load("textures/pump_metalreflect.jpg")
    //   m_Material.transparent = true;
    var object = content;
    object.scale.set(m_data[8], m_data[9], m_data[10]); //模型缩放 X,Y,Z
    object.name = m_name;
    //alert(m_name);
    object.material = m_Material;
    var m_Min = new THREE.Vector3(0, 0, 0);
    var m_Max = new THREE.Vector3(0, 0, 0);


    if (m_data[11] != "") {

        var texture = THREE.ImageUtils.loadTexture(m_data[11]);
    }
    object.traverse(function (child) {
       // alert(child.name);
        if (child instanceof THREE.Mesh) {
            child.geometry.computeBoundingBox();
            var m_DisMin = child.geometry.boundingBox.min;
            var m_DisMax = child.geometry.boundingBox.max;
            m_Max.max(m_DisMax);
            m_Min.min(m_DisMin);

            child.material = m_Material;


            if (m_data[11] != "") {
                // texture = m_ImageObj.texture;
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1, 1);
                child.material.map = texture;

            }
            child.castShadow = m_data[20];
            child.receiveShadow = true;
            //child.castShadow = true;
            if (m_data[19] != null) {
                m_Material.depthTest = true;
                child.renderDepth = m_data[19];
            }

        }
    })
    //alert(m_Max.y*9 - m_Min.y*9)

    Obj_Add(object);
    // initTooth();



//    m_VarGlobal.GoodsList.push(object);
    //    var m_cycle = new CycleClass();

    //    object.userData.m_Cycle = m_cycle;
    object.castShadow = true;


    

    object.position.x = m_data[2];
    object.position.y = m_data[3];

    object.position.z = m_data[4];

   
   // object.useQuaternion = true;
    object.rotateX(Num_Radian(m_data[5]));
    object.rotateY(Num_Radian(m_data[6]));
    object.rotateZ(Num_Radian(m_data[7]));
    m_VarGlobal.m_Animation.init(object);

    Set_Loading(url, 1);

    //    object.userData.m_BackUp_quaternion.copy(object.quaternion);

    //    object.userData.m_Animation_Radian = new Animation_Radian();

    //    object.userData.m_Animation_Radian.Rotation(object);
    //    // object.userData.m_Animation_Radian.Clear_SetInterval(); 
    //    object.userData.m_Animation_Move = new Animation_Move();
    //    object.userData.m_Animation_Move.Move(object);
    //    // object.userData.m_Animation_Move.Clear_SetInterval(); 
    //    //  m_VarGlobal.m_BaseSence.MakeShadow(object, m_Max, m_Min);

    //    if (m_data[21]) {
    //        var m_refY = m_Max.y * m_data[9] - m_Min.y * m_data[9];
    //        m_VarGlobal.m_BaseSence.Reflective(object, m_data, m_refY)
    //    }


    return;






}
BaseScene.prototype.Reflective = function (obj, m_data, refY) {
    var m_copy = obj.clone();
    var m_copyMaterial = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial(m_data[18]);

    //  m_copyMaterial_Depth.color = new THREE.Color(0xd4d400);



    m_copyMaterial.opacity = m_data[22];
    //alert(m_copyMaterial.opacity)
    var m_angle = -m_data[6];
  
    // m_copy_Depth.position.x = 400;
    if (m_data[6] == 0) {
        m_angle = 180
    } 
    m_copy.rotateZ(Num_Radian(m_angle));
    m_copy.position.y = m_data[3] - refY;

    m_copy.traverse(function (child) {

        if (child instanceof THREE.Mesh) {


            child.material = m_copyMaterial;
            child.name += "_copy";
            child.castShadow = false;
            child.renderDepth = m_data[19];
            //child.renderDepth = 51;

        }
    })



    Obj_Add(m_copy);
}
BaseScene.prototype.rotateMatrix = function (rotateStart, rotateEnd) {
    var axis = new THREE.Vector3(),
                quaternion = new THREE.Quaternion();
  
    //得到开始和结束向量间的夹角    
    var angle = Math.acos(rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length());

    if (angle) {  //如果夹角等于0， 说明物体没有旋转
        axis.crossVectors(rotateStart, rotateEnd).normalize();  //rotateStart,rotateEnd向量乘积 标准化 得到旋转轴
        angle *= _that.rotationSpeed; //rotationSpeed旋转系数 得到旋转弧度
        quaternion.setFromAxisAngle(axis, angle);  //从一个旋转轴和旋转弧度得到四元组， 如果要让物体相反方向旋转 设置angle为负
    }
    return quaternion; //返回一个旋转的四元数
}

BaseScene.prototype.handleRotation = function (object) {
   
   // _that.rotateEndPoint = _that.projectOnTrackball(_that.deltaX, _that.deltaY);
    var rotateQuaternion = m_VarGlobal.m_BaseSence.rotateMatrix(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0));
    
    var curQuaternion = object.quaternion;
    curQuaternion.multiplyQuaternions(rotateQuaternion, curQuaternion); //设置四元组 a x b
    curQuaternion.normalize();
 //   alert(curQuaternion.y);
    object.setRotationFromQuaternion(curQuaternion);  //方法通过规范化的旋转四元数直接应用旋转  参数必须normalize()
};
BaseScene.prototype.PosRandom = function (obj, pa) {
//alert(pa)
    obj.position.x = Math.random() * 800 - 400;
   // alert(pa);
    if (pa < 1) {
        pa = 1;
    }
    obj.position.z =pa;
    obj.position.y = Math.random() * 600 - 400;
    // alert(obj.position.x + "|" + obj.position.y+"|"+obj.position.z);
}
BaseScene.prototype.MakeShadow = function (obj, m_Max, m_Min) {//制作影子
 //   
    var m_material = m_VarGlobal.m_BaseSence.m_BaseColor.BasicMaterial(0xff0000, 0.0000001);  
    var m_obj = m_VarGlobal.m_BaseSence.m_TestShapes.CreateCubeObj(m_Max.x - m_Min.x, m_Max.y - m_Min.y, m_Max.z - m_Min.z, 1, 1, 1);   
    m_obj.material = m_material;
    m_obj.position.z = (m_Max.z - m_Min.z) / 2;
    m_obj.castShadow = true;   
    obj.add(m_obj);
}
BaseScene.prototype.makeSkybox = function (urls, size) {

    var textureLoader = new THREE.TextureLoader();

    var texture0 = THREE.ImageUtils.loadTexture(urls[0]);
    var texture1 = THREE.ImageUtils.loadTexture(urls[1]);
    var texture2 = THREE.ImageUtils.loadTexture(urls[2]);
    var texture3 = THREE.ImageUtils.loadTexture(urls[3]);
    var texture4 = THREE.ImageUtils.loadTexture(urls[4]);
    var texture5 = THREE.ImageUtils.loadTexture(urls[5]);

    //    var materials = [
    //    new THREE.MeshBasicMaterial({ map: texture0, side: THREE.DoubleSide, transparent: true }),
    //    new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide, transparent: true }),
    //    new THREE.MeshBasicMaterial({ map: texture2, side: THREE.DoubleSide, transparent: true }),
    //    new THREE.MeshBasicMaterial({ map: texture3, side: THREE.DoubleSide, transparent: true }),
    //    new THREE.MeshBasicMaterial({ map: texture4, side: THREE.DoubleSide, transparent: true }),
    //    new THREE.MeshBasicMaterial({ map: texture5, side: THREE.DoubleSide, transparent: true })
    //    ];

    //    var faceMaterial = new THREE.MeshFaceMaterial(materials);

    var geometry = new THREE.BoxGeometry(size, size, size);



    //    var m_geometry = new THREE.SphereGeometry(300, 16, 16);
    //   // m_geometry.uvsNeedUpdate = true;


    this.m_TextureCube = THREE.ImageUtils.loadTextureCube(urls);

    this.m_TextureCube.format = THREE.RGBAFormat;
    this.m_TextureCube.mapping = THREE.CubeReflectionMapping;

    var cubeShader = THREE.ShaderLib["cube"];

    var cubeMaterial = new THREE.ShaderMaterial({
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        depthWrite: false,
        side: THREE.DoubleSide
    });

    cubeMaterial.uniforms["tCube"].value = this.m_TextureCube;

    var boxMesh = new THREE.Mesh(geometry, cubeMaterial);
    // boxMesh.rotation.x = Num_Radian(180);
    boxMesh.name = "Sky_Box";
  
    return boxMesh;
}
BaseScene.prototype.test = function () {
}
BaseScene.prototype.Seach_Obj = function (obj, name) {
  


}
BaseScene.prototype.CreateTestLoadSTL = function (geometry) {

  
    
    
    

}
BaseScene.prototype.CreateTestLoadImage = function (content) {


}

////控制场景
var CtrlScene = function () {
    SceneClass.call(this);
  
   
  //  this.CreateDis();
};
CtrlScene.prototype = Object.create(SceneClass.prototype);
CtrlScene.prototype.CreateDis = function () {

    var geometry = new THREE.PlaneGeometry(50, 50); // Create a 20 by 20 by 20 cube.	  
    m_Material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    this.m_dis = new THREE.Mesh(geometry, m_Material);
    this.m_dis.name = 'Sys_Sence';
    // this.m_dis.visible = false;
    this.m_Scene.add(this.m_dis);
  

};