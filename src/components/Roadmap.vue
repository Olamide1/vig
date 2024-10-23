<template>
    <div id="app">
        <!-- Navigation Bar -->
        <nav class="navbar is-transparent is-spaced">
            <div class="navbar-brand">
                <h1 class="navbar-item logo is-size-4 has-text-weight-bold">Vig</h1>
            </div>
            <div class="navbar-end">
                <a href="/" class="navbar-item button is-primary is-light">Home</a>
                <a href="/pricing" class="navbar-item button is-link">Pricing</a>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero is-fullheight-with-navbar has-background-primary-light">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h2 class="title is-2 has-text-dark">Our Roadmap 🚀</h2>
                    <p class="subtitle has-text-dark">Discover the exciting features we are working on!</p>
                </div>
            </div>
        </section>

        <!-- Roadmap Timeline -->
        <section class="section">
            <div class="container">
                <div class="columns is-multiline">

                    <!-- Roadmap Item -->
                    <div class="column is-4">
                        <div class="box has-shadow roadmap-item">
                            <h3 class="title is-4">1. Advanced Content Scheduling</h3>
                            <p>Plan your content releases in advance with an AI-driven scheduler that optimizes post
                                timings for maximum engagement.</p>
                            <p><strong>Status: </strong>Coming Q2 2025</p>
                        </div>
                    </div>

                    <!-- Roadmap Item -->
                    <div class="column is-4">
                        <div class="box has-shadow roadmap-item">
                            <h3 class="title is-4">2. Multi-Language Support</h3>
                            <p>Generate content ideas in multiple languages to reach a global audience. Perfect for
                                international influencers and creators.</p>
                            <p><strong>Status: </strong>Planned for Q3 2025</p>
                        </div>
                    </div>

                    <!-- Roadmap Item -->
                    <div class="column is-4">
                        <div class="box has-shadow roadmap-item">
                            <h3 class="title is-4">3. AI-Powered Trend Forecasting</h3>
                            <p>Get ahead of the competition by identifying future trends before they go viral. Boost
                                engagement by staying ahead of the curve!</p>
                            <p><strong>Status: </strong>In Development (Q4 2025)</p>
                        </div>
                    </div>

                    <!-- Roadmap Item -->
                    <div class="column is-4">
                        <div class="box has-shadow roadmap-item">
                            <h3 class="title is-4">4. Deep Analytics Dashboard</h3>
                            <p>Track and measure the performance of your content ideas with advanced analytics,
                                including engagement rates, audience growth, and more.</p>
                            <p><strong>Status: </strong>In Development (Q1 2026)</p>
                        </div>
                    </div>

                    <!-- Roadmap Item -->
                    <div class="column is-4">
                        <div class="box has-shadow roadmap-item">
                            <h3 class="title is-4">5. Integration with Instagram & LinkedIn</h3>
                            <p>Seamlessly connect with Instagram and LinkedIn to generate tailored content ideas
                                directly for these platforms.</p>
                            <p><strong>Status: </strong>Planned (Q3 2026)</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="section has-background-light">
            <div class="container has-text-centered">
                <h3 class="title is-3">Want to Shape the Future of VIG?</h3>
                <p>We're always looking for feedback and suggestions. Help us make the platform better!</p>
                <a href="/feedback" class="button is-primary is-large">Submit Feedback</a> <br><br>
                <a href="/login" class="button is-link is-large">Create ideas in seconds</a>

            </div>
        </section>

        <!-- Footer -->
        <footer class="footer has-background-primary-light">
            <div class="content has-text-centered">
                <p>&copy; 2024 AI Viral Content Ideas | <a href="#">Privacy Policy</a> | <a href="#">Terms of
                        Service</a></p>
                <p>Connect with us on <a href="#">Twitter</a>, and <a href="#">Instagram</a></p>
            </div>
        </footer>
    </div>

</template>

<script>
export default {
    name: 'RoadmapComponent',
    metaInfo: {
    title: 'AI Viral Idea Generator Roadmap',
    meta: [
      {
        name: 'description',
        content: 'Roadmap for content ideas generators'
      },
      {
        name: 'keywords',
        content: 'content ideas for youtube, content ideas for instagram, content ideas generator, contant ideas ai, content ideas for instagram reels, content ideas for onlyfans.'
      }
    ]
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>