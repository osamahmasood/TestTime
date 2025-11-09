/**
 * Bio-Sphere Explorer - Question Database
 * Contains all 30 science questions across three spheres
 */

export interface Question {
  id: string;
  sphere: 'biology' | 'chemistry' | 'physics';
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
  context: string; // Mission-related context
}

export const questions: Question[] = [
  // ========== SPHERE 1: LIFE SUPPORT SYSTEM (BIOLOGY) ==========
  {
    id: 'bio-001',
    sphere: 'biology',
    context: 'To stabilize the Life Support System, you must answer this biology question:',
    question: 'Which organelle is responsible for energy production in plant cells?',
    options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Ribosome'],
    correctAnswer: 2,
    explanation: 'Chloroplasts are the organelles where photosynthesis occurs, converting sunlight into chemical energy (glucose). Mitochondria produce energy in all cells through cellular respiration.'
  },
  {
    id: 'bio-002',
    sphere: 'biology',
    context: 'The Life Support System is detecting low oxygen levels. Answer correctly to restore balance:',
    question: 'What is the primary function of red blood cells?',
    options: ['Fight infections', 'Transport oxygen', 'Produce hormones', 'Regulate temperature'],
    correctAnswer: 1,
    explanation: 'Red blood cells contain hemoglobin, a protein that binds to oxygen in the lungs and transports it throughout the body to cells that need it for respiration.'
  },
  {
    id: 'bio-003',
    sphere: 'biology',
    context: 'Biological systems are failing. Help restore them:',
    question: 'Which of the following is NOT a characteristic of living organisms?',
    options: ['Reproduction', 'Metabolism', 'Permanent size', 'Response to environment'],
    correctAnswer: 2,
    explanation: 'Living organisms are characterized by growth and change, not permanent size. All living things reproduce, have metabolism, and respond to their environment.'
  },
  {
    id: 'bio-004',
    sphere: 'biology',
    context: 'The ecosystem module is malfunctioning. Restore it with your knowledge:',
    question: 'In a food chain, which organisms are the primary producers?',
    options: ['Herbivores', 'Plants', 'Carnivores', 'Decomposers'],
    correctAnswer: 1,
    explanation: 'Plants are primary producers because they convert sunlight into chemical energy through photosynthesis. All other organisms depend on this energy source.'
  },
  {
    id: 'bio-005',
    sphere: 'biology',
    context: 'Life Support diagnostics show cellular dysfunction. Answer to repair:',
    question: 'What is the basic unit of life?',
    options: ['Atom', 'Molecule', 'Cell', 'Tissue'],
    correctAnswer: 2,
    explanation: 'The cell is the smallest unit of life that can function independently and perform all life processes. All living organisms are made of one or more cells.'
  },
  {
    id: 'bio-006',
    sphere: 'biology',
    context: 'Genetic systems are unstable. Stabilize them with correct knowledge:',
    question: 'Which molecule carries genetic information in most organisms?',
    options: ['Protein', 'Carbohydrate', 'DNA', 'Lipid'],
    correctAnswer: 2,
    explanation: 'DNA (deoxyribonucleic acid) is the molecule that stores genetic instructions for all living organisms. It contains genes that determine traits and characteristics.'
  },
  {
    id: 'bio-007',
    sphere: 'biology',
    context: 'Photosynthesis systems are offline. Restore them:',
    question: 'What do plants need to perform photosynthesis?',
    options: ['Oxygen and water', 'Carbon dioxide, water, and sunlight', 'Nitrogen and minerals only', 'Glucose and oxygen'],
    correctAnswer: 1,
    explanation: 'Plants need carbon dioxide (from air), water (from soil), and sunlight to perform photosynthesis. They use these to create glucose (sugar) and release oxygen.'
  },
  {
    id: 'bio-008',
    sphere: 'biology',
    context: 'Respiratory systems are failing. Help restore oxygen circulation:',
    question: 'What is the main function of the respiratory system?',
    options: ['Digest food', 'Exchange oxygen and carbon dioxide', 'Pump blood', 'Filter waste'],
    correctAnswer: 1,
    explanation: 'The respiratory system exchanges oxygen from the air into the bloodstream and removes carbon dioxide waste from the body through exhalation.'
  },
  {
    id: 'bio-009',
    sphere: 'biology',
    context: 'Immune defense is compromised. Strengthen it with knowledge:',
    question: 'Which type of white blood cell directly attacks pathogens?',
    options: ['B cells', 'T cells', 'Platelets', 'Plasma cells'],
    correctAnswer: 1,
    explanation: 'T cells (T lymphocytes) directly attack and destroy pathogens and infected cells. B cells produce antibodies that mark pathogens for destruction.'
  },
  {
    id: 'bio-010',
    sphere: 'biology',
    context: 'Biodiversity sensors are failing. Restore them:',
    question: 'What is the process by which organisms adapt to their environment over generations?',
    options: ['Mutation', 'Evolution', 'Adaptation', 'Natural selection'],
    correctAnswer: 1,
    explanation: 'Evolution is the process of change in organisms over time through natural selection. Organisms with beneficial traits survive and reproduce more successfully.'
  },

  // ========== SPHERE 2: POWER CORE (CHEMISTRY) ==========
  {
    id: 'chem-001',
    sphere: 'chemistry',
    context: 'The Power Core is destabilizing. Answer this chemistry question to restore it:',
    question: 'What is the smallest unit of an element that retains its properties?',
    options: ['Molecule', 'Compound', 'Atom', 'Ion'],
    correctAnswer: 2,
    explanation: 'An atom is the smallest unit of an element. It consists of protons, neutrons, and electrons. Atoms of the same element have identical chemical properties.'
  },
  {
    id: 'chem-002',
    sphere: 'chemistry',
    context: 'Power fluctuations detected. Stabilize the core:',
    question: 'Which state of matter has a definite shape and volume?',
    options: ['Gas', 'Liquid', 'Solid', 'Plasma'],
    correctAnswer: 2,
    explanation: 'Solids have a definite shape and volume because their particles are tightly packed and vibrate in fixed positions. Liquids have definite volume but take the shape of their container.'
  },
  {
    id: 'chem-003',
    sphere: 'chemistry',
    context: 'Molecular bonds are breaking down. Repair them:',
    question: 'What type of bond forms between atoms when electrons are shared?',
    options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'],
    correctAnswer: 1,
    explanation: 'A covalent bond forms when two atoms share electrons. This is the strongest type of chemical bond and is found in molecules like water (H₂O) and oxygen gas (O₂).'
  },
  {
    id: 'chem-004',
    sphere: 'chemistry',
    context: 'Reaction rates are unstable. Regulate them:',
    question: 'What is a substance that speeds up a chemical reaction without being consumed?',
    options: ['Reactant', 'Product', 'Catalyst', 'Enzyme'],
    correctAnswer: 2,
    explanation: 'A catalyst is a substance that increases the rate of a chemical reaction without being permanently changed. Enzymes are biological catalysts that speed up reactions in living organisms.'
  },
  {
    id: 'chem-005',
    sphere: 'chemistry',
    context: 'Oxidation levels are critical. Balance them:',
    question: 'What happens when a substance gains electrons?',
    options: ['Oxidation', 'Reduction', 'Combustion', 'Decomposition'],
    correctAnswer: 1,
    explanation: 'Reduction occurs when a substance gains electrons. Oxidation is the loss of electrons. These processes always occur together in redox reactions.'
  },
  {
    id: 'chem-006',
    sphere: 'chemistry',
    context: 'pH levels are unstable. Restore chemical balance:',
    question: 'On the pH scale, what range indicates a basic (alkaline) solution?',
    options: ['0-6', '7', '8-14', '1-7'],
    correctAnswer: 2,
    explanation: 'The pH scale ranges from 0-14. Values from 0-6 are acidic, 7 is neutral, and 8-14 are basic (alkaline). Pure water has a pH of 7.'
  },
  {
    id: 'chem-007',
    sphere: 'chemistry',
    context: 'Periodic elements are destabilizing. Stabilize them:',
    question: 'Which element is the most abundant in the Earth\'s atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon', 'Hydrogen'],
    correctAnswer: 1,
    explanation: 'Nitrogen (N₂) makes up about 78% of Earth\'s atmosphere. Oxygen makes up about 21%. Despite oxygen being essential for respiration, nitrogen is more abundant.'
  },
  {
    id: 'chem-008',
    sphere: 'chemistry',
    context: 'Molecular structure is failing. Reconstruct it:',
    question: 'What is the chemical formula for table salt?',
    options: ['NaCl', 'KCl', 'CaCl₂', 'MgCl₂'],
    correctAnswer: 0,
    explanation: 'Sodium chloride (NaCl) is table salt. It forms an ionic bond between sodium (Na⁺) and chloride (Cl⁻) ions. It is essential for human health.'
  },
  {
    id: 'chem-009',
    sphere: 'chemistry',
    context: 'Combustion systems are unstable. Control them:',
    question: 'What are the products of complete combustion of a hydrocarbon?',
    options: ['Carbon and hydrogen', 'Carbon dioxide and water', 'Carbon monoxide and hydrogen', 'Ash and smoke'],
    correctAnswer: 1,
    explanation: 'Complete combustion of hydrocarbons (like gasoline or methane) produces carbon dioxide (CO₂) and water (H₂O). Incomplete combustion produces carbon monoxide (CO), which is toxic.'
  },
  {
    id: 'chem-010',
    sphere: 'chemistry',
    context: 'Isotope readings are fluctuating. Stabilize them:',
    question: 'What is an isotope?',
    options: ['An atom with a different number of protons', 'An atom with a different number of electrons', 'An atom with a different number of neutrons', 'A different element entirely'],
    correctAnswer: 2,
    explanation: 'Isotopes are atoms of the same element with different numbers of neutrons, resulting in different atomic masses. For example, carbon-12 and carbon-14 are isotopes of carbon.'
  },

  // ========== SPHERE 3: COMMUNICATION ARRAY (PHYSICS) ==========
  {
    id: 'phys-001',
    sphere: 'physics',
    context: 'Communication signals are degrading. Restore them with physics knowledge:',
    question: 'What is the SI unit of force?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 1,
    explanation: 'The Newton (N) is the SI unit of force. One Newton is the force required to accelerate a 1 kg mass at 1 m/s². It is named after Sir Isaac Newton.'
  },
  {
    id: 'phys-002',
    sphere: 'physics',
    context: 'Signal transmission is failing. Boost the signal:',
    question: 'Which type of wave can travel through a vacuum?',
    options: ['Sound wave', 'Water wave', 'Electromagnetic wave', 'Seismic wave'],
    correctAnswer: 2,
    explanation: 'Electromagnetic waves (like light, radio waves, and X-rays) can travel through a vacuum because they do not require a medium. Sound waves require a medium like air or water.'
  },
  {
    id: 'phys-003',
    sphere: 'physics',
    context: 'Motion sensors are malfunctioning. Recalibrate them:',
    question: 'What is the difference between speed and velocity?',
    options: ['Speed is faster than velocity', 'Velocity includes direction, speed does not', 'They are the same thing', 'Speed is measured in m/s, velocity in km/h'],
    correctAnswer: 1,
    explanation: 'Speed is the rate of distance traveled (scalar), while velocity is speed with direction (vector). For example, "10 m/s north" is velocity, while "10 m/s" is speed.'
  },
  {
    id: 'phys-004',
    sphere: 'physics',
    context: 'Energy systems are depleting. Restore them:',
    question: 'What is the SI unit of energy?',
    options: ['Newton', 'Watt', 'Joule', 'Hertz'],
    correctAnswer: 2,
    explanation: 'The Joule (J) is the SI unit of energy and work. One Joule is the energy transferred when a force of one Newton acts over a distance of one meter.'
  },
  {
    id: 'phys-005',
    sphere: 'physics',
    context: 'Gravitational systems are unstable. Stabilize them:',
    question: 'What is the force that pulls objects toward the center of the Earth?',
    options: ['Friction', 'Gravity', 'Magnetism', 'Tension'],
    correctAnswer: 1,
    explanation: 'Gravity is the force of attraction between all masses. It pulls objects toward the Earth\'s center and is responsible for keeping us on the ground and the Moon orbiting Earth.'
  },
  {
    id: 'phys-006',
    sphere: 'physics',
    context: 'Light systems are failing. Restore illumination:',
    question: 'What is the speed of light in a vacuum?',
    options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'],
    correctAnswer: 0,
    explanation: 'Light travels at approximately 300,000 kilometers per second (3 × 10⁸ m/s) in a vacuum. This is the fastest speed in the universe and is a fundamental constant in physics.'
  },
  {
    id: 'phys-007',
    sphere: 'physics',
    context: 'Thermal systems are overheating. Cool them down with knowledge:',
    question: 'What is the relationship between temperature and kinetic energy?',
    options: ['They are unrelated', 'Higher temperature means higher average kinetic energy', 'Higher temperature means lower kinetic energy', 'Temperature measures potential energy'],
    correctAnswer: 1,
    explanation: 'Temperature is a measure of the average kinetic energy of particles in a substance. Higher temperature means particles are moving faster and have more kinetic energy.'
  },
  {
    id: 'phys-008',
    sphere: 'physics',
    context: 'Sound systems are malfunctioning. Restore audio transmission:',
    question: 'What is the frequency of a sound wave related to?',
    options: ['Its amplitude', 'Its pitch', 'Its wavelength', 'Its speed'],
    correctAnswer: 1,
    explanation: 'Frequency determines the pitch of a sound. Higher frequency means higher pitch (like a whistle), while lower frequency means lower pitch (like a drum). Frequency is measured in Hertz (Hz).'
  },
  {
    id: 'phys-009',
    sphere: 'physics',
    context: 'Optical systems are failing. Restore vision:',
    question: 'What is the angle of reflection equal to?',
    options: ['The angle of incidence', 'Twice the angle of incidence', 'Half the angle of incidence', 'The angle of refraction'],
    correctAnswer: 0,
    explanation: 'The law of reflection states that the angle of reflection equals the angle of incidence. Both angles are measured from the normal (perpendicular) to the surface.'
  },
  {
    id: 'phys-010',
    sphere: 'physics',
    context: 'Momentum sensors are offline. Restore them:',
    question: 'What is momentum?',
    options: ['Force times time', 'Mass times velocity', 'Energy times distance', 'Force divided by acceleration'],
    correctAnswer: 1,
    explanation: 'Momentum is the product of an object\'s mass and velocity (p = mv). It is a measure of how difficult it is to stop a moving object. Momentum is conserved in collisions.'
  }
];

export const sphereInfo = {
  biology: {
    name: 'Life Support System',
    description: 'Biology',
    color: 'from-green-500 to-cyan-500',
    icon: '🧬',
    questions: 10
  },
  chemistry: {
    name: 'Power Core',
    description: 'Chemistry',
    color: 'from-orange-500 to-purple-500',
    icon: '⚗️',
    questions: 10
  },
  physics: {
    name: 'Communication Array',
    description: 'Physics',
    color: 'from-blue-500 to-magenta-500',
    icon: '⚡',
    questions: 10
  }
};
