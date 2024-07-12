// File: app/team/page.tsx
import { Team } from '@/types/team'

const team: Team = {
  name: 'FC Example',
  players: [
    { id: 1, name: 'John Doe', role: 'Goalkeeper', skill: 85 },
    { id: 2, name: 'Jane Smith', role: 'Defender', skill: 80 },
    { id: 3, name: 'Mike Johnson', role: 'Defender', skill: 78 },
    { id: 4, name: 'Sarah Brown', role: 'Defender', skill: 79 },
    { id: 5, name: 'Chris Lee', role: 'Defender', skill: 77 },
    { id: 6, name: 'Alex Taylor', role: 'Midfielder', skill: 82 },
    { id: 7, name: 'Sam Wilson', role: 'Midfielder', skill: 81 },
    { id: 8, name: 'Emma Davis', role: 'Midfielder', skill: 80 },
    { id: 9, name: 'Tom Harris', role: 'Forward', skill: 84 },
    { id: 10, name: 'Olivia Martin', role: 'Forward', skill: 83 },
    { id: 11, name: 'Daniel White', role: 'Forward', skill: 82 },
    // Substitutes
    { id: 12, name: 'Lisa Green', role: 'Goalkeeper', skill: 75 },
    { id: 13, name: 'Ryan Black', role: 'Defender', skill: 76 },
    { id: 14, name: 'Sophie Gray', role: 'Midfielder', skill: 77 },
    { id: 15, name: 'James Brown', role: 'Forward', skill: 78 },
  ]
}

export default function TeamPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{team.name}</h1>
      <ul>
        {team.players.map(player => (
          <li key={player.id} className="mb-2">
            {player.name} - {player.role} (Skill: {player.skill})
          </li>
        ))}
      </ul>
    </div>
  )
}