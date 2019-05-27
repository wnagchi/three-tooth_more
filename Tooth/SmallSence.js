var SmallSenceClass = function () {
    this.m_Camera = null
    this.m_Scene = null;
    this.m_Renderer = null;
    
    this.init();
}
SmallSenceClass.prototype.init = function () {
    var container = document.getElementById('webPanel');
    this.m_Camera = new THREE.PerspectiveCamera(45, 290 / 220, 1, 2000);
    //this.m_Camera.position.copy(m_VarGlobal.m_Camera.m_Camera.position)
    this.m_Camera.position.x = 0;
    this.m_Camera.position.y = 120;
    this.m_Camera.position.z = 250;
    this.m_Scene = new THREE.Scene();

    var light, object;
    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    this.m_Scene.add(ambientLight);
    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    this.m_Camera.add(pointLight);
    this.m_Scene.background = new THREE.Color(0xffffff);
    this.m_Scene.add(this.m_Camera);


    this.m_Renderer = new THREE.WebGLRenderer({ antialias: true });
    this.m_Renderer.setPixelRatio(window.devicePixelRatio);

    this.m_Renderer.setSize(290, 215);
    container.appendChild(this.m_Renderer.domElement);

   
}
