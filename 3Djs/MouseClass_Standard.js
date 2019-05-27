var MouseClass = function () {
    this.m_PlanePoint = new THREE.Vector2(0, 0); //二维坐标
    this.m_selectedObjects = [];
    this.m_Raycaster = new THREE.Raycaster();
    this.m_MouseClickFlag = 0;
    this.m_SelOldObject = null;
    this.m_SelectPoint = new THREE.Vector3(0, 0, 0); //三维坐标
    this.m_SelectPoint_Local = new THREE.Vector3(0, 0, 0)
    this.m_SelectShowObj = null; //选中显示模型
    this.m_SelectShowObj_type = 0; //选中显示模型
    this.m_SelectObj_flag = 0; //选择开关
};
MouseClass.prototype.init = function () {

    this.m_Composer = new THREE.EffectComposer(m_VarGlobal.m_BaseRender.m_Render);


    this.m_RenderPass = new THREE.RenderPass(m_VarGlobal.m_BaseSence.m_Scene, m_VarGlobal.m_Camera.m_Camera);
    this.m_Composer.addPass(this.m_RenderPass);

    this.m_OutlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), m_VarGlobal.m_BaseSence.m_Scene, m_VarGlobal.m_Camera.m_Camera);
    //  alert(this.m_OutlinePass.visibleEdgeColor)
    this.m_OutlinePass.visibleEdgeColor.set(0x0000ff);
    this.m_OutlinePass.hiddenEdgeColor.set(0x190a05);
    this.m_Composer.addPass(this.m_OutlinePass);

    this.m_EffectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    this.m_EffectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    this.m_EffectFXAA.renderToScreen = true;


    this.m_Composer.addPass(this.m_EffectFXAA);

};
MouseClass.prototype.onMouseMove = function (event) {
    if (!m_VarGlobal.m_Mouse.m_SelectObj_flag) {
        return;
    }
    if (m_VarGlobal.m_Mouse.m_MouseClickFlag == 0) {
        m_VarGlobal.m_Mouse.OnSeachSelObject(event);
    }

    if (m_VarGlobal.m_Mouse.m_MouseClickFlag == 2) {
        //////////////////////////选中牙后 移动鼠标

        m_VarGlobal.m_Mouse.OnSeachSelObject(event);
        m_VarGlobal.m_Mouse.m_OutlinePass.selectedObjects = [];
        if (m_VarGlobal.m_Mouse.m_SelOldObject) {

            m_VarGlobal.m_Mouse.m_SelectShowObj.visible = true;
            m_VarGlobal.m_Mouse.m_SelectShowObj.position.copy(m_VarGlobal.m_Mouse.m_SelectPoint);
        } else {
            m_VarGlobal.m_Mouse.m_SelectShowObj.visible = false;
        }
        //  m_VarGlobal.m_ToothPanel_Top.OnSelObj(m_VarGlobal.m_Mouse.m_SelOldObject, m_VarGlobal.m_Mouse.m_SelectPoint);

    }
};
MouseClass.prototype.onMouseUp = function (event) {


};
MouseClass.prototype.onMouseDown = function (event) {

    if (!m_VarGlobal.m_Mouse.m_SelectObj_flag) {
        return;
    }
    m_VarGlobal.m_Mouse.OnSeachSelObject(event);
    if (m_VarGlobal.m_Mouse.m_selectedObjects.length > 0) {



        m_VarGlobal.m_Mouse.m_MouseClickFlag = 1;

        m_VarGlobal.m_Mouse.OnSeachSelObject(event);
        //alert(m_VarGlobal.m_Mouse.m_SelectPoint.x);
        m_VarGlobal.m_Mouse.m_SelectPoint_Local.copy(m_VarGlobal.m_Mouse.m_SelectPoint);
        m_VarGlobal.m_Tooth_ToolBar.OnSelObj(m_VarGlobal.m_Mouse.m_SelOldObject, m_VarGlobal.m_Mouse.m_SelectPoint);

        m_VarGlobal.m_ToothPanel_Top.OnSelObj(m_VarGlobal.m_Mouse.m_SelOldObject, m_VarGlobal.m_Mouse.m_SelectPoint);

        m_VarGlobal.m_ToothPanel_Top.OnMoveSelObj(m_VarGlobal.m_Mouse.m_SelOldObject, m_VarGlobal.m_Mouse.m_SelectPoint);
        //alert(m_VarGlobal.m_Mouse.m_SelectPoint_Local.x);
        // alert(varToothClass.m_Tool.changeimg)
        //alert("1"+m_VarGlobal.m_Mouse.m_SelOldObject)
        // alert("2" + m_VarGlobal.m_Mouse.m_SelectPoint_Local)
        // alert("3" + varToothClass.m_Tool.tool_num)
        //alert("4" + varToothClass.m_Tool.changeimg)
        //alert(varToothClass.m_beiYa.judge_OnSelObj)
        if (varToothClass.m_Pattern.pattern != 2) {
            varToothClass.m_beiYa.judge_OnSelObj(varToothClass.Selected, m_VarGlobal.m_Mouse.m_SelOldObject, m_VarGlobal.m_Mouse.m_SelectPoint_Local, varToothClass.m_Tool.tool_num, varToothClass.m_Tool.changeimg);
        }
         //varToothClass.m_beiYa.judge_OnSelObj(varToothClass.Selected, m_VarGlobal.m_Mouse.m_SelOldObject, m_VarGlobal.m_Mouse.m_SelectPoint_Local, varToothClass.m_Tool.tool_num, varToothClass.m_Tool.changeimg);
        m_VarGlobal.m_Mouse.m_OutlinePass.selectedObjects = [];

    } else {

        //m_VarGlobal.m_Mouse.m_MouseClickFlag = 0;
        //m_VarGlobal.m_BaseSence.m_dis.remove(m_VarGlobal.m_Mouse.m_SelectShowObj);
        //m_VarGlobal.m_Mouse.m_SelectShowObj = null;
        //m_VarGlobal.m_Tooth_ToolBar.clear();
    }
    if (m_VarGlobal.m_Mouse.m_MouseClickFlag == 2) {
        if (varToothClass.m_Pattern.pattern != 2) {
            if (varToothClass.m_Tool.tool_num == 11) { return; }
            if (m_VarGlobal.m_Mouse.m_selectedObjects.length > 0) {
                varToothClass.m_Record.Generate_record_text();
            }
        }

    }
};
MouseClass.prototype.onDoubleMouseDown = function () {

    m_VarGlobal.m_Mouse.m_MouseClickFlag = 2;

    if (!m_VarGlobal.m_Mouse.m_SelectShowObj) {

        var material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
        if (m_VarGlobal.m_Mouse.m_SelectShowObj_type == 0) {
            m_VarGlobal.m_Mouse.m_SelectShowObj = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 10), material);
            m_VarGlobal.m_Mouse.m_SelectShowObj.name = "ShowObj_Mouse";
        } else {
        }

        m_VarGlobal.m_Mouse.m_SelectShowObj.position.copy(m_VarGlobal.m_Mouse.m_SelectPoint)
        m_VarGlobal.m_BaseSence.m_dis.add(m_VarGlobal.m_Mouse.m_SelectShowObj);
    }

}
MouseClass.prototype.OnSeachSelObject = function (event) {
    var x, y;

    if (event.changedTouches) {

        x = event.changedTouches[0].pageX;
        y = event.changedTouches[0].pageY;

    } else {

        x = event.clientX;
        y = event.clientY;

    }

    m_VarGlobal.m_Mouse.m_PlanePoint.x = (x / window.innerWidth) * 2 - 1;
    m_VarGlobal.m_Mouse.m_PlanePoint.y = -(y / window.innerHeight) * 2 + 1;

    m_VarGlobal.m_Mouse.CheckIntersection();
}
MouseClass.prototype.CheckIntersection = function () {

    m_VarGlobal.m_Mouse.m_Raycaster.setFromCamera(this.m_PlanePoint, m_VarGlobal.m_Camera.m_Camera);

    var intersects = m_VarGlobal.m_Mouse.m_Raycaster.intersectObjects(m_VarGlobal.GoodsList, true);

    if (intersects.length > 0) {
        var m_selobj = Obj_DisParent(intersects[0].object);
        if (m_VarGlobal.m_Mouse.m_MouseClickFlag > 0) {

            if (m_VarGlobal.m_Mouse.m_SelOldObject && m_VarGlobal.m_Mouse.m_SelOldObject == m_selobj) {

                m_VarGlobal.m_Mouse.onDoubleMouseDown();
            }
            m_VarGlobal.m_Mouse.m_SelectPoint = intersects[0].point;


            m_VarGlobal.m_Mouse.m_SelOldObject = m_selobj;
        }

        m_VarGlobal.m_Mouse.addSelectedObject(m_selobj);

        m_VarGlobal.m_Mouse.m_OutlinePass.selectedObjects = m_VarGlobal.m_Mouse.m_selectedObjects;


    } else {

        m_VarGlobal.m_Mouse.m_OutlinePass.selectedObjects = [];
        // alert(m_VarGlobal.m_Mouse.m_MouseClickFlag)
        m_VarGlobal.m_Mouse.m_SelOldObject = null;
        m_VarGlobal.m_Mouse.m_selectedObjects = [];


    }


};
MouseClass.prototype.addSelectedObject = function (object) {

    m_VarGlobal.m_Mouse.m_selectedObjects = [];
    m_VarGlobal.m_Mouse.m_selectedObjects.push(object);

}
////////二维坐标系
var PlaneMouse = function () {
    MouseClass.call(this);

};
PlaneMouse.prototype = Object.create(MouseClass.prototype);



////////三维坐标系
var StereMouse = function () {
    MouseClass.call(this);

};
StereMouse.prototype = Object.create(MouseClass.prototype);


////////键盘控制
var CtrlKeyboard = function () {
    MouseClass.call(this);

};
StereMouse.prototype = Object.create(MouseClass.prototype);

