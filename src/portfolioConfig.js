export const portfolioConfigs = {
  se: {
    title: 'Full Stack Engineer',
    eyebrow: 'Full Stack Developer',
    hero: {
      name: 'Harshil Patel',
      subtitle: 'I build scalable, performant web applications using modern frontend and backend technologies.',
      meta: 'Full Stack Developer',
      cta: 'View Projects'
    },
    about: 'Full Stack Engineer specializing in building robust, scalable web applications. Experienced with React, Node.js, Django, Laravel, and cloud technologies. Passionate about writing clean, maintainable code and implementing best practices in web development.',
    skills: [
      'JavaScript', 'TypeScript', 'Python', 'C++', 'SQL',
      'React', 'NextJS', 'VueJS', 'Node.js',
      'Django', 'Laravel', 'Express.js',
      'PostgreSQL', 'MongoDB', 'Redis',
      'Docker', 'Kubernetes', 'AWS', 'GCP',
      'Git', 'REST APIs', 'GraphQL', 'Microservices'
    ],
    focus: 'full-stack development, scalable architecture, and clean code',
    experience: [
      {
        title: 'Full Stack Engineer',
        organization: 'Inntech Future',
        date: 'Present',
        description: 'Building scalable web applications with modern tech stack. Leading frontend development and collaborating with backend teams on API design and infrastructure.',
        highlights: [
          'Developed responsive React components with TypeScript for production applications',
          'Implemented REST APIs and microservices using Node.js and Express',
          'Optimized database queries and improved application performance by 35%',
          'Collaborated with cross-functional teams on feature development and deployment'
        ]
      },
      {
        title: 'Research Intern',
        organization: 'Bhaskaracharya Institute of Space Applications and Geo-informatics',
        date: 'Dec 2022 — Apr 2023',
        description: 'Developed a noise reduction model for audio signals using deep learning.',
        highlights: [
          'Developed a noise reduction model for audio signals using deep learning, sourcing diverse audio samples and converting them into spectrograms for analysis with Python and TensorFlow',
          'Designed and trained a U-Net convolutional neural network with dropout layers, achieving a training loss of 0.002129 and validation loss of 0.002406 while preserving audio quality',
          'Utilized large-scale distributed training strategies for model optimization, ensuring efficient processing across diverse datasets'
        ]
      }
    ]
  },
  pm: {
    title: 'Project Manager',
    eyebrow: 'Project Management',
    hero: {
      name: 'Harshil Patel',
      subtitle: 'I lead web application development projects, manage cross-functional teams, and ensure successful delivery of scalable solutions.',
      meta: 'Project Manager',
      cta: 'View Projects'
    },
    about: 'Project Manager specializing in web application development projects. Skilled at planning, organizing, and executing complex web projects while leading developers, designers, and QA teams. Experience with sprint planning, deadline management, technical risk mitigation, and stakeholder communication. Strong technical understanding of frontend, backend, and cloud technologies.',
    skills: [
      'Project Planning', 'Sprint Planning', 'Agile/Scrum', 'Waterfall',
      'Timeline & Budget Management', 'Resource Allocation',
      'Risk Management & Mitigation', 'Stakeholder Management',
      'Team Leadership', 'Cross-functional Coordination',
      'Technical Understanding (React, Node.js, Django, PostgreSQL)',
      'Web Technologies (Frontend, Backend, APIs, Databases)',
      'DevOps Awareness (Docker, AWS, CI/CD)',
      'Communication & Reporting', 'Scope Management', 'Quality Assurance'
    ],
    focus: 'web application project delivery, team coordination, and technical excellence',
    experience: [
      {
        title: 'Project Manager',
        organization: 'Inntech Future',
        date: 'Present',
        description: 'Leading web application development projects with agile methodology. Managing cross-functional teams of developers, designers, and QA to deliver scalable solutions.',
        highlights: [
          'Managed 5+ concurrent web development projects using Agile/Scrum framework',
          'Led sprint planning, stand-ups, and retrospectives; improved team velocity by 25%',
          'Coordinated with stakeholders on requirements, timelines, and budget management',
          'Identified and mitigated technical risks; ensured on-time delivery of all projects'
        ]
      },
      {
        title: 'Research Intern',
        organization: 'Bhaskaracharya Institute of Space Applications and Geo-informatics',
        date: 'Dec 2022 — Apr 2023',
        description: 'Developed a noise reduction model for audio signals using deep learning.',
        highlights: [
          'Developed a noise reduction model for audio signals using deep learning, sourcing diverse audio samples and converting them into spectrograms for analysis with Python and TensorFlow',
          'Designed and trained a U-Net convolutional neural network with dropout layers, achieving a training loss of 0.002129 and validation loss of 0.002406 while preserving audio quality',
          'Utilized large-scale distributed training strategies for model optimization, ensuring efficient processing across diverse datasets'
        ]
      }
    ]
  },
  aie: {
    title: 'AI/ML Engineer',
    eyebrow: 'AI/Machine Learning',
    hero: {
      name: 'Harshil Patel',
      subtitle: 'I build intelligent systems using deep learning and machine learning to solve complex real-world problems.',
      meta: 'AI/ML Engineer',
      cta: 'View Projects'
    },
    about: 'AI/ML Engineer with a Master\'s in Applied Artificial Intelligence from Stevens Institute of Technology. Passionate about building intelligent solutions using deep learning, machine learning, and modern technologies. Experienced in developing ML models for seizure prediction, fraud detection, and customer analytics. AWS Certified AI Practitioner.',
    skills: [
      'Python', 'C++', 'SQL', 'CUDA',
      'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Keras', 'Langchain',
      'Pandas', 'NumPy', 'Matplotlib', 'OpenCV', 'Pillow',
      'Deep Learning', 'CNNs', 'RNNs', 'Transformers',
      'Machine Learning', 'Data Analysis',
      'AWS', 'GCP', 'Docker', 'Git',
      'Jupyter Notebooks', 'Statistical Analysis'
    ],
    focus: 'deep learning, pattern recognition, and intelligent system design'
  }
};

// Professional color palette — use these in CSS or components for consistent theming
export const colorPalette = {
  primary: '#0ea5e9', // sky-blue
  primaryDark: '#0284c7',
  accent: '#06b6d4', // teal
  neutral: '#64748b',
  backgroundStart: '#f0f4f8',
  backgroundEnd: '#eef2f5',
  cardGradientStart: 'rgba(255, 255, 255, 0.95)',
  cardGradientEnd: 'rgba(248, 250, 252, 0.95)'
};
// Default section order can be managed in components; timeline removed per user request
