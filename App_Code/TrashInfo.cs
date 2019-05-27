using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///TrashInfo 的摘要说明
/// </summary>
public class TrashInfo
{
    public TrashInfo()
    {
        //
        //TODO: 在此处添加构造函数逻辑
        //
    }
}

public class inlink //如果不设置数据类型，默认为 int
{
    public pageinfo[] code = new pageinfo[64];
    public inlink()
    {
        code[0].m_title = "垃圾分拣";
        code[0].m_link = "XMLDemo.xml";
        code[1].m_title = "燃烧发电";
        code[1].m_link = "XML_Animation.xml";
        code[2].m_title = "模型展示";
        code[2].m_link = "XML_Furnace.xml";
        code[3].m_title = "模型展示";
        code[3].m_link = "XML_GasTurbine.xml";
        code[4].m_title = "模型展示";
        code[4].m_link = "XML_Landfill.xml";
        code[5].m_title = "模型展示";
        code[5].m_link = "XML_Turbine.xml";
        code[6].m_title = "模型展示";
        code[6].m_link = "XML_Demo1.xml";
        code[7].m_title = "模型展示";
        code[7].m_link = "XML_Demo2.xml";
        code[8].m_title = "模型展示";
        code[8].m_link = "XML_Demo3.xml";
        code[9].m_title = "模型展示";
        code[9].m_link = "XML_Demo4.xml";
        code[10].m_title = "模型展示";
        code[10].m_link = "XML_Demo5.xml";
        code[11].m_title = "zip展示";
        code[11].m_link = "XMLZIP.xml";
        code[12].m_title = "Font展示";
        code[12].m_link = "XML_Font.xml";
    }
}
public class Standardlink //如果不设置数据类型，默认为 int
{
    public pageinfo[] code = new pageinfo[64];
    public Standardlink()
    {
        code[0].m_title = "标准模型展示";
        code[0].m_link = "XML_Standard.xml";
        code[1].m_title = "标准模型展示";
        code[1].m_link = "XML_Standard1.xml";
        code[2].m_title = "标准模型展示";
        code[2].m_link = "XML_Standard2.xml";
        code[3].m_title = "标准模型展示";
        code[3].m_link = "XML_Standard3.xml";
        code[4].m_title = "标准模型展示";
        code[4].m_link = "XML_Standard4.xml";
        code[5].m_title = "标准模型展示";
        code[5].m_link = "XML_Standard5.xml";
        code[6].m_title = "标准模型展示";
        code[6].m_link = "XML_Standard6.xml";
        code[7].m_title = "标准模型展示";
        code[7].m_link = "XML_Standard7.xml";
        code[8].m_title = "标准模型展示";
        code[8].m_link = "XML_Standard8.xml";
        code[9].m_title = "标准模型展示";
        code[9].m_link = "XML_Standard9.xml";
        code[10].m_title = "标准模型展示";
        code[10].m_link = "XML_Standard10.xml";
        code[11].m_title = "标准模型展示";
        code[11].m_link = "XML_Standard11.xml";
        code[12].m_title = "标准模型展示";
        code[12].m_link = "XML_Standard12.xml";
    }
}
public struct pageinfo
{
    public string m_link;
    public string m_title;
}