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
    is_authenticated = false;
        router.replace('/login')
    },
    toggleFavorite(songID){
       for(i = 0; i<=this.favorite_songs.length; i++){
            if(this.favorite_songs[i] != songID){
                this.favorite_songs.push(this.favorite_songs[i])
            }
            else{
                this.favorite_songs.remove(this.favorite_songs[i])
            }
        }
    },
    getFavoriteSongs(){
        return this.user.favorite_songs;
    }
});

