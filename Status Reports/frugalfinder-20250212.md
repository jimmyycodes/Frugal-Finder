# Weekly Status Report (3/12)

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
- Finish Figma design, move onto react native building
- help teams with AWS and wbscraping

### Progress and Issues
- Tasks completed:
  - majority of Figma
  - CI integration in github
- Key learnings:
  - How to create CI yaml instructions for github
- Issues encountered:
  - getting account tokens and using github secrets
  - AWS connection

### Goals for Next Week
- Start on react native building 2.5 hrs
- connect backend 2 hrs

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
- Finish up web scraping for QFC, and factor out functionality to be used on a larger scale. Connect the scraping functionality to the database.

### Progress and Issues
- Tasks completed:
  - Scraper is able to scrape product information on a single page.
- Key learnings:
  - Different libraries that are helpful to implement scraping such as Selenium.
- Issues encountered:
  - Current implementation of scraping can't scrape products available. Need to implement something that navigates/scrolls through all products.

### Goals for Next Week
- Have scrapers built for QFC, Target, and Trader Joe's. Connect these scrapers to build the database.

---

## [Vladyslav Boiko]

### Goals for the Week
- Finish AWS database setup: [3 hours]

### Progress and Issues
- Tasks completed:
  - Created AWS account (switched from Firestone DB).
  - Created MySQL DB on AWS and accounts.
- Key learnings:
  - AWS huge infrastructure is working for entry level users like me.
  - How to use JUnit tests, test-automation and CI.
- Issues encountered:
  - Encountered issue of connecting AWS into VSCode AWS toolkit. 
  - Cannot figure out how AWS IAM credentials and permissions are working to access MySQl DB from VSCode from different machines.

### Goals for Next Week
- Help with webscrapers: [2 hours]
- Prepare for Beta Release [5 hours]

---
## [Ronin Crawford]

### Goals for the Week
- Start setting up the back-end and database to get ready for a beta test - Estimated time: [2 hours]
- Work on the testing and continuous integration plan - Estimated time: [3 hours]

### Progress and Issues
- Tasks completed:
  - Worked on setting up AWS to work with our project, got stuck
  - Helped finish the testing and CI plan
- Key learnings:
  - I gained a lot of insight into how AWS will potentially work with our app
  - I learned about the value of a solid testing and CI plan to help streamline development
- Issues encountered:
  - I got very stuck trying to set up the AWS MySQL database, problems with connecting it to VSCode AWS toolkit
  - Also could not figure out how AWS IAM credentials work, will continue to work on this week

### Goals for Next Week
- Work on more on setting up AWS: [3 hours]
- Help set up a basic back-end to prepare for the beta release: [4 hours]

---
