<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Tooth.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>牙医虚拟实验室</title>
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
<link rel="stylesheet" type="text/css" href="css/arc.css" />
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
               <%--<script charset="gb2312" language="javascript" src="Tooth/ToolPanelClass.js" type="text/javascript"></script>--%>
               <script charset="gb2312" language="javascript" src="Tooth/SmallSence.js" type="text/javascript"></script>

                 <script charset="gb2312" language="javascript" src="Tooth/ErrorTitle.js" type="text/javascript"></script>
           <script charset="gb2312" language="javascript" src="Tooth/JS_PointClass.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="Tooth/Tooth_Enamel.js" type="text/javascript"></script>
           <script charset="gb2312" language="javascript" src="Tooth/VarTooth.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="Tooth/ObjectLoader.js" type="text/javascript"></script>
            <script charset="gb2312" language="javascript" src="Tooth/RecordClass.js" type="text/javascript"></script>
        <script charset="gb2312" language="javascript" src="Tooth/PatternClass.js" type="text/javascript"></script>
            <!--           easyui.css                     -->

     <link href="Styles/pc.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="Scripts/jquery-2.1.4.min.js"></script>
    <link rel="stylesheet" type="text/css" href="themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="themes/icon.css"/>
    <script type="text/javascript" src="Scripts/jquery.min.js"></script>
	<script type="text/javascript" src="Scripts/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="Scripts/jQueryRotate.js"></script>
   
   
     <!--           右上工具栏-王                    -->
      <script charset="gb2312" language="javascript" src="Tooth/Toptool.js" type="text/javascript"></script>
       <!--  高佳慧  -->
      <script charset="gb2312" language="javascript" src="Tooth/ToolClass.js" type="text/javascript"></script>

        <%--wangchi--%>


             <script charset="gb2312" language="javascript" src="Tooth/bianxing.js" type="text/javascript"></script>



            <%--wangchi-->%

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
    var varToothClass = new VarToothClass();
    varToothClass.m_Error = new ErrorTiltleClass();
    varToothClass.m_Pattern = new PatternObj();
    varToothClass.m_Record = new RecordObj();
    //  varToothClass.m_Enamel = new EnamelObj();
    function InitWebgl() {

        m_VarGlobal.m_Mouse = new StereMouse();

        m_VarGlobal.m_BaseRender = new BaseRenderer('webgl');

        ////////////////////////////////////////////////////





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




        m_VarGlobal.m_BaseSence.CreateBackGround(m_initArr);
        m_VarGlobal.m_BaseSence.init();
        m_VarGlobal.m_Mouse.init();
        m_VarGlobal.m_SmallSence = new SmallSenceClass();
        onSetEnvironment()
        m_VarGlobal.m_Controls = new THREE.OrbitControls(m_VarGlobal.m_Camera.m_Camera, document.getElementById('webgl'));

        //左工具栏
        //        m_VarGlobal.m_Tooth_ToolBar = new Tooth_ToolBar();

        m_VarGlobal.m_Tooth_ToolBar = varToothClass.m_Tool = new Tooth_ToolBar();

        //       右上工具栏

        m_VarGlobal.m_ToothPanel_Top = new ToothPanel_Top();
        // alert(m_VarGlobal.m_ToothPanel_Top);
        m_VarGlobal.m_ToothPanel_Top.ToolSelect(0);

        SetLoadingPart(100);
        onRenderTick();

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


        //varToothClass.tooth_11 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_11.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_11.initTooth(obj);
        //});

        //varToothClass.tooth_12 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_12.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_12.initTooth(obj);
        //});

        //varToothClass.tooth_13 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_13.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_13.initTooth(obj);
        //});

        //varToothClass.tooth_14 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_14.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_14.initTooth(obj, 1);
        //});

        //varToothClass.tooth_15 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_15.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_15.initTooth(obj, 1);
        //});

        //varToothClass.tooth_16 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_16.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_16.initTooth(obj, 1);
        //});

        //varToothClass.tooth_17 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_17.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_17.initTooth(obj, 1);
        //});

        //varToothClass.tooth_31 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_31.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_31.initTooth(obj);
        //});

        //varToothClass.tooth_32 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_32.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_32.initTooth(obj);
        //});

        //varToothClass.tooth_33 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_33.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_33.initTooth(obj);
        //});

        //varToothClass.tooth_34 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_34.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_34.initTooth(obj, 1);
        //});

        //varToothClass.tooth_35 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_35.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_35.initTooth(obj, 1);
        //});

        //varToothClass.tooth_36 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_36.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_36.initTooth(obj, 1);
        //});

        //varToothClass.tooth_37 = new EnamelObj();
        //var m_load = new ObjectLoader();
        //m_load.load("Tooth/m_Json_37.json", function (text) {
        //    var obj = JSON.parse(text);
        //    varToothClass.tooth_37.initTooth(obj, 1);
        //});

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
        varToothClass.m_beiYa = new DiYiBu();

        //varToothClass.m_beiYa.ForTooth_1(9)
        //varToothClass.m_beiYa.ForTooth_1(9)
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
<body onload="initload()" style="margin: 0px;padding: 0px; background-color: #191919;">
 <%--<div id="webPanel"  style=" position:absolute;width:150px; height:150px; right:15%; top:5%; background-color:#191919">
    
 </div>--%>
 <!-----------------------------三维开始-------------------------->
 <div id="webgl">
    </div>

      <div id="Div_LoadXML">
    </div>
    
<!-----------------------------三维结束-------------------------->
   
     
    
    <div id="m_LoadingDiv">
        <iframe id='iframe_loading' name="iframe_loading_name" src="loading.html" width='100%'
            height='100%' frameborder='0' scrolling='no'></iframe>
    </div>
<div class="dibu"></div><!-- 状态栏-->
    <!-- 菜单栏-->
	<div id="dh">
	<ul class='ul'>
		<li class='li'><a class="a" href="#" style="text-decoration: none;">
		首页</a></li>
		<li class="btn "><a class="btn1" href="#">模式选择</a>  
        <ul>  
            <li><a href="#" onclick="varToothClass.m_Pattern.Pattern(1)">练习模式</a></li>  
            <li><a href="#" onclick="varToothClass.m_Pattern.Pattern(2)">教学模式</a></li>  
            <li><a href="#" onclick="varToothClass.m_Pattern.Pattern(3)">考试模式</a></li>  
           
        </ul> 
    </li>  
		<li class="li"><a class="a" href="#">工具</a></li>
		<li class="li"><a class="a" href="#">设置</a></li>
		<li class="li"><a class="a" href="#">帮助</a></li>
	</ul>
	</div>
	<!-- 左侧工具栏-->
	<!-- 左侧工具栏-->
	<div id="zuo">
		<ul class="ul">
			<li><a class="a11"  title="tnc-01" id="Tool_btn1">
			<img src="img/gongju/tnc-01.png" onclick="varToothClass.m_Tool.Choose_Tool(1)" >
			</a></li>
			<li><a class="a11"  title="tnc-02" id="Tool_btn2">
			<img src="img/gongju/tnc-02.png" onclick="varToothClass.m_Tool.Choose_Tool(2)" >
			</a></li>
			<li><a class="a11"  title="tnc-03" id="Tool_btn3">
			<img src="img/gongju/tnc-03.png" onclick="varToothClass.m_Tool.Choose_Tool(3)" >
			</a></li>
			<li><a class="a11"  title="tnc-04" id="Tool_btn4">
			<img src="img/gongju/tnc-04.png" onclick="varToothClass.m_Tool.Choose_Tool(4)" >
			</a></li>
			<li><a class="a11"  title="tnc-05" id="Tool_btn5">
			<img src="img/gongju/tnc-05.png" onclick="varToothClass.m_Tool.Choose_Tool(5)" >
			</a></li>
			<li><a class="a11"  title="tnc-06" id="Tool_btn6">
			<img src="img/gongju/tnc-06.png" onclick="varToothClass.m_Tool.Choose_Tool(6)" >
			</a></li>
			<li><a class="a11"  title="tnc-07" id="Tool_btn7">
			<img src="img/gongju/tnc-07.png" onclick="varToothClass.m_Tool.Choose_Tool(7)" >
			</a></li>
			<li><a class="a11"  title="tnc-08" id="Tool_btn8">
			<img src="img/gongju/tnc-08.png" onclick="varToothClass.m_Tool.Choose_Tool(8)" >
			</a></li>
            <li><a class="a11"  title="tnc-09" id="Tool_btn9">
            <img src="img/gongju/tnc-09.png" onclick="varToothClass.m_Tool.Choose_Tool(9)" >
            </a></li>
			</ul>
	</div>
    <!-- 下部工具栏栏-->
	<!-- 下部工具栏栏-->

	<div style="width: 350;height: 180px;padding: 0px;margin: 0px;float: left;
		position: absolute;left: 60px;top: 0%;z-index: 11;">
		<div class="tz">
			<%--<span id="">Adjust</span>--%>
            <div style="height:61px;width:190px;">
                <img id="Tool_img" src="img/gongju/select.png"/>
            </div>

			<span id="Tool_Text">调整</span>
		</div>
		<div class="tz1" onclick="varToothClass.m_Tool.Choose_yazhen()">
			<img src="img/fangxiang_1.png" id="img_Tool_1" />
		</div>
		<div id="tz2">
			<ul style="width: 120px;height: 35px;margin-top:5px;">
		<li class="li2"><a href="#" title="移动" onclick="varToothClass.m_Tool.Choose_Tool(10)"><img id="hand_move" src="img/shubiao.png"></a></li>
		<li class="li2"><a href="#" title="选中" onclick="varToothClass.m_Tool.Choose_Tool(11)"><img id="hand_click" src="img/shou.png"></a>	</li>
		<li class="li2"><a href="#" title="重置" onclick="varToothClass.m_Tool.Lens_reset()" ><img src="img/chongzhi.png"></a>	</li>
			</ul>
			
		</div>
	</div>

	<div style="float: right;position:fixed;top: 42px;right:0;z-index: 10;">
    	<!--右侧工具栏-->
	<div id="youce">
		<ul style="display: inline; float: left;list-style: none;margin: 0px;padding: 0px;
			text-align: center;vertical-align: bottom;">
			<li style="width: 30px;height: 30px;margin-top: 20px;">
				<a><img src="img/youce/tubiao.png" onclick="varToothClass.m_Tool.Choose_back()" ></a>
			</li>
			<li style="width: 30px;height: 30px;margin-top: 10px;">
				<a><img src="img/youce/wangge.png" onclick="varToothClass.m_Tool.Choose_fuck()"></a>
			</li>
			<li style="width: 30px;height: 30px;margin-top: 10px;">
				<a><img src="img/youce/shuazi.png" onclick="varToothClass.m_Tool.Choose_caizhi()"></a>
			</li>
			
		</ul>
		<ul style="display: inline; float: left;list-style: none;margin-bottom: 10%;padding: 0px;
			text-align: center;">
            	<li style="width: 30px;height: 30px;margin-top: 10px;">
				<a><img src="img/youce/shange.png" onclick="varToothClass.m_Tool.Choose_hide_shange()"></a>
			</li>
			<li style="width: 30px;height: 30px;margin-top: 10px;">
				<a><img src=" img/youce/shetou.png" onclick="varToothClass.m_Tool.Choose_shetou()"></a>
			</li>
			<li style="width: 30px;height: 30px;margin-top: 20px;">
				<a><img src="img/youce/xiae.png" onclick="varToothClass.m_Tool.Choose_hide_xiae()"></a>
			</li>
			<li style="width: 30px;height: 30px;margin-top: 10px;">
				<a><img src=" img/youce/bizui1.png" onclick="varToothClass.m_Tool.move_obj()" id="open_mouse"></a>
			</li>
			<li style="width: 30px;height: 30px;margin-top: 10px;">
				<a><img src=" img/youce/dingwei.png" onclick="varToothClass.m_Tool.select_dangqianya()"></a>
			</li>
			<%--<li style="width: 30px;height: 30px;margin-top: 10px;">
				<a><img src="img/youce/deng.png "></a>
			</li>
			<li style="width: 30px;height: 30px;margin-top: 10px;">
				<a><img src="img/youce/zhangzui.png"></a>
			</li>	--%>
		</ul>
	</div>
		<!--右侧第一个面板工具栏-->
	<div  style="width: 291px;
		        height: 100%;
		        border: #0f0f0f 1px solid;
		        border-top: 0;
		        background-color: #535353;
		        float:left;
		        padding: 0px;
		        margin: 0px;
		        float: left;
		        position: relative;
		        min-height: 2000px;">
	<div id="sh">
		<div style="width: 291px;height: 30px;
			background-color: #3a3a3a;float: left;line-height: 30;">
			<ul class="ul">
				<li class="li1" style="width: 50px;height: 30px;" onclick="m_VarGlobal.m_ToothPanel_Top.ToolSelect(0)"><a class="a21" href="#" >
					<span style="font-family:'宋体'; font-size: 14px;">导向</span></a></li>
				<li class="li1" style="width: 50px;height: 30px;"   onclick="m_VarGlobal.m_ToothPanel_Top.ToolSelect(1)"><a class="a21" href="#" >
					<span style="font-family:'宋体'; font-size: 14px;">择齿</span></a></li>
				<li class="li1" style="width: 50px;height: 30px;"  onclick="m_VarGlobal.m_ToothPanel_Top.ToolSelect(2)"><a class="a21" href="#" >
					<span style="font-family:'宋体'; font-size: 14px;">微观</span></a></li>
		    </ul>
		    
		    <img style="float: right;margin-top: 10px;margin-right: 2px;" id="Hide_Panel_0" onclick="m_VarGlobal.m_ToothPanel_Top.Hide_Panel()" src="img/shouqi.png" />
	    </div>
	    <div id ="Panel_Top">
        <!--上部的div-->
	    <!--	导向-->
        <div id="guide">
	    	<div class="sh"id="tu_0"><img src="img/nineimge/立方体.png" /></div>
	    	<div class="sh" style="background-image: url(../img/shizi.png); 	background-position: center;background-repeat: no-repeat;">             <%--   1区小图--%>
	    		<div class="sh2" id="tu_1" ></div>
               <%-- 2区小图--%>
	    		<div class="sh2" id="tu_2"></div>
                <%--3区小图--%>
	    		<div class="sh2" id="tu_3"></div>
               <%-- 4区小图--%>
	    		<div class="sh2" id="tu_4"></div>
	    	</div>
	    	<div class="sh">
	    		<span style="width: 125px;height: 20px;line-height: 20px;float: left;text-align: left;">
                <%--牙号--%>
	    			<a href="###" id="toothnum"  >#</a></span>
	    		<table style="width:125px ;height: 50px;line-height: 25px;">
	    			<tr>
                   <%-- 上下颚--%>
	    				<td id="tu_11">--</td>
                      <%--  唇侧 舌侧--%>
	    				<td id="tu_12">--</td>
	    			</tr>
	    			<tr>
                   <%-- 切法--%>
	    				<td id="tu_13">--</td>
                        <%--远近--%>
	    				<td id="tu_14">--</td>
	    			</tr>
	    		</table>
	    	</div>
            <%--滑动条--%>
	    	<div class="sh">
            <input id="hengxianglatiao"  class="easyui-slider" style="height:300px;" value="0" data-options="
				showTip: false,
                max:3,
                min:-3,
				reversed: false,
				rule: [-8,-6,-2,0,2,6,8],
                onChange: function(value){
				Setzoom(value);
			    }
			">
            
            
            
            </div>
            </div>
	    	<!--择齿-->
	    	<div  id="selec"  style="width: 290px;height: 220px;overflow: auto;  ">
	    		
	    		
	    			<div id="up"    >
	    			<!--上部分-->
	    		
	    			<!--左边-->
	    		<a style="position:absolute;top: 58px;left: 112px;">
	    			<img src="img/yachi/sz1.png"/ onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(11)"></a>
	    		<a style="position:absolute;top: 61px;left: 91px;">
	    			<img src="img/yachi/sz2.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(12)"/></a>
	    		<a style="position:absolute;top: 70px;left: 75px;"> 
	    			<img src="img/yachi/sz3.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(13)"/></a>
	    		<a style="position:absolute;top: 88px;left: 59px;">
	    			<img src="img/yachi/sz4.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(14)"/></a>
	    		<a style="position:absolute;top: 110px;left: 42px;"> 
	    			<img src="img/yachi/sz5.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(15)"/></a>
	    		<a style="position:absolute;top: 136px;left: 33px;"> 
	    			<img src="img/yachi/sz6.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(16)"/></a>
	    		<a style="position:absolute;top: 164px;left: 27px;"> 
	    			<img src="img/yachi/sz7.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(17)"/></a>
	    			<!--右边-->
	    		<a style="position:absolute;top: 58px;left: 139px;">
	    			<img src="img/yachi/sy1.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(21)"/></a>
	    		<a style="position:absolute;top: 61px;left: 163px;">
	    			<img src="img/yachi/sy2.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(22)"/></a>
	    		<a style="position:absolute;top: 70px;left: 178px;">
	    			<img src="img/yachi/sy3.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(23)"/></a>
	    		<a style="position:absolute;top: 88px;left: 188px;">
	    			<img src="img/yachi/sy4.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(24)"/></a>
	    		<a style="position:absolute;top: 108px;left: 208px;">
	    			<img src="img/yachi/sy5.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(25)"/></a>
	    		<a style="position:absolute;top: 134px;left: 216px;">
	    			<img src="img/yachi/sy6.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(26)"/></a>
	    		<a style="position:absolute;top: 162px;left: 224px;">
	    			<img src="img/yachi/sy7.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(27)"/></a>	
	    			
	    		</div>
	    		<div id="down"  style=" display:none" >
	    			<!--下部分-->
	    		<!--左边-->
	    		
	    		<a style="position:absolute;top: 168px;left: 124px;">
	    			<img src="img/yachi/xz1.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(31)"/></a>
	    		<a style="position:absolute;top: 165px;left: 104px;">
	    			<img src="img/yachi/xz2.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(32)"/></a>
	    		<a style="position:absolute;top: 155px;left: 86px;">
	    			<img src="img/yachi/xz3.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(33)"/></a>
	    		<a style="position:absolute;top: 140px;left: 68px;">
	    			<img src="img/yachi/xz4.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(34)"/></a>
	    		<a style="position:absolute;top: 118px;left: 56px;">
	    			<img src="img/yachi/xz5.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(35)"/></a>
	    		<a style="position:absolute;top: 89px;left: 33px;">
	    			<img src="img/yachi/xz6.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(36)"/></a>	
	    		<a style="position:absolute;top: 56px;left: 24px;">
	    			<img src="img/yachi/xz7.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(37)"/></a>
	    		<!--右边	-->
	    		<a style="position:absolute;top: 168px;left: 144px;">
	    			<img src="img/yachi/xy1.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(41)"/></a>
	    		<a style="position:absolute;top: 165px;left: 162px;">
	    			<img src="img/yachi/xy2.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(42)"/></a>
	    		<a style="position:absolute;top: 155px;left: 178px;">
	    			<img src="img/yachi/xy3.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(43)"/></a>	
	    		<a style="position:absolute;top: 140px;left: 190px;">
	    			<img src="img/yachi/xy4.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(44)"/></a>
	    		<a style="position:absolute;top: 118px;left: 208px;">
	    			<img src="img/yachi/xy5.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(45)"/></a>
	    		<a style="position:absolute;top: 89px;left: 222px;">
	    			<img src="img/yachi/xy6.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(46)"/></a>
	    		<a style="position:absolute;top: 56px;left: 232px;">
	    			<img src="img/yachi/xy7.png" onclick="m_VarGlobal.m_ToothPanel_Top.ToothColor(47)"/></a>	
                </div>
                <img src="img/chaoshang.png" id="sel_panel" style="position: relative;top: 180px;left: 120px;"    onclick="m_VarGlobal.m_ToothPanel_Top.imgSelectup()"   />
	    	</div>
	    	<!--微观-->
	    	<div id="webPanel" style="width: 290px;height: 220px;background-color: #000000;padding-top: 20px; display:none;  ">
	    		
	    	</div>
	    </div>
	    
	    <div>
	    	
	    </div>
	
	</div>	
    <!--右侧第二个面板工具栏-->
	<div id="zh">
		<div style="width: 291px;height: 30px;
			background-color: #3a3a3a;float: left;">
			<ul class="ul">
				<li class="li1" style="width: 50px;height: 30px;background-color:#535353" >
				<a id="Practice_a" class="a21" style="width: 50px;height: 30px;" href="#" >
					<span style="font-family:'宋体'; font-size: 14px;">练习</span></a>
				</li>
				<li class="li1" style="width: 50px;height: 30px;" >
				<a id="Teaching_a" class="a21" style="width: 50px;height: 30px;"href="#" >
					<span style="font-family:'宋体'; font-size: 14px;">教学</span></a>
				</li>
				<li class="li1" style="width: 50px;height: 30px;" >
				<a id="Examination_a" class="a21" style="width: 50px;height: 30px;"href="#" >
					<span style="font-family:'宋体'; font-size: 14px;">考试</span></a>
				</li>
			</ul>   
			<img id="Prompt_line" style="margin-top: 5px;margin-left: 75px;" src="img/dengpao3.png" /  onclick="varToothClass.m_Pattern.Operation_prompt_line()">
			<img id="Hide_Panel_1" style="float: right;margin-top: 10px;margin-right: 2px;" src="img/shouqi.png" / onclick="varToothClass.m_Pattern.Hide_Panel()">
	    </div>
	    <!--练习-->
	    <div id ="Panel_Practice" style="width: 291px;height:200px ;padding-top: 5px;text-align: center;
		    overflow: auto;scrollbar-dark-shadow-color:#222222">
		    <table id = "Practice_table" class="tab">
			    <tr>
				    <td id="Practice_part1" class="td">01.切端左/右侧2.0mm深指示沟</td>
			    </tr>
			    <tr>
				    <td id="Practice_part2" class="td">02.磨平左/中/右侧牙体组织</td>
			    </tr>
			    <tr>
				    <td id="Practice_part3" class="td">03.唇面左/中/右侧1.0mm深指示沟</td>
			    </tr>
            
                <tr>
				    <td id="Practice_part4" class="td">04.颈部左/右侧1.2mm深指示沟</td>
			    </tr>
            
                <tr>
				    <td id="Practice_part5" class="td">05.磨平唇面指示沟间组织</td>
			    </tr>
            
                <tr>
				    <td id="Practice_part6" class="td">06.磨平颈部指示沟间组织</td>
			    </tr>
            
                <tr>
				    <td id="Practice_part7" class="td">07.打开左/右侧邻面</td>
			    </tr>
            
                <tr>
				    <td id="Practice_part8" class="td">08.左/右邻面颈部预备至平齐龈缘处</td>
			    </tr>
            
                <tr>
				    <td id="Practice_part9" class="td">09.舌隆突左/中/右侧1.0mm深指示沟</td>
			    </tr>
                <tr>
				    <td id="Practice_part10" class="td">12.舌面颈部预备至平齐龈缘处</td>
			    </tr>
			    <tr>
				    <td id="Practice_part11" class="td">13.舌窝左/上/右侧1.0mm深指示沟</td>
			    </tr>
                <tr>
				    <td id="Practice_part12" class="td">14.磨平舌窝部指示沟间组织</td>
			    </tr>
                <tr>
				    <td id="Practice_part13" class="td">15.排龈，暴露0.5mm牙体组织</td>
			    </tr>
                <tr>
				    <td id="Practice_part14" class="td">16.精修</td>
			    </tr>
                <tr>
				    <td id="Practice_part15" class="td">17.修整边缘</td>
			    </tr>
            
		    </table>
	    </div>
	    <!--教学-->
	    <div id="Panel_Teaching" style="width: 291px;height:200px ;padding-top: 5px;text-align: center;
		    overflow: auto;scrollbar-dark-shadow-color:#222222; display:none;">
		    <table id="Teaching_table" class="tab">
			    <tr>
				    <td class="td"><strong>1.0切段预备</strong></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part1" onclick="varToothClass.m_Pattern.Teaching_demo(1)">1.1切端右侧约2.0mm深度指示沟</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part2" onclick="varToothClass.m_Pattern.Teaching_demo(2)">1.2切端左侧约2.0mm深度指示沟</a></td>
			    </tr>
            
                <tr>
				    <td class="td"><a id="Teaching_demo_part3" onclick="varToothClass.m_Pattern.Teaching_demo(3)">1.3磨平右侧牙体组织</a></td>
			    </tr>
            
                <tr>
				    <td class="td"><a id="Teaching_demo_part4" onclick="varToothClass.m_Pattern.Teaching_demo(4)">1.4磨平中间牙体组织</a></td>
			    </tr>
            
                <tr>
				    <td class="td"><a id="Teaching_demo_part5" onclick="varToothClass.m_Pattern.Teaching_demo(5)">1.5磨平左侧牙体组织</a></td>
			    </tr>
            
                <tr>
				    <td class="td"><strong>2.0唇面预备</strong></td>
			    </tr>
            
                <tr>
				    <td class="td"><a id="Teaching_demo_part6" onclick="varToothClass.m_Pattern.Teaching_demo(6)">2.1唇面右侧约1.0mm深度指示沟</a></td>
			    </tr>
            
                <tr>
				    <td class="td"><a id="Teaching_demo_part7" onclick="varToothClass.m_Pattern.Teaching_demo(7)">2.2唇面中间约1.0mm深度指示沟</a></td>
			    </tr>
                <tr>
				    <td class="td"><a id="Teaching_demo_part8" onclick="varToothClass.m_Pattern.Teaching_demo(8)">2.3唇面左侧约1.0mm深度指示沟</a></td>
			    </tr>
                <tr>
				    <td class="td"><a id="Teaching_demo_part9" onclick="varToothClass.m_Pattern.Teaching_demo(9)">2.4颈部右侧约1.2mm深度指示沟</a></td>
			    </tr>
                <tr>
				    <td class="td"><a id="Teaching_demo_part10" onclick="varToothClass.m_Pattern.Teaching_demo(10)">2.5颈部左侧约1.2mm深度指示沟</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part11" onclick="varToothClass.m_Pattern.Teaching_demo(11)">2.6磨平唇面指示沟之间的组织</a></td>
			    </tr>
                <tr>
				    <td class="td"><a id="Teaching_demo_part12" onclick="varToothClass.m_Pattern.Teaching_demo(12)">2.7磨平颈部指示沟之间的组织</a></td>
			    </tr>
                <tr>
				    <td class="td"><strong>3.0邻面预备</strong></td>
			    </tr>
                <tr>
				    <td class="td"><a id="Teaching_demo_part13" onclick="varToothClass.m_Pattern.Teaching_demo(13)">3.1打开右侧邻面</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part14" onclick="varToothClass.m_Pattern.Teaching_demo(14)">3.2打开左侧邻面</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part15" onclick="varToothClass.m_Pattern.Teaching_demo(15)">3.3右邻面颈部预备至平齐龈缘处</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part16" onclick="varToothClass.m_Pattern.Teaching_demo(16)">3.4左邻面颈部预备至平齐龈缘处</a></td>
			    </tr>
			    <tr>
				    <td class="td"><strong>4.0舌面预备</strong></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part17" onclick="varToothClass.m_Pattern.Teaching_demo(17)">4.1舌隆突左侧约1.0mm深度指示沟</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part18" onclick="varToothClass.m_Pattern.Teaching_demo(18)">4.2舌隆突中侧约1.0mm深度指示沟1</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part19" onclick="varToothClass.m_Pattern.Teaching_demo(19)">4.3舌隆突右侧约1.0mm深度指示沟2</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part20" onclick="varToothClass.m_Pattern.Teaching_demo(20)">4.4舌面颈部预备至平齐龈缘处</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part21" onclick="varToothClass.m_Pattern.Teaching_demo(21)">4.5舌窝左侧约1.0mm深度指示沟</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part22" onclick="varToothClass.m_Pattern.Teaching_demo(22)">4.6舌窝右侧约1.0mm深度指示沟</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part23" onclick="varToothClass.m_Pattern.Teaching_demo(23)">4.7舌窝上侧约1.0mm深度指示沟</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part24" onclick="varToothClass.m_Pattern.Teaching_demo(24)">4.8磨平舌窝部指示沟之间的组织</a></td>
			    </tr>
			    <tr>
				    <td class="td"><strong>5.0边缘修整</strong></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part25" onclick="varToothClass.m_Pattern.Teaching_demo(25)">5.1排龈，暴露0.5mm牙体组织</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part26" onclick="varToothClass.m_Pattern.Teaching_demo(26)">5.2修整预备体龈边缘</a></td>
			    </tr>
			    <tr>
				    <td class="td"><strong >6.0精修完成</strong></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part27" onclick="varToothClass.m_Pattern.Teaching_demo(27)">6.1精修并抛光预备体</a></td>
			    </tr>
			    <tr>
				    <td class="td"><a id="Teaching_demo_part28" onclick="varToothClass.m_Pattern.Teaching_demo(28)">6.2边缘修整凿修整预备体边缘</a></td>
			    </tr>

            
            
            
		    </table>
	    </div>
	    <!--考试-->
	    <div id="Panel_Examination" style="width: 281px;height: 200px;padding: 10px; display:none;" >
		    <div class="kaoshi">
			    <img style="margin-top: 35px;" src="img/牙.png" />
		    </div>
		    <div id="Fraction_div" class="kaoshi1">
			    100分
		    </div>
		
	    </div>
	</div>	
    <!--右侧第三个面板工具栏-->
	<div id="xia">
		<div style="width: 50px;height: 30px;float: left;text-align: center;
			line-height: 30px;color: white;font-size: 14px;font-family:"宋体";">记录
		
		</div>
		<div style="width: 239px;height: 28px;float: left;border: 1px solid #282828;
			background-color: #3a3a3a;">
			<img id="Hide_Panel_2" 
				 style="float: right;margin-top: 10px;
				margin-right: 2px;" src="img/shouqi.png" / onclick="varToothClass.m_Record.Hide_Panel()" >
			
	</div>	
	<div id="Panel_Record" style="width: 291px;height:90% ;
		padding-top: 5px;text-align: center;
		overflow: auto;scrollbar-dark-shadow-color:#222222;
		 min-height: 200px; max-height:300px;">
		<table id="Table_Record" class="tab" style="">
			
		</table>
	</div>
	</div>
    </div>
    </div>
 <!-----------------------------页面结束-------------------------->
 

 
     
</body>
</html>
