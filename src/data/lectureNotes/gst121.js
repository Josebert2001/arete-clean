// GST 121 — Nigerian Peoples and Culture
// Lecture notes transcribed from the official course textbook: "Nigerian
// Peoples and Culture: A Textbook for GST 121", edited by Prof. Friday E. Ude,
// Dr. Steiner B. Ifekwe and Dr. Esin O. Eminue, published by the Directorate of
// General Studies (GST), University of Uyo, May 2024 (ISBN 978-978-45189-6-1).
//
// The textbook is 17 chapters by 17 different departmental contributors. Only
// Chapter 1 has been transcribed so far; the remaining chapters are listed
// below so a later pass can slot in against the same numbering (topic number =
// chapter number):
//
//    1  The 3Rs Policy and Reorientation Strategies in Nigeria: 1970–1975  ✅
//    2  Apprenticeship System in Nigeria: Challenges and Future Prospects
//    3  Basic Nigerian Norms and Value System
//    4  Citizenship and Civic Responsibilities
//    5  Linguistic Groups in Nigeria and Indigenous Language Usage
//    6  Definitions and Classifications of Law
//    7  Indigenous Trade and Economic Development of Nigeria
//    8  The Labour Movement and Nationalism in Nigeria, 1945–1950
//    9  Marketing System in Nigeria in the Pre-Colonial Era
//   10  Military Intervention in Nigeria Politics
//   11  Moral Problems in Post-Colonial Nigeria
//   12  Environmental and Social Issues in Nigeria
//   13  Challenges of the Nigerian State Towards Nation-Building
//   14  Reorientation Strategies in Nigeria
//   15  Skill Acquisition for Self Reliance
//   16  The Role of the Courts in Upholding Peoples' Fundamental Rights
//   17  The Ethnic Minority Groups and Agitations in Nigeria
//
// Which syllabus items each chapter reaches is NOT recorded here. This file is
// imported verbatim by every department that takes GST 121, and each department
// writes its own `topics` array, so a single set of indices cannot be right for
// all of them. The mapping lives on each course instead, as `noteCoverage` keyed
// by the chapter numbers above (see courses.js / dataScienceCourses.js).
//
// The chapter has no figures. Where the textbook contradicts itself the prose
// has been settled to its evident intent; material genuinely added beyond the
// textbook — including corrections where it is factually wrong — is marked with
// a `note` section ("Added for clarity").

