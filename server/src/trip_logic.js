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
    FA: .4,
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
    type: ['activity', details: {
      categories: [{cat1: .56}, {cat2: .24}, {cat3: .2}] //this array is a max of three cats, as floats
      }
    ],
    cost: 0, // (out of 4 dollar signs)
    location: '12345 8th Ave',
    descriptionShort: 'a short description',
    descriptionLong: 'from the individual page, the long description',
    image: a string for the image url,
    LT: 1,
    IO: 1
  },
  Grimaldis: {
    name: 'Grimaldi's Pizza',
    type: ['restaurant', details: {
      cuisine: [italian, pizza], meal: [lunch, dinner]
    },
    cost: 2,
    location: 'that place on 6th ave',
    descriptionShort: 'has good pizza',
    descriptionLong: 'its an old place, but holy hell is it famous and amazing pizza',
    image: a string for the image url,
    LT: 1,
    IO: 0
  }
}

This object is sent to Assembly boi.

Assembly boi's purpose is to place all of these into the structure needed by client.
Thus, it needs to be a matrix of 6 arrays, or an object of 6 arrays.

However, it also has the clientPreferences object from step 1. Internally at this point,
it translates the IO, LT, and FA floats on that obejct.

IO = .75 =>  IO: {indoor: 25%, outdoor: 75%}
LT = .75 => LT: {local: 25%, touristy: 75%}
FA = .4 => FA: {food: 60%, activity: 40%}

In the arrays below, it adds as many activity/food until the allocation for that item is full

tripOptions = {
  breakfast: [ {resaurant data from recs 1}, .....],
  lunch: [ {data from recs 1}, .....],
  dinner: [ {data from recs 1}, .....],
  morning: [ {data from recs 1}, .....],
  afternoon: [ {data from recs 1}, .....],
  evening: [ {data from recs 1}, .....],
  rainArray: [0, 1, 0, 0],
  temperatureArray: [79, 65, 75, 81],
  tripDates: [an array of dates formatted as: 2018-11-15]
}

those data objects are the objects from the Reccs objects above.

Finally, this is sent off to integrity boi.

Integrity boi checks that enough activities have been added to each array.
If so, it sends it back to the server.
If not, it sends the initial query back to Reccs machine, widening the scope and
getting more items.  NOTE: integrity would have to check for duplicates??


*/