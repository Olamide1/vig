<template>
    <div id="auth-app" class="container">
        <section class="section">
            <div class="columns is-centered">
                <div class="column is-half">
                    <h1 class="title has-text-centered">Welcome to VIG</h1>
                    <h2 class="subtitle has-text-centered">Sign in or sign up with email, no password needed!</h2>

                    <!-- Error Message -->
                    <div v-if="errorMessage" style="word-break: break-all;" class="notification is-danger">
                        {{ errorMessage }}
                    </div>

                    <!-- Loading Spinner -->
                    <div v-if="loading" class="has-text-centered">
                        <button class="button is-loading is-fullwidth" disabled></button>
                    </div>

                    <!-- Email Link Sign-In -->
                    <div class="field" v-if="!loading">
                        <label class="label">Enter your email to receive a login link:</label>
                        <div class="control has-icons-left">
                            <input class="input" type="email" v-model="email" placeholder="Enter your email">
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>

                    <div class="field" v-if="!loading">
                        <button @click="sendSignInLink" class="button  is-link is-fullwidth">Send Login Link</button>
                    </div>

                    <div class="field" v-if="!loading">
                        <button @click="signInWithGoogle" class="button is-danger is-fullwidth">
                            <span class="icon">
                                <i class="fab fa-google"></i>
                            </span>
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { db, auth, 
    GoogleAuthProvider, isSignInWithEmailLink, 
    signInWithEmailLink, signInWithPopup,
    sendSignInLinkToEmail, doc, getDoc, 
    updateDoc, collection,
    setDoc
} from '../firebase/init'
export default {
    name: 'UserAuthComponent',

    data() {
        return {
            email: '',
            errorMessage: '',
            loading: false
        }
    },
    methods: {
        // Send Sign-In Link to Email
        sendSignInLink() {
            this.loading = true;
            const actionCodeSettings = {
                url: window.location.href, // Redirect back to the same page
                handleCodeInApp: true
            };

            sendSignInLinkToEmail(auth, this.email, actionCodeSettings)
                .then(() => {
                    // Save the email locally to complete sign-in after clicking the link
                    sessionStorage.setItem('emailForSignIn', this.email);
                    this.loading = false;
                    alert('A login link has been sent to your email. Please check your inbox.');
                })
                .catch(error => {
                    this.errorMessage = error.message;
                    this.loading = false;
                });
        },

        // Check for sign-in link in the URL
        completeSignIn() {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = sessionStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Please provide your email for confirmation');
                }

                signInWithEmailLink(auth, email, window.location.href)
                    .then(result => {
                        sessionStorage.removeItem('emailForSignIn');
                        // Store user ID in sessionStorage
                        sessionStorage.setItem('userId', result.user.uid);
                        this.checkUserProfile(result.user.uid);
                    })
                    .catch(error => {
                        this.errorMessage = error.message;
                    });
            }
        },

        // Google Sign-In
        signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then(result => {
                    // Store user ID in sessionStorage
                    sessionStorage.setItem('userId', result.user.uid);
                    this.checkUserProfile(result.user.uid);
                })
                .catch(error => {
                    this.errorMessage = error.message;
                });
        },

        // Check if user has a nickname profile set up
        checkUserProfile(userId) {
            // db.collection('users').doc(userId).get()
            const usersRef = doc(db, "users", userId);
                getDoc(usersRef)
                .then(_doc => {
                    if (_doc.exists()) {
                        // Check if profile is complete (nickname exists)
                        if (_doc.data()?.nickname) {
                            // Check for subscription status and ideasGenerated fields
                            if (!_doc.data()?.isSubscribed) {
                                // db.collection('users').doc(userId)
                                
                                updateDoc(usersRef, {
                                    isSubscribed: false,
                                    ideasGenerated: 0
                                })
                            }
                            this.redirectToDashboard();
                        } else {
                            window.location.href = '/profile';
                        }
                    } else {
                        // If no document exists, create one

                        const userRef = doc(collection(db, 'users'), userId);

                        setDoc(userRef, {
                            isSubscribed: false,
                            ideasGenerated: 0
                        });
                        window.location.href = '/profile';
                    }
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        },

        // Redirect to Dashboard
        redirectToDashboard() {
            window.location.href = '/dashboard';
        }
    },

    created() {
        // Complete sign-in if the link is in the URL
        this.completeSignIn();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>