// ─── OrionShift Mock Data ─────────────────────────────────────────────────────

export const ADMIN_CREDENTIALS = {
  email: 'admin@orionshift.com',
  password: 'Admin@2024',
}

export const ADMIN_ROLES = ['CEO', 'Team Lead', 'Manager', 'CTO', 'VP']

export const MOCK_TEAMS = [
  { id: 'team1', name: 'Engineering', color: '#3b6ee8', leadId: 'u1', memberIds: ['u1', 'u3', 'u4', 'u6'] },
  { id: 'team2', name: 'Design',      color: '#8b5cf6', leadId: 'u2', memberIds: ['u2', 'u7']              },
  { id: 'team3', name: 'QA & DevOps', color: '#10b981', leadId: 'u5', memberIds: ['u5', 'u8']              },
]

export const MOCK_USERS = [
  { id: 'u1', name: 'Alex Rivera',   role: 'Team Lead',    avatar: 'https://api.dicebear.com/8.x/notionists/svg?seed=Alex',    online: true,  color: '#3b6ee8', teamId: 'team1', isAdmin: true  },
  { id: 'u2', name: 'Priya Nair',    role: 'Team Lead',    avatar: 'https://api.dicebear.com/8.x/notionists/svg?seed=Priya',   online: true,  color: '#8b5cf6', teamId: 'team2', isAdmin: true  },
  { id: 'u3', name: 'Jordan Kim',    role: 'Frontend Dev', avatar: 'https://api.dicebear.com/8.x/notionists/svg?seed=Jordan',  online: false, color: '#10b981', teamId: 'team1', isAdmin: false },
  { id: 'u4', name: 'Sam Okafor',    role: 'Backend Dev',  avatar: 'https://api.dicebear.com/8.x/notionists/svg?seed=Sam',     online: true,  color: '#f59e0b', teamId: 'team1', isAdmin: false },
  { id: 'u5', name: 'Maya Torres',   role: 'Manager',      avatar: 'https://api.dicebear.com/8.x/notionists/svg?seed=Maya',    online: false, color: '#ef4444', teamId: 'team3', isAdmin: true  },
  { id: 'u6', name: 'Chris Tanaka',  role: 'DevOps',       avatar: 'https://api.dicebear.com/8.x/notionists/svg?seed=Chris',   online: true,  color: '#06b6d4', teamId: 'team1', isAdmin: false },
  { id: 'u7', name: 'Manisha Patel', role: 'UI Designer',  avatar: 'https://api.dicebear.com/8.x/notionists/svg?seed=Manisha', online: true,  color: '#f472b6', teamId: 'team2', isAdmin: false },
  { id: 'u8', name: 'Ravi Shankar',  role: 'QA Engineer',  avatar: 'https://api.dicebear.com/8.x/notionists/svg?seed=Ravi',    online: false, color: '#a78bfa', teamId: 'team3', isAdmin: false },
]

export const PRIORITIES = ['low', 'medium', 'high', 'urgent']
export const STATUSES   = ['todo', 'in_progress', 'completed']

export const MOCK_TASKS = [
  { id: 't1', title: 'Redesign onboarding flow',     description: 'Revamp the user onboarding experience with new Figma designs.',      status: 'in_progress', priority: 'high',   assignedTo: ['u1','u2'], dueDate: '2025-06-15', progress: 65,  tags: ['design','ux'],         createdAt: '2025-05-01T09:00:00Z' },
  { id: 't2', title: 'Set up CI/CD pipeline',        description: 'Configure GitHub Actions for automated testing and deployment.',      status: 'completed',   priority: 'urgent', assignedTo: ['u6'],      dueDate: '2025-05-20', progress: 100, tags: ['devops','infra'],      createdAt: '2025-04-28T11:00:00Z' },
  { id: 't3', title: 'API rate limiting',            description: 'Implement token-bucket rate limiting on all public endpoints.',       status: 'todo',        priority: 'medium', assignedTo: ['u4'],      dueDate: '2025-06-30', progress: 0,   tags: ['backend','security'],  createdAt: '2025-05-10T14:00:00Z' },
  { id: 't4', title: 'Dashboard performance audit',  description: 'Profile React renders and reduce Time-to-Interactive by 30%.',       status: 'in_progress', priority: 'medium', assignedTo: ['u3'],      dueDate: '2025-06-10', progress: 40,  tags: ['frontend','perf'],     createdAt: '2025-05-08T10:00:00Z' },
  { id: 't5', title: 'Write E2E test suite',         description: 'Cover critical user journeys with Playwright tests.',                 status: 'todo',        priority: 'low',    assignedTo: ['u5','u8'], dueDate: '2025-07-01', progress: 0,   tags: ['qa','testing'],        createdAt: '2025-05-12T08:00:00Z' },
  { id: 't6', title: 'Dark mode polish',             description: 'Fix contrast issues and ensure all components respect theme.',        status: 'completed',   priority: 'low',    assignedTo: ['u2','u7'], dueDate: '2025-05-18', progress: 100, tags: ['design','frontend'],   createdAt: '2025-05-05T15:00:00Z' },
]

export const MOCK_ACTIVITIES = [
  { id: 'a1', userId: 'u1', action: 'completed',   target: 'Set up CI/CD pipeline',       time: '2m ago',  icon: 'check'   },
  { id: 'a2', userId: 'u2', action: 'commented on', target: 'Redesign onboarding flow',   time: '18m ago', icon: 'message' },
  { id: 'a3', userId: 'u4', action: 'created',      target: 'API rate limiting task',      time: '1h ago',  icon: 'plus'    },
   ,
]

export const MOCK_NOTIFICATIONS = [
  { id: 'n1', type: 'mention',  message: 'Alex Rivera mentioned you in a task comment', time: '5m ago',    read: false },
  { id: 'n2', type: 'task',     message: 'Task "API rate limiting" was assigned to you', time: '1h ago',   read: false },
  { id: 'n3', type: 'deadline', message: '"Redesign onboarding flow" is due in 3 days',  time: '2h ago',   read: false },
  { id: 'n4', type: 'complete', message: 'CI/CD pipeline task marked as completed',       time: '4h ago',   read: true  },
  { id: 'n5', type: 'team',     message: 'Maya Torres joined the project',               time: 'yesterday', read: true  },
]

export const MOCK_CHAT = {
  team1: [
    { id: 'c1', userId: 'u1', text: 'Hey team! Standup in 10 mins 🙌', time: '9:00 AM' },
    { id: 'c2', userId: 'u3', text: 'On it! Just finishing the auth PR.', time: '9:02 AM' },
    { id: 'c3', userId: 'u4', text: 'Will be there. Also pushed the rate-limit branch.', time: '9:05 AM' },
    { id: 'c4', userId: 'u6', text: 'Pipeline green! 🟢', time: '9:08 AM' },
  ],
  team2: [
    { id: 'c5', userId: 'u2', text: 'Designs are ready for review everyone 🎨', time: '10:30 AM' },
    { id: 'c6', userId: 'u7', text: 'Checking now — looks great Priya!', time: '10:35 AM' },
  ],
  team3: [
    { id: 'c7', userId: 'u5', text: 'QA session at 3pm. Please confirm availability.', time: '11:00 AM' },
    { id: 'c8', userId: 'u8', text: 'Confirmed! I will prep the test cases.', time: '11:05 AM' },
  ],
}