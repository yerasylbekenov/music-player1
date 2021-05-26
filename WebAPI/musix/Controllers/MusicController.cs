using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using musix.Models;

namespace musix.Controllers
{
    public class MusicController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                    select SongId, SongName, ArtistName, Url from
                    dbo.Playlist
                    ";
            DataTable table = new DataTable();
            using(var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["musicAppDB"].ConnectionString))
                using(var cmd= new SqlCommand(query,con))
                using(var da= new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Playlist playlist)
        {
            try 
            {
                string query = @"
                        insert into dbo.Playlist values
                         ('"+playlist.SongName+@"', '"+playlist.ArtistName+@"','"+playlist.Url+@"')
                        ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["musicAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Successfully";
            }
            catch(Exception) 
            {

                return "Failed to Add";
            }
        }

        public string Put(Playlist playlist)
        {
            try
            {
                string query = @"
                        update dbo.Playlist set SongName =
                         '" + playlist.SongName + @"', ArtistName = '"+playlist.ArtistName+@"', Url = '"+playlist.Url+@"' 
                        where SongId="+playlist.SongId+@"
                        ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["musicAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Successfully";
            }
            catch (Exception)
            {

                return "Failed to Update";
            }
        }

        public string Delete(int id)
        {
            try
            {
                string query = @"
                        delete from dbo.Playlist 
                        where SongId=" + id + @"
                        ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["musicAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully";
            }
            catch (Exception)
            {

                return "Failed to Delete";
            }
        }

        [Route("api/Playlist/SaveFile")]
        public string SaveFile()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/resources/music/" + filename);

                postedFile.SaveAs(physicalPath);

                return filename;
            }
            catch(Exception)
            {

                return "anonymous.png";
            }
        }
    }
}
