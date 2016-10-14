using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace SettlementApi.Common
{
    public class ImageHelper
    {
        public static bool Cut(int x, int y, int width, int height, int level, string name, string sourcePath,
            string savePath)
        {
            if (!File.Exists(sourcePath + name))
            {
                return false;
            }
            if (!Directory.Exists(savePath))
            {
                Directory.CreateDirectory(savePath);
            }
            try
            {
                var fs = new FileStream(sourcePath + name, FileMode.Open, FileAccess.Read);
                Image img = Image.FromStream(fs, true);
                if (x > img.Width || y > img.Height)
                {
                    img.Save(savePath, ImageFormat.Jpeg);
                }
                var sourceBitMap = new Bitmap(img);

                var rectangle = new Rectangle(x, y, width, height);
                Bitmap cloneBitmap = sourceBitMap.Clone(rectangle, sourceBitMap.PixelFormat);


                ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();
                ImageCodecInfo ici = codecs.FirstOrDefault(i => i.MimeType == "image/jpeg");

                var ep = new EncoderParameters(1);
                ep.Param[0] = new EncoderParameter(Encoder.Quality, level);

                //cloneBitmap.Save(savePath, ici, ep);


                var saveBitmap = new Bitmap(80, 80);
                Graphics graphics = Graphics.FromImage(saveBitmap);
                graphics.InterpolationMode = InterpolationMode.High;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.Clear(Color.White);
                //80px*80px small
                //graphics.DrawImage(cloneBitmap, new Rectangle(0, 0, 80, 80),
                //    new Rectangle(0, 0, cloneBitmap.Width, cloneBitmap.Height), GraphicsUnit.Pixel);
                //saveBitmap.Save(savePath + "S" + name, ici, ep);

                //120px*120px middle
                saveBitmap = new Bitmap(120, 120);
                graphics = Graphics.FromImage(saveBitmap);
                graphics.InterpolationMode = InterpolationMode.High;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.Clear(Color.White);
                graphics.DrawImage(cloneBitmap, new Rectangle(0, 0, 120, 120),
                    new Rectangle(0, 0, cloneBitmap.Width, cloneBitmap.Height), GraphicsUnit.Pixel);
                //saveBitmap.Save(savePath + "M" + name, ici, ep);
                saveBitmap.Save(savePath + name, ici, ep);
                fs.Close();
                fs.Dispose();
                img.Dispose();
                sourceBitMap.Dispose();
                cloneBitmap.Dispose();
                graphics.Dispose();
                saveBitmap.Dispose();
                File.Delete(sourcePath + name);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        ///     生成缩略图,将缩略图文件保存到指定的路径
        /// </summary>
        /// <param name="Width">缩略图的宽度</param>
        /// <param name="Height">缩略图的高度</param>
        /// <param name="targetFilePath">缩略图保存的全文件名，(带路径)，参数格式：D:\Images\filename.jpg</param>
        /// <returns>成功返回true，否则返回false</returns>
        public static bool GetReducedImage(Image ResourceImage, int Width, int Height, string targetFilePath)
        {
            try
            {
                Image ReducedImage;

                Image.GetThumbnailImageAbort callb = () => false;
                ReducedImage = ResourceImage.GetThumbnailImage(Width, Height, callb, IntPtr.Zero);
                ReducedImage.Save(@targetFilePath);

                ReducedImage.Dispose();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /**/

        /// <summary>
        ///     生成缩略图
        /// </summary>
        /// <param name="originalImagePath">源图路径（物理路径）</param>
        /// <param name="thumbnailPath">缩略图路径（物理路径）</param>
        /// <param name="width">缩略图宽度</param>
        /// <param name="height">缩略图高度</param>
        /// <param name="mode">生成缩略图的方式</param>
        public static void MakeThumbnail(string originalImagePath, string thumbnailPath, string mode, int? width,
            int? height)
        {
            Image originalImage = Image.FromFile(originalImagePath);

            int towidth = width ?? originalImage.Width;
            int toheight = height ?? originalImage.Height;

            int x = 0;
            int y = 0;
            int ow = originalImage.Width;
            int oh = originalImage.Height;

            switch (mode)
            {
                case "HW": //指定高宽缩放（可能变形）
                    break;
                case "W": //指定宽，高按比例                     
                    toheight = originalImage.Height*towidth/originalImage.Width;
                    break;
                case "H": //指定高，宽按比例 
                    towidth = originalImage.Width*toheight/originalImage.Height;
                    break;
                case "Cut": //指定高宽裁减（不变形）                 
                    if (originalImage.Width/(double) originalImage.Height > towidth/(double) toheight)
                    {
                        oh = originalImage.Height;
                        ow = originalImage.Height*towidth/toheight;
                        y = 0;
                        x = (originalImage.Width - ow)/2;
                    }
                    else
                    {
                        ow = originalImage.Width;
                        oh = originalImage.Width*toheight/towidth;
                        x = 0;
                        y = (originalImage.Height - oh)/2;
                    }
                    break;
                default:
                    break;
            }

            //新建一个bmp图片 
            var bitmap = new Bitmap(towidth, toheight);

            //新建一个画板 
            Graphics g = GetGraphic(originalImage, bitmap); // System.Drawing.Graphics.FromImage(bitmap);

            ////设置高质量插值法 
            //g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBilinear;

            ////设置高质量,低速度呈现平滑程度 
            //g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

            ////清空画布并以透明背景色填充 
            // g.Clear(Color.Transparent);

            //在指定位置并且按指定大小绘制原图片的指定部分 
            g.DrawImage(originalImage, new Rectangle(0, 0, towidth, toheight),
                new Rectangle(x, y, ow, oh),
                GraphicsUnit.Pixel);

            try
            {
                if (!Directory.Exists(Path.GetDirectoryName(thumbnailPath)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(thumbnailPath));
                }

                var qualityParam = new EncoderParameter(Encoder.Quality, 96L);
                ImageCodecInfo jpegCodec = null;
                foreach (ImageCodecInfo imgCode in ImageCodecInfo.GetImageEncoders())
                {
                    if (imgCode.MimeType.ToLower().Equals("image/jpeg"))
                    {
                        jpegCodec = imgCode;
                        break;
                    }
                }
                var encoderParams = new EncoderParameters(1);
                encoderParams.Param[0] = qualityParam;

                //以jpg格式保存缩略图 
                bitmap.Save(thumbnailPath, jpegCodec, encoderParams);
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                originalImage.Dispose();
                bitmap.Dispose();
                g.Dispose();
            }
        }


        private static Graphics GetGraphic(Image originImage, Bitmap newImage)
        {
            newImage.SetResolution(originImage.HorizontalResolution, originImage.VerticalResolution);
            Graphics graphic = Graphics.FromImage(newImage);
            graphic.InterpolationMode = InterpolationMode.HighQualityBicubic;
            graphic.SmoothingMode = SmoothingMode.HighQuality;
            graphic.PixelOffsetMode = PixelOffsetMode.HighQuality;
            graphic.CompositingQuality = CompositingQuality.HighQuality;
            return graphic;
        }
    }
}