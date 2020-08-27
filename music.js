var kickDrum1 = [
    0,
    0,

    15,
    0,
    0,
    0,

    0,
    0,
    0,
    0,

    0,
    0,
    0,
    0,

    0,
    0,
    0,
    0
  ];
var kickDrum2 = [
    0,
    0,

    15,
    0,
    0,
    0,

    0,
    0,
    0,
    0,

    0,
    0,
    0,
    0,

    15,
    0,
    0,
    0
  ];
var snare = [
    1,
    0,

    0,
    0,
    0,
    0,

    0,
    0,
    0,
    0,

    15,
    0,
    0,
    0,

    0,
    0,
    0,
    0
  ];
var hihat = [
    2,
    0,

    0,
    0,
    15,
    0,

    0,
    0,
    15,
    0,

    0,
    0,
    0,
    0,

    0,
    0,
    15,
    0
  ];
var Ech1 = [
    6,
    -0.1,

    18,
    0,
    0,
    0,

    18.1,
    0,
    0,
    0,

    18.5,
    0,
    0,
    0,

    18.7,
    0,
    0,
    0
  ];
var Ech2 = [
    6,
    -0.1,

    22,
    0,
    0,
    0,

    22.1,
    0,
    0,
    0,

    22.5,
    0,
    0,
    0,

    22.7,
    0,
    0,
    0
  ];
var Ech3 = [
    6,
    -0.1,

    24,
    0,
    0,
    0,

    24.1,
    0,
    0,
    0,

    24.5,
    0,
    0,
    0,

    24.7,
    0,
    0,
    0
  ];
var Ech4 = [
    6,
    -0.1,

    30,
    0,
    0,
    0,

    30.1,
    0,
    0,
    0,

    30.5,
    0,
    0,
    0,

    30.7,
    0,
    0,
    0
  ];
var mainLoop = [8,
9,
10,
11,
8,
9,
10,
11];
    var song = [                                     // Song
[                                     // Instruments
[,0,86,,,,,.7,,,,.5,,6.7,1,.05],             //Kick
[.7,0,270,,,.12,3,1.65,-2,,,,,4.5,,.02],    //Snare
[.4,0,2200,,,.04,3,2,,,800,.02,,4.8,,.01,.1],  //Hi-hat
[.2,0,32.70,,0.5,1,3], //Bass
[,,440,.01,,,,1.5,,,,,,,.1,,,1.1], //Synth 1
[,0,220,,60,2,,,,,,,,,.2,,.5], //Synth 2
[,0,130.81 ,,,1], //Synth 3
[.8,0,262,.01,,.3,2,,,,,,,,,.02,.01]//Synth 4
],
[                                     // Patterns
[
  Ech1
],
[
  Ech2
],
[
  Ech3
],
[
  Ech4
],
[
  Ech1,kickDrum1,snare
],
[
  Ech2,kickDrum1,snare
],
[
  Ech3,kickDrum1,snare
],
[
  Ech4,kickDrum2,snare
],
[
  Ech1,kickDrum1,snare,hihat
],
[
  Ech2,kickDrum1,snare,hihat
],
[
  Ech3,kickDrum1,snare,hihat
],
[
  Ech4,kickDrum2,snare,hihat
]
],
[                                     // Sequence
0,
1,
2,
3,
0,
1,
2,
3,

4,
5,
6,
7,
4,
5,
6,
7
].concat(mainLoop).concat(mainLoop).concat(mainLoop).concat(mainLoop),
120,                                  // 120 BPM
{                                     // Metadata
title: "",
author: ""
}
];
