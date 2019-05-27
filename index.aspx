<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        <%=m_title%></title>
</head>
<style>
    #m_LoadingDiv
    {
        width: 100%;
        height: 2000px;
        position: absolute;
        top: 0px;
        left: 0px;
        background: #202020;
        filter: alpha(opacity=80);
        z-index: 16;
    }
    body
    {
        font-family: Monospace;
        font-size: 13px;
        text-align: center;
        margin: 0px;
        overflow: hidden;
    }
    #info
    {
        position: absolute;
        top: 30px;
        left: 45%;
        padding: 5px;
        font-family: "宋体" , "Dosis" , sans-serif;
        font-size: 150px;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px #ffffff;
        background-size: cover;
    }
    a
    {
        color: #2983ff;
    }
</style>
            <!--             库文件调用                     -->
            <script charset="gb2312" language="javascript" src="lib/three.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/Detector.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/stats.min.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/OrbitControls.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/jszip.js" type="text/javascript"></script>
            <%-- <script charset="gb2312" language="javascript" src="lib/ShaderSkin.js" type="text/javascript"></script>--%>
            <script charset="gb2312" language="javascript" src="lib/Water.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/dat.gui.min.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/Refractor.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/Reflector.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/hilbert3D.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/CurveExtras.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/shaders/FXAAShader.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/shaders/CopyShader.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/postprocessing/EffectComposer.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/postprocessing/RenderPass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/postprocessing/ShaderPass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="lib/postprocessing/OutlinePass.js" type="text/javascript"></script>
            <!--           3djs库文件调用                     -->
            <script charset="gb2312" language="javascript" src="3Djs/VariableClass_Standard.js"  type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/BaseRenderClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/SceneClass_Standard.js"  type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/CameraClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/LightClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/bar.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/MaterialClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/LoadZLFClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/OBJLoader.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/PsarticleClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/CanvasRenderer.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/AnimationClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/3dTextClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="3Djs/MouseClass_Standard.js" type="text/javascript"></script>
             <!--           Tooth库文件调用                     -->
              <script charset="gb2312" language="javascript" src="Tooth/ToolClass.js" type="text/javascript"></script>
               <script charset="gb2312" language="javascript" src="Tooth/ToolPanelClass.js" type="text/javascript"></script>
<%-- <script charset="gb2312" language="javascript" src="Tooth/ErrorTitle.js" type="text/javascript"></script>
           <script charset="gb2312" language="javascript" src="Tooth/JS_PointClass.js" type="text/javascript"></script>
          <script charset="gb2312" language="javascript" src="Tooth/JScript.js" type="text/javascript"></script>
          <script charset="gb2312" language="javascript" src="Tooth/Tooth_Enamel.js" type="text/javascript"></script>
           <script charset="gb2312" language="javascript" src="Tooth/VarTooth.js" type="text/javascript"></script>--%>
<!----------------------------------字体库------------------------------------>
<script charset="gb2312" language="javascript" src="fonts/gentilis_regular.typeface.js"
    type="text/javascript"></script>
<script charset="gb2312" language="javascript" src="fonts/gentilis_bold.typeface.js"
    type="text/javascript"></script>
