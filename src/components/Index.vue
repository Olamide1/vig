<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar is-transparent is-spaced">
      <div class="navbar-brand">
        <h1 class="navbar-item logo is-size-4 has-text-weight-bold">Vig</h1>
      </div>
      <div class="navbar-end">
        <a @click="scrollToPricing" class="navbar-item button is-primary is-light">Pricing</a>
        <a href="/login" class="navbar-item button is-link">Login</a>
        <!--   <a @click="bookMeeting" class="navbar-item button is-success">Book a Meeting</a> Book a Meeting CTA -->
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h2 class="title is-1 has-text-light">Generate Viral Content Ideas in Seconds!</h2>
          <p class="subtitle has-text-light">{{ subHeadline }}</p>
          <button @click="startFreeTrial" class="button is-large is-link is-rounded">Get Your 5 Viral Ideas –
            Free!</button>
          <p class="cta-sub-text has-text-light">No credit card required.</p>

          <!-- Image Box -->
          <div class="image-box">
            <img src="../assets/demo.png" alt="Demo Image" />
          </div>
        </div>
      </div>
    </section>

    <!-- Value Proposition Section -->
    <section class="section value-props">
      <div class="container has-text-centered">
        <div class="columns is-variable is-8">
          <div class="column" v-for="prop in valueProps" :key="prop.title">
            <div class="box has-shadow">
              <h4 class="title is-4">{{ prop.title }} 🌟</h4>
              <p>{{ prop.description }}</p>
            </div>
          </div>
        </div>
        <br>
        <a href="/login" class="button is-large is-primary is-centered">Create ideas in seconds</a> <br> <br>
        <a href="/roadmap" class="button is-large is-link is-centered">Check our roadmap</a>
      </div>


    </section>

    <!-- How It Works Section -->
    <section class="section how-it-works has-background-primary-light">
      <div class="container">
        <h3 class="title is-3 has-text-centered">How It Works 🛠️</h3>
        <div class="columns is-centered">
          <div class="column is-4" v-for="(step, index) in steps" :key="index">
            <div class="box has-background-light">
              <h4 class="title is-4">Step {{ index + 1 }}: {{ step.title }}</h4>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Section -->
    <section class="section social-proof has-background-light">
      <div class="container">
        <h3 class="title is-3 has-text-centered">What Our Users Are Saying 💬</h3>
        <div class="columns is-centered">
          <div class="column is-6" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="box has-shadow">
              <p>{{ testimonial.quote }}</p>
              <footer class="has-text-right">— {{ testimonial.author }}</footer>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- Pricing Section -->
    <section class="section pricing" id="pricing">
      <div class="container has-text-centered">
        <h3 class="title is-3">Pricing Plans 💰</h3>
        <div class="columns is-variable is-8">
          <div class="column">
            <div class="box has-background-primary-light pricing-plan has-shadow">
              <h4 class="title is-4">Free Trial</h4>
              <p>Get 5 viral content ideas and limited Tiktok, Twitter trends list. No credit card required.</p>
              <a href="/login" class="navbar-item button is-primary is-light">Get started</a>
            </div>
          </div>
          <div class="column">
            <div class="box has-background-primary-light pricing-plan has-shadow">
              <h4 class="title is-4">Subscription</h4>
              <p>Unlock unlimited content ideas for Twitter, Tiktok, Reddit and the news just $9.99/month and generate
                content for them.</p>
              <a href="/login" class="navbar-item button is-primary is-light">Get started for free</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="content has-text-centered">
        <p>&copy; 2024 AI Viral Content Ideas | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
        <p>Connect with us on <a href="#">Twitter</a>, and <a href="/roadmap">Roadmap.</a></p>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button @click="scrollToTop" :class="{ 'scroll-top-button': true, 'show': showScrollTop }">
      <i class="fas fa-arrow-up"></i>
    </button>


  </div>
</template>

<script>
export default {
  name: 'IndexComponent',
  props: {
    msg: String
  },
  metaInfo: {
    title: 'AI Viral Idea Generator',
    meta: [
      {
        name: 'description',
        content: 'Home page for content ideas generators'
      },
      {
        name: 'keywords',
        content: 'content ideas for youtube, content ideas for instagram, content ideas generator, contant ideas ai,'+ 
        'content ideas for instagram reels, content ideas for onlyfans.' + 'content ideas for Tiktok, content ideas for social media'
      }
    ]
  },
  data() {
    return {
      headline: "Generate Viral Content Ideas in Seconds!",
      subHeadline: "Effortlessly create content ideas tailored to your platform and audience based on real time trends with zero effort!",
      ctaText: "Get Your 5 Viral Ideas – Free!",
      ctaSubText: "No commitment. Test the power of AI-generated content for free and unlock your potential.",
      valueProps: [
        { title: "Content Ideas That Drive Engagement", description: "Instantly generate AI-powered content ideas tailored to your platform, niche, and audience. Stand out with posts that resonate." },
        { title: "Always Up-to-Date Trends", description: "Our AI analyzes the latest trending topics from multiple sources like the news, Tiktok and Reddit, ensuring your content is always fresh and relevant." },
        { title: "Personalized to You", description: "The more you use it, the smarter it gets. Our AI learns your preferences to deliver ideas perfectly aligned with your audience’s interests." }
      ],
      steps: [
        { title: "Sign Up and Set Your Preferences", description: "Create a free account and tell us about your platform, niche,target location and audience to start generating." },
        { title: "Get Instant AI-Powered Ideas", description: "Watch the agent work its magic and instantly generate 5 viral-ready content ideas based on real-time trends." },
        { title: "Save, Favorite, or Share", description: "Keep your best ideas for future use, mark favorites, or share them with your audience instantly." }
      ],
      testimonials: [
        { quote: "This tool gave me my next viral YouTube video idea! My engagement has skyrocketed.", author: "YouTuber with 50K subscribers" },
        { quote: "I went from idea drought to a full content calendar. It’s a game-changer!", author: "TikTok Creator" }
      ],
      showScrollTop: false,  // To control visibility of scroll-to-top button

    }
  },
  methods: {
    startFreeTrial() {
      window.location.href = '/login'; // Redirect to sign-up page
    },
    scrollToPricing() {
      const pricingSection = document.getElementById('pricing');
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    },
    login() {
      window.location.href = '/login'; // Redirect to login page
    },
    bookMeeting() {
      window.location.href = 'https://calendly.com/your-sales-team'; // Example: Calendly link for booking meetings
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    handleScroll() {
      this.showScrollTop = window.scrollY > 200;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    try {
      console.log('100K', process.env.VUE_APP_TEST)
    } catch (e) {
      console.log('err', e)
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
