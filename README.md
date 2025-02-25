Tag: Beta++
# Frugal-Finder
FrugalFinder is a application that helps our users save money on groceries by comparing store prices, identifying coupons and member deals, and suggesting an optimized travel plan (including gas costs) for the lowest total spending. Our goal is to make grocery shopping more affordable and convenient for everyone.

## Goals
- Price Comparison: Aggregate and compare up-to-date prices from local grocery stores.
- Cost-Optimized Routes: Provide a GPS-based route that minimizes driving costs and time.
- Coupon Integration: Incorporate discounts and membership deals from different retailers.

## Repo Layout
- **.github/workflows**: CI testing
- **FrugalApp**: App source code
- **Status Reports**: Developer updates
- **scraper**: Backend webscraping
- **Status Reports**: Developer updates


## Living Document
For our detailed requirements, design, and updates, view it here (https://docs.google.com/document/d/1ywAs01lAXxL6tVSOyMDuroK5W3QLZ9vpdnpovwJuNqg/edit?usp=sharing).

# What is operational

## Our key features:

* Searching for grocery items: choosing and adding items
* The Home page
* The Shopping Cart

## Report a bug
Report Here: https://forms.microsoft.com/r/TLnYW75a2s

## Known Bugs
* Search back button does not work
* Searching does not show results
* Nav bar moves around when it shouldn't

# Get started

## How to use the software

### Try an early test build on Android

[Build Link](https://drive.google.com/drive/folders/1VtWwrHwWZjd6j1pr5CO34eAwXnOIhk1B?usp=sharing). Open and install on the android device.

* How to use the app: The app is currently in a demo state. Most featuers are a work in progress however to get a feel of what it would be like to use the app you may follow the app flow demonstrated in this video

https://youtu.be/TcvoPW6sT5U

the flow is home screen -> search for grapes -> inspet your item -> add to cart

### Make your own build

** The following is referencing to inside the FrugalApp dir **

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Environment Variable

In order to run the app fully, you will need an environment variable. Please contact any of us to receive this. The environment variable is responsible for connecting to the DB. Since our scrapper will be the main one updating to the DB it is required that anyone who forks the repo must need an environment variable to have the scrapper run properly. 
It is fine to place the environment variable in the root file of the directory. 

## How to test the app

### locally

Firts ensure that you can run the app through expo and that all tests pass when running npx expo doctor.

** The following is referencing to inside the FrugalApp dir **

inside the __tests__ folder is the App.test.js file. All tests for the app can be written from this file. To run a test use npm test.

### Using CI in Github

CI testing will always run and check for all tests to pass in the App.test.js file when pushing to any branch or merging any two branches.

## How to add new tests

### Writting tests for front-end

After developing your feature create a test for it in the file FrugalApp/__tests__/App.test.js

* All tests must have a comment with a name description and pre/post conditions.

## Writting tests for back-end

(please expand)




