<script>
import songList from '../data/songs'
import {auth} from "/auth.js"
import IconHeart from '../components/icons/IconHeart.vue';
export default {
  components: { IconHeart, },
  data() {
    return {
      search: '',
      show_favorites: false,
      songs: songList,
      active: true,
      isFavorite: false,
    }
  },
  methods: {
    handleScroll(event) {
      this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
    },
    setFavoriteBtn() {
      if (this.show_favorites == false) {
        this.show_favorites = true;
      } else {
        this.show_favorites = false;
      }
    },
    getTime(time_ms) {
      var minutes = Math.floor(time_ms / 60000);
      var seconds = ((time_ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    getArtists(artists) {
      return artists[0].name;
    },
  },
  computed: {
    filtered_songs() {
      return this.songs;
    },
  }
}
</script>

<template>
  <div id="songs-view" @scroll="handleScroll">
    <div class="wrapper-header">
      <h1>SONGS</h1>
      <div class="wrapper-search">
        <input v-model="search" id="input-search" placeholder="Search by title..." />
      </div>
      <div class="wrapper-settings">
        <button id="btn-show-favorites" @click="setFavoriteBtn()" v-bind:class="{
          active: show_favorites
        }">Show
          Favorites</button>
      </div>
    </div>
    <div class="wrapper-songs">
      <table cellspacing="0" cellpadding="0">
        <tr ref="header">
          <th id="th-id">#</th>
          <th id="th-title">
            Title
            <IconCaretUp />
          </th>
          <th id="th-artist">Artist</th>
          <th id="th-album">Album</th>
          <th id="th-duration">
            Duration
            <IconCaretUp />
          </th>
        </tr>
        <!-- Loop goes on this <tr> element -->
        <tr class="song" v-for="(song, index) in filtered_songs">
          <td id="td-index">
            <IconPlay />
            <span id="txt-index">{{ index + 1 }}</span>
          </td>
          <td id="td-title">
            <img :src="song.album.images[1].url" />
            {{ song.name }}
          </td>
          <td id="td-artist">{{ getArtists(song.artists) }}</td>
          <td id="td-album">{{ song.album.name }}</td>
          <td id="td-duration">
            {{ getTime(song.duration_ms) }}
            <IconHeart />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>