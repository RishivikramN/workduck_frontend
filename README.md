# Guide
## Disclaimer
   
> The backend is hosted in heroku free tier.
> The free tier server will go to sleep once if
> there is no usage for long time. So it may take some
> time initially to get the server started. So you may be
> facing a little delay when you login or signup.

## Tech Stack
 - React js
 - BootStrap for styling
 - Firebase for deployment

## Installation

Install the dependencies start the server.

```sh
npm i
npm start
```

## Features
 - List all trains from given city to another on a given date(given trains follow a
weekly schedule)
 - List of all stops of a train
 - User's booking history
 - Allow multiple ticket booking at once and assign seat numbers
 - Live train tracking system (non-GPS technique) (Mocking based on time)
 - Status of the train (delayed or on time) (WIP based on the hardcoded data in the train's document)
 - List all trains arriving at a station in a given time frame (Accessible only for admin)

## Guide to understand the workflow

Sign up as admin or ordinary user using the checkbox in the signup page.

![image](https://user-images.githubusercontent.com/20830832/112756236-e10c9f80-9001-11eb-987a-bb39ffcb2525.png)

Search for trains in the next page

![image](https://user-images.githubusercontent.com/20830832/112756401-9dfefc00-9002-11eb-8b9b-13360bd5425b.png)

You will be presented with the trains list based upon your search criteria

![image](https://user-images.githubusercontent.com/20830832/112756437-ce469a80-9002-11eb-9c84-e8ded4445c35.png)

you can click on view schedule to view all the train stops.

![image](https://user-images.githubusercontent.com/20830832/112756457-e3bbc480-9002-11eb-8f2c-53023f232992.png)

you can click on the book now button to book your seats by checking the checkbox. you can choose mulitple seats.

![image](https://user-images.githubusercontent.com/20830832/112756496-11a10900-9003-11eb-8d4f-33f4aff4a724.png)

If you go to the booking history tab, you can see all your booking history.

![image](https://user-images.githubusercontent.com/20830832/112756516-31383180-9003-11eb-853c-f8305ac4e876.png)

you can also view the live train's location by using the live train status tab.

![image](https://user-images.githubusercontent.com/20830832/112756562-6e042880-9003-11eb-9de1-d356341aba18.png)

One thing to note, if you have not searched any trains in the Train search page you won't be able to see any trains in the 
live trains status page.

![image](https://user-images.githubusercontent.com/20830832/112756586-9429c880-9003-11eb-923c-80dc5929d705.png)

Once you have entered the train and click on get status. you will be seeing the current location of the train.

![image](https://user-images.githubusercontent.com/20830832/112756646-c6d3c100-9003-11eb-814c-39393e199e08.png)

