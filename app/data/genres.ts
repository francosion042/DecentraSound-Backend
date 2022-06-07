const genres = [
  {
    title: 'Afrobeat',
    description:
      'Afrobeat is a music genre which involves the combination of elements of West African musical styles such as fuji music and highlife with American funk and jazz influences, with a focus on chanted vocals, complex intersecting rhythms, and percussion. The term was coined in the 1960s by Nigerian multi-instrumentalist and bandleader Fela Kuti, who is responsible for pioneering and popularizing the style both within and outside Nigeria.',
  },
  {
    title: 'Acid Jazz',
    description:
      'Contrary to its name, this style has little in common with Acid House. Acid Jazz consists of various blends of Jazz, Funk, House and Hip-Hop.',
  },
  {
    title: 'Afro-Pop',
    description:
      'Afro-Pop is a catch-all term encompassing the rich variety of contemporary African music styles — typically urban, electric dance music. As each of Africa’s 54 countries lays claim to dozens of distinct languages and musical traditions, Afro-Pop is a blanket description of the continent’s many diverse styles, from Algerian rai to Senegalese mbalax to East African taarab. ',
  },
  {
    title: 'Ambient',
    description:
      'Atmospheric electronic music, sometimes combined with Jazz, New Age and other influences. Usually quieter than other styles, ambient music describes three dimensional atmospheres with sound, often without a beat. ',
  },
  {
    title: 'Blues',
    description:
      'A vocal and instrumental form of music based on a pentatonic scale and a characteristic twelve-bar chord progression, blues evolved from African American spirituals, shouts, work songs and chants that found its earliest stylistic roots in West Africa. Blues has been a major influence on later American and Western popular music, finding expression in ragtime, jazz, big band, rhythm & blues, rock & roll, country music, conventional pop songs and even modern classical music.',
  },
  {
    title: 'Classical',
    description:
      'Classical music is generally a classification covering music composed and performed by professionally trained artists. Classical music is a written tradition. It is composed and written using music notation, and as a rule is performed faithfully to the score. In common usage, “classical music” often refers to orchestral music in general, regardless of when it was composed or for what purpose (film scores and orchestral arrangements on pop music recordings, for example).',
  },
  {
    title: 'Christian',
    description:
      'Christian music refers to music created by Christian artists or adapted to deliver general Christian religion themes.',
  },
  {
    title: 'Country',
    description:
      'Once known as Country & Western music, this music form is developed mostly in the southern United States of America, with roots in traditional folk music, spirituals and blues.',
  },
  {
    title: 'Electronica',
    description:
      'Electronica is a rather vague term that covers a wide range of electronic or electronic-influenced music. The term has been defined by some to mean modern electronic music that is not necessarily designed for the dance-floor, but rather for home listening. In the mid-1990s, the term became popular as a means of referring to the then-novel mainstream success of post-Rave global electronic dance music. Prior to the adoption of “electronica” as a blanket term for more experimental dance music, terms such as “electronic listening music,” “braindance” and “intelligent dance music” (IDM) were common.',
  },
  {
    title: 'Hip Hop',
    description:
      'Music composed of four main elements: rapping (also known as emceeing), disk jockeying, break-dancing and graffiti. A cultural movement, hip hop began among African Americans in New York City in the 1970s. Most typically, hip hop music consists of one or more rappers who chant semi-autobiographic tales, often relating to a fictionalized counterpart, in an intensely rhythmic lyrical form, making abundant use of techniques like assonance, alliteration, and rhyme. The rapper is accompanied by an instrumental track, usually referred to as a “beat” because of the emphasis on rhythm, performed by a DJ, a record producer, or one or more instrumentalists. This beat is often created using a sample of the percussion break of another song, usually a funk, rock, or soul recording. In addition to the beat, other sounds are often sampled, synthesized, or performed. Sometimes, a track can be made up of just the beat by itself, as a showcase of the skills of the DJ or producer. ',
  },
  {
    title: 'Jazz',
    description:
      'Jazz music has been called the first original art form to develop within the US. It grew out of a cross-fertilization of folk blues, ragtime, and European band music. Although there have been many renowned jazz vocalists, and many of the most well-known jazz tunes have lyrics, it is primarily an instrumental form of music. The instrument most closely associated with jazz is the saxophone, followed by the trumpet. The trombone, piano, double bass, guitar and drums are also primary jazz instruments. It is characterized by blue notes, syncopation, swing, call and response, and polyrhythm, yet the single most distinguishing characteristic of jazz is improvisation. Jazz also tends to utilize complex chord structures and an advanced sense of harmony, and requires a high degree of technical skill and musical knowledge from the performers.',
  },
  {
    title: 'Latin',
    description:
      'Latin-American music is sometimes called Latin music, and it is more of an umbrella style than a genre. It often features acoustic instruments and horns with many layers of percussion, and includes the music of many countries and comes in a wide variety of choices: from the down-home conjunto music of Northern Mexico to the sophisticated habanera of Cuba, from the symphonies of Heitor Villa-Lobos to the simple and moving Andean flute.',
  },
  {
    title: 'Pop',
    description:
      'Pop music is a sub-genre of popular music. Pop music may be distinguished from classical or art music and from folk music, but since the term spans many rock, hip hop, rhythm and blues (R&B), country, dance and operatic pop acts, it is reasonable to say that “pop music” is a loosely defined category. ',
  },
  {
    title: 'Reggae',
    description:
      'Music founded upon a rhythm style, which is characterized by regular chops on the back-beat, played by a rhythm guitarist. Reggae is an African-Caribbean style of music developed on the island of Jamaica and closely linked to the religion of Rastafarianism (though not universally popular among its members).',
  },
  {
    title: 'Rap',
    description:
      'A form of rhyming lyrics spoken rhythmically over musical instruments that typically uses a musical backdrop of sampling, scratching and mixing by disk jockeys (DJs). Rapping is one of the elements of hip hop music and was originally called emceeing.',
  },
  {
    title: 'Soundtrack',
    description: 'Music used in the sound mix for a motion picture or a play.',
  },
  {
    title: 'Acoustic',
    description:
      'Created without the use of electricity. As a genre it refers to folk, traditional, or singer-songwriter modes of music.',
  },
  {
    title: 'Americana',
    description:
      'Americana is a genre of contemporary music which incorporates elements of various American music styles, including country, rock, folk, bluegrass and blues, resulting in a distinctive roots-oriented sound. ',
  },
  {
    title: 'Caribbean',
    description:
      'The music of the Caribbean is a diverse grouping of musical genres. They are each syntheses of African, European, Indian and native influences. Some of the styles to gain wide popularity outside of the Caribbean include reggae, zouk, salsa and calypso. Areas include: The Bahamas, Cuba, Dominican Republic, Haiti, Jamaica, Martinique, Puerto Rico, Trinidad',
  },
  {
    title: 'Celtic',
    description:
      'Celtic music is a broad grouping of musical genres that evolved out of the folk musical traditions of the Celtic peoples of Western Europe. Most typically, the term Celtic music is applied to the music of Ireland and Scotland, because both places have produced well-known distinctive styles which actually have genuine commonality and clear mutual influences. The music of Wales, Cornwall, Isle of Man, Brittany, Northumbria and Galicia are also frequently considered a part of Celtic music, the Celtic tradition being particularly strong in Brittany, where Celtic festivals large and small take place throughout the year. Finally, the music of ethnically Celtic peoples abroad are also considered, especially in Canada and the United States.',
  },
  {
    title: 'Club / Dance ',
    description:
      'Music composed, played, or both, specifically to accompany social dancing, though from the late 1970s, the term “dance music” has come to refer (in the context of nightclubs) more specifically to electronic music such as disco, house, techno and trance. Generally, the difference between a disco, or any dance song, and a rock or general popular song is that in dance music the bass hits “four to the floor” at least once a beat (which in 4/4 time is 4 beats per measure), while in rock the bass hits on one and three and lets the snare take the lead on two and four.',
  },
  {
    title: 'Experimental',
    description:
      ' A general term surrounding music without predefined rules, often incorporating free-form improvisation.',
  },
  {
    title: 'Folk',
    description:
      'Music by and of the common people, folks is a down-to-earth style focusing on universal truths, often with traditional acoustic instrumentation and a simple melody. Folk music arose in societies not yet affected by mass communication and the commercialization of culture. It was originally shared and performed by an entire community — not by a special class of expert performers — and was transmitted by word of mouth.',
  },
  {
    title: 'Fusion',
    description:
      'At the time of its origin, Fusion was a blend of Jazz with the aggressive qualities of Rock. Today it can represent a blending of any two or more styles.',
  },
  {
    title: 'Heavy Metal ',
    description:
      '(Also referred to as simply metal) A form of music characterized by aggressive, driving rhythms and highly amplified distorted guitars. Its origins lie in the hard rock bands who, between 1967 and 1974, took blues and rock and created a hybrid with a heavy, guitar-and-drums-centered sound. From the late 1970s on, many bands would fuse this sound with a revival of European classical music. Heavy metal had its peak popularity in the 1980s, during which many of the now existing sub-genres first evolved.',
  },
  {
    title: 'House',
    description:
      'Named after its birthplace, the Warehouse, a club in Chicago, House is in many ways an electronic extension of Disco. House features a steady 4/4 beat, with accented percussion and bass-lines.',
  },
  {
    title: 'Kids',
    description:
      'A category that includes songs for babies, toddlers, and young teens; often designed to educate and uplift children as well as entertain.',
  },
  {
    title: 'Swing',
    description:
      'Swing music, also known as swing jazz, is a form of jazz music that developed during the 1920s and solidified as a distinctive style during the 1930s in the United States. Swing is distinguished primarily by a strong rhythm section, usually including double bass and drums, medium to fast tempo, and the distinctive swing time rhythm that is common to many forms of jazz.',
  },
  {
    title: 'Techno',
    description:
      'This term has come to have two popular interpretations, the first being a description of all electronic music. The second interpretation is a style that developed from House music, which completely abandoned the influences of Disco; Techno is more mechanical and less organic.',
  },
  {
    title: 'Rock (Rock & Roll) ',
    description:
      'Also called rock "n" roll, is a form of popular music, usually featuring vocals (often with vocal harmony), a strong back beat, electric guitars, and a catchy melody backed by three or four chords',
  },
]

export default genres
