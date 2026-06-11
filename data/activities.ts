export const activities = {

  //TEMPLATE
  //id:,title: "CHALLENGE",group: "",image: {dark: require(''),light: require(''),},route: '/activities/activity.../overview',
  //category: ["",],
  //overview: "",objective: "",
  //mission: "",duration: "20 Minutes",difficulty: "",
  //materials: [{name: "STEMM LAB ON MOBILE PHONE",quantity: "x"},],
  //setupSteps: [{title: "PREPARE",image: require('@/assets/images/setup2.png'),instruction: "Cut",bunnyTip: "Make"},],
  //instructions: ["Drop ...",],safetyNotes: ["Ensure ...",],bunnyTip: ["Use ...",]

  activity1: {
    id: 1,
    group:"ENGINEERING",
    title: "PARACHUTE DROP CHALLENGE",
    image: {
      dark: require('../assets/images/Group 227.png'),
      light: require('../assets/images/Group 227 Light.png'),
    },
    route: '/activities/activity1/overview',

    category: [
      "Engineering",
      "Physics"
    ],

    overview: "Design, build, and test a parachute for a small toy to reduce its landing speed and impact force. Teams iterate their designs under time and material constraints.",
    objective: "Design and test a parachute to achieve the slowest drop time.",
    
    mission: "Land the toy slowly and safely.",
    duration: "20 Minutes",
    difficulty: "Easy",

    materials: [
      {
        name: "STEMM LAB ON MOBILE PHONE",
        quantity: "x1"
      },
      {
        name: "SMALL TOY / FIGURE",
        quantity: "x1"
      },
      {
        name: "TABLES / ELEVATED SURFACE",
        quantity: "x1"
      },
      {
        name: "PLASTIC BAG",
        quantity: "x2"
      },
      {
        name: "STRING",
        quantity: "x4"
      },
      {
        name: "TAPE",
        quantity: "x1"
      },
      {
        name: "SCISSORS",
        quantity: "x1"
      }
    ],
    
    setupSteps: [
      {
        title: 'PREPARE THE PLASTIC BAG',
        image: require('@/assets/images/setup1.png'),
        instruction:
          'Cut the plastic bag into a circle',
        bunnyTip:
          'Make a smooth circle for better air resistance!',
      },

      {
        title: 'ATTACH THE STRINGS',
        image: require('@/assets/images/setup2.png'),
        instruction:
          'Tape the strings evenly around the parachute',
      },
    ],

    instructions: [
      'Drop the toy without a parachute and record the fall (baseline test)',
      'Build a parachute using provided materials',
      'Drop the toy from the same height and record the fall',
      'Review speed and landing accuracy results in the app',
      'Redesign and test up to three prototypes within 20 minutes',
      'Upload videos, results, and team reflections',
    ],

    referencePhoto: require('@/assets/images/referenceSetup.png'),

    safetyNotes: [
      "Ensure the drop area is clear of people",
      "Use a stable elevated surface",
      "Handle scissors with care",
    ],

    bunnyTip: [
      "Use a ruler in frame for scale",
      "Identify first contact for contact time",
      "Identify when the object leaves the surface for bounce calculation"
    ],
  },

  activity2: {
    id: 2,
    group:"ENGINEERING",
    title: "SOUND POLLUTION\nHUNTER",
    image: {
      dark: require('../assets/images/Group 228.png'),
      light: require('../assets/images/Group 228 Light.png'),
    },    
    route: '/activities/activity2/overview',

    category: [
      "Environmental Science",
      "Data Analysis"
    ],

    overview: "Investigate noise levels in different locations and identify sources of sound pollution.",
    objective: "Measure and compare noise levels in different environments to investigate sound pollution.",

    mission: "Compare noise levels in different locations.",
    duration: "20 Minutes",
    difficulty: "Easy",

    materials: [
      {
        name: "STEMM LAB ON MOBILE PHONE",
        quantity: "x1",
      },
    ],

    setupSteps: [
      {
        title: "TEST THE SOUND METER",
        instruction: "Clap your hands once to make sure the sound meter detects sound correctly.",
        bunnyTip: "A loud clap should cause the sound level to \nincrease."
      },

      {
        title: "TEST LOCATION ACCURACY",
        instruction: "Walk to a different location and confirm the app updates your position correctly.",
        bunnyTip: "Your location helps create a map of loud and quiet places!",
      },
    ],

    instructions: [
      "Start the sound meter",
      "Record noise levels in different locations",
      "Identify the loudest and quietest areas",
      "Compare your findings with your teammates",
      "Upload results and reflections",
    ],

    referencePhoto: require('@/assets/images/referenceSetup2.png'),

    safetyNotes: [
      "Stay aware of your surroundings",
      "Avoid dangerous or restricted areas",
      "Keep your phone secure while moving",
    ],

    bunnyTip: [
      "Take measurements for at least 10 seconds",
      "Measure from the same distance each time",
      "Try both indoor and outdoor locations",
    ],
  },

  activity3: {
    id: 3,
    title: "HAND FAN CHALLENGE",
    group: "ENGINEERING",

    image: {
      dark: require('../assets/images/Group 229.png'),
      light: require('../assets/images/Group 229 Light.png'),
    },
    route: '/activities/activity3/overview',
    
    category: [
      "Physics",
      "Air Movement"
    ],

    overview:"",
    objective:"",
    mission:"",
    duration:"",
    difficulty:"",
    materials: [
      {
        name:"",
        quantity:"x"
      },
    ],

    setupSteps: [
      {
        title: "",
        image: "",
        instruction: "",
        bunnyTip: ""
      },
    ],
    
    instructions: [
      "",
    ],

    safetyNotes: [
      "",
    ],
    
    bunnyTip: [
      "",
    ]
  },

  activity4: {
    id: 4,
    title: 'EARTHQUAKE-RESISTANT STRUCTURE',
    group: "ENGINEERING",

    image: {
      //dark: require('@/assets/images/earthquake.png'),
      //light: require(''),
    },
    route: '/activities/activity4/overview',

    category: [
      'Engineering', 
      'Earth Science'
    ],

    //pointsRequired: 450,
    
    overview: "Design structures that withstand vibration, simulating earthquakes.",
    objective: "",

    mission: "",
    duration: "20 Minutes",
    difficulty: "",

    materials: [
      {
        name:"STEMM LAB ON MOBILE PHONE",
        quantity:"x1"
      },
      {
        name:"CARDBOARD",
        quantity:"x2-5"
      },
      {
        name:"PAPER",
        quantity:"x1-5"
      },
      {
        name:"SCISSORS",
        quantity:"x1"
      },
      {
        name:"STICKY TAPE",
        quantity:"x1"
      },
      {
        name:"PLASTIC / PAPER CUPS",
        quantity:"x4-8"
      },
    ],
    
    setupSteps: [
      {
        title: "PREPARE THE ANTI-VIBRATION LAYER",
        //image: require(""),
        instruction: "Fold papers or cardboards",
        bunnyTip: "",
      },
      // {
      //   title: "PREPARE THE ANTI-VIBRATION LAYER",
      //   image: require(""),
      //   instruction: "Fold papers or cardboards",
      //   bunnyTip: "",
      // },
    ],
    
    instructions: [
      "Build an anti-vibration layer by folding paper/cardboard",
      "Place a flat cardboard platform on top",
      "Place the phone in the centre and activate vibration mode on the STEMM Lab",
      "Modify the structure to reduce movement",
      "Upload results and reflections",
    ],

    safetyNotes: [
      "Place the phone securely",
      "Build a stable base",
      "Keep the phone protected",
      "Clear the surrounding area",
      "Handle scissors with care"
    ],
    
    bunnyTip: [
      "",
    ]
  },

  activity5: {
    id: 5,
    title: 'HUMAN PERFORMANCE LAB',
    group: "",
    image: {
      dark: require('../assets/images/human.png'),
      //light: require(''),
    },
    route: '/activities/activity5/overview',
    
    category: [
      'Medical Science',
      'Biomechanics'
    ],
    //pointsRequired: 600,
    
    overview: "Investigate how the human body moves by measuring speed, smoothness, and coordination during controlled stretching activities.",
    objective: "",

    mission: "",
    duration: "? Minutes",//change this
    difficulty: "",

    materials: [
      {
        name: "STEMM LAB ON MOBILE PHONE",
        quantity: "x1"
      },
      {
        name: "OPEN SPACE TO MOVE SAFELY",
        quantity: "-"
      },
    ],

    setupSteps: [
      {
        title: "PREPARE",//change
        //image: require('@/assets/images/setup2.png'),
        instruction: "Cut",//change
        bunnyTip: "Make"//change
      },
    ],

    instructions: [
      "Hold the phone firmly in one hand and activate the App vibration sensor",
      "Perform guided movement slowly as shown in the app and record the vibration",
      "Repeat the activity with vibration feedback enabled",
      "Review speed, smoothness, and range-of-motion data",
      "Upload results and reflect as a group"
    ],
    
    safetyNotes: [
      "Hold the phone securely",
      "Move slowly and smoothly",
      "Do not overstretch your arm",
      "Ensure enough space"
    ],
    
    bunnyTip: [
      "Use ...",
    ]
  },

  activity6: {
    id: 6,
    title: 'REACTION BOARD CHALLENGE',
    group: "",
    image: {
      //dark: require('@/assets/images/reaction.png'),
      //light: require(''),
    },
    route: '/activities/activity6/overview',

    category: [
      'Neuroscience',
      'Mathematics'
    ],
    //pointsRequired: 800,

    overview: "Measure reaction time, coordination, and improvement through repeated digital and physical challenges.",
    objective: "",

    mission: "",
    duration: "20 Minutes",
    difficulty: "",

    materials: [
      {
        name: "STEMM LAB ON MOBILE PHONE",
        quantity: "x1"
      },
      {
        name: "CLEAR WORKING SPACE",
        quantity: "-"
      },
    ],

    setupSteps: [
      {
        title: "PREPARE",
        //image: require('@/assets/images/setup2.png'),
        instruction: "Cut",
        bunnyTip: "Make"
      },
    ],

    instructions: [
      "Drop ...",
    ],
    
    safetyNotes: [
      "Place the phone on a stable surface",
      "Use gentle taps",
      "Avoid rushing movements"
    ],
    
    bunnyTip: [
      "Use ...",
    ]
  },

  activity7: {
    id: 7,
    title: 'BREATHING PACE TRAINER',
    group: "",
    image: {
      //dark: require('@/assets/images/breathing.png'),
      //light: require(''),
    },
    route: '/activities/activity7/overview',
    
    category: [
      'Medical Science'
    ],
    //pointsRequired: 1000,
    
    overview: "Analyse breathing patterns at rest and after exercise.",
    objective: "",

    mission: "",
    duration: "18 Minutes",
    difficulty: "",

    materials: [
      {
        name: "STEMM LAB ON MOBILE PHONE",
        quantity: "x1"
      },
      {
        name: "FLAT SURFACE / MAT",
        quantity: "x1"
      },
    ],

    setupSteps: [
      {
        title: "PREPARE",
        //image: require('@/assets/images/setup2.png'),
        instruction: "Cut",
        bunnyTip: "Make"
      },
    ],

    instructions: [
      "Place the phone gently on the chest",
      "Record breathing at rest",
      "Perform light exercise\n1. Jog 1 minute on the spot\n2. 100 star jump",
      "Record breathing again and compare results",
      "Upload results and reflections",
    ],
    
    safetyNotes: [
      "Ensure the phone is placed gently on the chest so it does not fall or cause discomfort",
      "Perform only light exercise to avoid injury or excessive fatigue",
      "Make sure the floor area is clear before jogging or doing star jumps",
      "Wear comfortable clothing and proper shoes",
      "Stop the activity immediately if someone feels dizzy, short of breath, or unwell",
      "Do not drop the phone while exercising",
      "Maintain enough space between team members to avoid collisions"
    ],
    
    bunnyTip: [
      "Use ...",
    ]
  },
};