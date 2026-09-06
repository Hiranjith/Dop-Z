export const exercisesData = [
  { 
    id: '1', name: 'Seated Cable Row', category: 'Back', type: 'Strength',
    image: '/exercises/Seated cable row.png',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Delts'],
    equipment: 'Cable Machine',
    difficulty: 'Intermediate',
    description: 'A compound pulling exercise that primarily targets the middle back (lats and rhomboids), and also engages the biceps. Great for building a stronger, thicker back.',
    instructions: [
      'Sit on the bench with your feet firmly placed on the footrests and knees slightly bent.',
      'Grip the handle with both hands, keeping your back straight and chest up.',
      'Pull the handle toward your torso, squeezing your shoulder blades together.',
      'Pause for a moment at the contraction.',
      'Slowly extend your arms and return to the starting position with control.'
    ],
    formTips: [
      'Keep your back neutral and chest up throughout the movement.',
      'Focus on squeezing your shoulder blades at the end of the pull.',
      'Avoid using excessive body momentum.',
      'Use a controlled range of motion, both on the pull and the return.',
      'Keep your elbows close to your body.',
      'Choose a weight that allows proper form.'
    ],
    proTip: 'Think about pulling with your back, not your arms. Focus on the muscle contraction rather than the weight.'
  },
  { 
    id: '2', name: 'Lat Pulldown', category: 'Back', type: 'Strength',
    image: 'https://placehold.co/400x300/1A1F22/7FB800?text=Lat+Pulldown',
    primaryMuscles: ['Latissimus dorsi'],
    secondaryMuscles: ['Biceps', 'Rhomboids'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    description: 'A great compound exercise for building back width.',
    instructions: [
      'Adjust the knee pad and sit down.',
      'Grasp the bar with a wide overhand grip.',
      'Pull the bar down to your upper chest.',
      'Slowly release the bar back up.'
    ],
    formTips: ['Keep your chest up', 'Pull with your elbows', 'Do not lean back excessively'],
    proTip: 'Focus on driving your elbows down to the floor.'
  },
  { 
    id: '11', name: 'Bench Press', category: 'Chest', type: 'Strength',
    image: 'https://placehold.co/400x300/1A1F22/7FB800?text=Bench+Press',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'The standard barbell exercise for building chest size and strength.',
    instructions: [
      'Lie flat on the bench with feet firmly on the ground.',
      'Grip the bar slightly wider than shoulder-width.',
      'Lower the bar to your mid-chest in a controlled manner.',
      'Press the bar back up to the starting position.'
    ],
    formTips: ['Keep your feet planted', 'Maintain a slight arch in your lower back', 'Squeeze your shoulder blades together'],
    proTip: 'Drive through your legs for extra stability.'
  },
  { 
    id: '18', name: 'Squat', category: 'Legs', type: 'Strength',
    image: 'https://placehold.co/400x300/1A1F22/7FB800?text=Squat',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    description: 'The king of all leg exercises.',
    instructions: [
      'Unrack the bar and take a step back.',
      'Stand with feet shoulder-width apart.',
      'Bend at the knees and hips, lowering your body as if sitting in a chair.',
      'Push through your heels to return to the starting position.'
    ],
    formTips: ['Keep your chest up', 'Knees should track over your toes', 'Go as deep as your mobility allows'],
    proTip: 'Take a deep breath and brace your core before descending.'
  },
  { 
    id: '14', name: 'Overhead Press', category: 'Shoulders', type: 'Strength',
    image: 'https://placehold.co/400x300/1A1F22/7FB800?text=Overhead+Press',
    primaryMuscles: ['Anterior Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Chest'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'A compound push exercise for shoulder development.',
    instructions: [
      'Stand with feet shoulder-width apart, holding the bar at shoulder level.',
      'Brace your core and press the bar overhead until arms are fully extended.',
      'Lower the bar back to your shoulders in a controlled motion.'
    ],
    formTips: ['Keep your core tight', 'Do not arch your back excessively', 'Move your head out of the way of the bar'],
    proTip: 'Squeeze your glutes to create a solid foundation.'
  },
  { 
    id: '16', name: 'Bicep Curl', category: 'Arms', type: 'Strength',
    image: 'https://placehold.co/400x300/1A1F22/7FB800?text=Bicep+Curl',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Forearms'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    description: 'An isolation exercise for building bicep size.',
    instructions: [
      'Stand holding a dumbbell in each hand, palms facing forward.',
      'Keep your elbows close to your torso and curl the weights up.',
      'Squeeze your biceps at the top.',
      'Slowly lower the weights back down.'
    ],
    formTips: ['Do not swing the weight', 'Keep your elbows stationary', 'Full range of motion'],
    proTip: 'Supinate your wrists (turn palms outwards) at the top of the movement.'
  },
  { 
    id: '21', name: 'Cable Crunch', category: 'Abs', type: 'Strength',
    image: 'https://placehold.co/400x300/1A1F22/7FB800?text=Cable+Crunch',
    primaryMuscles: ['Rectus Abdominis'],
    secondaryMuscles: ['Obliques'],
    equipment: 'Cable',
    difficulty: 'Intermediate',
    description: 'A weighted crunch utilizing a cable machine.',
    instructions: [
      'Kneel below a high pulley equipped with a rope attachment.',
      'Grasp the rope and place your hands on either side of your head.',
      'Crunch your torso down, bringing your elbows towards your knees.',
      'Slowly return to the starting position.'
    ],
    formTips: ['Flex your spine, do not just hinge at the hips', 'Keep your hips stationary', 'Focus on contracting the abs'],
    proTip: 'Imagine pulling your ribcage down to your pelvis.'
  },
  { 
    id: '23', name: 'Treadmill', category: 'Cardio', type: 'Cardio',
    image: 'https://placehold.co/400x300/1A1F22/7FB800?text=Treadmill',
    primaryMuscles: ['Cardiovascular System'],
    secondaryMuscles: ['Legs'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    description: 'Running or walking on a treadmill for cardiovascular conditioning.',
    instructions: [
      'Step onto the treadmill and straddle the belt.',
      'Select your desired speed and incline.',
      'Start walking or running.',
      'Use the safety clip.'
    ],
    formTips: ['Maintain good posture', 'Do not hold onto the handrails if possible'],
    proTip: 'Vary the incline to simulate outdoor running.'
  }
];

export const exerciseCategories = [
  'All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Abs', 'Cardio', 'Custom'
];
