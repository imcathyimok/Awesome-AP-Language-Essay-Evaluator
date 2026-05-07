import type { Prompt, QuestionType } from '../types'

const TASK_SYNTHESIS = [
  'Respond to the prompt with a thesis that presents a defensible position.',
  'Select and use evidence from at least three of the provided sources to support your line of reasoning.',
  'Explain how the evidence supports your line of reasoning.',
  'Use appropriate grammar and punctuation in communicating your argument.',
]

const TASK_RHETORICAL = [
  'Respond to the prompt with a thesis that analyzes the writer’s rhetorical choices.',
  'Select and use evidence to support your line of reasoning.',
  'Explain how the evidence supports your line of reasoning.',
  'Demonstrate an understanding of the rhetorical situation.',
  'Use appropriate grammar and punctuation in communicating your argument.',
]

const TASK_ARGUMENT = [
  'Respond to the prompt with a thesis that presents a defensible position.',
  'Provide evidence to support your line of reasoning.',
  'Explain how the evidence supports your line of reasoning.',
  'Use appropriate grammar and punctuation in communicating your argument.',
]

function makeId(year: 2023 | 2024 | 2025, set: 1 | 2, type: QuestionType) {
  return `${year}-set${set}-${type}`
}

export const PROMPTS: Prompt[] = [
  // ========== 2025 Set 1 ==========
  {
    id: makeId(2025, 1, 'synthesis'),
    type: 'synthesis',
    title: 'Space debris (“space junk”) — key factors to consider',
    source: { year: 2025, set: 1 },
    pdfUrl: '/pdfs/ap25-frq-english-language-set-1.pdf',
    promptText:
      'Space debris, often called “space junk,” is any piece of machinery or debris left in orbit by humans. As more satellites, space stations, and other craft are launched, the amount of debris in space increases. Carefully read the following six sources, including the introductory information for each source. Write an essay that synthesizes material from at least three of the sources and develops your position on the most important factors that space agencies and nations should consider when dealing with the problem of space debris.',
    taskBullets: TASK_SYNTHESIS,
    synthesisSources: [
      'Source A (O’Callaghan article)',
      'Source B (graph from ESA)',
      'Source C (Quell article)',
      'Source D (Rossettini opinion article)',
      'Source E (NOAA article)',
      'Source F (chart from Mosher and Kiersz)',
    ],
    synthesisSourceText: [
      {
        label: 'Source A',
        citation:
          "O’Callaghan, Jonathan. “What Is Space Junk and Why Is It a Problem?” Natural History Museum (London).",
        excerpt: `Space junk, or space debris, is any piece of machinery or debris left by humans in space. It can
refer to big objects such as dead satellites that have failed or been left in orbit at the end of
its mission. It can also refer to smaller things, like bits of debris or paint flecks that have
fallen off a rocket.

While there are about 2,000 active satellites orbiting Earth at the moment, there are also 3,000
dead ones littering space. What’s more, there are around 34,000 pieces of space junk bigger than
10 centimetres in size and millions of smaller pieces that could nonetheless prove disastrous if
they hit something else.

One major concern is that even tiny fragments can travel at extremely high speeds and cause
catastrophic damage when they collide with satellites or spacecraft. The problem is likely to grow
as more launches add more objects to orbit, increasing the chance of collisions and the amount of
new debris those collisions create.`,
      },
      {
        label: 'Source B',
        citation: "“ESA’s Space Environment Report 2021.” European Space Agency.",
        excerpt: 'Graph: “Satellites Launched into Low-Earth Orbit” (classified by main source of funding).',
        note: 'Screenshot from the PDF page is shown below.',
        imageUrl: '/source-images/ap25-frq-english-language-set-1-page5.png',
        imageAlt: 'Source B graph from the AP 2025 Set 1 PDF',
      },
      {
        label: 'Source C',
        citation:
          'Quell, Molly. “Lack of Space Law Complicates Growing Debris Problem.” Courthouse News Service (2020).',
        excerpt: `In total, there are five United Nations treaties that cover various aspects of space. The earliest, the Outer Space Treaty, which was ratified in 1967, has 104 signatories. It declared space free for all nations to explore and banned the use of nuclear weapons in space, a major security concern during the Cold War.

Prior to the signing of the Outer Space Treaty, each nation was considered to have sovereignty over the air above its borders. This concept was laid down in the Paris Convention of 1919, which aimed to regulate aerial travel, a new and rapidly developing industry.

Subsequent treaties—such as a 1968 agreement on the rescue of astronauts and the 1975 Registration Convention, which requires that objects launched into space be registered with a U.N. body—cover narrow aspects of space travel and have been signed by fewer than half of the world’s countries.

Collisions have occurred in space. Most of them are between defunct satellites, but one 1977 crash scattered radioactive debris across Canada. A malfunction onboard the nuclear-powered Soviet spy satellite Kosmos 954 pushed it back into the Earth’s atmosphere and Canada billed the Soviet Union more than 6 million Canadian dollars ($18 million today) for the damage. The two countries ultimately agreed on 3 million Canadian dollars ($9 million today).

The problem is only getting worse, said Oliver Tian, a researcher in the legal framework of space debris at the University of Leiden in The Netherlands. Nearly 9,000 satellites have been launched since the Soviet Union first sent Sputnik 1 to the Earth’s orbit in 1957. SpaceX alone has launched 60 satellites this year.

Most of what goes into space doesn’t come back. Nations aren’t required to remove their garbage from space and to do so voluntarily would cost a tremendous amount of money.

So more than half of those 9,000 satellites remain, some as operational but more as decommissioned junk. As they crash into each other, they create more tiny bits of debris whizzing around the Earth.

“Space could be inaccessible to humans,” said Tian.

This worst-case scenario is known as the Kessler Effect, when the quantity of space debris created from objects crashing into one another increases until it’s no longer possible to travel through it.

The European Space Agency launched its Clean Space Initiative in 2013 and has commissioned the first debris removal mission, scheduled for 2025. Together with the Swiss tech startup Clear Space, the ESA plans to use robotic arms to capture part of a rocket and deorbit it to the Earth’s atmosphere, where it will burn up on reentry.

“This is an environmental problem,” said Schrogl. “What is happening on Earth is happening in space.”

Despite the growing problem, the ESA’s chief strategy officer is optimistic. Unlike other issues facing humanity—climate change, poverty, war—the ones surrounding space debris have clear and straightforward solutions. If, that is, countries are willing to get together and act.

“It is a solvable problem,” Schrogl said.`,
      },
      {
        label: 'Source D',
        citation:
          'Rossettini, Luca. “Space Debris: Prevention, Remediation or Mitigation?” SpaceNews (2015).',
        excerpt: `Effort and money are being spent today on the development of ADR missions, a remediation technique focused on eliminating the garbage that is already in space. … There are political and legal issues related to the ownership of defunct satellites … There are also technology development challenges … Finally, there is the cost of every single mission that will be paid by taxpayers. …

We should first make sure that every new satellite and launch vehicle is properly and effectively removed at the end of life. Then we can start removing the defunct satellites already in space. Finally, we may think about recycling and reusing spent satellites already in space. Therefore, prevention is the first action to be put in place …`,
      },
      {
        label: 'Source E',
        citation:
          'National Environmental Satellite, Data, and Information Service. “Does Space Junk Fall from the Sky?” NOAA (2018).',
        excerpt: `Despite their size, even the smallest of objects … can be hazardous … because they are orbiting at extremely high velocities. …

“Because Suomi NPP moves at a similar speed as the debris object, if there had been an impact, it would have occurred at a combined speed of nearly 35,000 mph. This would have been catastrophic not only to the satellite, but would result in thousands of pieces of new debris,” said Harry Solomon …`,
      },
      {
        label: 'Source F',
        citation:
          'Mosher, Dave, and Andy Kiersz. “These Are the Countries on Earth with the Most Junk in Space.” Business Insider (2017).',
        excerpt: 'Chart: “Countries and Agencies with the Most Stuff in Orbit.”',
        note: 'Screenshot from the PDF page is shown below.',
        imageUrl: '/source-images/ap25-frq-english-language-set-1-page10.png',
        imageAlt: 'Source F chart from the AP 2025 Set 1 PDF',
      },
    ],
  },
  {
    id: makeId(2025, 1, 'rhetorical'),
    type: 'rhetorical',
    title: 'Treuer — Native American contributions (rhetorical analysis)',
    source: { year: 2025, set: 1 },
    pdfUrl: '/pdfs/ap25-frq-english-language-set-1.pdf',
    promptText:
      'The following is a passage from the introduction to David Treuer’s 2012 nonfiction book Rez Life: An Indian’s Journey Through Reservation Life. Treuer is a member of the Leech Lake Band of Ojibwe, a tribal nation in Minnesota. In Rez Life, Treuer draws on research and personal experience to explore the history of reservations and the issues that affect Native Americans who live on them today. A reservation is an area of land governed by a tribal nation in what is now the United States. Read the passage carefully. Write an essay that analyzes the rhetorical choices Treuer makes to develop his argument about the contributions that Native Americans and their communities have made to the United States.',
    taskBullets: TASK_RHETORICAL,
    passageExcerpt:
      `[T]he sign reads: WELCOME TO THE LEECH LAKE INDIAN RESERVATION HOME OF THE LEECH LAKE BAND OF OJIBWE PLEASE KEEP OUR ENVIRONMENT CLEAN, PROTECT OUR NATURAL RESOURCES NO SPECIAL LICENCES REQUIRED FOR HUNTING, FISHING, OR TRAPPING.

If you’re driving—as since this is America is most likely the case—the sign is soon behind you and soon forgotten. However, something is different about life on one side of it and life on the other. It’s just hard to say exactly what. The landscape is unchanged. The same pines, and the same swamps, hay fields, and jeweled lakes dropped here and there among the trees, exist on both sides of the sign. The houses don’t look all that different, perhaps a little smaller, a little more ramshackle. The children playing by the road do look different, though. Darker. The cars, most of them, seem older. And perhaps something else is different, too.

You can see these kinds of signs all over America. There are roughly 310 Indian reservations in the United States, though the Bureau of Indian Affairs (BIA) doesn’t have a sure count of how many reservations there are (this might say something about the BIA, or it might say something about the nature of reservations). Not all of the 564 federally recognized tribes in the United States have reservations. Some Indians don’t have reservations, but all reservations have Indians, and all reservations have signs. There are tribal areas in Brazil, Afghanistan, and Pakistan, among many other countries. But reservations as we know them are, with the exception of Canada, unique to America. You can see these signs in more than thirty of the states, but most of them are clustered in the last places to be permanently settled by Europeans: the Great Plains, the Southwest, the Northwest, and along the Canadian border stretching from Montana to New York. You can see them in the middle of the desert, among the strewn rocks of the Badlands, in the suburbs of Green Bay, and within the misty spray of Niagara Falls. Some of the reservations that these signs announce are huge. There are twelve reservations in the United States bigger than the state of Rhode Island. Nine reservations are larger than Delaware (named after a tribe that was pushed from the region). Some reservations are so small that the sign itself seems larger than the land it denotes. Most reservations are poor. A few have become wealthy. In 2007 the Seminole bought the Hard Rock Café franchise. The Oneida of Wisconsin helped renovate Lambeau Field in Green Bay. And whenever Brett Favre scored a touchdown there as a Packer, a Jet, or a Minnesota Viking, he did it under Oneida lights cheered on by fans sitting on Oneida bleachers, not far from the Oneida Nation itself.

Indian reservations, and those of us who live on them, are as American as apple pie, baseball, and muscle cars. Unlike apple pie, however, Indians contributed to the birth of America itself. The Oneida were allies of the Revolutionary Army who fed U.S. troops at Valley Forge and helped defeat the British in New York, and the Iroquois Confederacy served as one of the many models for the American constitution. Marx and Engels also cribbed from the Iroquois as they developed their theories of communism. Indians have been disproportionally involved in every war America has fought since its first, including one we’re fighting now: on July 27, 2007, the last soldiers of Able Company 2nd-136th Combined Arms battalion returned home to Bemidji, Minnesota, after serving twenty-two months of combat duty in Iraq. At the time Able Company was the most deployed company in the history of the Iraq War and was also deployed in Afghanistan and Bosnia. Some of the members of Able Company are Indians from reservations in northern Minnesota.

Despite how involved in America’s business Indians have been, most people will go a lifetime without ever knowing an Indian or spending any time on an Indian reservation. Indian land makes up 2.3 percent of the land in the United States. We number slightly over 2 million (up significantly from not quite 240,000 in 1900). It is pretty easy to avoid us and our reservations. Yet Americans are captivated by Indians. Indians are part of the story that America tells itself, from the first Thanksgiving to the Boston Tea Party up through Crazy Horse, the Battle of the Little Bighorn, and Custer’s Last Stand.`,
  },
  {
    id: makeId(2025, 1, 'argument'),
    type: 'argument',
    title: 'Osaka — embracing the present moment',
    source: { year: 2025, set: 1 },
    promptText:
      'Write an essay that argues your position on the extent to which Osaka’s claim about embracing the present moment is valid.',
    taskBullets: TASK_ARGUMENT,
    passageExcerpt:
      'In a 2022 interview with *People* magazine promoting her program to empower young girls through sport, professional tennis player and mental health advocate Naomi Osaka said: “For me, the biggest lesson I’ve learned is to try to be present in each moment. It’s easy to lose sight of how far you’ve come, but I’ve been prioritizing trying to live in the moment and enjoy the journey.”',
  },

  // ========== 2025 Set 2 ==========
  {
    id: makeId(2025, 2, 'synthesis'),
    type: 'synthesis',
    title: 'Mapping software / GPS — value, if any',
    source: { year: 2025, set: 2 },
    pdfUrl: '/pdfs/ap25-frq-english-language-set-2.pdf',
    promptText:
      'Mapping software and devices help people travel, find places, and share location information. Some people believe these tools are essential conveniences, while others worry about dependence, privacy, or other negative effects. Carefully read the following six sources, including the introductory information for each source. Write an essay that synthesizes material from at least three of the sources and develops your position on the value, if any, of mapping software and devices.',
    taskBullets: TASK_SYNTHESIS,
    synthesisSources: [
      'Source A (Foderaro article)',
      'Source B (National Research Council book)',
      'Source C (graph from He)',
      'Source D (Grabar article)',
      'Source E (chart from BuildFire)',
      'Source F (Paulas article)',
    ],
    synthesisSourceText: [
      {
        label: 'Source A',
        citation: 'Foderaro, Lisa W. “Navigation Apps Are Turning Quiet Neighborhoods Into Traffic Nightmares.” New York Times (2017).',
        excerpt: 'Article excerpt about navigation apps, routing, and neighborhood traffic.',
      },
      {
        label: 'Source B',
        citation: 'National Research Council. Understanding the Changing Planet (2010).',
        excerpt: 'Discussion of web mapping and the benefits of geographic information systems.',
      },
      {
        label: 'Source C',
        citation: 'He, Amy. “People Continue to Rely on Maps and Navigational Apps.” Insider Intelligence, 18 July 2019, www.emarketer.com/content/people-continue-to-rely-on-maps-and-navigational-apps-emarketer-forecasts-show.',
        excerpt: `The following is adapted from a graph published in an article forecasting market trends.

Smartphone Map/Navigation App Users (US, 2017–2021)`,
        imageUrl: '/source-images/ap25-frq-english-language-set-2-page6.png',
        imageAlt: 'Source C graph from the AP 2025 Set 2 PDF',
      },
      {
        label: 'Source D',
        citation: 'Grabar, Henry. “Smartphones and the Uncertain Future of Spatial Thinking.” Bloomberg (2014).',
        excerpt: 'Article excerpt about GPS navigation and spatial memory.',
      },
      {
        label: 'Source E',
        citation: '“Mobile App Download and Usage Statistics (2024).” BuildFire, n.d., buildfire.com/app-statistics/.',
        excerpt: `The following is adapted from a chart of digital application usage published on an app developer website.

Digital content can be consumed from so many devices.
People have smartphones, tablets, desktop computers, and laptops. You can even access content and apps from smart TVs, watches, smart home devices, and smart vehicles.
But there are certain categories that are dominated with smartphone app usage. These are the top categories that people turn to their smartphones for.

Smartphone App Usage`,
        imageUrl: '/source-images/ap25-frq-english-language-set-2-page6.png',
        imageAlt: 'Source E chart from the AP 2025 Set 2 PDF',
      },
      {
        label: 'Source F',
        citation: 'Paulas, Rick. “For the Good of Society—and Traffic!—Delete Your Map App.” Intelligencer (2017).',
        excerpt: 'Article excerpt criticizing map apps and traffic effects.',
      },
    ],
  },
  {
    id: makeId(2025, 2, 'rhetorical'),
    type: 'rhetorical',
    title: 'Vasquez Gilliland — rhetorical analysis',
    source: { year: 2025, set: 2 },
    pdfUrl: '/pdfs/ap25-frq-english-language-set-2.pdf',
    promptText:
      'Raquel Vasquez Gilliland is a Mexican American poet, novelist, and painter whose works focus on myths, folklore, motherhood, and plants. In 2023 she published an opinion article in The New York Times titled “Go Outside, Sink Your Feet Into the Dirt and Engage With the World.” The following is an excerpt from that opinion article. Read the passage carefully. Write an essay that analyzes the rhetorical choices Vasquez Gilliland makes to develop her argument about the value of engaging with nature.',
    taskBullets: TASK_RHETORICAL,
    passageExcerpt:
      `My grandmother and mother also taught me that the natural world around us has stories to tell if you listen closely. After all, language is not unique to humans. One of my earliest memories is sitting on my grandmother’s cracked concrete porch, watching one of the many doves she had nursed back to health land in her raised hand after she called out to it. When dark storm clouds gathered over the half-finished roof, my mother would take a steak knife from the kitchen to the sky to cut the rain away. My friends thought it was magical how nature seemed to bend to their will.

It makes sense, then, that I became an author, that my life is built around stories—that the idea of my first novel came tumbling to me when I was out on a walk, as if a piece of the sky had been cut over me. And whenever I am overwhelmed or anxious or stuck in my work, my mother’s advice to me is always the same: Go outside. Be in nature.

Our busy schedules can make it hard to find time to spend in nature, and it may seem especially hard in urban areas. But at a time when so many Americans are struggling with loneliness and isolation, spending a few moments outdoors can help us feel more connected.

Fortunately, there are several easy things you can do to get out in nature, no matter where you live. You can start by sinking your bare feet in a patch of dirt and consider the ways by which the soil nourishes the plants and animals that in turn nourish us. Maybe you can find a tree to befriend, be it a pine, mango or tulip tree. Use all your senses to engage with it—observe its leaves, feel the smooth wrinkles of its bark.

When I lived in New York and Los Angeles, I’d have to hike very far to find a piece of nature to be in—the rare tree in downtown Los Angeles, the canopy of ginkgoes near Inwood Hill Park in New York City. Now, in East Tennessee, I walk a few steps past my porch, into my garden—two small strips of land that flank my two-story white and turquoise farmhouse.

When I first moved here, nonnative European grass blanketed the thirsty clay, red as dried blood. I bought a shovel and set about digging up eight garden beds in the middle of that grass, filling them with plants native to my region: coneflowers and aromatic aster, bee balm and Virginia blue bells. I tried growing squash, peppers, yellow watermelon and white eggplant, but the plants languished and many didn’t yield any fruit at all. My land seems to want nothing but flowers. So I am trying my hand at breeding zinnias, cosmos and dahlias instead. Each bloom, as rich as a jewel, now attracts butterflies and hover flies and bees to feast where there was once nothing but a wasteland.

If I am creatively blocked, I walk barefoot on the earth, no matter the season, allowing stories to feed the roots of my entire body. If I have a plot hole I need to fix, I visit my lemon and lime basil, staining my fingers with their citrus scents. If I need to make my writing more lyrical, I sit with the dahlias, imagining that their vast genetic possibilities fill me when I speak with them.

When the summer gives way to cooler nights, my focus moves from leaves and blooms to the change in the angle of the sunlight. I think about how many times it has shifted over the entire lineage of humans, signaling to the trees to change from green to citrine, smoky topaz and shades of ruby. I reminisce about how I sat in that same autumnal light as a child, listening to the stories of my elders.

You, too, can listen to my mother’s advice and see what the land has to say to you—be it a wide hillside of bluestem grass or a single window box filled with petunias. If the practice of listening to the earth and the beings that inhabit it feels inauthentic, consider that humans have long been in dialogue with the natural world. Indeed their survival depended on their connection with the land and discerning what it had to say. When they died, what was left of them in turn nurtured it, too.

It could be that newly sprouted blooms or subtle shifts in sunlight signaled the changing of seasons—giving them instructions. Perhaps your ancestors, as mine most likely did, believed that the world around them was populated with sentient beings that communicated with them. I like to think that the stories my grandmother still tells when I sit at her table have inklings of those the animals, trees and rivers shared with our ancestors. Paying attention to what the land has to say is how I honor this legacy.`,
  },
  {
    id: makeId(2025, 2, 'argument'),
    type: 'argument',
    title: 'Gorman — optimism and pessimism “in conversation”',
    source: { year: 2025, set: 2 },
    promptText:
      'Write an essay that argues your position on the extent to which Gorman’s claim about the relationship between optimism and pessimism is valid.',
    taskBullets: TASK_ARGUMENT,
    passageExcerpt:
      'Amanda Gorman is the first National Youth Poet Laureate of the United States, an honor given to a young person for exceptional artistic expression, civic engagement, and social impact. In a 2021 interview in *Time* magazine, when asked how to maintain optimism in challenging times, Gorman stated: “Optimism shouldn’t be seen as opposed to pessimism, but in conversation with it. Your optimism will never be as powerful as it is in that exact moment when you want to give it up.”',
  },

  // ========== 2024 Set 1 ==========
  {
    id: makeId(2024, 1, 'synthesis'),
    type: 'synthesis',
    title: 'Historic preservation laws — value, if any',
    source: { year: 2024, set: 1 },
    pdfUrl: '/pdfs/ap24-frq-english-language-set-1.pdf',
    promptText:
      'Historic preservation laws are intended to protect buildings deemed to be of historic, cultural, or architectural value. The laws affect both government buildings and private property, putting constraints on how and to what extent the structures can be altered, renovated, or replaced. Proponents of these laws claim they are necessary for the preservation of history and culture and the architectural integrity of a neighborhood. Opponents of the laws argue that such laws prevent progress and negatively impact real estate development, building renovation, and building design. Carefully read the following six sources, including the introductory information for each source. Write an essay that synthesizes material from at least three of the sources and develops your position on the value, if any, of laws designed to preserve buildings deemed to be of historic importance.',
    taskBullets: TASK_SYNTHESIS,
    synthesisSources: [
      'Source A (National Park Service Web site)',
      'Source B (Merlino book)',
      'Source C (Appelbaum opinion article)',
      'Source D (Webb graph)',
      'Source E (Martin article)',
      'Source F (Rosen cartoon)',
    ],
    synthesisSourceText: [
      {
        label: 'Source A',
        citation: '“National Historic Preservation Act.” National Park Service, U.S. Department of the Interior, 2 Dec. 2018, nps.gov/subjects/historicpreservation/national-historic-preservation-act.htm.',
        excerpt: `After World War II, the United States seemed poised at the edge of a limitless future, and its vision of progress was characterized by the sleek and the new. Urban renewal was seen as a way to clear out the slums, get rid of “obsolete” buildings, make space for an exploding population, and accommodate the burgeoning car culture. Wide swaths were demolished: entire blocks, neighborhoods, business districts, all razed to make way for the new. By the 1960s, urban renewal had altered the face of the nation’s cities.

But out of this wholesale erasure of the old grew the most important law governing how we treat those places that define our past: the National Historic Preservation Act. It was the first national policy governing preservation and it would shape the fate of many of our historic and cultural sites over the next half-century.`,
      },
      {
        label: 'Source B',
        citation: 'Merlino, Kathryn Rogers. Building Reuse: Sustainability, Preservation, and the Value of Design. University of Washington Press, 2018.',
        excerpt: `In the United States, the recognition of value in buildings began with the identification and preservation of historical structures that had played an important part of the story of creating our nation. Historic designation usually takes into consideration national standards of significance set within specific boundaries: to be designated, a building must be proven to be associated with an important moment in local or national history, or with a historical individual or group, or must represent an exceptional architectural style or tradition.

Of course, the question of what should be considered “significant” historical and cultural value in a building is often hotly debated by owners, historians, politicians, community groups, and other interested parties. When the terms of significance can’t be established or agreed upon, it becomes practically impossible to “officially” declare something historic—and suddenly, the building lacks “value.”`,
      },
      {
        label: 'Source C',
        citation: 'Appelbaum, Binyamin. “When Historic Preservation Hurts Cities.” The New York Times, 26 Jan. 2020, nytimes.com/2020/01/26/opinion/historic-preservation-solar-panels.html.',
        excerpt: `I live in a historic neighborhood in the heart of Washington, D.C. It’s not historic in the sense that anything especially important happened here—certainly not in the modest rowhouses that make up the bulk of the neighborhood. What “historic” means, here and in cities across the country, is that this is a neighborhood where buildings are not supposed to change.

The law says window frames on Capitol Hill must be wooden, or something that looks very much like wood. If a front door has two parts and opens down the middle, it cannot be replaced by a single door that swings open from the side. If the house was built two stories tall, it must remain two stories tall—unless the addition can’t be seen from the street.`,
      },
      {
        label: 'Source D',
        citation: 'Webb, Amy. “Building Relevance: What Are the Top Challenges Facing Preservation?” National Trust for Historic Preservation: Preservation Leadership Forum, 8 Oct. 2020, forum.savingplaces.org/blogs/amy-webb1/2020/10/08/survey-top-challenges-facing-preservation.',
        excerpt: 'The following is based on a graph from a survey on preservation. The graph shows historic preservation professionals’ responses to the question “What are the top challenges to preserving historic places?”',
        imageUrl: '/source-images/ap24-frq-english-language-set-1-page6.png',
        imageAlt: 'Source D graph from the AP 2024 Set 1 PDF',
      },
      {
        label: 'Source E',
        citation: 'Martin, Shayla. “Can a Grassroots Movement Save Harlem’s Culturally Rich Buildings? We Talked to the Women Preserving the Neighborhood’s History.” Veranda, 19 Aug. 2021, veranda.com/home-decorators/a37189748/preservation-of-harlem/.',
        excerpt: `Valerie Jo Bradley is one of the cofounders of Save Harlem Now!, a nonprofit advocacy group that formed to preserve buildings and landscapes that contain important African American history from the early 20th century.

“We realized we’ve got to be organized and proactive to deal with the fact that only 3.7 percent of Harlem’s buildings are landmarked compared to 66 percent of Greenwich Village and 50 percent of the Upper West and Upper East sides.”

“Preservation is people-centered. Although we’re using old things—old buildings, old stories—it’s really about leveraging the power of place to have a positive impact on people’s lives right now in the present moment,” Leggs adds.`,
      },
      {
        label: 'Source F',
        citation: 'Rosen, Ellis. “National Trust for Historic Preservation of Frank’s Chair.” New Yorker Collection, 3 Jan. 2022, condenaststore.com/featured/national-trust-for-historic-preservation-of-franks-chair-ellis-rosen.html.',
        excerpt: 'The following is a cartoon from the collection of a weekly magazine of journalism and culture.',
        imageUrl: '/source-images/ap24-frq-english-language-set-1-page9.png',
        imageAlt: 'Source F cartoon from the AP 2024 Set 1 PDF',
      },
    ],
  },
  {
    id: makeId(2024, 1, 'rhetorical'),
    type: 'rhetorical',
    title: 'Saujani — bravery (rhetorical analysis)',
    source: { year: 2024, set: 1 },
    pdfUrl: '/pdfs/ap24-frq-english-language-set-1.pdf',
    promptText:
      'Reshma Saujani is an attorney, author, and activist who founded Girls Who Code, an organization that works to advance opportunities for girls and women to find careers in the technology sector. The following passage is excerpted from Saujani’s contribution to American Like Me: Reflections on Life Between Cultures, a 2018 anthology of essays by prominent Americans with backgrounds in multiple cultures. The excerpt begins after Saujani discusses founding a multicultural student organization at her high school. Read the passage carefully. Write an essay that analyzes the rhetorical choices Saujani makes to convey her message about the nature of bravery.',
    taskBullets: TASK_RHETORICAL,
    passageExcerpt: `Years later, when I ran for political office for the first time, I was exercising my bravery again. I had enjoyed several years of a lucrative career at a Wall Street law firm but longed to make my life more about helping to build communities and improving the future of this country. I wanted to push myself. And much like barging into Schaumburg High to start a diversity club, the idea of running for public office felt good—like I was flexing that bravery muscle again. So I bravely quit my job. I bravely ran for Congress. And I bravely lost by a landslide.

But I did it authentically, as myself, as Reshma. In the early stages of campaigning, I was told to change my name to Rita, given the advice that people are more likely to vote for you if they can pronounce your name. But my bravery had brought me this far. I wasn’t going to stop now. I could never turn my back on Reshma to become a Key‑Chain Rita. And losing authentically allowed me to articulate something I was passionate about. I wanted to find a way to address the fact that American girls are often raised to value perfection over bravery. They want to be Sweet Valley Jessicas instead of Schaumburg Reshmas. So I ran my campaign on a platform of bringing computer science into every classroom and making sure girls were given equal access to learning coding. I focused on this because the process of learning to code—building something from the ground up, using trial and error, failing and starting over—allows you to see for yourself that perfection is pretty pointless. And bravery leads to wonderful things.

I should know. After the election loss, I had the gall to start a national nonprofit called Girls Who Code, and I don’t even know how to code, myself.

But thanks to my childhood, growing up with two very brave immigrants as parents—who just like me were children of immigrants in Uganda—I now know it is more important than ever to be brave and proud of my identity, to own my role in changing the world, one election loss at a time.

Yes, I did run for office again a few years later. And yes, I lost again. But bravery is contagious.

On election day, I was running around in the rain shaking voters’ hands up to the very last minute. I met a woman—I did not catch her name—who was rushing to the polls. As she passed by me, I smiled and said, “Who are you voting for today?”

She hesitated, flustered but kind. Embarrassed she couldn’t pronounce it correctly, she fumbled out an uhh as she frantically pulled one of my fliers from her bag.

“This woman,” she said as she pointed at my name on the piece of paper.

Even though she needed a cheat sheet to remember who she was voting for, I couldn’t help but swell with pride that I had an Indian name. I couldn’t help but think of my parents. When they chose to name me Reshma, did they dream of a world where it would be unthinkable to go by Rita instead? I had spent years assimilating as a child, and for the first time, I thought I knew why my parents named me Reshma.

Maybe they didn’t want me to blend in as much as I thought. They blended in so I wouldn’t have to. They paid the ultimate price for my authenticity. They gave up their community, their careers, their language, their own names. These were the steep taxes they paid to make a better life for me. Assimilating in the ways my parents did can invite accusations. Changing your name and hiding your accent could be seen as passive or fearful gestures. But my parents’ immigrant experience reveals the great reserves of bravery and pride they had in order to survive in a new country with no familiar community of support. I think my parents are the bravest people I know. They traded in their names for the freedom and privilege I experience every day. Because of them, I have the platform to be brave. They built the stage I stood on at the PRISM assembly. They laid the groundwork for a little girl named Reshma to grow up and become the first Indian‑American woman to run for Congress.

They changed their names so I wouldn’t have to.`,
  },
  {
    id: makeId(2024, 1, 'argument'),
    type: 'argument',
    title: 'Wortham — selfies as a “visual diary”',
    source: { year: 2024, set: 1 },
    promptText:
      'Write an essay that argues your position on the extent to which Wortham’s claim about the value of documenting one’s life with selfies is valid.',
    taskBullets: TASK_ARGUMENT,
    passageExcerpt:
      'J Wortham (2013): “...a kind of visual diary, a way to mark our short existence...”',
  },

  // ========== 2024 Set 2 ==========
  {
    id: makeId(2024, 2, 'synthesis'),
    type: 'synthesis',
    title: 'Food trucks/carts — regulating mobile food service',
    source: { year: 2024, set: 2 },
    pdfUrl: '/pdfs/ap24-frq-english-language-set-2.pdf',
    promptText:
      'Mobile food service establishments, such as food trucks and food carts, have become increasingly trendy in recent years, offering customers appealing and often innovative dining options out of vehicles that can easily be located near workplaces and leisure activities. These businesses have sometimes been held back from expanding because of local regulations that restrict their activities and require operators to obtain licenses and certifications. Proponents of these regulations say that laws are needed to ensure that the meals offered by mobile food services are safe and that these businesses do not have an unfair advantage over traditional restaurants. Carefully read the following six sources, including the introductory information for each source. Write an essay that synthesizes material from at least three of the sources and develops your position on what are the most important factors for cities to consider when regulating mobile food service establishments.',
    taskBullets: TASK_SYNTHESIS,
    synthesisSources: [
      'Source A (Baker article)',
      'Source B (New Orleans permit guide)',
      'Source C (U.S. Census Bureau graph)',
      'Source D (Meehan article)',
      'Source E (Neseman cartoon)',
      'Source F (Weber book)',
    ],
    synthesisSourceText: [
      {
        label: 'Source A',
        citation: 'Baker, Linda. “Food Trucks ‘Are No Longer a Novelty,’ but They Are Adapting.” New York Times (2019).',
        excerpt: 'Article excerpt about food trucks, growth, regulation, and changing urban demand.',
      },
      {
        label: 'Source B',
        citation: 'City of New Orleans. Mobile food truck permit and license guide.',
        excerpt: 'Permit rules and operating restrictions for mobile food trucks.',
      },
      {
        label: 'Source C',
        citation: 'Hait, Andrew W. “Fast-Growing Food Truck Industry Can Operate Amid COVID-19 Social Distancing Rules.” U.S. Census Bureau (2020).',
        excerpt: 'Graph showing the number of mobile food service establishments.',
        imageUrl: '/source-images/ap24-frq-english-language-set-2-page6.png',
        imageAlt: 'Source C graph from the AP 2024 Set 2 PDF',
      },
      {
        label: 'Source D',
        citation: 'Meehan, Sarah. “Challenges to Food-Truck Restrictions Cropping Up beyond Baltimore.” Baltimore Sun (2016).',
        excerpt: 'Article excerpt about buffer rules, regulation, and how cities handle competition between food trucks and restaurants.',
      },
      {
        label: 'Source E',
        citation: 'Neseman, Dale. “Full Service.” Advertiser-News South (2020).',
        excerpt: 'Editorial cartoon about food truck regulations and restaurant-style service.',
        imageUrl: '/source-images/ap24-frq-english-language-set-2-page9.png',
        imageAlt: 'Source E cartoon from the AP 2024 Set 2 PDF',
      },
      {
        label: 'Source F',
        citation: 'Weber, David. The Food Truck Handbook: Start, Grow, and Succeed in the Mobile Food Business (2012).',
        excerpt: 'Book excerpt describing the future of food trucks and the benefits they can bring to cities.',
      },
    ],
  },
  {
    id: makeId(2024, 2, 'rhetorical'),
    type: 'rhetorical',
    title: 'Simu Liu — preparing to emigrate (rhetorical analysis)',
    source: { year: 2024, set: 2 },
    pdfUrl: '/pdfs/ap24-frq-english-language-set-2.pdf',
    promptText:
      'Simu Liu is an actor who has starred in television shows and movies, including Shang-Chi and the Legend of the Ten Rings. His 2022 memoir, We Were Dreamers: An Immigrant Superhero Origin Story, describes his experiences as a Chinese immigrant in Canada. Liu’s parents emigrated to Canada from China when Liu was a baby, leaving him with his grandparents. In the following excerpt from Liu’s memoir, the family is getting the four-year-old Liu ready to reunite with his father and travel to Canada himself. Read the passage carefully. Write an essay that analyzes the rhetorical choices Liu makes to convey his message about the experience of preparing to emigrate from China.',
    taskBullets: TASK_RHETORICAL,
    passageExcerpt: `In the summer of 1993 I noticed that my English flash card lessons were starting to pick up, along with talk that my departure date to Canada was drawing even nearer.

I didn’t like that one bit.

My whole family—my yéye, na˘inai, gu¯gu, gu¯fu¯, even my cousin JingJing—spoke of this “Canada” as if it were some sort of idyllic paradise, a place of abundant snacks and endless affection.

“You can eat whatever you want,” Na˘inai would say, as if I didn’t already have pretty regular access to all of my favorites on Héxìnglù.

“You will finally reunite with your parents,” my gu¯gu added reassuringly, as if I didn’t already have five amazing people around me who loved me.

Looking back, it felt kind of cult-y, like gospel from the Church of Canadology that I was supposed to just accept. I played along, even though I was still rough on the exact terms of this proposition. Sure, I welcomed the thought of meeting more members of my family . . . but I had no idea that said new family members would come at the cost of everyone that I knew and loved.

So, with about as much agency as any four-year-old possessed, I kept on, ever the obedient child, dutifully memorizing my English flash cards.

蘋果 (píngguo)—Apple. 貓 (ma¯o)—Cat. 香蕉 (xia¯ngjia¯o)—Banana. 爸爸媽媽 (bàbama¯ma)—Parents, whom I would meet in the winter.

An air of excitement permeated our household in the days leading up to my father’s arrival in late December. Word had come to us that Bàba would fly over to pick me up and escort me back to Canada, while Ma¯ma would meet us at the airport once we landed in Toronto. If my grandparents were dreading letting me go (they were), they went to great lengths not to show it. We made a big WELCOME BACK sign in giant letters and hung it on our door. I wore my nicest clothes on the day, an outfit of absolute fire consisting of a collared rugby shirt with blue and purple stripes, a pair of brown overalls with yellow polka dots and a vest that looked like a burlap sack. That’s right, I was pattern clashing way before it was cool.

My gu¯gu and gu¯f¯u came over and we prepared a feast that filled our little round table: white mushrooms with sliced pork, large tail-on shrimp, bean curd, soy-sauce ribs and Russian-style red sausage—my father’s favorite, apparently.

The food is starting to get cold when we hear a little knock on our door. I perk up anxiously as my yéye answers, opening the door to reveal a scrawny, square-faced man with bowl-cut hair wearing a big cozy sweater along with the bleary gaze of exhaustion that comes after an eighteen-hour train ride from Beijing. This man who resembles an Asian Eric Forman from That '70s Show is my baba, the man who I had waited my entire four-and-a-half-year life to reunite with. This is the man who is going to bring me to the promised land of Canada.

“Maomao! It’s me!”

I freeze. I had imagined this moment in my head many times, as I’m sure my father had. I wanted to run to him, embracing him enthusiastically and without any reservations, as any child would run to their own father—but I just...can’t. Everything about this man is foreign to me, from his voice to his smell. I had only seen his face in photographs, only heard recordings of his disembodied voice. He feels almost like a celebrity, someone I recognize from somewhere, but who is himself unknown and unknowable.

I scurry to my nǎinai’s side nervously. I’m sure my father was a little disappointed, but he respected my space, taking only a small step toward me.

“Do you know who I am?”

I ponder this for a moment.

“You...you are Zhenning Liu.”

Everyone around me bursts out laughing. The ice is broken, and I laugh along, even though I don’t get the joke. “Zhenning Liu” is exactly who this man is to me; not “Dad,” not “Father,” not “Baba”...but a stranger, an acquaintance at best.

Slowly, over the next few days, it dawns on me that this stranger is going to take me away from my family, my home and everything that I have ever known.`,
  },
  {
    id: makeId(2024, 2, 'argument'),
    type: 'argument',
    title: 'Baca — value of possessions',
    source: { year: 2024, set: 2 },
    promptText:
      'Write an essay that argues your position on the extent to which Baca’s claim about the value of possessions is valid.',
    taskBullets: TASK_ARGUMENT,
    passageExcerpt:
      'In a 2019 interview, award‑winning poet and memoirist Jimmy Santiago Baca asserted: “In America we value possessions. We would much rather talk about a new car than talk about a story that happened between grandfather and me. We’d much rather get on the computer and play video games and enact some cataclysmic epic than to talk about the epics in our own lives.”',
  },

  // ========== 2023 Set 1 ==========
  {
    id: makeId(2023, 1, 'synthesis'),
    type: 'synthesis',
    title: 'Urban rewilding — worthwhile for cities?',
    source: { year: 2023, set: 1 },
    pdfUrl: '/pdfs/ap23-frq-english-language-set-1.pdf',
    promptText:
      'Urban rewilding is an effort to restore natural ecological processes and habitats in city environments. Many cities around the world have embraced rewilding as part of larger movements to promote ecological conservation and environmentally friendly design. Now, a movement to promote urban rewilding is beginning to take shape in the United States as well. Carefully read the six sources, including the introductory information for each source. Write an essay that synthesizes material from at least three of the sources and develops your position on the extent to which rewilding initiatives are worthwhile for urban communities to pursue.',
    taskBullets: TASK_SYNTHESIS,
    synthesisSources: [
      'Source A (infographic from Fastnacht)',
      'Source B (Jepson and Schepers policy brief)',
      'Source C (NRPA article)',
      'Source D (Garland article)',
      'Source E (graph from McDonald et al.)',
      'Source F (Chatterton book excerpt)',
    ],
    synthesisSourceText: [
      {
        label: 'Source A',
        citation: 'Fastnacht, Sarah. “The Necessity of Rewilding our Cities.” Makers of Sustainable Spaces, MOSS (2021).',
        excerpt: 'The following infographic is based on an image in a blog post published by an architecture and design company that specializes in sustainability.',
        imageUrl: '/source-images/ap23-frq-english-language-set-1-page3.png',
        imageAlt: 'Source A infographic from the AP 2023 Set 1 PDF',
      },
      {
        label: 'Source B',
        citation: 'Jepson, Paul, and Frans Schepers. “Making Space for Rewilding: Creating an Enabling Policy Environment.” Rewilding Europe (2016).',
        excerpt: `Rewilding is a powerful new term in conservation. This may be because it combines a sense of passion and feeling for nature with advances in ecological science. The term resonates with diverse publics and seems to have particular appeal to a younger urban generation and among those who want a voice in shaping a new rural environment. Rewilding is exciting, engaging and challenging: it is promoting debate and deliberation on what is natural and the natures we collectively wish to conserve and shape.

Rewilding is a multifaceted concept with three broad dimensions that interact with each other: 1) restoring and giving space to natural processes, 2) reconnecting wild(er) nature with the modern economy, and 3) responding to and shaping cosmopolitan perceptions of nature conservation among European society.

1. Restoring natural processes and ecological dynamics—both abiotic such as river flows, and biotic such as the ecological web and food-chain—through reassembling lost guilds of animals in dynamic landscapes.
2. A gradated and situated approach, where the goal is to move up a scale of wildness within the constraints of what is possible, and interacting with local cultural identities.
4. Creating self-sustaining, resilient ecosystems … that provide resilience to external threats and pressures, including the impact of climate change.
5. Working towards the ideal of passive management, where once restored, we step back and allow dynamic natural processes to shape conservation outcomes.
7. Reconnecting policy with popular conservation sentiment and a recognition that conservation is a culturally dynamic as well as a scientific and technical pursuit.

As a new conservation frame, rewilding brings together established and newer conservation worldviews. … it reflects innovation and creates the possibility for a common, but differentiated mode of conservation.`,
      },
      {
        label: 'Source C',
        citation: '“Urban Rewilding.” Parks and Recreation, National Recreation and Park Association (2016).',
        excerpt: `Dr. Scott Sampson suggests that “urban rewilding” in our cities and towns is what’s needed to head off this crisis. Urban rewilding is a bottom up approach that starts with the simple act of planting mostly native plants. They are critical to attracting native insects, which in turn attract birds and various animals back to the local ecosystem. And, if we do urban rewilding right, cities could become places where nature is welcome.

This movement to “rewild” or “wild” children touches on all three NRPA Pillars—Conservation, Health and Wellness and Social Equity. However, it’s a movement that requires big thinking about what we want the future to look like and for each community that future will look different. It also will require deep collaboration among multiple organizations …`,
      },
      {
        label: 'Source D',
        citation: 'Garland, Lincoln. “Let Go of Some Urban Domestication: How Would You Convince the Mayor to Re-wild the City?” The Nature of Cities (2017).',
        excerpt: `I am unconvinced however that re-wilding is the appropriate terminology or the approach to wildlife restoration that we should be pursuing in UK cities at any meaningful scale.

The large expanses of greenspace that would be required to recreate fully functioning wildwood … are simply not available in our cities, where space is increasingly at a premium. Sustainable urban design should be seeking to avoid low-density sprawl and instead promote compact, transit-oriented, pedestrian-and-bicycle friendly urban development … Given this compact city imperative, the proposition of devoting large areas of urban space for re-wilding in anything approaching its true sense is untenable.

In those small areas where nature can be left to its own devices, many people may have a profound dislike for the outcome …

The disturbed nature of urban soils is likely to be another major limiting factor … Unencumbered natural succession may well produce landscapes in urban areas dramatically less visually and ecologically appealing than anticipated.`,
      },
      {
        label: 'Source E',
        citation: 'McDonald, Robert Ian, et al. “The Green Soul of the Concrete Jungle: The Urban Century, the Urban Psychological Penalty, and the Role of Nature.” Sustainable Earth (2018).',
        excerpt: 'The following is based on a graph published in a community-focused academic journal dedicated to advancing environmental sustainability. It shows responses from a survey conducted in three towns in the United Kingdom.',
        imageUrl: '/source-images/ap23-frq-english-language-set-1-page8.png',
        imageAlt: 'Source E graph from the AP 2023 Set 1 PDF',
      },
      {
        label: 'Source F',
        citation: 'Chatterton, Paul. Unlocking Sustainable Cities: A Manifesto for Real Change (2019).',
        excerpt: `We are beginning to see a proliferation of hybrid natural and built forms through, for example, living walls, rooftop farms, vertical or sky gardens and breathing buildings. These can have significant beneficial effects. … strategic placement of vegetation in street canyons can cut air pollution by up to 30 per cent. They can also stop urban overheating and provide effective insulation and shading for buildings, as well as reducing noise pollution.

Green corridors and linear parks can be retrofitted into the existing city. For example, the High Line project in New York transformed an old rail line into a nearly two-mile urban park … Efforts are being made not just to create greenspaces, but to create interconnected green corridors.

Singapore … implemented a landscape replacement policy whereby any greenery removed during construction has to be reinstated as part of the development. It is estimated that the amount of urban greenery has been at least doubled, but mainly through sky gardens.`,
      },
    ],
  },
  {
    id: makeId(2023, 1, 'rhetorical'),
    type: 'rhetorical',
    title: 'Michelle Obama — hope and expectations (rhetorical analysis)',
    source: { year: 2023, set: 1 },
    pdfUrl: '/pdfs/ap23-frq-english-language-set-1.pdf',
    promptText:
      'Michelle Obama was the First Lady of the United States during the presidential administration of her husband, Barack Obama (2009–2017). During that administration, she led programs including the Reach Higher Initiative, which encourages students to continue their education after high school. One way it does so is by supporting high school counselors’ efforts to get students into college. On January 6, 2017, Obama gave her final speech as First Lady at an event honoring outstanding school counselors. The following passage is an excerpt from that speech. Read the passage carefully. Write an essay that analyzes the rhetorical choices Obama makes to convey her message about her expectations and hope for young people in the United States.',
    taskBullets: TASK_RHETORICAL,
    passageExcerpt: `[A]s I end my time in the White House, I can think of no better message to send our young people in my last official remarks as First Lady. So, for all the young people in this room and those who are watching, know that this country belongs to you—to all of you, from every background and walk of life. If you or your parents are immigrants, know that you are part of a proud American tradition—the infusion of new cultures, talents and ideas, generation after generation, that has made us the greatest country on earth.

If your family doesn’t have much money, I want you to remember that in this country, plenty of folks, including me and my husband—we started out with very little. But with a lot of hard work and a good education, anything is possible—even becoming President. That’s what the American Dream is all about.

If you are a person of faith, know that religious diversity is a great American tradition, too. In fact, that’s why people first came to this country—to worship freely. And whether you are Muslim, Christian, Jewish, Hindu, Sikh—these religions are teaching our young people about justice, and compassion, and honesty. So I want our young people to continue to learn and practice those values with pride. You see, our glorious diversity—our diversities of faiths and colors and creeds—that is not a threat to who we are, it makes us who we are. So the young people here and the young people out there: Do not ever let anyone make you feel like you don’t matter, or like you don’t have a place in our American story—because you do. And you have a right to be exactly who you are.

But I also want to be very clear: This right isn’t just handed to you. No, this right has to be earned every single day. You cannot take your freedoms for granted. Just like generations who have come before you, you have to do your part to preserve and protect those freedoms. And that starts right now, when you’re young.

Right now, you need to be preparing yourself to add your voice to our national conversation. You need to prepare yourself to be informed and engaged as a citizen, to serve and to lead, to stand up for our proud American values and to honor them in your daily lives. And that means getting the best education possible so you can think critically, so you can express yourself clearly, so you can get a good job and support yourself and your family, so you can be a positive force in your communities.

And when you encounter obstacles—because I guarantee you, you will, and many of you already have—when you are struggling and you start thinking about giving up, I want you to remember something that my husband and I have talked about since we first started this journey nearly a decade ago, something that has carried us through every moment in this White House and every moment of our lives, and that is the power of hope—the belief that something better is always possible if you’re willing to work for it and fight for it. It is our fundamental belief in the power of hope that has allowed us to rise above the voices of doubt and division, of anger and fear that we have faced in our own lives and in the life of this country. Our hope that if we work hard enough and believe in ourselves, then we can be whatever we dream, regardless of the limitations that others may place on us. The hope that when people see us for who we truly are, maybe, just maybe they, too, will be inspired to rise to their best possible selves. That is the hope of students like Kyra who fight to discover their gifts and share them with the world. It’s the hope of school counselors like Terri and all these folks up here who guide those students every step of the way, refusing to give up on even a single young person. Shoot, it’s the hope of my—folks like my dad who got up every day to do his job at the city water plant; the hope that one day, his kids would go to college and have opportunities he never dreamed of.

That’s the kind of hope that every single one of us—politicians, parents, preachers—all of us need to be providing for our young people. Because that is what moves this country forward every single day—our hope for the future and the hard work that hope inspires.`,
  },
  {
    id: makeId(2023, 1, 'argument'),
    type: 'argument',
    title: 'Kingston — community of voices',
    source: { year: 2023, set: 1 },
    promptText:
      'Write an essay that argues your position on the extent to which Kingston’s claim about the importance of creating a community of voices is valid.',
    taskBullets: TASK_ARGUMENT,
    passageExcerpt:
      'In a 2016 interview published in the *Los Angeles Review of Books*, Maxine Hong Kingston, an award‑winning writer famous for her novels depicting the experiences of Chinese immigrants in the United States, stated: “I think that individual voices are not as strong as a community of voices. If we can make a community of voices, then we can speak more truth.”',
  },

  // ========== 2023 Set 2 ==========
  {
    id: makeId(2023, 2, 'synthesis'),
    type: 'synthesis',
    title: 'Vertical farms — value to the future of agriculture',
    source: { year: 2023, set: 2 },
    pdfUrl: '/pdfs/ap23-frq-english-language-set-2.pdf',
    promptText:
      'Vertical farms are indoor agricultural facilities in which plants are grown, often in a hydroponic (soilless) environment, on tall stacks of shelves. Plants are given water, nutrients, and light mostly through automated processes. Advocates say that vertical farms are key to providing food for the future, yielding high-quality produce while making efficient use of land and water. Critics warn about the energy consumption associated with vertical farms’ automated processes as well as problems related to cost and nutritional value. Carefully read the following six sources, including the introductory information for each source. Write an essay that synthesizes material from at least three of the sources and develops your position on the value, if any, of vertical farms to the future of agriculture.',
    taskBullets: TASK_SYNTHESIS,
    synthesisSources: [
      'Source A (Severson article)',
      'Source B (Ling and Altland interview)',
      'Source C (table from Kozai and Niu)',
      'Source D (Foley article)',
      'Source E (Benke and Tomkins article)',
      'Source F (graphic from Despommier)',
    ],
    synthesisSourceText: [
      {
        label: 'Source A',
        citation: 'Severson, Kim. “No Soil. No Growing Seasons. Just Add Water and Technology.” The New York Times (2021).',
        excerpt: `A high-tech greenhouse so large it could cover 50 football fields glows with the pinks and yellows of 30,600 LED and high-pressure sodium lights.

Inside, without a teaspoon of soil, nearly 3 million pounds of beefsteak tomatoes grow on 45-feet-high vines whose roots are bathed in nutrient-enhanced rainwater. Other vines hold thousands of small, juicy snacking tomatoes with enough tang to impress Martha Stewart, who is on the board of AppHarvest, a start-up that harvested its first crop here in January and plans to open 11 more indoor farms in Appalachia by 2025.

In a much more industrial setting near the Hackensack River in Kearny, N.J., trays filled with sweet baby butterhead lettuce and sorrel that tastes of lemon and green apple are stacked high in a windowless warehouse—what is known as a vertical farm. Bowery, the largest vertical-farming company in the United States, manipulates light, humidity, temperature and other conditions to grow produce, bankrolled by investors like Justin Timberlake, Natalie Portman, and the chefs José Andrés and Tom Colicchio.

The two operations are part of a new generation of hydroponic farms that create precise growing conditions using technological advances like machine-learning algorithms, data analytics and proprietary software systems to coax customized flavors and textures from fruits and vegetables. And they can do it almost anywhere.

These farms arrive at a pivotal moment, as swaths of the country wither in the heat and drought of climate change, abetted in part by certain forms of agriculture. The demand for locally grown food has never been stronger, and the pandemic has shown many people that the food supply chain isn’t as resilient as they thought.

“We’ve perfected mother nature indoors through that perfect combination of science and technology married with farming,” said Daniel Malechuk, the chief executive of Kalera, a company that sells whole lettuces, with the roots intact, in plastic clamshells for about the same price as other prewashed lettuce. In March, the company opened a 77,000-square-foot facility south of Atlanta that can produce more than 10 million heads of lettuce a year.

Although the nutritional profile of hydroponic produce continues to improve, no one yet knows what kind of long-term health impact fruits and vegetables grown without soil will have. No matter how many nutrients indoor farmers put into the water, critics insist that indoor farms can never match the taste and nutritional value, or provide the environmental advantages, that come from the marriage of sun, a healthy soil microbiome and plant biology found on well-run organic farms.

“What will the health outcomes be in two generations?” Mr. Chapman asked. “It’s a huge live experiment, and we are the rats.”`,
      },
      {
        label: 'Source B',
        citation: 'Ling, Kai-Shu, and James Altland. Interview with Georgia Jiang, Agricultural Research Service, USDA (2022).',
        excerpt: `Vertical farming offers many benefits that traditional farming cannot. For example, while the crops produced by traditional farming are limited by geographic region and seasonal changes, vertical farming allows growers to grow regional or seasonal crops indoors year-round. They can grow crops anywhere a greenhouse or controlled environment can be established. As a result, consumers (especially those in urban areas typically far from traditional farmlands) can also have easier access to fresher produce.

We’re currently repurposing ship containers to become vertical farming research units. Although vertical farming’s high costs can often be discouraging, shipping containers and abandoned warehouses are readily available and relatively inexpensive. Converting them into vertical farming environments not only breathes life back into discarded infrastructure but also puts fresh produce in parking lots and urban centers.

Vertical farming also uses much less land. For some crops, 10 to 20 times the yield can be obtained per acre in vertical farming compared to open-field crops. Other advantages are that vertical farms are in enclosed structures, so not subject to extreme or inclement weather. Vertical farms are being built in deserts, high-population urban areas, and other places that traditional open-field farming is not practical.

The major disadvantage is that you give up access to the Sun, which is the most abundant (and free) source of energy on Earth. Growing plants vertically in stacked systems often requires artificial light sources, which can become costly. Vertical farming also requires humidity control through expensive and energy-intensive heating, ventilation, and air conditioning (HVAC) systems.

Currently, lettuce and other leafy greens are the most popular crops for vertical farming. While research is underway to grow all types of crops in vertical farms, the most successful ones today would be those that can be grown hydroponically, have relatively short compact growth forms, and can be harvested in their entirety. For example, lettuce can be harvested in its whole form, as opposed to corn where only the cob is harvested for sale and the rest must be disposed of some other way.

Cereal and row crops (e.g., corn, rice, wheat and soybeans) are still better suited for traditional farming.

NASA is keenly interested in CEA for its use on long-term manned space missions. USDA has a long history of collaboration with NASA on controlled environment agriculture research.`,
      },
      {
        label: 'Source C',
        citation: 'Kozai, Toyoki, and Genhua Niu. “Role of the Plant Factory with Artificial Lighting (PFAL) in Urban Areas.” Plant Factory: An Indoor Vertical Farming System for Efficient Quality Food Production (2016).',
        excerpt: `Classification of Four Types of Plant Production Systems by Their Relative Stability and Controllability, and Other Factors

Open Fields / Greenhouse: Soil Culture / Greenhouse: Hydroponics / Vertical Farms
Natural stability of aerial zone: Very low / Low / Low / Low
Artificial controllability of aerial zone: Very low / Medium / Medium / Very high
Natural stability of root zone: High / High / Low / Low
Artificial controllability of root zone: Low / Low / High / High
Vulnerability of yield and quality: High / Medium / Relatively low / Low
Initial investment per unit land area: Low / Medium / Relatively high / Extremely high
Yield: Low / Medium / Relatively high / Extremely high`,
        note: 'This source is a table in the official PDF packet.',
      },
      {
        label: 'Source D',
        citation: 'Foley, Jonathan. “No, Vertical Farms Won’t Feed the World.” GlobalEcoGuy (2018).',
        excerpt: `There are costs to these farms. Huge costs.

First, these systems are really expensive to build. The shipping container systems developed by Freight Farms, for example, cost between $82,000 and $85,000 per container—an astonishing sum for a box that just grows greens and herbs. Just one container costs as much as 10 entire acres of prime American farmland—which is a far better investment, both in terms of food production and future economic value. Just remember: farmland has the benefit of generally appreciating in value over time, whereas a big metal box is likely to only decrease in value.

Second, food produced this way is very expensive. For example, the Wall Street Journal reports that mini-lettuces grown by Green Line Growers cost more than twice as much as organic lettuce available in most stores. And this is typical for other indoor growers around the country: it’s very, very expensive, even compared to organic food. Instead of making food more available, especially to poorer families on limited budgets, these indoor crops are only available to the affluent. It might be fine for gourmet lettuce, or fancy greens for expensive restaurants, but regular folks may find it out of reach.

Finally, indoor farms use a lot of energy and materials to operate. The container farms from Freight Farms, for example, use about 80 kilowatt-hours of electricity a day to power the lights and pumps. That’s nearly 2–3 times as much electricity as a typical (and still very inefficient) American home, or about 8 times the electricity used by an average San Francisco apartment. And on the average American electrical grid, this translates to emitting 44,000 pounds of CO2 per container per year, from electricity alone, not counting any additional heating costs. This is vastly more than the emissions it would take to ship the food from someplace else. And none of it is necessary.

But, Wait, Can’t Indoor Farms Use Renewable Energy?
Proponents of indoor techno-farms often say that they can offset the enormous sums of electricity they use, by powering them with renewable energy—especially solar panels—to make the whole thing carbon neutral.

But just stop and think about this for a second.

These indoor “farms” would use solar panels to harvest naturally occurring sunlight, and convert it into electricity, so that they can power . . . artificial sunlight? In other words, they’re trying to use the sun to replace the sun.

But we don’t need to replace the sun. Of all of the things we should worry about in agriculture, the availability of free sunlight is not one of them. Any system that seeks to replace the sun to grow food is probably a bad idea.`,
      },
      {
        label: 'Source E',
        citation: 'Benke, Kurt, and Bruce Tomkins. “Future Food-Production Systems: Vertical Farming and Controlled-Environment Agriculture.” Sustainability: Science, Practice and Policy (2017).',
        excerpt: `The vertical farming model was proposed with the aim of increasing the amount of agricultural land by “building upwards.” One approach is to employ a single tall glasshouse design with many racks of crops stacked vertically. It is an extension of the greenhouse hydroponic farming model and addresses problems relating to the use of soils, such as the requirement for herbicides, pesticides, and fertilizers.

The possibility of CGG food production is easily the most attractive feature of the vertical farming model. This aspect is less price sensitive to affluent consumers in high-demand countries such as China. All-year-round crop production without seasonality, in a climate-controlled environment (including both temperature and humidity), will produce fresh produce virtually on demand. There would be no weather-related crop failures due to drought or flooding if hydroponic and aeroponic technologies are employed.

Using recycled water and nutrients in a closed, indoor, climate-controlled environment adds to food security and can reduce or even completely eliminate the need for pesticides and herbicides. Contamination by pathogens or heavy metals will no longer be an issue as occurs in rural farming. There is scope for marketing the product in this respect. Strict hygienic practices must still be observed to minimize the risk of introduction of pathogens and biological contamination into the growing space. However, in a vertical farming situation, one can closely monitor the crop for signs of pest or disease both manually and automatically using sensing technologies.

One possible obstacle to vertical farming is that some consumers may regard the products as “Frankenfoods.” For this reason, some enterprises may not publicize growing conditions for fear of alienating consumers and destabilizing sales potential. To minimize this issue, it can be stressed that growing conditions are not different from existing hydroponic facilities with respect to germplasm, nutrition, and other cultural and production practices.

Furthermore, the plants are derived from natural breeding programs with normal nutrients supplied. There is an advantage that plants are grown in a hygienic environment with reduced need for pesticides and are in a closed system so there is no environmental pollution from nitrogen leaching or run-off.`,
      },
      {
        label: 'Source F',
        citation: 'Despommier, Dickson D. The Vertical Farm: Feeding the World in the 21st Century (2010).',
        excerpt: 'Graphic source from the official PDF packet showing a conceptual model of vertical farming and arable land use.',
        note: 'Screenshot should be placed in `public/source-images` and referenced here when available.',
      },
    ],
  },
  {
    id: makeId(2023, 2, 'rhetorical'),
    type: 'rhetorical',
    title: 'Rita Dove — wishes for graduates (rhetorical analysis)',
    source: { year: 2023, set: 2 },
    promptText:
      'On May 21, 2016, the poet Rita Dove delivered a commencement address to graduating students at the University of Virginia at Charlottesville, where she was a professor of English at the time. Dove received a Pulitzer Prize for her poetry and served as the United States poet laureate from 1993 to 1995. She also writes in a variety of genres including fiction and drama. The following is an excerpt from her speech. Read the passage carefully. Write an essay that analyzes the rhetorical choices Dove makes to convey her message about what she wishes for her audience of graduating students.',
    taskBullets: TASK_RHETORICAL,
    passageExcerpt: `I am extremely delighted to be here today, at the very institution where I have been teaching for the past twenty-seven years.

Although I have given commencement speeches before, this one is different; this is personal.

The job of a commencement speaker—I googled it, so it must be true!—is to dispense “life advice.” That seems the very opposite of Percy Bysshe Shelley's definition of the poet as “a nightingale who sits in darkness and sings to cheer its own solitude with sweet sounds.” So I will not give you advice. The last thing you want to hear is advice—because in order to be effective, advice must be specific—and that, obviously, is impossible in this setting.

So instead of advice, I will give you wishes. Just think of me as a contrary fairy godmother or a wily genie.

I wish you Hunger.

Of course, I don’t mean physiological want, but a continued spiritual and intellectual appetite, a hunger to know more, do more, feel more. When I told my graduate poetry writing class that I was giving this speech, I asked them what they wished they had heard at their baccalaureate exercises, and one young woman responded with a list of, as she put it, “some things . . . I wish I could have heard, if I’d had sense enough to listen.”

1. Life is short.
2. Don’t put yourself in a box.
3. There’s a reason certain people, places, books, ideas, etc. make our ears stand up; always follow what attracts you.
And number 4, which to me is the kicker:
4. Passions are hard to come by.

When you entered this university, you wanted to eat the world, and all everyone else wanted you to do was to get good grades. And though your dreams may have been more nebulous then than they are now, they were no less intense. So keep that hunger; nurse it. Stay curious, want it all while it lasts.

I wish you Hard Work.

By that I don’t mean back-breaking labor, not the drudgery of the treadmill, but an appreciation for the work that comes before the big show—getting ready, honing your tools. Observation, research, practice—the actress Lupita Nyong’o gives herself homework whenever she has an audition. The classical flautist James Galway says: “You can sight-read better if you know your scales and arpeggios.” When my father sat me down for the “You’re-going-out-into-the-world” talk, his message was this: Always be 150% prepared! At 150% you’ll be ready for anything—even if you’re not chosen for a job or position although you’re the better qualified candidate. As the first African-American research chemist to break the color barrier in the tire and rubber industry, my father knew that in most cases you won’t be asked for more than 75%; in fact, depending on your race and gender, you might not be expected to give more than 50% of your capacity. But only you will know if you’ve done your best, so focus on that rather than what others think your best is—because if you allow others to tell you your worth, you will have given up on yourself. For me, a shy kid who trembled giving class presentations in high school, the 150% I had not ever expected to need came in handy when I received the phone call that I had been awarded the Pulitzer Prize and would have to hold my first press conference. Six years later, when I was named Poet Laureate of the United States, that 150% emboldened me to write a letter on this University’s letterhead to then President-elect Clinton, suggesting that the White House spotlight the arts during Arts and Humanities month; and in October of that year, 1993, as my husband and I rushed to Pennsylvania Avenue right after my inaugural poetry reading at the Library of Congress to join the White House Celebration and State Dinner in honor of the Arts and Humanities, I used every bit of that 150%.

I wish you Uncertainty.

There’s only so much knowledge that can be taught; hard facts are just that—solid, dense entities, the stones in a swiftly flowing stream of possibilities. You cannot wait for revelation to come down upon you in a cloud of gossamer and angelic sighs; more often than not you have to seek it out. Sometimes you don’t know where you’re going, but the only way you’ll find out is if you get going. That doesn’t mean that you rush off willy-nilly screaming, “I’m going to conquer this world”—but you do need to be bold enough to step outside of your comfort zone, even if it’s scary Out There.`,
  },
  {
    id: makeId(2023, 2, 'argument'),
    type: 'argument',
    title: 'Curbelo — fear and persuasion',
    source: { year: 2023, set: 2 },
    promptText:
      'Write an essay that argues your position on the extent to which Curbelo’s claim about persuading others is valid.',
    taskBullets: TASK_ARGUMENT,
    passageExcerpt:
      'In a 2018 interview about the importance of collaboration, then United States Representative Carlos Curbelo stated: “If you’re trying to convince someone that they need to get involved in an issue or perhaps change their thinking on an issue, trying to scare them is not always effective and can actually sow resentment.”',
  },
]

export function promptsByType(type: QuestionType) {
  return PROMPTS.filter((p) => p.type === type).sort((a, b) => {
    if (a.source.year !== b.source.year) return b.source.year - a.source.year
    return b.source.set - a.source.set
  })
}

export function promptById(promptId: string) {
  return PROMPTS.find((p) => p.id === promptId) ?? null
}