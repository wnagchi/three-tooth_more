using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

/// <summary>
///GridViewTemplate 的摘要说明
/// </summary>
public class GridViewTemplate : ITemplate
{
    private DataControlRowType templateType;
    private string columnName;

    public GridViewTemplate(DataControlRowType type, string colname)
    {
        templateType = type;
        columnName = colname;
    }



    //当由类实现时，定义子控件和模板所属的 Control 对象。然后在内联模板中定义这些子控件。

    public void InstantiateIn(System.Web.UI.Control container)
    {
        switch (templateType)
        {
            case DataControlRowType.Header:

                Literal lc = new Literal();

                lc.Text = "<B>" + columnName + "</B>";

                container.Controls.Add(lc);

                break;

            case DataControlRowType.DataRow:

                Label data = new Label();

                data.DataBinding += new EventHandler(data_DataBinding);

                container.Controls.Add(data);

                break;


            default:

                break;
        }
    }

    private void data_DataBinding(object sender, EventArgs e)
    {
        Label l = (Label)sender;

        GridViewRow row = (GridViewRow)l.NamingContainer;

        l.Text = DataBinder.Eval(row.DataItem, columnName).ToString();
    }

}