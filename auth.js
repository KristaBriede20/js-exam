import { reactive } from 'vue'
import router from './src/router';

export const auth = reactive ({
    user : {
        name : "Krista",
        surname : "Briede",
        code : "IT20017",
        favorite_songs : [],
    },
    is_authenticated: localStorage.is_authenticated ?? false,

    setUserData(name, surname,code){
        this.user.name = name;
        this.user.surname = surname;
        this.user.code = code; 
    },
    authenticate(email, password){
        if(email == "krista.briede@va.lv" && password == "123456"){
        localStorage.is_authenticated = true;
          this.is_authenticated = true;
          router.replace('/')
        }
    },
    logout(){
        localStorage.clear();
        this.is_authenticated = false;
        router.replace('/login')
    },

    toggleFavorite(songID) {
        this.user.favorite_songs.forEach((song) => {
          if (song != songID) {
            this.user.favorite_songs.push(songID);
          } else {
            this.user.favorite_songs.pop(songID);
          }
        });
      },
    
      getFavoriteSongs() {
        return this.user.favorite_songs;
      }
    });

