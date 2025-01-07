import { writable } from 'svelte/store';
import type { ProjectData } from '../types/projectType';

const initialProjects: ProjectData[] = [
  {
    id: 'Social Media Platform',
    name: 'Social Media Platform',
    icon: 'django',
    shortDescription: 'A feature-rich social networking platform built with Django, offering real-time interactions and modern UI/UX',
    githubUrl: 'https://github.com/yassin549/Django-socialmedia-app',
    readmeUrl: 'https://raw.githubusercontent.com/yassin549/Django-socialmedia-app/main/README.md',
    technologies: ['Django', 'Python', 'JavaScript', 'Bootstrap', 'SQLite'],
    type: 'application'
  },
  {
    id: 'News Application',
    name: 'News Application',
    icon: 'django',
    shortDescription: 'A dynamic news aggregation platform with real-time updates, personalized feeds, and interactive content management',
    githubUrl: 'https://github.com/yassin549/django-news-app',
    readmeUrl: 'https://raw.githubusercontent.com/yassin549/django-news-app/main/README.md',
    technologies: ['Django', 'Python', 'Bootstrap', 'JavaScript', 'REST API'],
    type: 'application'
  },
  {
    id: 'Brain Tumor Detection',
    name: 'Brain Tumor Detection',
    icon: 'python',
    shortDescription: 'An advanced AI-powered system for accurate brain tumor detection using deep learning and image processing',
    githubUrl: 'https://github.com/yassin549/Brain-Tumor-Detection-master',
    readmeUrl: 'https://raw.githubusercontent.com/yassin549/Brain-Tumor-Detection-master/main/README.md',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Scikit-learn', 'NumPy'],
    type: 'application'
  },
  {
    id: 'DietGPT App',
    name: 'DietGPT App',
    icon: 'react',
    shortDescription: 'An intelligent diet planning application powered by GPT, providing personalized nutrition advice and meal plans',
    githubUrl: 'https://github.com/yassin549/dietgpt-app-main',
    readmeUrl: 'https://raw.githubusercontent.com/yassin549/dietgpt-app-main/main/README.md',
    technologies: ['React', 'Node.js', 'OpenAI API', 'TailwindCSS', 'Express'],
    type: 'application'
  },
  {
    id: 'Facebook Clone',
    name: 'Facebook Clone',
    icon: 'react',
    shortDescription: 'A modern Facebook clone featuring real-time social interactions, responsive design, and core social networking features',
    githubUrl: 'https://github.com/yassin549/facebook_clone',
    readmeUrl: 'https://raw.githubusercontent.com/yassin549/facebook_clone/main/README.md',
    technologies: ['React', 'Firebase', 'Material-UI', 'JavaScript', 'CSS3'],
    type: 'application'
  }
];

export const projects = writable<ProjectData[]>(initialProjects);