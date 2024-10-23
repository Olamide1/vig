<template>
    <div id="dashboard-app" class="dashboard-wrapper">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="menu">
                <p class="menu-label">Dashboard</p>
                <ul class="menu-list">
                    <li><a @click="navigate('overview')"
                            :class="{ 'is-active': activeSection === 'overview' }">Overview</a></li>
                    <li><a @click="navigate('preferences')"
                            :class="{ 'is-active': activeSection === 'preferences' }">Preferences</a></li>
                    <!-- Added Preferences -->
                    <li><a @click="navigate('favorites')"
                            :class="{ 'is-active': activeSection === 'favorites' }">Favorites</a></li>
                    <li><a @click="navigate('feedback')"
                            :class="{ 'is-active': activeSection === 'feedback' }">Feedback</a></li>


                </ul>
                <div class="menu-list">
                    <button @click="logout" class="button is-danger">Logout</button>
                </div>
            </div>
        </aside>

        <!-- Main Dashboard Content -->
        <main class="dashboard-content">
            <!-- Overview Section -->
            <section v-if="activeSection === 'overview'">
                <h1 class="title">Good {{ timeOfDay }}, {{ nickname }}!</h1>
                <p class="subtitle">Set your preferences to get tailored content ideas.</p>

                <!-- Generate Ideas Button -->
                <div class="field has-text-centered">
                    <button v-if="!loading" @click="generateIdeas" class="button is-large is-primary"
                        :disabled="!preferencesSaved">Generate Ideas</button>

                    <!-- Loading Spinner -->
                    <button v-if="loading" class="button is-large is-primary is-loading">Generating...</button>
                </div>

                <!-- Subscription Prompt -->


                <div class="has-text-centered">
                    <StripeSubscribeButton :buttonColor="'is-success'" :showSubscriptionPrompt="showSubscriptionPrompt" :buttonText="'Subscribe for $9.99/month to Generate Unlimited Ideas'"></StripeSubscribeButton>
                </div>

                <!-- Success Notification -->
                <div v-if="successMessage" class="notification is-success">
                    {{ successMessage }}
                </div>

                <!-- Generated Ideas List -->
                <div v-if="generatedIdeas.length" class="box">
                    <h3 class="title is-4">Your Viral Content Ideas</h3>
                    <ul class="content-ideas-list">
                        <li v-for="idea in generatedIdeas" :key="idea.id" class="content-idea-item">
                            <div class="content-idea-number">{{ idea.id }}.</div>
                            <div class="content-idea-body">
                                <h4 class="idea-title"><strong>{{ idea.title }}</strong></h4>
                                <p class="idea-content">{{ idea.content }}</p>
                                <p class="idea-hashtags"><small><strong>Hashtags: </strong>{{ idea.hashtags }}</small>
                                </p>
                            </div>
                            <div class="content-idea-actions">
                                <button @click="markAsFavorite(idea)" class="button is-small is-info">Favorite</button>
                                <button @click="shareOnTwitter(idea)" class="button is-small is-primary">Share on
                                    Twitter</button>
                                <button @click="shareOnInstagram(idea)" class="button is-small">Share on
                                    Instagram</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- Trending Topics Section -->
                <h3 class="title is-4">Trending Topics</h3>

                 <!-- Filter Trending Topics -->
                 <div class="field has-addons">
                    <div class="control">
                        <div class="select">
                            <select v-model="selectedSource">
                                <option value="">All Sources</option>
                                <option value="Reddit">Reddit</option>
                                <option value="TikTok">TikTok</option>
                                <option value="Twitter">Twitter</option>
                                <option value="News">News</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Loading Spinner for Trending Topics -->
                <div v-if="loading" class="has-text-centered">
                    <button class="button is-loading is-large">Loading Topics...</button>
                </div>

                <ul v-if="!loading && filteredTrendingTopics.length" class="box trending-list">
                    <li v-for="topic in filteredTrendingTopics" :key="topic.id" class="topic-item">
                        <h4 class="topic-title">{{ topic.title }}</h4>
                        <p class="topic-source">
                            <span v-if="topic.source === 'Reddit'" class="tag is-danger is-light">Reddit</span>
                            <span v-else-if="topic.source === 'TikTok'" class="tag is-info is-light">TikTok</span>
                            <span v-else-if="topic.source === 'Twitter'" class="tag is-primary is-light">Twitter</span>
                            <span v-else class="tag is-primary is-light">News</span>
                        </p>
                        <a :href="topic.url" target="_blank" class="button is-link is-small">View Source</a>
                        <button @click="generateIdeasAroundTrend(topic)" class="button is-small is-primary">Generate
                            Ideas</button>
                    </li>
                </ul>





                <!-- Show More / Show Less -->
                <div class="has-text-centered">
                    <button v-if="topicsToShow < trendingTopics.length" @click="showMore" class="button is-primary">Show
                        More</button>
                    <button v-if="topicsToShow > 5" @click="showLess" class="button is-light">Show Less</button>
                </div>
            </section>

            <!-- Favorite Ideas Section -->
            <section v-if="activeSection === 'favorites'">
                <h3 class="title is-4">Your Favorite Content Ideas</h3>
                <div v-if="favoriteIdeas.length === 0" class="notification is-info">
                    <p>No favorite content ideas yet. Mark ideas as favorites to access them later.</p>
                </div>
                <ul v-if="favoriteIdeas.length > 0">
                    <li v-for="idea in favoriteIdeas" :key="idea.id" class="box">
                        <h4 class="title is-5">{{ idea.title }}</h4>
                        <p>{{ idea.content }}</p>
                        <small><strong>Hashtags: </strong>{{ idea.hashtags }}</small>
                    </li>
                </ul>
            </section>

            <!-- Preferences Section -->
            <section v-if="activeSection === 'preferences'">
                <div v-if="preferencesSaved && !showPreferences" class="box">
                    <h3 class="title is-5">Your Current Preferences</h3>
                    <p><strong>Platform:</strong> {{ platform }}</p>
                    <p><strong>Niche:</strong> {{ niche }}</p>
                    <p><strong>Target Audience:</strong> {{ audience }}</p>
                    <p><strong>Location:</strong> {{ location }}</p>

                    <div class="field has-text-centered">
                        <button @click="togglePreferences" class="button is-link is-small">Update Preferences</button>
                    </div>
                </div>

                <!-- Preferences Form Section -->
                <div v-if="!preferencesSaved || showPreferences" class="box">
                    <p class="has-text-info">Please provide your content preferences below to tailor AI-generated
                        content ideas based on your platform, niche, and target audience.</p>

                    <!-- Loading Spinner for Saving Preferences -->
                    <div v-if="loading" class="has-text-centered">
                        <button class="button is-loading is-large">Saving Preferences...</button>
                    </div>

                    <form v-if="!loading" @submit.prevent="savePreferences" class="preferences-form">
                        <div class="field">
                            <label class="label">Select Platform</label>
                            <div class="control">
                                <div class="select">
                                    <select v-model="platform">
                                        <option value="YouTube">YouTube</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Blog">Blog</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Content Niche</label>
                            <div class="control">
                                <input class="input" type="text" v-model="niche"
                                    placeholder="e.g. Fashion, Gaming, etc.">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Target Audience</label>
                            <div class="control">
                                <input class="input" type="text" v-model="audience"
                                    placeholder="e.g. Teenagers, Professionals, etc.">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Select Location</label>
                            <div class="control">
                                <div class="select">
                                    <select v-model="location">
                                        <option value="UnitedStates">United States</option>
                                        <option value="UnitedKingdom">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                        <!-- Add other countries as needed -->
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <button type="submit" class="button is-primary">Save Preferences</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>


            <!-- Feedback Section -->
            <section v-if="activeSection === 'feedback'">
                <div class="box">
                    <h3 class="title is-4">We Value Your Feedback</h3>
                    <p>Please let us know how we can improve your experience or share any thoughts you have.</p>

                    <!-- Loading Spinner for Submitting Feedback -->
                    <div v-if="loadingFeedback" class="has-text-centered">
                        <button class="button is-loading is-large">Submitting Feedback...</button>
                    </div>

                    <!-- Feedback Form -->
                    <form v-if="!loadingFeedback" @submit.prevent="submitFeedback" class="feedback-form">
                        <div class="field">
                            <label class="label">Your Feedback</label>
                            <div class="control">
                                <textarea v-model="feedbackMessage" class="textarea"
                                    placeholder="Enter your feedback here..." required></textarea>
                            </div>
                        </div>

                        <div class="field">
                            <div class="control has-text-centered">
                                <button type="submit" class="button is-primary">Submit Feedback</button>
                            </div>
                        </div>
                    </form>

                    <!-- Success Notification -->
                    <div v-if="feedbackSuccessMessage" class="notification is-success">
                        {{ feedbackSuccessMessage }}
                    </div>
                </div>
            </section>


        </main>
    </div>
