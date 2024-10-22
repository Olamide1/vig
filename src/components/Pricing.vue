<template>
    <section class="section">
        <div class="container has-text-centered">
            <h1 class="title">Choose Your Plan</h1>
            <div class="columns is-centered">
                <!-- Free Plan -->
                <div class="column is-one-third">
                    <div class="box">
                        <h2 class="title is-4">Free Plan</h2>
                        <p>Get limited access with 5 content ideas per month.</p>
                        <p><strong>$0 / month</strong></p>
                    </div>
                </div>

                <!-- Paid Plan -->
                <div class="column is-one-third">
                    <div class="box">
                        <h2 class="title is-4">Pro Plan</h2>
                        <p>Unlock unlimited content ideas and advanced features.</p>
                        <p><strong>$9.99 / month</strong></p>

                        <StripeSubscribeButton :buttonColor="'is-primary'" :showSubscriptionPrompt="true" :buttonText="'Subscribe Now'"></StripeSubscribeButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import StripeSubscribeButton from './StripeSubscribeButton.vue'
export default {
    components: {
        StripeSubscribeButton,
    },

    name: 'PricingComponent',

    methods: {
        handleSubscription() {
            // const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe public key
            // stripe.redirectToCheckout({
            //     lineItems: [{ price: 'your-price-id-here', quantity: 1 }], // Replace with actual price ID from Stripe
            //     mode: 'subscription',
            //     successUrl: window.location.origin + '/success', // Set success page
            //     cancelUrl: window.location.origin + '/cancel',  // Set cancel page
            // })
            //     .then((result) => {
            //         if (result.error) {
            //             console.error(result.error.message);
            //         }
            //     });

            this.$refs.checkoutRef?.redirectToCheckout();
        }
    },

    data() {
        return {
            publishableKey: process.env.VUE_APP_STRIPE_API_PROD_KEY,
            stripeLoading: false,
            lineItems: [
                {
                    price: process.env.VUE_APP_STRIPE_PRICE_PROD_ID, // The id of the recurring price you created in your Stripe dashboard
                    quantity: 1,
                },
            ],
            successURL: '/success',
            cancelURL: '/cancel',
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>