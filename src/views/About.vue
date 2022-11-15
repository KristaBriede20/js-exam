<template>
    <div id="about-view">
        <div class="wrapper-header">
            <h1>ABOUT ME</h1>
            <div class="settings">
                <div v-if="aboutGroup"><button id="btn-show-favorites" @click="getEditInfo()" v-bind:class="{
                }">Edit Form</button></div>
                <div v-if="editGroup"><button id="btn-show-favorites" @click="setCancel()" v-bind:class="{
                }">Cancel</button></div>
                <div v-if="editGroup"><button id="btn-save" @click="getSaveButton()" v-bind:class="{
                }">Save Form</button></div>
            </div>
        </div>
        <form>
            <div class="wrapper-input">
                <label>NAME</label>
                <div v-if="editGroup"><input v-model="changeName" id="input-name" /></div>
                <div v-if="aboutGroup"><p id="txt-name">{{auth.user.name}}</p></div>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <div v-if="editGroup"><input v-model="changeSurname" id="input-surname" /></div>
                <div v-if="aboutGroup"><p id="txt-surname">{{auth.user.surname}}</p></div>
            </div>
            <div class="wrapper-input">
                <label>STUDENT CODE</label>
                <div v-if="editGroup"><input v-model="changeCode" id="input-code" /></div>
                <div v-if="aboutGroup"><p id="txt-code">{{auth.user.code}}</p></div>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul>
                    <li>
                        <img id="img-album" src="https://i.scdn.co/image/ab67616d00001e02980c9d288a180838cd12ad24" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">DEEP (feat. Nonô)</p>
                            <p id="txt-artist" class="song-artists">Example</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty">NO SONGS FOUND</div>
            </div>
        </form>
    </div>
</template>

<script>
import { auth } from '/auth.js'
export default {
    data() {
        return {
            auth,

            editGroup: false,
            aboutGroup: true,

            changeName: "",
            changeSurname: "",
            changeCode: ""
        }
    },
    methods: {
        getEditInfo() {
            this.editGroup = true;
            this.aboutGroup = false;
        },
        setCancel() {
            this.editGroup = false;
            this.aboutGroup = true;
        },
        getSaveButton() {
            this.editGroup = false;
            this.aboutGroup = true;

            this.auth.user.name = this.changeName;
            this.auth.user.surname = this.changeSurname;
            this.auth.user.code = this.changeCode;
        }
    }
}
</script>
