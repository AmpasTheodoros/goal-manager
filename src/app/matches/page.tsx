// File: app/matches/page.tsx
import { Match } from '@/types/match'

const matches: Match[] = [
  { id: 1, homeTeam: 'FC Example', awayTeam: 'FC Opponent', date: '2024-07-15', result: '2-1' },
  { id: 2, homeTeam: 'FC Rival', awayTeam: 'FC Example', date: '2024-07-22', result: '0-3' },
  // Add more matches...
]

export default function MatchesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <ul>
        {matches.map(match => (
          <li key={match.id} className="mb-2">
            {match.date}: {match.homeTeam} vs {match.awayTeam} - Result: {match.result}
          </li>
        ))}
      </ul>
    </div>
  )
}