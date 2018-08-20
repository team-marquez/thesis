import React from "react"

import Kamban from "./Kamban.jsx"
import DayModal from "./DayModal.jsx"

import { Query } from "react-apollo"
import gql from "graphql-tag"

let ITINERARY = gql`
  {
    userPrefs @client
  }
`

// let days = [
// 	[{
// 	name: 'ABC Kitchen',
// 	cost: 2, // (out of 4 dollar signs)
// 	location: 'ABC Carpet & Home, 35 E 18th St New York 10003',
// 	descriptionLong: `While plenty of New York restaurants have lately made the environment a priority—sourcing their ingredients locally and crafting dining rooms from salvaged materials—none have done so with quite as much visual and gastronomic panache as chef Jean-Georges Vongerichten’s ABC Kitchen. Everything, including the antique armoires, reclaimed-wood tables, porcelain plates and chandeliers entwined with flowering vines is gathered from area artisans.
// 	Though the restaurant’s sustainable ethos is outlined on the back of the menu like an Al Gore polemic, the cooking, based on the most gorgeous ingredients from up and down the East Coast, delivers one message above all: Food that’s good for the planet needn’t be any less opulent, flavorful or stunning to look at. It’s haute green cuisine.
// 	In step with fashion, the menu is a sprawling collection of small and large shareable plates—but unlike so many, it features reasonable pricing and dishes that all seem to work well together. After passing around pastas, salads, maybe a bowl of fried calamari—beautifully encrusted with crushed Martin’s Pretzels, lending an extra-crispy saline crunch—you might covet an entree all for yourself. A supremely buttery arctic char fillet, featuring skin that’s as crisp as a kettle-fried chip and nutty florets of roasted Romanesco, is certainly worth hoarding. As is a flattened golden roasted half chicken, its juicy flesh bathed in a vinegary glaze with wilted escarole and heady, butter-sopped potato puree.
// 	While some diners might be drawn to ABC Kitchen for its politics—the soap is organic, leftovers composted, herbs snipped from the rooftop garden—if you strip away the rhetoric, you’re left with a beautiful restaurant, offering food that’s as distinctive as it is thrilling.`,
// 	image: 'https://media.timeout.com/images/101804537/630/472/image.jpg',
// 	website: 'http://abckitchennyc.com/',
// 	LT: 1,
// 	IO: 0
// },
// {
// 	name: 'Brooklyn Bridge',
// 	cost: 0,
// 	location: 'Enter on Centre St between Chambers St and Park Row or on Tillary St at Adams St New York 10038',
// 	descriptionLong: `Sure, the Brooklyn Bridge serves a practical purpose as the means for millions of commuters to travel from lower Manhattan to Brooklyn, but it is also one of the most iconic structures in the city. You can walk and bike over it, but beware, the crowds are serious! Go early in the morning or late at night to avoid the hustle and bustle.
// 	What's the history of the Brooklyn Bridge? A true feat of 19th century engineering, this 1.3-mile long steel-wire suspension bridge was designed by famed civil-engineer John A. Roebling in 1869 (who, subsequently, would be the first of over 20 deaths caused by the construction of the bridge after a tragic accident involving a docking ferry). When the bridge officially opened 14 years later on May 24, 1883 it was the world's largest suspension bridge and immediately became a sensation as over 150,000 people crossed the bridge on that day alone. Looking up at the Gothic towers made of granite, limestone and Rosedale cement, formerly the tallest structures in the Western Hemisphere, it’s easy to understand why the landmark became the subject of countless paintings and photographs.
// 	How can you cross the bridge? Today anyone on feet or wheels (rollerblades, bicycles, cars, hoverboards, what-have-yous) can travel between the boroughs without paying a toll.
// 	Where should I go nearby? Enjoy a nice sit at the historic and beautiful City Hall Park directly on the Manhattan side. The Brooklyn side of the bridge ends in gorgeous DUMBO, where you can explore Brooklyn Bridge Park, gaze at Lady Liberty, visit the Brooklyn Flea on weekends, and eat at famous Grimaldi’s brick oven pizza.
// 	Oh, you want more history? Back in 1883, when Emily Roebling–wife and partner of Washington Roebling, the civil engineer and son of John A. Roebling, who continued his father’s work after his death–led the first party of walkers, the toll was a penny per person and additional cents for horses, wagons and livestock. Of course back then a lot was different: Not only were there not six lanes dedicated to car traffic (since there were no cars), Manhattan and Brooklyn were two entirely separate cities–New York (Manhattan) was the most populated in the country, but Brooklyn boasted the title as fourth behind Chicago and Philadelphia. Should you happen to be one of the 6,600 pedestrians travelling on foot and feel anxious about the sturdiness of the bridge, remember that P.T. Barnum once had his famous circus star Jumbo lead a parade of 21 elephants across the bridge. `,
// 	image: 'https://media.timeout.com/images/102848865/630/472/image.jpg',
// 	website: 'https://www1.nyc.gov/',
// 	LT: 1,
// 	IO: 1,
// },
// {
// 	name: 'Charlie Bird',
// 	cost: 3,
// 	location: '5 King St New York 10012',
// 	descriptionLong: `Sipping wine out of a $60 Zalto stem is an activity typical of more formal surroundings, but at Charlie Bird, you swirl a smoky Rodano chianti riserva while nodding your head to the Notorious B.I.G. Devoted in equal measure to seasonal cooking and serious wine, this West Village spot roughs up its own polish with subtle hints of the street, like large graphic prints of boom boxes and the now-ubiquitous restaurant soundtrack of early-’90s hip-hop.
// 	Less common than the blaring beats is the considerable wine muscle behind the place. Robert Bohr, a renowned sommelier late of Cru, and 24-year-old Grant Reynolds, from Colorado’s Frasca Food and Wine, preside over the clamorous dining room, packed with thirtysomethings fresh from work. Together they manage a wine list that’s short and vivid, a haiku to Cru’s tome. With a few glasses backed by about a hundred mostly Italian and French bottles—any of which can be ordered by the half—the offerings span some lesser-known regions, like Mount Etna and Corsica. It’s one in a burgeoning class of wine-focused restaurants, like Pearl & Ash, that deliver vino nerdism with downtown cool.
// 	Start with a grapefruit-bitter glass of Etna Bianco and the razor clam crudo ($12). Barely steamed and sliced thin like shaved garlic, the briny clams are tugged further down into the sea by fermented baby fish, then shot up to the surface by piquant pickled chilies. Slurp them out of their shells and enjoy the ride.
// 	Four-time James Beard Award nominee Ryan Hardy—of Aspen’s the Little Nell—sees to the menu. For a chef who gained respect in landlocked Aspen, he has a defter touch with seafood than with meat. His skate ($27) pulls away from its wing like the tenderest shreds of pulled pork, growing tantalizingly earthy as you swipe it in succession through caper and cauliflower purees and brown butter. But musky hunks of suckling pig ($29) aren’t moist enough, with sweet red pepper mostarda failing to sauce them into lusciousness.
// 	A bowl of nearly too-soft cuttlefish-ink chitarra strands (small $18, large $24) is saved by toothsome cuttlefish and crunchy bread crumbs, its lemon-bright tomato sauce turned wonderfully sinister (if you choose) by the jar of chili oil that accompanies each pasta. Back on land, a blissful, Thanksgiving-rich bite of crispy brick chicken ($55 for two) and fried bread dabbed in chicken liver mousse is knocked jarringly from autumn into spring by minty fava puree. The herb is a good-faith effort to cut the richness, but it vexes a palate primed for rosemary and sage.
// 	These Italian-inflected American dishes fall under the vast umbrella of “farm to table,” and Hardy’s cooking reminds us that without a capable kitchen in between field and fork, the term quickly loses meaning. Take the summer-picnic salad ($13) of chewy farro and juice-swelled cherry tomatoes with a verdant infield of arugula and mint. Shop at the Greenmarket all you want; it takes serious chops to achieve such balance.
// 	Service at Charlie Bird is equally considered, with little touches like free bottles of sparkling water and dishes for sharing split (and beautifully presented) upon arrival. Yet despite the glut of servers bottlenecking the slim upper level, waits between courses can be long, and the cacophonous din could make even a sort-of-young backpacker reach for earplugs.
// 	Any bad feelings will not make it through the molten chocolate cake ($12). The clichéd classic is made new with a scoop of salty olive oil ice cream and a pile of hypercrunchy honeyed crisped rice; scoop the three elements together and you’ve got one tricked-out bite of cereal and milk. A sweet note to end the meal on.
// 	As you step out onto Sixth Avenue and the thump of Biggie slowly fades, you realize that Charlie Bird may not hit every high, but it certainly strikes the right chord.`,
// 	image: 'https://media.timeout.com/images/100749199/630/472/image.jpg',
// 	website: 'http://charliebirdnyc.com/',
// 	LT: 0,
// 	IO: 0
// },
// {
// 	name: 'Central Park',
// 	cost: 0,
// 	location: '59th St to 110th St New York 10023',
// 	descriptionLong: `Central Park has it all: 843 acres. Nearly 40 million annual visitors. Twenty-nine sculptures. More than 25,000 trees. The massive National Historic Landmark is located smack-dab in the middle of Manhattan, and it is home to everything from an ice-skating rink to a swimming pool and hosts events like the New York City Marathon and outdoor SummerStage concerts. You could spend days in the park without seeing everything, and it’s open year-round with activities for every season. We could go on—we haven’t even mentioned Belvedere Castle or the Metropolitan Museum of Art yet—but you should really just go see it for yourself.
// 	Spend the day on the water Located on the shore of The Lake at 72nd Street, the picturesque Loeb Boathouse near the equally iconic Bethesda Fountain has been the setting of plenty of NYC movies, and for good reason. But it’s not just a pretty place: There are water sports right there in the middle of Manhattan. Head there to rent a rowboat or take a gondola tour, or just sit at the outdoor bar and sip a cocktail while watching everyone else struggle with their oars.
// 	See a show at sunset Yes, Shakespeare in the Park is found in this park. The essential free outdoor show is having a prolific 2017, with the much-discussed Julius Caesar and A Midsummer Night’s Dream in July. Yes, you have to line up at the crack of dawn to get tickets to the Public Theater’s productions at Delacorte Theater, but it’s worth it for the experience that rivals the best of Broadway. And as a last resort, you can wander Central Park’s Strawberry Fields and Sheep Meadow in search of community theater troupes rehearsing the Bard’s best works.
// 	Go wild at the zoo Central Park is so big that there’s an entire zoo within the park, and it’s home to 130 different species. The Central Park Zoo is found at 64th Street, and though it can’t compare to the gigantic Bronx Zoo, it’s worth stopping by to say hi to the snow leopards and grizzly bears. Tip: Even if you don’t have an entire afternoon to spend there, you can walk by and peep at the Sea Lion Pool and the iconic Delacorte Clock with dancing animals from Park Road.`,
// 	image: 'https://media.timeout.com/images/103257144/630/472/image.jpg',
// 	website: 'http://www.centralparknyc.org/',
// 	LT: 1,
// 	IO: 1,
// },
// {
// 	name: 'Eleven Madison Park',
// 	cost: 4,
// 	location: '11 Madison Ave New York 10010',
// 	descriptionShort: 'has good pizza',
// 	descriptionLong: 'Swiss chef Daniel Humm still mans the kitchen post-revamp at this Gramercy jewel, which began life as a brasserie before evolving into one of the city’s most rarefied and progressive eateries. The service is famously mannered, and the room among the city’s most grand. But the heady, epic tasting menus are the true heart of Eleven Madison Park, a format that spotlights Humm’s auteur instincts.',
// 	image: 'https://media.timeout.com/images/104677317/630/472/image.jpg',
// 	website: 'https://www.elevenmadisonpark.com/',
// 	LT: 1,
// 	IO: 0
// },
// {
// 	name: 'Empire State Building',
// 	cost: 2,
// 	location: '350 Fifth Ave New York 10118',
// 	descriptionLong: `Although it’s no longer the tallest building in New York City, this world-famous landmark remains a Manhattan icon for good reason. The main deck on the 86th floor is the highest open-air observatory in NYC, offering stunning 360-degree views of the Hudson and East Rivers,
// 	the Brooklyn Bridge, the Statue of Liberty and more ($34, seniors $31, children $27). Famous faces such as Chrissy Teigen, Celine Dion and Neil Patrick Harris have all been spotted enjoying the views from the top, which you’ll recognize from countless movies and TV shows. If you can’t get high enough, head to the 102nd floor's indoor observation deck for a full view of Central Park ($54, seniors $51, children $47). The Dare to Dream exhibit on the 80th floor honors the 3,400 people who built the 1,454-foot skyscraper and features original photographs, architectural sketches and construction notes.
// 	Before visiting, download the ESB app on iTunes or Google Play for exclusive content and access to a free audio tour. \n Why wait? \n The best time to visit with shorter lines is between 8 and 11am. If you’ve got no time at all for lines, nab an Express Pass ($60 for main deck, $80 for both decks), which will allow you to skip past everyone. But take note: The Express Pass is strictly sold online, so don’t be fooled by any people peddling them on the street. \n Be an early bird and night owl \n What better place to catch a sunrise than the Empire State Building? For $100, you can watch the sun come up over the entire city, and yes, it's stunning.
// 	This experience is limited to only 100 guests each day, so be sure to book yours well in advance. The views are just as spectacular at night, which you can enjoy if you opt for the AM/PM Experience ($49, $39 for children). The night ticket is redeemable after 9pm. See all of the lights \n Since 1976, the tower’s lights have been changing colors to honor holidays, special occasions and different organizations. But in 2012, an LED light system was installed, giving off dazzling displays of 16 million colors. Check the lighting calendar to find out what the colors signify every day.
// 	Also, light shows are now staged to simultaneous music on iHeartMedia stations. Want to watch? Search “Empire State Building Light Shows” on YouTube and prepare to be amazed. \n Our New York editorial team is constantly updating and reviewing the best attractions, activities and venues across the city, so that you're always in the know, with the best of NYC. at your fingertips. Empire State Building was most recently updated with new tips on June 21, 2017.`,
// 	image: 'https://media.timeout.com/images/100472855/630/472/image.jpg',
// 	website: 'http://esbnyc.com/',
// 	LT: 1,
// 	IO: 1,
// }
// ],
// [{
// 	name: 'Ippudo NY',
// 	cost: 2, // (out of 4 dollar signs)
// 	location: '65 Fourth Ave New York 10003',
// 	descriptionLong: `This sleek outpost of a Japanese ramen chain is always packed with New Yorkers and Nippon natives who queue up (often for two hours or more) for the simple pleasure of a bowl of soup. The chain’s self-styled “Ramen King,” specializes in tonkotsu, a pork-based ramen from southern Japan. `,
// 	image: 'https://media.timeout.com/images/100380275/630/472/image.jpg',
// 	website: 'http://ippudo.com/ny',
// 	LT: 1,
// 	IO: 0
// },
// {
// 	name: "The Manhattan Well Murder",
// 	cost: 2,
// 	location: '129 Spring St New York, New York, 10012 United States',
// 	descriptionLong: `A sealed well underneath former Manhattan Bistro in Soho was the site of the 1799 murder of Gulielma Elmore Sands, who was strangled and dumped in the well on Spring St.The accused murderer was Levi Weeks, a fellow boarder in a house on Greenwich Street, whom Sands had been secretly seeing. Weeks was masterfully defended in court by Alexander Hamilton and Aaron Burr. As a result, the jury delivered an acquittal after just five minutes of deliberation.Weeks, nevertheless, had to leave the city, as he was widely condsidered guilty.The well is not open to the public, but it is sometimes accessible upon special request provided its status as one of the Travel Channel’s “10 Most Haunted Places in America.”The Manhattan Bistro above the site is also now closed, but it is visible in the lower level of a clothing store called COS.Sign up for our newsletter and get the best of Atlas Obscura in your inbox. `,
// 	image: "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzLzZiMWJlOGI5ZDRhMzM1YTQ5ZGRhZGQzNTdiNTFmNjJiTlktQkc2ODZfU1BBQ0VzX0dfMjAxMTEwMjQxODE3NDEuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDQwMCswKzAiXSxbInAiLCJjb252ZXJ0IiwiLXF1YWxpdHkgODEgLWF1dG8tb3JpZW50Il0sWyJwIiwidGh1bWIiLCIzNzJ4MjQ4IyJdXQ/NY-BG686_SPACEs_G_20111024181741.jpeg",
// 	website: 'null',
// 	LT: 1,
// 	IO: 1,
// },
// {
// 	name: 'Miss Ada',
// 	cost: 3,
// 	location: '184 DeKalb Ave Brooklyn 11205',
// 	descriptionLong: `No, Miss Ada isn’t the name of some chef’s grade-school teacher. Rather, it’s a playful twist on the phonetic pronunciation of misada, the Hebrew word for “restaurant.” At this Fort Greene spot, Israeli-born chef Tomer Blechman (Bar Bolonat) combines his Latvian heritage with Mediterranean cooking for smart mezzes and larger, Middle Eastern plates. `,
// 	image: 'https://media.timeout.com/images/103855779/630/472/image.jpg',
// 	website: 'http://www.missadanyc.com',
// 	LT: 0,
// 	IO: 0
// },
// {
// 	name: 'Central Park',
// 	cost: 0,
// 	location: '59th St to 110th St New York 10023',
// 	descriptionLong: `Central Park has it all: 843 acres. Nearly 40 million annual visitors. Twenty-nine sculptures. More than 25,000 trees. The massive National Historic Landmark is located smack-dab in the middle of Manhattan, and it is home to everything from an ice-skating rink to a swimming pool and hosts events like the New York City Marathon and outdoor SummerStage concerts. You could spend days in the park without seeing everything, and it’s open year-round with activities for every season. We could go on—we haven’t even mentioned Belvedere Castle or the Metropolitan Museum of Art yet—but you should really just go see it for yourself.
// 	Spend the day on the water Located on the shore of The Lake at 72nd Street, the picturesque Loeb Boathouse near the equally iconic Bethesda Fountain has been the setting of plenty of NYC movies, and for good reason. But it’s not just a pretty place: There are water sports right there in the middle of Manhattan. Head there to rent a rowboat or take a gondola tour, or just sit at the outdoor bar and sip a cocktail while watching everyone else struggle with their oars.
// 	See a show at sunset Yes, Shakespeare in the Park is found in this park. The essential free outdoor show is having a prolific 2017, with the much-discussed Julius Caesar and A Midsummer Night’s Dream in July. Yes, you have to line up at the crack of dawn to get tickets to the Public Theater’s productions at Delacorte Theater, but it’s worth it for the experience that rivals the best of Broadway. And as a last resort, you can wander Central Park’s Strawberry Fields and Sheep Meadow in search of community theater troupes rehearsing the Bard’s best works.
// 	Go wild at the zoo Central Park is so big that there’s an entire zoo within the park, and it’s home to 130 different species. The Central Park Zoo is found at 64th Street, and though it can’t compare to the gigantic Bronx Zoo, it’s worth stopping by to say hi to the snow leopards and grizzly bears. Tip: Even if you don’t have an entire afternoon to spend there, you can walk by and peep at the Sea Lion Pool and the iconic Delacorte Clock with dancing animals from Park Road.`,
// 	image: 'https://media.timeout.com/images/103257144/630/472/image.jpg',
// 	website: 'http://www.centralparknyc.org/',
// 	LT: 1,
// 	IO: 1,
// },
// {
// 	name: 'Frenchette',
// 	cost: 3,
// 	location: '241 W Broadway New York 10013',
// 	descriptionLong: 'Swiss chef Daniel Humm still mans the kitchen post-revamp at this Gramercy jewel, which began life as a brasserie before evolving into one of the city’s most rarefied and progressive eateries. The service is famously mannered, and the room among the city’s most grand. But the heady, epic tasting menus are the true heart of Eleven Madison Park, a format that spotlights Humm’s auteur instincts.',
// 	image: 'https://media.timeout.com/images/105224268/630/472/image.jpg',
// 	website: 'http://www.frenchettenyc.com',
// 	LT: 1,
// 	IO: 0
// },
// {
// 	name: 'Empire State Building',
// 	cost: 2,
// 	location: '350 Fifth Ave New York 10118',
// 	descriptionLong: `Although it’s no longer the tallest building in New York City, this world-famous landmark remains a Manhattan icon for good reason. The main deck on the 86th floor is the highest open-air observatory in NYC, offering stunning 360-degree views of the Hudson and East Rivers,
// 	the Brooklyn Bridge, the Statue of Liberty and more ($34, seniors $31, children $27). Famous faces such as Chrissy Teigen, Celine Dion and Neil Patrick Harris have all been spotted enjoying the views from the top, which you’ll recognize from countless movies and TV shows. If you can’t get high enough, head to the 102nd floor's indoor observation deck for a full view of Central Park ($54, seniors $51, children $47). The Dare to Dream exhibit on the 80th floor honors the 3,400 people who built the 1,454-foot skyscraper and features original photographs, architectural sketches and construction notes.
// 	Before visiting, download the ESB app on iTunes or Google Play for exclusive content and access to a free audio tour. \n Why wait? \n The best time to visit with shorter lines is between 8 and 11am. If you’ve got no time at all for lines, nab an Express Pass ($60 for main deck, $80 for both decks), which will allow you to skip past everyone. But take note: The Express Pass is strictly sold online, so don’t be fooled by any people peddling them on the street. \n Be an early bird and night owl \n What better place to catch a sunrise than the Empire State Building? For $100, you can watch the sun come up over the entire city, and yes, it's stunning.
// 	This experience is limited to only 100 guests each day, so be sure to book yours well in advance. The views are just as spectacular at night, which you can enjoy if you opt for the AM/PM Experience ($49, $39 for children). The night ticket is redeemable after 9pm. See all of the lights \n Since 1976, the tower’s lights have been changing colors to honor holidays, special occasions and different organizations. But in 2012, an LED light system was installed, giving off dazzling displays of 16 million colors. Check the lighting calendar to find out what the colors signify every day.
// 	Also, light shows are now staged to simultaneous music on iHeartMedia stations. Want to watch? Search “Empire State Building Light Shows” on YouTube and prepare to be amazed. \n Our New York editorial team is constantly updating and reviewing the best attractions, activities and venues across the city, so that you're always in the know, with the best of NYC. at your fingertips. Empire State Building was most recently updated with new tips on June 21, 2017.`,
// 	image: 'https://media.timeout.com/images/100472855/630/472/image.jpg',
// 	website: 'http://esbnyc.com/',
// 	LT: 1,
// 	IO: 1,
// }
// ]]

class AllDays extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Query query={ITINERARY}>
        {({ loading, error, data }) => {
          if (loading) return (<h1> LOADING </h1>)
          if (error) return (<h1>ERROR</h1>)
          else {
						data = JSON.parse(data.userPrefs)
            return (
              <div>
                <Kamban days={data.itinerary} />
                <DayModal days={data.itinerary} />
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default AllDays