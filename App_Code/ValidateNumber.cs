using System;
using System.Drawing;//绘画，画图
using System.Drawing.Imaging;//图像
using System.Web.UI;
using System.Drawing.Drawing2D;//2D图像
using System.IO;//IO流
namespace Utilities
{
    /// <summary>
    /// 生成验证码的类
    /// </summary>
    public class ValidateNumber
    {
        public ValidateNumber()
        {
        }
        /// <summary>
        /// 验证码的最大长度
        /// </summary>
        public int MaxLength
        {
            get { return 10; }
        }
        /// <summary>
        /// 验证码的最小长度
        /// </summary>
        public int MinLength
        {
            get { return 1; }
        }
        /// <summary>
        /// 生成验证码
        /// </summary>
        /// <param name="length">指定验证码的长度</param>
        /// <returns></returns>
        public string CreateValidateNumber(int length)
        {
            int[] randMembers = new int[length];   //随机生成的数字集合
            int[] validateNums = new int[length];  //抽取出来的随机数字集合
            string validateNumberStr = "";
            //生成起始序列值
            int seekSeek = unchecked((int)DateTime.Now.Ticks);
            Random seekRand = new Random(seekSeek);
            int beginSeek = (int)seekRand.Next(0, Int32.MaxValue - length * 10000);
            int[] seeks = new int[length];
            for (int i = 0; i < length; i++)
            {
                beginSeek += 10000;
                seeks[i] = beginSeek;
            }
            //生成随机数字
            for (int i = 0; i < length; i++)
            {
                Random rand = new Random(seeks[i]);
                int pownum = 1 * (int)Math.Pow(10, length);
                randMembers[i] = rand.Next(pownum, Int32.MaxValue);
            }
            //抽取随机数字
            for (int i = 0; i < length; i++)
            {
                string numStr = randMembers[i].ToString();
                int numLength = numStr.Length;
                Random rand = new Random();
                int numPosition = rand.Next(0, numLength - 1);
                validateNums[i] = Int32.Parse(numStr.Substring(numPosition, 1));
            }
            //生成验证码
            for (int i = 0; i < length; i++)
            {
                validateNumberStr += validateNums[i].ToString();
            }
            return validateNumberStr;
        }
        /// <summary>
        /// 产生验证码之二算法，任意字符
        /// </summary>
        /// <param name="len">长度</param>
        /// <returns></returns>
        public string CreateValidateNum(int len)
        {
            string RandNum = "ABCHQRSTabcdefgh012345ijklmnopqrstxyz6789";
            string valNum = ""; 
            Random r = new Random();
            for (int i = 0; i < len; i++)
            {
               
               int index= r.Next(0, RandNum.Length - 1-i);
               valNum = valNum + RandNum[index].ToString();
            }
            return valNum;
        }
        /// <summary>
        /// 创建验证码的图片
        /// </summary>
        /// <param name="containsPage">要输出到的page对象</param>
        /// <param name="validateNum">验证码</param>
        public void CreateValidateGraphic(Page containsPage, string validateNum)
        {
            //画版类
            Bitmap image = new Bitmap((int)Math.Ceiling(validateNum.Length * 12.5), 22);
            Graphics g = Graphics.FromImage(image);
            try
            {
                //生成随机生成器
               Random random = new Random();
                //清空图片背景色
                g.Clear(Color.White);
                //画图片的干扰线
                for (int i = 0; i < 5; i++)
                {
                    int x1 = random.Next(image.Width);
                    int x2 = random.Next(image.Width);
                    int y1 = random.Next(image.Height);
                    int y2 = random.Next(image.Height);
                    g.DrawLine(new Pen(Color.Silver), x1, y1, x2, y2);
                }
                Font font = new Font("Arial",12, (FontStyle.Bold | FontStyle.Italic));
                //渐变色
                LinearGradientBrush brush = new LinearGradientBrush(new Rectangle(0, 0, image.Width, image.Height),
                 Color.Blue, Color.DarkRed, 1.2f, true);
                //x:2
                //y:1
                //原点在左上角
                g.DrawString(validateNum, font, brush, 2, 1);
                //画图片的前景干扰点
                for (int i = 0; i < 30; i++)
                {
                    int x = random.Next(image.Width);
                    int y = random.Next(image.Height);
                    image.SetPixel(x, y, Color.FromArgb(random.Next()));
                }
                //画图片的边框线
                g.DrawRectangle(new Pen(Color.Silver), 0, 0, image.Width - 1, image.Height - 1);
                //保存图片数据
                //内存流加快流的访问速度
                MemoryStream stream = new MemoryStream();
                image.Save(stream, ImageFormat.Jpeg);
                //输出图片
                containsPage.Response.Clear();
                containsPage.Response.ContentType = "image/jpeg";
                containsPage.Response.BinaryWrite(stream.ToArray());
            }
            finally
            {
                g.Dispose();
                image.Dispose();
            }
        }
        /// <summary>
        /// 得到验证码图片的长度
        /// </summary>
        /// <param name="validateNumLength">验证码的长度</param>
        /// <returns></returns>
        public static int GetImageWidth(int validateNumLength)
        {
            return (int)(validateNumLength * 12.5);
        }
        /// <summary>
        /// 得到验证码的高度
        /// </summary>
        /// <returns></returns>
        public static double GetImageHeight()
        {
            return 22.5;
        }
    }
}
