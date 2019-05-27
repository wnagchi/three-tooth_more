using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Data;//用于XMl操作 
using Newtonsoft.Json;
using System.IO;
using Newtonsoft.Json.Linq;
/// <summary>
///WriteXml 的摘要说明
/// </summary>
public class WriteXml
{
	public WriteXml(string json,string filename)
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//

        XmlDocument xmlDoc = new XmlDocument();
        //创建Xml声明部分，即<?xml version="1.0" encoding="utf-8" ?>
        xmlDoc.CreateXmlDeclaration("1.0", "utf-8", "yes");
        XmlNode rootNode = xmlDoc.CreateElement("SysMode");
        JArray m_arr = (JArray)JsonConvert.DeserializeObject(json);
        for (int i = 0; i < m_arr.Count; i++)
        {
            JObject m_item = (JObject)m_arr[i];
            string name = m_item["name"].ToString();
            XmlNode m_Node = xmlDoc.CreateElement(name);//xml生成
            string innerHTML = m_item["innerHTML"].ToString();
            m_Node.InnerText = innerHTML;
            JArray m_records = (JArray)m_item["records"];
            if (m_records.Count > 0)
            {
                for (int j = 0; j < m_records.Count; j++)
                {
                    JObject m_WasteItem = (JObject)m_records[j];
                    string m_name = m_WasteItem["name"].ToString();
                    XmlAttribute nameAttribute = xmlDoc.CreateAttribute(m_name);
                    string m_value = m_WasteItem["value"].ToString();
                    nameAttribute.Value = m_value;
                    m_Node.Attributes.Append(nameAttribute);
                }
            }
            rootNode.AppendChild(m_Node);
        }
        //创建根节点
      

        //创建student子节点
       // XmlNode m_Node = xmlDoc.CreateElement("Pic");
        //创建一个属性
      //  XmlAttribute nameAttribute = xmlDoc.CreateAttribute("x");
       // nameAttribute.Value = "0";
        //xml节点附件属性
       // m_Node.Attributes.Append(nameAttribute);
       


     //   //创建courses子节点
     //   XmlNode coursesNode = xmlDoc.CreateElement("Light");
     //   XmlNode courseNode1 = xmlDoc.CreateElement("course");
     //   XmlAttribute courseNameAttr = xmlDoc.CreateAttribute("y");
     //   courseNameAttr.Value = "11";
     //   courseNode1.Attributes.Append(courseNameAttr);
     //   //XmlNode teacherCommentNode = xmlDoc.CreateElement("teacherComment");
     //   //创建Cdata块
     ////   XmlCDataSection cdata = xmlDoc.CreateCDataSection("<font color=\"red\">这是语文老师的批注</font>");
     //  // teacherCommentNode.AppendChild(cdata);
     ////   courseNode1.AppendChild(teacherCommentNode);
     //   coursesNode.AppendChild(courseNode1);
     //   //附加子节点
     //   studentNode.AppendChild(coursesNode);

      
        //附加根节点
        xmlDoc.AppendChild(rootNode);

        //保存Xml文档
        string m_path = "../../XML/"+filename;
        xmlDoc.Save(HttpContext.Current.Server.MapPath(m_path));

        Console.WriteLine("已保存Xml文档");
	}
}
public class ClassMyFileInfo
{
    public string m_name = "";
    public long  m_length =0;
    public string m_path = "";
    public DateTime m_time =new DateTime();
    public DateTime m_Updatatime = new DateTime();
    public ClassMyFileInfo(FileInfo file)
    {
        m_name = file.Name;
        m_length = file.Length;
        m_path = file.DirectoryName;
        string m_fullpath = HttpRuntime.AppDomainAppPath.ToString();
        m_path=m_path.Replace(m_fullpath, "");
        m_time = file.CreationTime;
        m_Updatatime = file.LastWriteTime;
    }
}