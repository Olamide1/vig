<template>
    <section class="section">
        <div class="container has-text-centered">
            <h1 class="title has-text-success">Subscription Successful!</h1>
            <p class="subtitle">Thank you for subscribing to our service.</p>
            <a href="/dashboard" class="button is-primary">Go to Dashboard</a>
        </div>
    </section>
</template>

<script>
import { db, updateDoc, doc } from '../firebase/init'
export default {
    name: 'SuccessComponent',

    methods: {
        updateSubscriptionStatus() {
            const userId = localStorage.getItem('userId');
            if (userId) {
                // db.collection('users').doc(userId).
                // update({
                //     isSubscribed: true, // Mark user as subscribed
                //     ideasGenerated: 0   // Reset the ideas generated count
                // })

                const usersRef = doc(db, "users", userId);

                updateDoc(usersRef, {
                    isSubscribed: true, // Mark user as subscribed
                    ideasGenerated: 0   // Reset the ideas generated count
                })
                    .then(() => {
                        console.log('Subscription status updated successfully');
                        window.location.href = '/dashboard'; // Redirect back to dashboard
                    })
                    .catch(error => {
                        console.error('Error updating subscription status:', error);
                    });
            } else {
                console.error('No user logged in');
            }
        }
    },
    created() {
        this.updateSubscriptionStatus()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>