# Weekly Status Report (2/12)

## Project Status

### Goals for the Week
-Research AWS and figure out how to setup DB.
-Decide whether or not to use webscraper due to legal issues.
-Get the initial UI working from the FIGMA and test Google Maps API.

### Progress and Issues
- Tasks completed:
  - Successfully started the Expo environment to begin front end development.
  -
  -
- Key learnings:
  - Improved understanding of testing methods.
  - Explored various web scraping approaches HTML vs API.
  - Switched from firebase to AWS.
- Issues encountered:
  - React Native setup was more complex than expected, requiring additional research and installation of dependencies (Android SDK, Emulator).
  - Legal issues with webscraper.
    - Solution: Installed missing dependencies and refined setup documentation.
  - Web scraping challenges: Some websites have dynamic content that Selenium struggles with.
    - Solution: Shifted to API-based data extraction, which provides structured and easily parseable data.

### Goals for Next Week
- Finalized testing the Google Maps API integration within the React Native app. (David Lym, Nathan Moreland – Estimated time: 6 hours)
- Develop and refine the web scraper to extract grocery store data efficiently. (Jimmy Le, Di Ramirez-Diaz – Estimated time: 8 hours)
- Set up and optimize the Firestore database for storing and managing scraped data. (Vladyslav Boiko, Ronin Crawford – Estimated time: 5 hours)

---

### David Lym

#### Goals for the Week
- Continue coding the react-native front end and connecting googleMaps API with every feature and ensuring that each feature is tested and compatible for both IOS and android.

#### Progress and Issues
- Tasks completed:
  - Create a google API and learned a little more about its usuage.
  - Created the initial UI page for Frugal Finder.
  - Tested functionality of the app using Expo.
- Key learnings:
  - Typescript functionality and how to search exactly what you're looking for.
  - Reinforced testing and visual UI with Expo.
- Issues encountered:
  - The environment is unusually difficult to set up, needed more research on how to reslove issues &
  api costs.
  = Switching from our old react native to react native expo.
  - Looking for free PNG's that don't look terrible.
  - Solution: Do a little more research into what dependencies needed to be installed,
  (had to install Android Studio for SDK & Emulator).
  -Configure both emulators so I don't have to base the UI of the web.

#### Goals for Next Week
- Get a working UI with API calls working but yet to be tested - Estimated time: [4 hours]
- Figure out how to set points from algorithm into maps with our DB info - Estimated time: [5~ hours]

---

## [Nathan Moreland]

### Goals for the Week
- The goal for this week is to get a clear idea of what we can start coding.

### Progress and Issues
- Tasks completed:
  - Software Architecture document
  - Database/backend diagram
- Key learnings:
  - How to design backend
  - Designing UI/UX
- Issues encountered:
  - We had lots of different ideas about how to web scrape/when to web scrape.
      - We will understand more once it begins to be realized

### Goals for Next Week
- Setup Firebase
- Rough working UI
- Understand how webscraper connects to database

---

## [Jimmy Le]

### Goals for the Week
- Continue to work on the webscrapper and being able to scrape all items for a specific search query.
- Start looking at helping set up the DB
- Look into how to test scrapers using pyTest.
- Set up front end on my local laptop.

### Progress and Issues
- Tasks completed:
  - Finished the webscraping code for trader joes.
- Key learnings:
  - Because we are targeting seattle based stores we decided to limit our search to currently 3 stores(QFC, Trader Joes, and Target) because of this, we found that all of these are CSR based websites meaning they render the front end through javascript and not server side.
  - When realizing this we learned that using selenium will be the best use of our scraper.
- Issues encountered:
  - There's a lot of things to consider when scraping using selenium. We need to handle any irregular pop ups that come onto the screen and on top of these, learn how to format the data you scrape.

### Goals for Next Week
- Finish the other two scraper and begin populating this information into our DB
- Help finish setting up the DB to connect to AWS.

---

## [Di Ramirez-Diaz]

### Goals for the Week
- Work on system architecture/design section. Start working on web scraper.

### Progress and Issues
- Tasks completed:
  - Finished the system architecture/design.
- Key learnings:
  - Different approaches/templates for system design.
- Issues encountered:
  - Trying to figure out scrapers. Should we scrape HTML or network requests. What are the pros and cons, HTML is more feasible but tedious. Network requests are harder to understand but information the received is easy to parse.

### Goals for Next Week
- Have our scraper design figured out, decided our approach on either HTML or network requests.

---

## [Vladyslav Boiko]

### Goals for the Week
- Help develop architecture schematic: [3 hours]
- Start researching how webscrapers function [3 hours]

### Progress and Issues
- Tasks completed:
  - Finished our system design architecture.
- Key learnings:
  - A lot of different system designs.
- Issues encountered:
  - How our Firestore database will work? Do we need indexes or if we update database super frequently it will slow it down?
  - What items we will parse and do we need to store every single item from each store?

### Goals for Next Week
- Work on the webscraper for Safeway/TraderJoe's food products: [5 hours]
- Design database on Firestore DB: [5 hours]

---
## [Ronin Crawford]

### Goals for the Week
- Help develop architecture schematic: [3 hours]
- Start researching how the AWS cloud infrastructure works [2 hours]

### Progress and Issues
- Tasks completed:
  - Help develop architecture schematic
  - Switched to Firebase, started research on it
- Key learnings:
  - I gained a much clearer picture of how the project is going to be set up and developed
- Issues encountered:
  - I struggled to come up with risks for our project, which was fixed by talking more with other members of the team
  - Originally we planned to use AWS, but then switched to Firebase, so I had to switch what I was learning about

### Goals for Next Week
- Start setting up the back-end and database to get ready for a beta test - Estimated time: [2 hours]
- Work on the testing and continuous integration plan - Estimated time: [3 hours]

---
