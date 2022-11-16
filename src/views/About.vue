<template>
    <div id="about-view">
        <div class="wrapper-header">
            <h1>ABOUT ME</h1>
            <div class="settings">
                <div v-if="groupTwo"><button id="btn-show-favorites" @click="editButn()">Edit Form</button></div>
                <div v-if="groupOne"><button id="btn-show-favorites" @click="cancelBtn()" :class="{active: groupOne}">Cancel</button></div>
                <div v-if="groupOne"><button id="btn-save" @click="saveBtn()">Save Form</button></div>
            </div>
        </div>
        <form>
            <div class="wrapper-input">
                <label>NAME</label>
                <div v-if="groupOne"><input v-model="newName" id="input-name" /></div>
                <div v-if="groupTwo"><p id="txt-name">{{ auth.user.name }}</p></div>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <div v-if="groupOne"><input v-model="newSurname" id="input-surname" /></div>
                <div v-if="groupTwo"><p id="txt-surname">{{ auth.user.surname }}</p></div>
            </div>
            <div class="wrapper-input">
                <label>STUDENT CODE</label>
                <div v-if="groupOne"><input v-model="newCode" id="input-code" /></div>
                <div v-if="groupTwo"><p id="txt-code">{{ auth.user.code }}</p></div>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul v-if="auth.getFavoriteSongs().length">
                    <li v-for="song in favSongs">
                        <img id="img-album" :src="song.album.images[1].url" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">{{ song.name }}</p>
                            <p id="txt-artist" class="song-artists">{{ getArtists(song.artists) }}</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty" v-if = "!auth.getFavoriteSongs().length">NO SONGS FOUND</div>
            </div>
        </form>
    </div>
  </template>
<script>


import { auth } from '../../auth';
import songList from '../data/songs'
export default {
  data() {
    return {
      auth,
      songs: songList,
      groupOne: false,
      groupTwo: true,
      newName: auth.user.name,
      newSurname: auth.user.surname,
      newCode: auth.user.code,
      isFavListEmpty: true
    }
  },
  methods: {

    //funkcijas, kas tiek palaistas pie pogu nosiesanas
      editButn() {
          this.groupOne = true;
        this.groupTwo = false;
      },
      cancelBtn() {
          this.groupOne = false;
          this.groupTwo = true;
      },
      saveBtn() {
          this.groupOne = false;
          this.groupTwo = true;
          this.auth.setUserData(this.newName, this.newSurname, this.newCode);
      },

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
  },
  
  //iziet cauri dziesmu masivam salidzinot id ar favorite dziesmu id
  computed: {
    favSongs() {
      let favSongs = [];
      let i = auth.getFavoriteSongs();
      
      i.forEach((songID) => {
        this.songs.forEach((song) => {
          if (song.id == songID) {
            favSongs.push(song);
          }
        });
      });
      return favSongs;
    }
  }
}
</script>