</template>

<script>
import {
    db, auth, serverTimestamp, signOut,

    collection, doc, setDoc, getDoc, addDoc, updateDoc, getDocs
} from '../firebase/init'
import StripeSubscribeButton from './StripeSubscribeButton.vue'
export default {
    components: {
        StripeSubscribeButton,
    },

    name: 'DashboardComponent',

    data() {
        return {
            nickname: '',
            timeOfDay: '',
            platform: '',
            niche: '',
            audience: '',
            preferencesSaved: false,
            showPreferences: false, // Toggle to show/hide preferences form
            generatedIdeas: [],
            successMessage: '',
            savedIdeas: [], // To hold saved content ideas
            favoriteIdeas: [], // To hold favorite content ideas
            trendingTopics: [], // To hold trending topics
            showAll: false,
            notificationPreference: '',  // To store user's preference for email frequency
            notificationSuccessMessage: '', // For success messages on saving notification preferences
            topicsToShow: 5, // Initial number of topics to display
            loading: false, // New loading state
            showIdeas: true, // New state to toggle idea visibility
            ideaLimit: 5,  // Max free ideas allowed
            ideasGenerated: 0,  // Track how many ideas user has generated
            isSubscribed: false, // Track user subscription status
            showSubscriptionPrompt: false, // To toggle subscription prompt visibility
            activeSection: 'overview',
            feedbackMessage: '',
            feedbackSuccessMessage: '',
            loadingFeedback: false, // Default section, set to whatever makes sense for your app
            location: '',

            selectedSource: '', // Add selected source for filtering
        }

    },
    computed: {
        limitedTrendingTopics() {
            return this.trendingTopics.slice(0, this.topicsToShow);
        },

        // Existing computed properties...
 // Filter trending topics based on search term and selected source
 filteredTrendingTopics() {
            let topics = this.trendingTopics;


            // Filter by selected source
            if (this.selectedSource) {
                topics = topics.filter(topic => topic.source === this.selectedSource);
            }

            // Limit the number of topics displayed
            return topics.slice(0, this.topicsToShow);
        }
    },
    methods: {


        // Placeholder for future notification preference handling (currently commented out)
        /*
        saveNotificationPreferences() {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
              db.collection('users').doc(userId).set({
                notificationPreference: this.notificationPreference,
                email: this.userEmail // User email for sending notifications
                // Save daily or weekly preference
              }, { merge: true })
              .then(() => {
                this.notificationSuccessMessage = 'Your notification preferences have been saved!';
                setTimeout(() => {
                  this.notificationSuccessMessage = '';
                }, 3000);
              })
              .catch(error => {
                console.error('Error saving notification preferences:', error);
              });
            }
        },
        */
        navigate(section) {
            this.activeSection = section;
        },
        toggleIdeas() {
            this.showIdeas = !this.showIdeas; // Toggle the visibility
        },

        // Get user notification preferences and other data on load
        getUserData() {

            const userId = sessionStorage.getItem('userId');
            if (userId) {
                const usersRef = doc(db, "users", userId);
                getDoc(usersRef)
                    .then(_doc => {
                        if (_doc.exists) {
                            const data = _doc.data();
                            // Check for missing fields and update if necessary
                            if (!data?.isSubscribed || !data?.ideasGenerated) {
                                // usersRef.doc(userId)
                                // .update({
                                //     isSubscribed: data.isSubscribed || false,
                                //     ideasGenerated: data.ideasGenerated || 0
                                // });

                                const usersRef = doc(db, "users", userId);
                                updateDoc(usersRef, {
                                    isSubscribed: data.isSubscribed || false,
                                    ideasGenerated: data.ideasGenerated || 0
                                })
                            }
                            this.nickname = data.nickname || 'there';
                            this.platform = data.platform || '';
                            this.niche = data.niche || '';
                            this.audience = data.audience || '';
                            this.location = data.location || '',
                                this.notificationPreference = data.notificationPreference || ''; // Load user's notification preference
                            this.preferencesSaved = !!this.platform && !!this.niche && !!this.audience;
                            this.userEmail = data.email;

                            this.isSubscribed = data.isSubscribed || false;

                            // After fetching subscription status, call fetchTrendingTopics
                            this.fetchTrendingTopics();
                            this.ideasGenerated = data.ideasGenerated || 0;

                            this.setTimeOfDay();
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } else {
                window.location.href = '/login';
            }
        },

        submitFeedback() {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                this.loadingFeedback = true; // Start loading spinner

                // db.collection('feedback')
                // .add({
                //     userId: userId,
                //     message: this.feedbackMessage,
                //     timestamp: serverTimestamp()
                // })

                addDoc(collection(db, "feedback"), {
                    userId: userId,
                    message: this.feedbackMessage,
                    timestamp: serverTimestamp()
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
            }
        },

        // Function to load saved content ideas
        loadSavedIdeas(userId) {
            const usersRef = doc(db, "users", userId);
            getDoc(usersRef)
                .then(doc => {
                    if (doc.exists && doc.data().contentIdeas) {
                        this.savedIdeas = doc.data().contentIdeas;
                    }
                })
                .catch(error => {
                    console.error('Error fetching saved ideas:', error);
                });
        },

        // Load favorite content ideas from the Firestore subcollection
        loadFavoriteIdeas(userId) {
            const userFavoritesRef = collection(db, 'users', userId, 'favorites');

            getDocs(userFavoritesRef)
                .then(snapshot => {
                    this.favoriteIdeas = snapshot.docs.map(doc => doc.data());
                })
                .catch(error => {
                    console.error('Error fetching favorite ideas:', error);
                });
        },


        markAsFavorite(idea) {
            const userId = sessionStorage.getItem('userId');
            this.loading = true; // Start loading state

            // Ensure that the required fields exist before saving
            if (idea && idea.title && idea.content && idea.hashtags) {
                if (userId) {
                    // const usersRef = db.collection("users");
                    // usersRef.doc(userId).collection('favorites')
                    // .add({
                    //     title: idea.title,
                    //     content: idea.content,
                    //     hashtags: idea.hashtags
                    // })

                    addDoc(collection(db, "favorites"), {
                        title: idea.title,
                        content: idea.content,
                        hashtags: idea.hashtags
                    })
                        .then(() => {
                            this.successMessage = 'Content idea has been added to favorites!';
                            setTimeout(() => {
                                this.successMessage = '';
                            }, 3000);
                            this.loadFavoriteIdeas(userId); // Reload favorites
                        })
                        .catch(error => {
                            console.error('Error marking as favorite:', error);
                        }).finally(() => {
                            this.loading = false; // Stop loading state
                        });
                }
            } else {
                // Provide more detail on missing fields
                console.error('Invalid idea object. Missing fields:', {
                    title: idea.title,
                    content: idea.content,
                    hashtags: idea.hashtags
                });
                alert('There was an issue saving this idea. Please make sure the idea contains a title, content, and hashtags.');
                this.loading = false; // Stop loading state if validation fails
            }
        },
        shareOnTwitter(idea) {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(idea.title + ' - ' + idea.content)}&url=${encodeURIComponent('https://your-platform-url.com')}&hashtags=${encodeURIComponent(idea.hashtags)}`;
            window.open(twitterUrl, '_blank');

            // Optional: track the share event in Firebase
            // db.collection('shares').add({
            //     ideaId: idea.id,
            //     platform: 'Twitter',
            //     timestamp: serverTimestamp(),
            // });

            addDoc(collection(db, "shares"), {
                ideaId: idea.id,
                platform: 'Twitter',
                timestamp: serverTimestamp(),
            })
        },

        shareOnInstagram(idea) {
            alert(`Please copy the content below and paste it on Instagram:\n\n${idea.title} - ${idea.content}\n\nHashtags: ${idea.hashtags}`);

            // Optional: track the Instagram share event
            // db
            // .collection('shares')
            // .add({
            //     ideaId: idea.id,
            //     platform: 'Instagram',
            //     timestamp: serverTimestamp(),
            // });

            addDoc(collection(db, "shares"), {
                ideaId: idea.id,
                platform: 'Instagram',
                timestamp: serverTimestamp(),
            })
        },



        // Set Time of Day
        setTimeOfDay() {
            const hour = new Date().getHours();
            console.log(hour)
            if (hour < 12) {
                this.timeOfDay = 'Morning';
            } else if (hour < 18) {
                this.timeOfDay = 'Afternoon';
            } else {
                this.timeOfDay = 'Evening';
            }
        },

        // Toggle Preferences Form
        togglePreferences() {
            this.showPreferences = !this.showPreferences;
        },

        // Save User Preferences in Firestore
        savePreferences() {
            const userId = sessionStorage.getItem('userId');
            if (userId) {


                setDoc(doc(db, "users", userId),
                    {
                        platform: this.platform,
                        niche: this.niche,
                        audience: this.audience,
                        location: this.location  // Save user's location preference

                    }, { merge: true })
                    .then(() => {
                        this.successMessage = 'Your preferences have been saved successfully!';
                        this.preferencesSaved = true;
                        this.showPreferences = false; // Hide form after saving

                        // Hide success message after 3 seconds
                        setTimeout(() => {
                            this.successMessage = '';
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('Error saving preferences:', error);
                    });
            }
        },
        //generate ideas
        generateIdeas() {
            const openaiAPI = process.env.VUE_APP_OPENAI_API_TEST_KEY;
            const userId = sessionStorage.getItem('userId');

            // Fetch the latest subscription status and ideasGenerated from Firestore
            // const usersRef = db.collection("users");
            // usersRef.doc(userId).get()

            const usersRef = doc(db, "users", userId);
            getDoc(usersRef)
                .then((_doc) => {
                    if (_doc.exists()) {
                        const userData = _doc.data();
                        this.isSubscribed = userData.isSubscribed || false;
                        this.ideasGenerated = userData.ideasGenerated || 0;

                        // Check if the user has exceeded the idea limit
                        if (!this.isSubscribed && this.ideasGenerated + 5 >= this.ideaLimit) {
                            this.showSubscriptionPrompt = true; // Show subscription prompt if limit is reached
                            return;
                        }

                        this.loading = true; // Start loading state

                        const prompt = `Generate 5 highly engaging and viral content ideas for ${this.platform}, targeting an audience interested in ${this.niche}. 
                        The ideas should appeal to an audience that enjoys ${this.niche} content (e.g., humor, tutorials, emotional stories) and be designed to increase shares and comments. 
                        Provide creative titles, a short description for each idea, and 3-5 relevant hashtags. 
                        Where possible, tie the ideas to current social media trends or popular challenges in ${this.niche}. 
                        The goal is to create content that prompts audience interaction and increases follower engagement.`;

                        fetch('https://api.openai.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${openaiAPI}` // Use OpenAI key securely
                            },
                            body: JSON.stringify({
                                model: "gpt-4",
                                messages: [
                                    { role: "system", content: "You are an AI assistant helping a content creator generate viral & creative content ideas." },
                                    { role: "user", content: prompt }
                                ],
                                max_tokens: 400,
                                n: 1
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                const rawContent = data.choices[0].message.content.trim();
                                const ideas = rawContent.split(/\d+\.\s+/).filter(Boolean);

                                this.generatedIdeas = ideas.slice(0, 5).map((idea, index) => {
                                    const [titlePart, descriptionPart] = idea.split("Description:").map(str => str.trim());
                                    const title = titlePart.replace(/Hashtags:.*/, "").trim();
                                    const description = descriptionPart.replace(/Hashtags:.*/, "").trim();
                                    const hashtagsMatch = idea.match(/Hashtags:\s*(.*)$/);
                                    const hashtags = hashtagsMatch ? hashtagsMatch[1] : '';

                                    return {
                                        id: index + 1,
                                        title: title || 'Untitled',
                                        content: description || 'No description',
                                        hashtags: hashtags || 'No hashtags'
                                    };
                                });

                                // Update ideasGenerated count in Firestore
                                this.ideasGenerated += 5;

                                // const usersRef = db.collection("users");
                                // usersRef.doc(userId)
                                // .update({ ideasGenerated: this.ideasGenerated });

                                const usersRef = doc(db, "users", userId);

                                updateDoc(usersRef, {
                                    ideasGenerated: this.ideasGenerated
                                })

                                // Store generated ideas in Firestore
                                this.storeIdeasInFirestore(this.generatedIdeas);
                            })
                            .catch(error => {
                                console.error('Error generating ideas:', error);
                            })
                            .finally(() => {
                                this.loading = false; // Stop loading state
                            });
                    } else {
                        console.error("No such document!");
                    }
                }).catch((error) => {
                    console.error("Error fetching document:", error);
                });
        },



        // Store Generated Ideas in Firestore
        storeIdeasInFirestore(ideas) {
            const userId = sessionStorage.getItem('userId');
            if (userId) {

                const userDocRef = doc(db, 'users', userId);

                setDoc(userDocRef, {
                    contentIdeas: ideas
                }, { merge: true })
                    .then(() => {
                        this.successMessage = 'Your content ideas have been saved successfully!';
                        setTimeout(() => {
                            this.successMessage = '';
                        }, 3000);

                    })
                    .catch(error => {
                        console.error('Error saving ideas:', error);
                    });
            }
        },

        // Logout Function
        logout() {
            signOut(auth).then(() => {
                sessionStorage.removeItem('userId'); // Clear user session data
                window.location.href = '/login'; // Redirect to login page
            }).catch(error => {
                console.error('Error logging out:', error);
            });
        },
        getTikTokCountryCode(location = null) {
            switch (location) {
                case "UnitedKingdom":
                    return 'gb'
                case "Canada":
                    return 'ca'
                case "Australia":
                    return 'au'
                default: // "UnitedStates"
                    return 'us'
            }
        },
        // Fetch trending topics including news
        fetchTrendingTopics() {
            const newsApiKey = process.env.VUE_APP_NEWS_API_KEY;
            const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;
            const redditUrl = 'https://www.reddit.com/r/all/top.json';
            const defaultTwitterCountry = 'UnitedStates'; // Default to the U.S. if no location is provided

            // Use location preference for TikTok and Twitter or default to U.S.
            const tiktokRegion = this.getTikTokCountryCode(this.location);
            
            const twitterCountry = this.location || defaultTwitterCountry;

            const tiktokApiUrl = `https://tiktok-scraper7.p.rapidapi.com/feed/list?region=${tiktokRegion}&count=10`;
            const twitterApiUrl = `https://twitter-api45.p.rapidapi.com/trends.php?country=${twitterCountry}`;

            const rapidApiKey = process.env.VUE_APP_RAPID_API_KEY;  // Accessing the RapidAPI key securely

            const cacheDuration = 7 * 24 * 3600 * 1000; // 7 days cache duration in milliseconds (1 week)
            const now = new Date().getTime();

            this.loading = true; // Start loading state

            // Check for cached TikTok and Twitter data
            let cachedTikTok = JSON.parse(localStorage.getItem('tiktokCache'));
            let cachedTwitter = JSON.parse(localStorage.getItem('twitterCache'));

            // Validate if cached TikTok data is still valid (within 7 days duration)
            if (cachedTikTok && (now - cachedTikTok.timestamp < cacheDuration) && !this.isSubscribed) {
                console.log('Using cached TikTok data');
                cachedTikTok = cachedTikTok.data;
            } else {
                cachedTikTok = null;
            }

            // Validate if cached Twitter data is still valid (within 7 days duration)
            if (cachedTwitter && (now - cachedTwitter.timestamp < cacheDuration) && !this.isSubscribed) {
                console.log('Using cached Twitter data');
                cachedTwitter = cachedTwitter.data;
            } else {
                cachedTwitter = null;
            }

            // Fetch from APIs
            const fetchReddit = fetch(redditUrl).then(response => response.json()).catch(() => []);
            const fetchNews = fetch(newsApiUrl).then(response => response.json()).catch(() => []);

            // Fetch TikTok, with caching for non-subscribers
            const fetchTikTok = cachedTikTok ?
                Promise.resolve(cachedTikTok) :
                fetch(tiktokApiUrl, {
                    headers: {
                        'x-rapidapi-key': rapidApiKey, // Using RapidAPI key from environment variables
                        'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
                    }
                }).then(response => response.json())
                    .then(tiktokData => {
                        // if (!this.isSubscribed) {} // doesn't need this if to cache
                        if (!this.isSubscribed ) { // tiktokData?.code !== -1
                            localStorage.setItem('tiktokCache', JSON.stringify({
                                timestamp: now,
                                data: tiktokData
                            }));
                        }
                        return tiktokData;
                    }).catch(() => []);

            // Fetch Twitter trends, with caching for non-subscribers
            const fetchTwitter = cachedTwitter ?
                Promise.resolve(cachedTwitter) :
                fetch(twitterApiUrl, {
                    headers: {
                        'x-rapidapi-key': rapidApiKey,  // Using RapidAPI key from environment variables
                        'x-rapidapi-host': 'twitter-api45.p.rapidapi.com',
                    }
                }).then(response => response.json())
                    .then(twitterData => {
                        if (!this.isSubscribed) {
                            localStorage.setItem('twitterCache', JSON.stringify({
                                timestamp: now,
                                data: twitterData
                            }));
                        }
                        return twitterData;
                    }).catch(() => []);

            // Fetch all data from APIs
            Promise.all([fetchReddit, fetchTikTok, fetchTwitter, fetchNews])
                .then(([redditData, tiktokData, twitterData, newsData]) => {
                    // Extracting Reddit topics
                    const redditTopics = redditData.data && redditData.data.children ? redditData.data.children.map(post => ({
                        title: post.data.title,
                        id: post.data.id,
                        source: 'Reddit',
                        url: post.data.url
                    })) : [];

                    // Extracting TikTok trending topics, limit to 2 if not subscribed
                    let tiktokTopics = tiktokData.data ? tiktokData.data.map((trend, index) => ({
                        title: trend.title || trend.hashtag,
                        id: `tiktok-trending-${index}`,
                        source: 'TikTok',
                        url: trend.url || 'https://www.tiktok.com/trending'
                    })) : [];
                    console.log('tiktokTopics', tiktokTopics);
                    
                    if (!this.isSubscribed) {
                        tiktokTopics = tiktokTopics.slice(0, 2);
                    }

                    // Extracting Twitter trends, limit to 2 if not subscribed
                    let twitterTopics = twitterData.trends ? twitterData.trends.map((trend, index) => ({
                        title: trend.name,
                        id: `twitter-trending-${index}`,
                        source: 'Twitter',
                        url: trend.url
                    })) : [];
                    if (!this.isSubscribed) {
                        twitterTopics = twitterTopics.slice(0, 2);
                    }

                    // Extracting News topics
                    const newsTopics = newsData.articles ? newsData.articles.map((article, index) => ({
                        title: article.title,
                        id: `news-${index}`,
                        source: 'News',
                        url: article.url
                    })) : [];

                    // Combine topics
                    const maxLength = Math.max(redditTopics.length, tiktokTopics.length, twitterTopics.length, newsTopics.length);
                    const combinedTopics = [];
                    for (let i = 0; i < maxLength; i++) {
                        if (redditTopics[i]) combinedTopics.push(redditTopics[i]);
                        if (tiktokTopics[i]) combinedTopics.push(tiktokTopics[i]);
                        if (twitterTopics[i]) combinedTopics.push(twitterTopics[i]);
                        if (newsTopics[i]) combinedTopics.push(newsTopics[i]);
                    }

                    this.trendingTopics = combinedTopics;
                    this.topicsToShow = 5;
                    this.loading = false; // Stop loading state
                })
                .catch(error => {
                    console.error('Error fetching trending topics:', error);
                    this.loading = false; // Stop loading state if there's an error
                });
        },


        // Helper function to shuffle an array (for mixing Reddit and News topics)
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        // Show 5 more trending topics, ensuring we don't exceed the available topics
        showMore() {
            if (this.topicsToShow < this.trendingTopics.length) {
                this.topicsToShow = Math.min(this.topicsToShow + 5, this.trendingTopics.length);
            }
        },
        // Reset to the initial number of topics
        showLess() {
            this.topicsToShow = 5;
        },

        // Generate ideas around trending topics
        generateIdeasAroundTrend(trend) {
            const userId = sessionStorage.getItem('userId');
            const openaiAPI = process.env.VUE_APP_OPENAI_API_TEST_KEY;

            // Fetch the latest subscription status and ideasGenerated from Firestore
            // const usersRef = db.collection("users");
            // usersRef.doc(userId).get()

            const usersRef = doc(db, "users", userId);
            getDoc(usersRef)
                .then((_doc) => {
                    if (_doc.exists()) {
                        const userData = _doc.data();
                        this.isSubscribed = userData.isSubscribed || false;
                        this.ideasGenerated = userData.ideasGenerated || 0;

                        // Check if the user has exceeded the idea limit
                        if (!this.isSubscribed && this.ideasGenerated + 5 >= this.ideaLimit) {
                            this.showSubscriptionPrompt = true; // Show subscription prompt if limit is reached
                            return;
                        }

                        this.loading = true; // Start loading state

                        const prompt = `Generate 5 highly engaging and viral content ideas for ${this.platform}, inspired by the trending topic "${trend.title}". 
                        These ideas should be tailored to an audience interested in ${this.audience} and designed to maximize interaction and shares. 
                        Each idea should include a catchy title, a brief description that encourages engagement, and 3-5 relevant hashtags. 
                        The ideas should be creative, unique, and aligned with current content trends or challenges on ${this.platform}. 
                        Focus on content that sparks discussion, encourages user participation, or ties into existing viral moments.`;

                        fetch('https://api.openai.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${openaiAPI}` // Use OpenAI key securely
                            },
                            body: JSON.stringify({
                                model: "gpt-4",
                                messages: [
                                    { role: "system", content: "You are an AI assistant helping generate viral & creative content." },
                                    { role: "user", content: prompt }
                                ],
                                max_tokens: 400,
                                n: 1
                            })
                        })
                            .then(response => response.json())
                            .then(data => {
                                const rawContent = data.choices[0].message.content.trim();
                                const ideas = rawContent.split(/\d+\.\s+/).filter(Boolean);

                                this.generatedIdeas = ideas.slice(0, 5).map((idea, index) => {
                                    const [titlePart, descriptionPart] = idea.split("Description:").map(str => str.trim());
                                    const title = titlePart.replace(/Hashtags:.*/, "").trim();
                                    const description = descriptionPart.replace(/Hashtags:.*/, "").trim();
                                    const hashtagsMatch = idea.match(/Hashtags:\s*(.*)$/);
                                    const hashtags = hashtagsMatch ? hashtagsMatch[1] : '';

                                    return {
                                        id: index + 1,
                                        title: title || 'Untitled',
                                        content: description || 'No description',
                                        hashtags: hashtags || 'No hashtags'
                                    };
                                });

                                // Update ideasGenerated count in Firestore
                                this.ideasGenerated += 5;

                                // const usersRef = db.collection("users");
                                // usersRef.doc(userId)
                                // .update({ ideasGenerated: this.ideasGenerated });

                                const usersRef = doc(db, "users", userId);
                                updateDoc(usersRef, {
                                    ideasGenerated: this.ideasGenerated
                                })

                                // Store generated ideas in Firestore
                                this.storeIdeasInFirestore(this.generatedIdeas);
                            })
                            .catch(error => {
                                console.error('Error generating ideas:', error);
                            })
                            .finally(() => {
                                this.loading = false; // Stop loading state
                            });

                    } else {
                        console.error("No such document!");
                    }
                }).catch((error) => {
                    console.error("Error fetching document:", error);
                });
        },
        // After successful payment, mark user as subscribed
        handlePaymentSuccess() {
            const userId = sessionStorage.getItem('userId');

            // const usersRef = db.collection("users");
            // usersRef.doc(userId).update({
            //     isSubscribed: true,
            //     ideasGenerated: 0 // Reset idea count after subscribing
            // })

            const usersRef = doc(db, "users", userId);
            updateDoc(usersRef, {
                isSubscribed: true,
                ideasGenerated: 0 // Reset idea count after subscribing
            })
                .then(() => {
                    this.isSubscribed = true;
                    this.showSubscriptionPrompt = false; // Hide subscription prompt
                    this.successMessage = 'You have successfully subscribed!';
                    setTimeout(() => {
                        this.successMessage = '';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error updating subscription status:', error);
                });
        },


        handleSubscription() {
            // const stripe = Stripe(process.env.VUE_APP_STRIPE_API_PROD_KEY);  // Securely accessing Stripe public key

            // stripe.redirectToCheckout({
            //     lineItems: [{ price: process.env.VUE_APP_STRIPE_PRICE_PROD_ID, quantity: 1 }],  // Replace with actual price ID from Stripe
            //     mode: 'subscription',
            //     successUrl: window.location.origin + '/success',  // Set success page
            //     cancelUrl: window.location.origin + '/cancel',  // Set cancel page
            // })
            // .then((result) => {
            //     if (result.error) {
            //         console.error(result.error.message);
            //     }
            // });

            // this.$refs.checkoutRef?.redirectToCheckout();
        }


    },

    created() {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            this.getUserData();
            this.loadFavoriteIdeas(userId); // Load favorite ideas when dashboard loads
            this.fetchTrendingTopics();

        }
    },

    

    mounted() {
        // todo; we don't need this anymore
        const stripeScript = document.createElement('script')
        stripeScript.setAttribute('src', 'https://js.stripe.com/v3/')
        document.head.appendChild(stripeScript)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>