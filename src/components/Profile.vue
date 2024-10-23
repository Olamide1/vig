<template>
    <div id="profile-app">
        <section class="section">
            <h1 class="title has-text-centered">Set Up Your Profile</h1>
            <p class="subtitle has-text-centered">Enter a unique nickname to continue</p>

            <div class="box">
                <form @submit.prevent="saveProfile">
                    <div class="field">
                        <label class="label">Nickname</label>
                        <div class="control">
                            <input class="input" type="text" v-model="nickname" placeholder="Enter your a nickname we can address you with">
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button type="submit" class="button is-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>

            <div v-if="errorMessage" class="notification is-danger">{{ errorMessage }}</div>
            <div v-if="successMessage" class="notification is-success">{{ successMessage }}</div>
        </section>
    </div>
</template>

<script>
import { db, auth, onAuthStateChanged } from '../firebase/init'
export default {
    name: 'ProfileComponent',

    data() {
        return {
            nickname: '',
            errorMessage: '',  // Ensure errorMessage is initialized
            successMessage: '' // Ensure successMessage is initialized
        }
    },
    methods: {
        // Save user profile (nickname) in Firestore
        saveProfile() {
            const userId = sessionStorage.getItem('userId'); // Get user ID from sessionStorage
            if (userId && this.nickname.trim()) {
                // Check for unique nickname in Firestore
                db.collection('users').where('nickname', '==', this.nickname).get()
                    .then(querySnapshot => {
                        if (querySnapshot.empty) {
                            // Save nickname if unique
                            db.collection('users').doc(userId).set({ nickname: this.nickname }, { merge: true })
                                .then(() => {
                                    this.successMessage = 'Your profile has been updated successfully!';
                                    setTimeout(() => {
                                        window.location.href = '/dashboard'; // Redirect to dashboard
                                    }, 1500);
                                })
                                .catch(error => {
                                    this.errorMessage = 'Error saving profile: ' + error.message;
                                });
                        } else {
                            this.errorMessage = 'Nickname is already taken. Please choose another one.';
                        }
                    })
                    .catch(error => {
                        this.errorMessage = 'Error checking nickname: ' + error.message;
                    });
            } else {
                this.errorMessage = 'Please enter a valid nickname.';
            }
        },
    },
    created() {
        // Make sure user is authenticated before showing the profile setup
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = '/login'; // Redirect to login if not authenticated
            }
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>