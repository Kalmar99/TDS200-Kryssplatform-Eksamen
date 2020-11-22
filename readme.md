## TDS200 Kryssplatform Eksamen
A Social hiking app made for the exam in the course TDS200 at Høyskolen Kristiania.
The app is made with Ionic / Capacitor and uses Nhost with appolo & hasura for the backend. React with styled components is used for the front-end.
@google-maps-react/api used to display map.

### Features
- Create a user and share hiking trips.
- Follow other users
- Chat with other users
- Review other users trips and see them on a map.
- When people you follow shares a new trip you can see their trips in a feed (think istagram)

### Usage
1. Install dependencies with `npm install`
2. Start dev server with `ionic serve`
3. Build with `ionic build`

### Known Bugs
- Chat system is pretty slow.
- When going back from the chat you are taken to the home screen
    - This is 'intended', the chat page cant get the log-in status fast enough so in order not to be redirected to login you will be redirected to home.
- If you swipe to fast through the newtrip slides, the slides wont lock and you can bypass required fields.
- When going to another users profile while on myPage the nav bar wont update, so in order to get back to your own page you need to go to home first.
- Possible memory leak on myPage (havent figured out why)
- Depending on image size, the image might not always span the entire profile picture size.

### Sources
Images:
https://www.freepik.com/free-vector/beautiful-view-with-mountains-landscape-lake_5418624.htm#page=1&query=lake&position=40
https://www.freepik.com/free-vector/flat-natutral-landscape-with-trees_5102540.htm#page=1&query=mountain&position=18
https://www.freepik.com/free-vector/lake-with-wooden-pier-fisherman-boat-cartoon-illustration-summer-landscape-with-river-sea-bay-pond-wharf-man-hat-with-fishing-rod-boat_10308168.htm
https://www.freepik.com/free-vector/flat-natural-background-with-landscape_5133813.htm#page=1&query=mountain%20lake&position=9
https://www.freepik.com/free-vector/landscape_3903420.htm#page=1&query=falls&position=10
https://www.freepik.com/free-vector/cartoon-nature-landscape-with-mountain-forest-deciduous-trees-trunks-clearance_10385782.htm#page=1&query=forest%20magic&position=1
https://www.freepik.com/free-vector/scene-with-forest-dam_7026446.htm#page=1&query=dam&position=7
https://www.freepik.com/free-vector/waterfall-landscapes-compositions_3907713.htm#page=1&query=falls&position=29
https://www.freepik.com/free-vector/ocean-sea-waves-with-white-foam-nature-landscape_7588844.htm#page=1&query=coast&position=22
https://www.freepik.com/free-vector/iceberg-illustration-with-whales-seal_9881626.htm#page=1&query=seal%20in%20ocean&position=32
https://www.freepik.com/free-vector/abandoned-barn-interior-with-broken-furniture_9292972.htm#page=1&query=old%20farm&position=40
https://www.freepik.com/free-vector/explorer_4351045.htm#page=1&query=cliff&position=21
https://www.freepik.com/free-vector/long-shot-mountains-landscape_5481048.htm#page=1&query=Sunrise&position=23
https://www.freepik.es/vector-gratis/casa-madera-bosque-o-jardin_8188872.htm#page=1&query=casa%20bosque&position=6
https://www.freepik.com/vectors/cliff
https://www.freepik.com/free-vector/cabins-by-mountains-winter-illustration_3408643.htm#page=1&query=cabin&position=32
https://www.freepik.com/free-vector/explorer-with-backpack_4412262.htm#page=2&query=hiking&position=25
https://www.freepik.com/free-vector/ice-mountain-water-illustration_3297740.htm#page=1&query=Glacier&position=1
https://www.freepik.com/free-vector/happy-people-avatars_7085154.htm#page=1&query=avatar&position=4