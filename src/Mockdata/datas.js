    // source of data
    export const CATEGORIES = ['Work', 'Study', 'Health', 'Personal']

    const CATEGORIES_BG = {
      Work:{bg:"#4F7EFF"},
      Study:{bg:"#F5A623"},
      Health:{bg:"#1C2030"},
      personal:{bg:"#1C2030"}
    }

export const PRIORITIES = ['High', 'Medium', 'Low']

export const MOODS = [
  { id: 'burnt',  label: 'Burnt',  emoji: '😩' },
  { id: 'okay',   label: 'Okay',   emoji: '😐' },
  { id: 'good',   label: 'Good',   emoji: '🙂' },
  { id: 'locked', label: 'Locked', emoji: '🔥' },
]



   export const taskObject = [{
    id : crypto.randomUUID(),
    title : "complete react to do application",
    category : "study", // || "work" || "personal" || "health",
    priority : "high", // || "medium" | "low",
    status : "done" || "pending" || "in-progress" || "overdue",
    dueDate :"2026-04-06",
    dueTime : "15:00",
    rating : 0 , 
    note:"",
    createtAt: "2026-04-06",
    completed:false,
    completedAt : null
}]

export const mockCheckins = [
  {
    id: 'c1',
    date: '2026-05-09',
    mood: 'good',
    energy: 72,
    focus: 65,
    note: '',
    rating: 4,
  },
  {
    id: 'c2',
    date: '2026-05-08',
    mood: 'locked',
    energy: 85,
    focus: 90,
    note: 'Great flow today, shipped a lot.',
    rating: 5,
  },
  {
    id: 'c3',
    date: '2026-05-07',
    mood: 'okay',
    energy: 60,
    focus: 55,
    note: '',
    rating: 3,
  },
]