<!--------------------------------------------------------------------------------------->
<script charset="gb2312" language="javascript" type="text/javascript">

    var m_VarGlobal = new VariableClass();
    var m_initArr;
    var m_SceneArr;
    var clock = new THREE.Clock();

    var mixer, animationClip;
    var particles, geometry, materials = [], parameters, i, h, color, sprite, size;

    var varToothClass = new VarToothClass();
    varToothClass.m_Error = new ErrorTiltleClass();
    varToothClass.m_Enamel = new EnamelObj();
    function InitWebgl() {
        m_VarGlobal.m_Mouse = new StereMouse();

        m_VarGlobal.m_BaseRender = new BaseRenderer('webgl');


      


        for (var i = 0; i < m_VarGlobal.m_XMLWall.length; i++) {
            if (m_VarGlobal.m_XMLWall[i] != "") {

                var m_arr = m_VarGlobal.m_XMLWall[i];

                if (m_arr[0] == "init") {
                    m_initArr = m_VarGlobal.m_XMLWall[i];


                    m_VarGlobal.m_Camera = new PerspeCamera(m_arr[2], m_arr[3], m_arr[4]);
                    m_VarGlobal.m_CubeCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 20000);

                }
                if (m_arr[0] == "Scene") {

                    m_SceneArr = m_VarGlobal.m_XMLWall[i];
                }

            }
        }
        m_VarGlobal.m_BaseSence = new BaseScene();
        m_VarGlobal.m_Animation = new AnimationClass();

        // scene.fog = new THREE.FogExp2(0x000000, 0.0008);
        //  m_VarGlobal.m_BaseSence.m_Scene.fog = new THREE.FogExp2(0xffff00, 0.008);
        //alert(m_VarGlobal.m_BaseSence.m_Scene.fog)
       
        m_VarGlobal.m_BaseSence.CreateBackGround(m_initArr);
        m_VarGlobal.m_BaseSence.init();
        m_VarGlobal.m_Mouse.init();
        //        var loader = new THREE.TextureLoader();
        //        var groundTexture = loader.load('mode/grasslight-big.jpg');
        //        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        //        groundTexture.repeat.set(25, 25);
        //        groundTexture.anisotropy = 16;
        //        var groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
        //        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
        //        mesh.position.y = -250;
        //        mesh.rotation.x = -Math.PI / 2;
        //        mesh.receiveShadow = true;
        //        Obj_Add(mesh);

        onSetEnvironment()
        m_VarGlobal.m_Controls = new THREE.OrbitControls(m_VarGlobal.m_Camera.m_Camera, document.getElementById('webgl'));


        m_VarGlobal.m_Tooth_ToolBar = new Tooth_ToolBar();
        m_VarGlobal.m_ToothPanel_Top = new ToothPanel_Top();
       // alert(333);
      
        // m_VarGlobal.m_Camera = new PerspeCamera(0, 10, 50);

        //  m_VarGlobal.m_Camera.lookAtPos(new THREE.Vector3(-1.22, 2.18, 4.58));



        //        var grid = new THREE.GridHelper(40, 40, 0x888888, 0x888888);
        //        grid.position.set(0, -1.1, 0);
        //Obj_Add(grid);

        // alert(m_VarGlobal.m_LoadTotal)


        // var m_load = new ObjectLoader();

        //        m_load.load("Tooth/m_Json.json", function (text) {
        //           
        //            var obj = JSON.parse(text);
        //            //alert(obj.init.Tooth[0]);
        //            //alert(obj.init.Tooth[1]);
        //            //alert(obj.init.Tooth[2]);
        //            //alert(obj.init.Tooth[3]);
        //            //alert(obj.init.Tooth[4]);
        //            //alert(obj.init.Tooth[5]);
        //            //alert(obj);
        //            //alert(varToothClass.m_Enamel.initTooth)
        //            //varToothClass.m_Enamel.initTooth(obj.init.Tooth[0], obj.init.Tooth[1], obj.init.Tooth[2], obj.init.Tooth[3], obj.init.Tooth[4], obj.init.Tooth[5], obj);
        //        });
        SetLoadingPart(100);
        onRenderTick();
       
        //        var geometry = new THREE.BoxBufferGeometry(5, 5, 5);
        //        var material = new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true });
        //        var mesh = new THREE.Mesh(geometry, material);
        //        Obj_Add(mesh);


        //new THREE.ObjectLoader().load("pump/pump.json", function (model) {

        //          Obj_Add(model);
        //          mixer = new THREE.AnimationMixer(model);
        //          alert(model.animations.length)
        //            mixer.clipAction(model.animations[0]).play();


        // });



    }

    function onSetEnvironment() {


        m_VarGlobal.m_BaseSence.CreateSysPic(); //加载图片
        m_VarGlobal.m_BaseSence.CreateSysWall(); //加载墙面
        m_VarGlobal.m_BaseSence.CreateSysCylinder()//加载圆柱
        m_VarGlobal.m_BaseSence.CreateSysLight(); //加载灯光
    }
    var m_ResLoading = 0;
    var m_LongPart = 2;
    function SetLoadingPart(num) {

        // m_SaveDataStr= document.getElementById('SysSave_id').value;

        var m_Iframe = window.frames["iframe_loading"].document;

        if (!m_Iframe) {

            m_Iframe = window.frames["iframe_loading"].contentWindow.document;

        }

        if (iframe_loading_name.window.m_part) {
            clearInterval(m_ResLoading);
            iframe_loading_name.window.SetClearInterval();
            iframe_loading_name.window.SetPartPos(num);
            //iframe_loading_name.window.SetLoop();
            m_ResLoading = 0
        } else {
            if (m_ResLoading == 0) {

                m_ResLoading = setInterval("SetLoadingPart(" + num + ")", 100);
            }
        }

    }
    function SetLoadingVisible(s_name) {//设置 进度条隐藏

        document.getElementById(s_name).style.display = 'none';
        m_VarGlobal.m_BaseSence.CreateModeChild();
        //        var m_obj = Global_SeachObj("guan");
        //        var m_Material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0008");
        //        m_obj.material = m_Material;

        //        var m_obj = Global_SeachObj("jiazi");
        //        var m_Material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0007");
        //        var texture = THREE.ImageUtils.loadTexture("textures/hardwood2_diffuse.jpg");
        //        m_Material.map = texture
        //        m_obj.material = m_Material;
        //        var textureLoader = new THREE.TextureLoader();

        //        var m_obj = Global_SeachObj("xiguan");
        //        var m_Material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0009");
        //        m_obj.material = m_Material;

        //        var m_obj = Global_SeachObj("xiang");
        //        var m_Material = m_VarGlobal.m_BaseSence.m_BaseMaterial.PhongInfoMaterial("code_0010");
        //        m_obj.material = m_Material;
        // m_Material.specularMap = textureLoader.load("textures/pump_metalreflect.jpg")
        //  alert(m_obj.name);
        ///////////////////关键帧动画
        //  mixer = new THREE.AnimationMixer(m_VarGlobal.m_BaseSence.m_dis);//设置播放跟目录

        mixer = new THREE.AnimationMixer(m_VarGlobal.m_BaseSence.m_dis);

        for (var i = 0; i < m_VarGlobal.m_Animation.m_animations.length; i++) {//播放动画

            var clipAction = mixer.clipAction(m_VarGlobal.m_Animation.m_animations[i]);
            clipAction.play();


        }
        ///////////////////关键帧动画
        //        var textureLoader = new THREE.TextureLoader();
        //        var material = new THREE.MeshPhongMaterial({
        //            color: 0xf5cdad,
        //            specular: 0x222222,
        //           // ambient: 0x222222,
        //            shininess: 35,
        //            map: textureLoader.load("mode/face/脸.jpg"),
        //            specularMap: textureLoader.load("mode/face/脸1.jpg"),
        //            normalMap: textureLoader.load("mode/face/脸2.png"),
        //            normalScale: new THREE.Vector2(0.05, 0.05)
        //        });
        //       
        //        var m_obj = SeachObj(m_VarGlobal.m_BaseSence.m_dis, "t_face");
        //        m_obj.traverse(function (child) {

        //            if (child instanceof THREE.Mesh) {

        //                child.material = material;
        //                child.material.skinning = true;
        //              //  skinning
        //                //   alert(3);


        //            }
        //        })
        //////水

        //        var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
        //        var material = new THREE.MeshBasicMaterial();
        //        material.transparent = true;
        //        material.opacity =0.1;
        //        mesh = new THREE.Mesh(geometry, material);
        //        m_VarGlobal.m_BaseSence.m_dis.add(mesh);
        //        var params = {
        //            color: '#ffffff',
        //            scale: 0.1,
        //            flowX: 1,
        //            flowY: 1
        //        };
        //        var groundGeometry = new THREE.PlaneBufferGeometry(230, 230);
        //        var groundMaterial = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.4 });
        //     
        //        var ground = new THREE.Mesh(groundGeometry, groundMaterial);
        //       ground.rotation.x = Math.PI * -0.5;
        //        ground.rotation.y = -201;
        //        m_VarGlobal.m_BaseSence.m_dis.add(ground);



        //        var textureLoader = new THREE.TextureLoader();
        //        textureLoader.load('mode/hardwood2_diffuse.jpg', function (map) {
        //            map.wrapS = THREE.RepeatWrapping;
        //            map.wrapT = THREE.RepeatWrapping;
        //            map.anisotropy = 16;
        //            map.repeat.set(4, 4);
        //            groundMaterial.map = map;
        //            groundMaterial.needsUpdate = true;
        //        });




        //        var waterGeometry = new THREE.PlaneBufferGeometry(200, 200);
        //        
        //        water = new THREE.Water(waterGeometry, {
        //            color: params.color,
        //            scale: params.scale,
        //            flowDirection: new THREE.Vector2(params.flowX, params.flowY),
        //            textureWidth: 1024,
        //            textureHeight: 1024
        //           
        //        });

        //        water.position.y = -31;
        //        water.position.y = 1;
        //        water.rotation.x = Math.PI * -0.5;
        //        m_VarGlobal.m_BaseSence.m_dis.add(water);

        /////线

        //        var geometry = new THREE.Geometry();
        //        var points = hilbert3D(new THREE.Vector3(0, 0, 0), 100.0, 2, 0, 1, 2, 3, 4, 5, 6, 7);
        //        var colors = [];
        //      
        //        for (i = 0; i < points.length; i++) {
        //            geometry.vertices.push(points[i]);
        //            colors[i] = new THREE.Color(0xff0000);
        //            colors[i].setHSL(0.6, 1.0, Math.max(0, (200 - points[i].x) / 400) * 0.5 + 0.5);
        //          
        //        }
        //       
        //        geometry.colors = colors;
        //        material = new THREE.LineBasicMaterial({ color: 0xffff00, opacity: 0.1, linewidth: 100, vertexColors: THREE.VertexColors });


        //        var line, p, scale = 0.3, d = 0;
        //        var parameters = [
        //					[material, scale * 1.5, [-d, 0, 0], geometry]					
        //				];
        //        for (i = 0; i < parameters.length; ++i) {
        //            p = parameters[i];
        //            line = new THREE.Line(p[3], p[0]);
        //            line.scale.x = line.scale.y = line.scale.z = p[1];
        //            line.position.x = p[2][0];
        //            line.position.y = p[2][1];
        //            line.position.z = p[2][2];
        //            m_VarGlobal.m_BaseSence.m_dis.add(line);
        //        }


    }
    function OnloadXML(arr) {

        m_VarGlobal.m_XMLWall = arr;
        m_VarGlobal.m_LoadTotal = Load_total();
        InitWebgl();



    }
    function initload() {

        document.getElementById("Div_LoadXML").innerHTML = "<iframe src='LoadXML_Standard.aspx?id=<%=m_id %>' width='0' height='0'></iframe>";

    }
</script>
<body onload="initload()" style="background-color: Gray">
    <div id="webgl">
    </div>
    <div id="info" style="font-size: xx-large; font-family: @黑体">
        锅炉
    </div>
    <div id="m_LoadingDiv">
        <iframe id='iframe_loading' name="iframe_loading_name" src="loading.html" width='100%'
            height='100%' frameborder='0' scrolling='no'></iframe>
    </div>
    <div id="Div_LoadXML">
    </div>
</body>
</html>
