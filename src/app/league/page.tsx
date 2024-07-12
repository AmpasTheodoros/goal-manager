// File: app/league/page.tsx
import { LeagueEntry } from '@/types/league'

const leagueTable: LeagueEntry[] = [
  { position: 1, team: 'FC Example', played: 10, won: 8, drawn: 1, lost: 1, points: 25 },
  { position: 2, team: 'FC Rival', played: 10, won: 7, drawn: 2, lost: 1, points: 23 },
  // Add more teams...
]

export default function LeaguePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">League Table</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Pos</th>
            <th className="text-left">Team</th>
            <th className="text-left">P</th>
            <th className="text-left">W</th>
            <th className="text-left">D</th>
            <th className="text-left">L</th>
            <th className="text-left">Pts</th>
          </tr>
        </thead>
        <tbody>
          {leagueTable.map(entry => (
            <tr key={entry.position}>
              <td>{entry.position}</td>
              <td>{entry.team}</td>
              <td>{entry.played}</td>
              <td>{entry.won}</td>
              <td>{entry.drawn}</td>
              <td>{entry.lost}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
