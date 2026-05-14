What I Expected
I figured this would just be the SvelteKit labs but using React. I thought I would have to make separate files for the server side to fetch the API data securely, exactly like the +page.server files we used in class. I basically expected to be passing props everywhere.

What Actually Happened
Server components really surprised me. It felt weird to just write an async function and grab the Unsplash data right inside the main page without a separate server file, but it was way faster to build. It was also nice not dealing with all the plus symbols in the file names, and using the children prop instead of slots made sense quickly.

The Hardest Part
Getting the search bar and the page navigation working was the hardest part by far. I was so used to SvelteKit where managing state is super easy. Trying to pull the search query and page number from the URL using searchParams took a lot of messing around before it finally synced with the Unsplash API.

What I'd Do Differently
I would definitely plan out what needs to be client-side versus server-side before I start typing. I just jumped in and realized later that stuff like the search input and saving to local storage needed a totally different setup with "use client" compared to just loading the static photos.

One Sentence Verdict
Next.js is awesome if you need to fetch a bunch of data fast, but I still prefer SvelteKit for the interactive UI components.
