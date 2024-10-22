<template>
    <div id="app">
        <!-- Navigation Bar -->
        <nav class="navbar is-transparent is-spaced">
            <div class="navbar-brand">
                <h1 class="navbar-item logo is-size-4 has-text-weight-bold">Vig</h1>
            </div>
            <div class="navbar-end">
                <a href="/" class="navbar-item button is-primary is-light">Home</a>
                <a href="roadmap.html" class="navbar-item button is-link">Roadmap</a>
            </div>
        </nav>

        <!-- Feedback Form Section -->
        <section class="section">
            <div class="container">
                <h2 class="title is-2 has-text-centered">We Value Your Feedback 📝</h2>
                <p class="subtitle has-text-centered">Help us improve by sharing your thoughts!</p>

                <!-- Feedback Form -->
                <div class="columns is-centered">
                    <div class="column is-half">
                        <div class="box">
                            <div v-if="feedbackSuccessMessage" class="notification is-success">{{ feedbackSuccessMessage
                                }}</div>

                            <!-- Loading Spinner for Submitting Feedback -->
                            <div v-if="loadingFeedback" class="has-text-centered">
                                <button class="button is-loading is-fullwidth">Submitting Feedback...</button>
                            </div>

                            <!-- Feedback Form Fields -->
                            <div v-if="!loadingFeedback">
                                <div class="field">
                                    <label class="label">Your Feedback</label>
                                    <div class="control">
                                        <textarea v-model="feedbackMessage" class="textarea"
                                            placeholder="Let us know how we can improve or share your ideas for future features"
                                            required></textarea>
                                    </div>
                                </div>

                                <!-- Feedback Category (General or Roadmap) -->
                                <div class="field">
                                    <label class="label">Feedback Type</label>
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="feedbackCategory">
                                                <option value="general">General Feedback</option>
                                                <option value="roadmap">Roadmap Feedback</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="field has-text-centered">
                                    <button @click="submitFeedback" class="button is-primary is-fullwidth">Submit
                                        Feedback</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer has-background-primary-light">
            <div class="content has-text-centered">
                <p>&copy; 2024 AI Viral Content Ideas | <a href="#">Privacy Policy</a> | <a href="#">Terms of
                        Service</a></p>
                <p>Connect with us on <a href="#">Twitter</a>, <a href="#">LinkedIn</a>, and <a href="#">Instagram</a>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import { db, serverTimestamp, addDoc, collection } from '../firebase/init'
export default {
    name: 'FeedbackComponent',

    data() {
        return {
            feedbackMessage: '',
            feedbackCategory: 'general', // Default feedback category
            feedbackSuccessMessage: '',
            loadingFeedback: false,
        }
    },
    methods: {
        submitFeedback() {
            const userId = sessionStorage.getItem('userId') || 'guest'; // Fallback to 'guest' user if not logged in

            if (this.feedbackMessage.trim() === '') {
                alert('Please enter your feedback');
                return;
            }

            this.loadingFeedback = true; // Start loading spinner

            // Add feedback to Firestore
            // db.collection('feedback').add({
            //     userId: userId,
            //     message: this.feedbackMessage,
            //     category: this.feedbackCategory, // Store feedback category (general or roadmap)
            //     timestamp: serverTimestamp(),
            // })

            addDoc(collection(db, "feedback"), {
                userId: userId,
                message: this.feedbackMessage,
                category: this.feedbackCategory, // Store feedback category (general or roadmap)
                timestamp: serverTimestamp(),
            })
            .then(() => {
                    this.feedbackSuccessMessage = 'Thank you for your feedback!';
                    this.feedbackMessage = ''; // Clear the input field
                    setTimeout(() => {
                        this.feedbackSuccessMessage = '';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error submitting feedback:', error);
                })
                .finally(() => {
                    this.loadingFeedback = false; // Stop loading spinner
                });
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>