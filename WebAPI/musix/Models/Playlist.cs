using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace musix.Models
{
    public class Playlist
    {
        public int SongId { get; set; }

        public string SongName { get; set; }

        public string ArtistName { get; set; }

        public string Url { get; set; }
    }
}