using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    public string m_id = "1";
    public string m_title = "模型展示";
    protected void Page_Load(object sender, EventArgs e)
    {
        m_id = Request.QueryString["id"];

        if (m_id == null)
        {
            m_id = "0";
        }
        Standardlink m_link = new Standardlink();
        m_title = m_link.code[int.Parse(m_id)].m_title;
    }
}