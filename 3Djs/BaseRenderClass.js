var BaseRenderClass = function (na) {

    m_VarGlobal.m_raycaster = new THREE.Raycaster();
    m_VarGlobal.m_projector = new THREE.Projector();

    document.getElementById(na).style.height = document.documentElement.clientHeight + "px";
    //  document.getElementById('m_LoadingDiv').style.height = document.documentElement.clientHeight + "px";

    width = document.getElementById(na).clientWidth;
    height = document.getElementById(na).clientHeight;
    
    this.m_Render = this.InitRender(width, height, na); ;

};
BaseRenderClass.prototype.InitRender = function (w, h, n) {


    var m_ren = new THREE.WebGLRenderer({ antialias: true });

    m_ren.autoClear = false;

    m_ren.setPixelRatio(window.devicePixelRatio);
    m_ren.setSize(w, h);

    document.getElementById(n).appendChild(m_ren.domElement);

  
    m_ren.shadowMapEnabled = true;
    m_ren.shadowMapSoft = true;

    m_ren.domElement.addEventListener('mousedown', m_VarGlobal.m_Mouse.onMouseDown, false);
    //   m_ren.domElement.addEventListener('touchstart', m_VarGlobal.m_Mouse.onDocumentMouseDown, false);
    m_ren.domElement.addEventListener('mousemove', m_VarGlobal.m_Mouse.onMouseMove, false);
    //   m_ren.domElement.addEventListener('touchmove', m_VarGlobal.m_Mouse.onDocumentMouseMove, false);
    m_ren.domElement.addEventListener('mouseup', m_VarGlobal.m_Mouse.onMouseUp, false);
  
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("Firefox") >= 0) {
        document.addEventListener('DOMMouseScroll', m_VarGlobal.m_Mouse.OnMouseWheel, false);
    }

    return m_ren;

};

var BaseRenderer = function (name) {
    BaseRenderClass.call(this,name);
   // this.m_Render=this.InitRender(width, height, 'webgl');
}
BaseRenderer.prototype = Object.create(BaseRenderClass.prototype);

var CtrlRenderer = function (name) {
    BaseRenderClass.call(this, name);
 //   this.InitRender(width, height, 'webgl_sys');
}
CtrlRenderer.prototype = Object.create(BaseRenderClass.prototype);