export const gst121LectureNotes = [
  // ─────────────────────────────────────────────────────────────────
  //  CHAPTER 1 — THE 3Rs POLICY AND REORIENTATION STRATEGIES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '1',
    title: 'The 3Rs Policy and Reorientation Strategies in Nigeria: 1970–1975',
    sections: [
      {
        type: 'text',
        text: 'Chapter 1, by Samuel O. Ishaya, Ph.D. (Department of Philosophy). It analyses the aims and objectives of the 3Rs and the other strategies the federal government of Nigeria used between 1970 and 1975 to reintegrate the former Eastern Region into the federation, restore development to that part of the country, and re-orientate the rest of the country to receive the people of the East as bona fide members of the Nigerian federation.',
      },

      {
        type: 'text',
        heading: 'Introduction — Background to the Policy',
        text: 'Nigeria gained political independence from Britain on October 1, 1960. At independence the country had three regions: Northern, Western and Eastern. In 1963 a fourth, the Midwestern Region, was carved out of the Western Region. By July 1967 a civil war had broken out between the Eastern Region and the rest of the country. The Eastern Region had been renamed the Republic of Biafra by Col. Chukwuemeka Odumegwu Ojukwu, who had been the region’s military governor since 1966, after the first military coup. The immediate causes of the war are mostly attributed to ethno-religious violence and anti-Igbo pogroms in Northern Nigeria, a military coup, a counter-coup, and the persecution of Southerners living in the North. The war ran for 30 months and caused the deaths of hundreds of thousands of people on both sides.',
      },
      {
        type: 'text',
        text: 'On January 15, 1970 the war ended with the surrender of the Biafran leadership to the Nigerian government. But a dilemma remained: how to rebuild the unity the war had shattered. During the war, people from the Eastern Region had become disenchanted with people from other parts of the country. Friends had become enemies; property was destroyed or looted by former neighbours and friends; public infrastructure — roads, bridges, schools, power stations, railway stations, trains, airports and aeroplanes — was damaged. The people of the former Eastern Region also nursed a fear of alienation and marginalisation, having surrendered to the Nigerian state.',
      },
      {
        type: 'text',
        text: 'To assuage those fears and at the same time re-orientate the other regions on the imperative of peace and unity, the government devised strategies to reintegrate and reconcile the East into the mainstream economic and political structures of the country. The first was the declaration of the war as "No victor, no vanquished." The next was the introduction of the 3Rs strategy — Reconciliation, Reconstruction and Rehabilitation. Embedded within the 3Rs were two further elements: the indigenization policy and the establishment of the National Youth Service Corps (NYSC).',
      },

      {
        type: 'text',
        heading: 'The Notion of "No Victor, No Vanquished"',
        text: 'On January 15, 1970, Lt. Col. Philip Effiong — who had taken over from Lt. Col. Odumegwu Ojukwu after Ojukwu went into exile in Ivory Coast — announced the Biafran surrender. In his speech of surrender, made in the presence of the Nigerian head of state Gen. Yakubu Gowon, Effiong declared that "we are loyal Nigerian citizens and accept the existing administrative and political structure of the federation of Nigeria" (cited in Ukaogo, 70).',
      },
      {
        type: 'definition',
        text: 'By "no victor, no vanquished" it is meant that no side involved in the war will or should claim victory or defeat over the other. The war, according to Gen. Gowon, was prosecuted in order to preserve the unity of the country; therefore the end of the war was a victory for all Nigerian citizens. There was no winner and no loser.',
      },
      {
        type: 'text',
        text: 'In his acceptance speech Gen. Gowon assured the people of the former Eastern Region that the war had been fought to preserve the unity of Nigeria and to usher in an era of peace and brotherliness. The declaration made clear that the aim of the federal government was the unification of the former citizens of the breakaway Republic of Biafra into the Federal Republic of Nigeria. It was in this spirit that he declared the years that followed a period of rehabilitation, reconstruction and reconciliation.',
      },

      {
        type: 'definition',
        heading: 'The 3Rs: Rehabilitation, Reconstruction and Reconciliation',
        text: 'The 3Rs policy was enunciated immediately after the end of the civil war in 1970 to readmit Biafra (the Eastern Region) into Nigeria after its exit in 1967. It was a clearly thought-out policy carrying the ingredients for healing the wounds and scars created by the war, and a strategy for resolving the age-old animosities that had combined with other factors to make the war inevitable. According to Victor Ukaogo (70), the policy was essentially made to reconcile the Igbos with the other sections of the country that had jointly brought pain upon them.',
      },
      {
        type: 'termlist',
        heading: 'What Each R Meant in Practice',
        items: [
          { term: 'Rehabilitation', def: 'Restoring to good working condition what the war had damaged — people, roads, bridges, public services and private companies that were destroyed during the war.' },
          { term: 'Reconstruction', def: 'Rebuilding destroyed public infrastructure: hospitals, schools and markets were reconstructed.' },
          { term: 'Reconciliation', def: 'Assuaging feelings of animosity among Nigerians — amnesty was granted to exiled Igbos, and those who had been in the civil or public service were completely reabsorbed into the mainstream of the public service.' },
        ],
      },
      {
        type: 'text',
        text: 'Taken together, the 3Rs were meant to give substance to Gen. Gowon’s "no victor, no vanquished" declaration and to re-absorb the people of the former Eastern Region — especially the Igbo ethnic group — into the larger Nigerian state.',
      },

      {
        type: 'text',
        heading: 'The Purpose of the 3Rs',
        text: 'Following the end of the war, a reorientation of the mindset and worldview of the former combatants was paramount. The 3Rs was meant to right the wrongs of the war and set the minds of all Nigerians towards one goal — the goal of unity. In a 2015 Convocation Lecture at the Chukwuemeka Odumegwu Ojukwu University, Igbariam, Anambra State, Gen. Gowon stressed that:',
      },
      {
        type: 'text',
        text: '"Our search for solutions to the problem of the aftermath of the war and destructions made it imperative that we establish a set of principles as anchor for our determined forward march. This was the basis of our introduction of 3Rs — Rehabilitation, Reconstruction and Reconciliation, which we must understand did not just try to rapidly address issues of immediate socio-economic and infrastructural concerns but vividly under-pinned my vision of the future: a vision of greater, united Nigeria in which anyone from the East, West, North and South could aspire to success in any field of human endeavor" (par. 19).',
      },
      {
        type: 'bullets',
        heading: 'The Three Stated Purposes',
        items: [
          'To rehabilitate those who suffered one disability or another — including the loss of self-worth, property and means of livelihood — back to normal economic and social life.',
          'To reconstruct all public infrastructure destroyed during the war: roads, bridges, schools, hospitals, utility stations and others. A good example is the Niger bridge connecting Onitsha in Anambra State with Asaba in Delta State, which was destroyed during the war but quickly rehabilitated afterwards.',
          'To reconcile the people of the former Eastern Region, especially the Igbo ethnic group, with the other sections of the country.',
        ],
      },
      {
        type: 'text',
        heading: 'Follow-up Reorientation Strategies to the 3Rs',
        text: 'The 3Rs represents the core policy thrust of the federal government of Nigeria from 1970 to 1975: to bring back the trust and unity the country had enjoyed among its different regions before the war. Embedded in the policy were two further elements — the indigenization policy and the National Youth Service Corps scheme. These elements defined the success of the 3Rs policy.',
      },

      {
        type: 'definition',
        heading: 'The Indigenization Policy',
        text: 'The indigenization policy is defined as "the roping off of certain types of business activities and the reserving of these for exclusive ownership and control of Nigerians." Its objective, according to Chibuzo Ogbuagu, was to set the stage for greater participation by Nigerian nationals in the ownership, management and control of the productive enterprises in the country.',
      },
      {
        type: 'text',
        text: 'It was a method of enhancing the industrial development of the nation by encouraging foreign investment in intermediate and capital goods production, as against foreign concentration in consumer non-durable goods production. In other words, the indigenization policy sought to promote local ownership and control of businesses within the country.',
      },
      {
        type: 'bullets',
        heading: 'Objectives of the Nigerian Enterprise Promotion Decree (NEPD) 1972',
        items: [
          'To create opportunities for Nigerian indigenous businesses.',
          'To maximize local retention of profits.',
          'To raise the level of intermediate capital and goods production (Ogbuagu, jstor.org).',
        ],
      },
      {
        type: 'text',
        text: 'The Nigerian Enterprise Promotion Decree 1972 was meant to effect changes in the ownership structure of businesses in Nigeria and to provide an opportunity for indigenous capital to take assertive control of the Nigerian economy. It gave Nigerians more access to the surplus income of businesses, shifted foreign investment towards highly technical areas, and promoted indigenous investment in those areas.',
      },
      {
        type: 'text',
        text: 'It is important to note that the idea of indigenization was first mooted under the civilian administration that preceded Gen. Yakubu Gowon’s government. But according to a paper published by Praeger entitled The Political Economy of Nigeria, "the military government of Gowon was more amenable to make the changes than their previous democratic counterpart partly because of their increasing distrust of foreign capital which was an aftermath of their experience in relying on foreign governments and multinational corporations during the Nigerian civil war."',
      },

      {
        type: 'text',
        heading: 'Highlights of the Nigerian Enterprise Promotion Decree 1972',
        text: 'The decree was expected to bring about changes in the ownership structure of light industries such as retail and small-scale businesses. Industries were divided into two divisions, called Schedule 1 and Schedule 2.',
      },
      {
        type: 'table',
        heading: 'NEPD 1972 — Schedules and Ownership Requirements',
        headers: ['Schedule', 'Businesses covered', 'Ownership requirement'],
        rows: [
          ['Schedule 1', 'Public relations (PR), haulage of goods by road, block and brick making, laundry services, cinema, newspaper publishing and printing.', 'To be owned 100% by Nigerians.'],
          ['Schedule 2', 'Brewing of beer, soft drink bottling, cosmetic manufacturing, boat building, departmental stores and supermarkets, soap making, cement production and metal container making.', 'To be owned 40% by Nigerians; foreigners may invest 60%.'],
        ],
      },
      {
        type: 'text',
        text: 'In 1977 the Nigerian Enterprise Promotion Decree was amended under the government of Gen. Olusegun Obasanjo to accommodate a third schedule and, at the same time, reshuffle the contents of the two schedules of the 1972 decree.',
      },
      {
        type: 'table',
        heading: 'The 1977 Amendment — Three Schedules',
        headers: ['Schedule', 'Businesses covered', 'Ownership requirement'],
        rows: [
          ['Schedule 1', 'Laundry services, estate management, retailing, advertising and bakeries.', 'To be owned 100% by Nigerians.'],
          ['Schedule 2', 'Sales and distribution of technical goods and motor vehicles, banking, insurance, construction, and the manufacture of rubber, paints and plastics.', 'To be owned 60% by Nigerians; foreigners may invest 40%.'],
          ['Schedule 3', 'Highly technical businesses such as drug manufacturing and turbine manufacturing.', 'To be owned 40% by Nigerians; foreigners may invest 60%.'],
        ],
      },
      {
        type: 'text',
        text: 'What the indigenization policy set out to achieve was to encourage Nigerians into different businesses with the assurance that government was there to protect their interests against foreign investors whose investment would only result in capital flight for the nation. It was equally made to encourage those who had suffered heavy losses during the war to start their businesses again with minimum or no competition from foreigners, especially in retail (Uche, Business History Review).',
      },
      {
        type: 'proscons',
        heading: 'Advantages and Disadvantages of the Indigenization Policy',
        advantages: [
          'It brings about the development of private industries in the country.',
          'It leads to more employment opportunities for indigenous people in the country.',
          'It leads to self-reliance of the country and more participation of the people in running businesses in the country.',
        ],
        disadvantages: [
          'It discourages the inflow of foreign direct investment into the country.',
          'It reduces the transfer of technical know-how from developed economies to the country.',
          'Foreigners who are experts in the businesses listed in Schedules 1 and 2 are denied the privilege of contributing to the growth of the nation’s economy.',
        ],
      },
      {
        type: 'text',
        heading: 'Criticisms against the NEPD',
        text: 'Among the criticisms against the indigenization policy, Christopher Ide argues that the "indigenization policy was not accomplished; for not only were the shares of most companies affected not transferred to Nigerians, in many of those that complied, shares were sold to only a few Nigerians leading to narrow and inequitable distribution of the benefits of indigenization" (41). Another criticism is the issue of fronting, whereby some Nigerians fronted for foreigners to register businesses listed in Schedules 1 and 2 — a practice seen as defeating the good intentions of the government to make small-scale businesses in Nigeria proudly Nigerian.',
      },

      {
        type: 'definition',
        heading: 'The National Youth Service Corps (NYSC)',
        text: 'The National Youth Service Corps is a one-year mandatory national service programme for all graduates of Nigerian citizenship from Nigerian universities and from foreign universities recognised by the National Universities Commission (NUC). It was established under Decree No. 24 by the military government of Gen. Yakubu Gowon as a way to reconcile and reintegrate Nigerians after the civil war, and as an avenue for actualising the government’s 3Rs policy.',
      },
      {
        type: 'text',
        text: 'It was established "with a view to the proper encouragement and development of common ties among the youths of Nigeria and the promotion of national unity" (nysc.gov.ng). More specifically, the purpose of the scheme is primarily to inculcate in Nigerian youths the spirit of selfless service to the community, and to emphasise the spirit of oneness and brotherhood of all Nigerians irrespective of cultural or social background.',
      },
      {
        type: 'note',
        text: 'The chapter dates the establishment of the NYSC to 22 May 1970. The scheme was actually created by Decree No. 24 of 22 May 1973 — three years after the war ended, though still under Gen. Gowon and still as an instrument of the 3Rs, so the chapter’s argument is unaffected. Give the examiner the chapter’s framing if the question is about the 3Rs, but know that 1973 is the correct year.',
      },
      {
        type: 'bullets',
        heading: 'The 15 Objectives of the NYSC',
        items: [
          'Inculcate discipline in Nigeria’s youths by instilling in them a tradition of industry at work and of patriotic and legal service to Nigeria in any situation they may find themselves.',
          'To raise the moral tone of Nigerian youths by allowing them to learn about higher ideals of national achievement, and social and cultural improvement.',
          'To develop in Nigerian youths the attitude of mind, acquired through shared experience and suitable training, which will make them more amenable to mobilization in the national interest.',
          'To enable Nigerian youths to acquire the spirit of self-reliance by encouraging them to develop skills for self-employment.',
          'To contribute to the accelerated growth of the national economy.',
          'To develop common ties among Nigerian youths and promote national unity and integration.',
          'To remove prejudices, eliminate ignorance and confirm at first hand the many similarities among Nigerians of all ethnic groups.',
          'To develop a sense of corporate existence and common destiny of the people of Nigeria.',
          'The equitable distribution of members of the service corps and the effective utilization of their skills in areas of national need.',
          'That, as far as possible, youths be assigned to jobs in states other than their states of origin.',
          'That each group of youths assigned to work together is as representative of Nigeria as far as possible.',
          'That Nigerian youths be exposed to the modes of living of the people in different parts of Nigeria.',
          'That Nigerian youths be encouraged to eschew religious intolerance by accommodating religious differences.',
          'That members of the service corps be encouraged to seek, at the end of their one year of national service, career employment all over Nigeria, thus promoting the free movement of labour.',
          'That employers be induced, partly through their experience with members of the service corps, to employ more readily and permanently qualified Nigerians irrespective of their state of origin.',
        ],
      },
      {
        type: 'text',
        text: 'These objectives are enumerated in Decree No. 51 of June 16, 1993. Note that they capture the intent and purpose of the third R of the 3Rs — Reconciliation.',
      },
      {
        type: 'bullets',
        heading: 'Eligibility to Participate in the NYSC Scheme',
        items: [
          'Must be a Nigerian citizen.',
          'Must have graduated from a Nigerian tertiary institution (university, polytechnic, college of education or any degree-awarding institution), or from a foreign tertiary institution recognised by the National Universities Commission (NUC).',
          'Must be below 30 years of age upon graduation.',
        ],
      },
      {
        type: 'text',
        text: 'A student who graduates before 30 but skips the service is still eligible if their certificate of graduation is dated before they turn 30. Those who graduate above 30 years of age are given a Certificate of Exemption, while those below 30 proceed to their states of deployment. At the end of the one-year service, corps members are given Discharge Certificates. A corps member who completes the year without a Discharge Certificate is deemed not to have completed the programme and may not be eligible for employment in any government-recognised establishment, ministry or institution. Part-time graduates are not allowed to participate in the scheme, because they are deemed to be adults already in one employment or another.',
      },
      {
        type: 'text',
        heading: 'Criticism against the NYSC',
        text: 'The NYSC, hailed as one of the most valued instruments of unity established by Gen. Gowon’s government after the civil war, has begun to attract criticism following growing insecurity in the nation. There are instances where corps members are attacked and sometimes killed at their places of primary assignment; some are kidnapped and their parents made to pay huge ransoms. Some critics therefore call for the total scrapping of the scheme, arguing that it has outlived its usefulness. Others hold that scrapping it would defeat its very core aim of encouraging unity among the different ethnic groups; for them its gains far outweigh its losses. A third group insists that instead of scrapping the scheme, its operations should be reorganised so that prospective corps members serve within their own geo-political zones where these are free from insecurity — corps members should never be posted to states with incidences of insecurity and religious intolerance. The chapter’s author is in agreement with this last position.',
      },

      {
        type: 'text',
        heading: 'Conclusion',
        text: 'The prelude to the Nigerian civil war was death, agony, destruction and distrust among the different ethnic nationalities that make up the country. But the post-war policies of Gen. Yakubu Gowon’s military government brought the succour the people needed to move on with their lives, and at the same time restored the peace, unity and trust the war had shattered. The 3Rs policy enacted immediately after the war, and the careful implementation of its elements, ensured that the country found its footing again in virtually every sphere of economic, political and social growth. The indigenization decree ensured that Nigerians had a firm hand in the economic development of the nation; the NYSC scheme ensured that distrust was banished by posting young graduates to states other than their own for one year of mandatory service. Even after 1975, when Gen. Gowon’s government was ousted from office, subsequent governments have continued with most elements of the 3Rs policy, thereby achieving the purpose for which it was intended.',
      },

      {
        type: 'casestudy',
        title: 'Check Yourself — Chapter 1',
        prompt: 'The 3Rs is one of the most reliably examined topics in GST 121. Work through these before moving on.',
        tasks: [
          'What does the 3Rs stand for, and in what year was it introduced?',
          'Explain the declaration "No victor, no vanquished." Who made it, and on what occasion?',
          'State the three stated purposes of the 3Rs policy.',
          'Define the indigenization policy in your own words.',
          'List the three objectives of the Nigerian Enterprise Promotion Decree 1972.',
          'Distinguish between Schedule 1 and Schedule 2 of the NEPD 1972, giving two example businesses for each.',
          'What changed in the 1977 amendment to the decree, and under whose government?',
          'Give three advantages and three disadvantages of the indigenization policy.',
          'What is "fronting", and why is it a criticism of the NEPD?',
          'Under what decree was the NYSC established, and how does it serve the third R?',
          'State any six objectives of the NYSC.',
          'What are the three eligibility requirements for the NYSC scheme? What is the difference between a Certificate of Exemption and a Discharge Certificate?',
          'Outline the three positions in the current debate over the NYSC, and argue for the one you find most convincing.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Works Cited by the Chapter',
        items: [
          'Gowon, Yakubu. "No Victor, No Vanquished: Healing the Nigerian Nation." Convocation Lecture, Chukwuemeka Odumegwu Ojukwu University, Igbariam Campus, March 25, 2015.',
          'Ide, Christopher. Indigenization Policy: The Case of Nigeria 1960–1980. Dissertation, Faculty of Social Science, Atlanta University, Atlanta, Georgia, December 1983. https://radar.auctr.edu',
          'NYSC. "Objectives of the Scheme." www.nysc.gov.ng',
          'Ogbuagu, S. Chibuzo. "The Nigerian Indigenization Policy: Nationalism or Pragmatism?" African Affairs, Vol. 82, No. 327, April 1983, pp. 241–266.',
          'The Political Economy of Nigeria. New York: Praeger, 1983.',
          'Uche, Chibuike. "British Government, British Business and the Nigerian Indigenization Exercise in Post-Independence Nigeria." Business History Review, Vol. 86, No. 4, pp. 745–771.',
          'Ukaogo, Victor. "Gowon’s Three Rs and Yar’Adua’s General Amnesty: An Analysis of Policy Failures, Security Challenges and Consequences in the West African Atlantic Seaboard." researchgate.net, 2020. Accessed April 2024.',
        ],
      },
    ],
  },
];
