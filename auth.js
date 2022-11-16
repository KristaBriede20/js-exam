import { reactive } from "vue";
import router from './src/router';

export const auth = reactive({
  user: {
    name: localStorage.getItem("name") ?? "Krista",
    surname: localStorage.getItem("surname") ?? "Briede",
    code: localStorage.getItem("code") ?? "IT20017",
    favorite_songs: JSON.parse(localStorage.getItem("favSongs")) ?? []
  },

  is_authenticated: localStorage.is_authenticated ?? false,

  setUserData(name, surname, code) {
    localStorage.setItem("name", name);
    this.user.name = name;

    localStorage.setItem("surname", surname);
    this.user.surname = surname;
    
    localStorage.setItem("code", code);
    this.user.code = code;
  },

  authenticate(email, password) {
    if (email === "krista.briede@va.lv" && password === "123456") {
      localStorage.is_authenticated = true;
      this.is_authenticated = true;
      router.replace('/');
    }
  },

  logout() {
    localStorage.clear();
    this.is_authenticated = false;
    router.replace('/login');
  },

  toggleFavorite(songID) {
    let index = this.user.favorite_songs.indexOf(songID);

    if (this.user.favorite_songs.includes(songID) == false) {
      this.user.favorite_songs.push(songID);
    } else {
      this.user.favorite_songs.splice(index, 1);
    }

    localStorage.setItem("favSongs", JSON.stringify(this.user.favorite_songs));
  },

  getFavoriteSongs() {
    return this.user.favorite_songs;
  }
});