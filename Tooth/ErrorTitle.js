var ErrorTiltleClass = function () {//基类
    this.m_ArrTitle = new Array();
    ////////////////////////////////////////移动错误
    this.m_ArrTitle[0] = "存储点数组为空";
    this.m_ArrTitle[1] = "点编号错误";
    this.m_ArrTitle[2] = "行编号错误";
    this.m_ArrTitle[3] = "列编号错误";
    this.m_ArrTitle[4] = "移动面数组为空";
    ////////////////////////////////////////

    /////////////////////////
};
ErrorTiltleClass.prototype.Info = function (num) {
    alert(this.m_ArrTitle[num]);
}