<template>
    <!-- Stripe Checkout code here -->

    <button v-if="showSubscriptionPrompt" :class="['button', buttonColor]" @click="submitStripe">
        {{ buttonText ?? "Subscribe Now" }}
    </button>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js/pure';
export default {
    props: {
        showSubscriptionPrompt: Boolean,
        buttonText: String,

        buttonColor: String, // | 'is-success' | 'is-primary',
    },
    data() {
        this.publishableKey = process.env.VUE_APP_STRIPE_API_KEY
        this.lineItems = [
            {
                price: process.env.VUE_APP_STRIPE_PRICE_ID,
                quantity: 1,
            }
        ]
        return {
            stripe: null,
        };
    },
    mounted() {
        this._loadStripe()
    },
    methods: {
        submitStripe() {
            this.stripe.redirectToCheckout({
                lineItems: [{ price: process.env.VUE_APP_STRIPE_PRICE_ID, quantity: 1 }],  // Replace with actual price ID from Stripe
                mode: 'subscription',
                successUrl: window.location.origin + '/success',  // Set success page
                cancelUrl: window.location.origin + '/cancel',  // Set cancel page
            })
                .then((result) => {
                    if (result.error) {
                        console.error(result.error.message);
                    }
                });
        },
        async _loadStripe() {
            this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_API_KEY);
        },
    },
};
</script>