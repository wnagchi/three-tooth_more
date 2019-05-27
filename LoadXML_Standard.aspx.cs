 using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;//用于XMl操作 
public partial class LoadXML : System.Web.UI.Page
{
    public XmlNodeList nodeList;
    protected void Page_Load(object sender, EventArgs e)
    {
        string m_fname = "";
        Standardlink m_link = new Standardlink();
        if (Request.QueryString["id"] != null && Request.QueryString["id"] != "")
        {
            
            string id = Request.QueryString["id"];
            int m_id = int.Parse(id);
             m_fname = "XML/" + m_link.code[m_id].m_link;
           
        }
        else
        {
            m_fname = "XML/" + m_link.code[0].m_link;
        }
        XmlDocument doc = new XmlDocument();
        //加载XML文件  
        doc.Load(HttpContext.Current.Server.MapPath(m_fname));
        //获取结点Pizza下的所有子结点  
        nodeList = doc.SelectSingleNode("SysMode").ChildNodes;

        //WriteXml m_write = new WriteXml();
    }
   
}