/*

(this is for a new/non-logged in user)
The client sends over an object with following format:

clientPreferences = 
{
  user: 'marty',
  pref: {
    totalBudget: 2250,
    partySize: 3,
    tripDates: [07-18-2019, 07-19-2019, 07-20-2019],
    LT: .75,
    IO: .75,
    FA: .60,
    kidFriendly: false
  }
}

this object, clientPreferences, is sent off to the weather machine.
the weather machine takes in the trip dates, and adds the following object to the pref:

weather: [0, 0, 1]

this array is 0 or 1, with 1 being rainy or worse.

This updated clientPreferences is then sent to the Reccomendation machine.

The machine then takes in the database, returning what it thinks the user will like.
This will be a HUGE object with lots of activities and restaurants. This object, Recs,
should look something like this:

Recs = 
{
  TheHighLine: {
    name: 'The High Line',
    type: 'activity',
    cost: 0, // (out of 4 dollar signs)
    location: '12345 8th Ave',
    descriptionShort: 'a short description',
    descriptionLong: 'from the individual page, the long description'
    LT: 1,
    IO: 1
  },
  Grimaldis: {
    name: 'Grimaldi's Pizza',
    type: 'restaurant',
    meal: [lunch, dinner], //PLEASE GOD LET THIS BE A THING WE CAN DO
    cost: 2,
    location: 'that place on 6th ave',
    descriptionShort: 'has good pizza',
    descriptionLong: 'its an old place, but holy hell is it famous and amazing pizza'
  }
}


*/