<template>
    <div id="album-view">
      <div class="wrapper-header">
          <h1>ALBUMS</h1>
          <div class="settings">
              <button id="btn-grid" @click="isIconGrid ? isIconGrid = false : isIconGrid = true, isIconList = false" v-bind:class="{active: isIconGrid}"><IconGrid /></button>
              <button id="btn-list" @click="isIconList ? isIconList = false : isIconList = true, isIconGrid = false" v-bind:class="{active: isIconList}"><IconList /></button>
          </div>
      </div>
      <ul id="list-albums" :class="{grid: isIconGrid}">
          <li class="album" v-for="(album) in albums">
              <img id="img-album" :src="album.images[1].url" />
              <div class="album-info">
                  <h4 id="txt-album-name">{{ album.name }}</h4>
                  <p id="txt-album-artists">{{ getArtists(album.artists) }}</p>
                  <div class="album-year">
                      <p id="txt-album-year">{{ getAlbumYear(album.release_date) }}</p>
                      <p id="txt-album-tracks">2</p>
                  </div>
              </div>
          </li>
      </ul>
  </div>
  </template>

<script>
import IconGrid from '../components/icons/IconGrid.vue'
import IconList from '../components/icons/IconList.vue'
import songList from '../data/songs'
export default {
  components: {IconGrid, IconList},
  methods: {
    //no dziesmas objekta artist masiva atgriez izpilditaja vardu viena string
    getArtists(artists) {
      let i = '';
      let len = Object.keys(artists).length;
      artists.forEach((art, index) => {
        if (index != len - 1) {
          i = i + art.name + ", ";
        } else { 
          i = i + art.name;
        }
      });
      return i;
    },
    getAlbumYear(date) {
      return date.split('-')[0];
    },
  },
  data() {
    return {
      isIconGrid: false,
      isIconList: true,
      songs: songList,
    }
  },

  //parbauda vai masiva ir albums
  computed: {
    albums() {
      let albums = [];
      this.songs.forEach((song) => {
        if (albums.filter(e => e.id === song.album.id).length > 0 == false) {
          albums.push(song.album);
        }
      });
      return albums;
    }
  }
}
</script>
