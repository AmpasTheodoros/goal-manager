'use client'
import React from 'react'
import AIFootballGame from '@/components/AIFootballGame'
import { Team } from '@/types/team'

const teamA: Team = {
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
  ]
}

const teamB: Team = {
  name: 'FC Opponent',
  players: [
    { id: 1, name: 'Alice Johnson', role: 'Goalkeeper', skill: 84 },
    { id: 2, name: 'Bob Williams', role: 'Defender', skill: 79 },
    { id: 3, name: 'Charlie Brown', role: 'Defender', skill: 80 },
    { id: 4, name: 'Diana Smith', role: 'Defender', skill: 78 },
    { id: 5, name: 'Edward Lee', role: 'Defender', skill: 77 },
    { id: 6, name: 'Fiona Taylor', role: 'Midfielder', skill: 81 },
    { id: 7, name: 'George Wilson', role: 'Midfielder', skill: 82 },
    { id: 8, name: 'Hannah Davis', role: 'Midfielder', skill: 80 },
    { id: 9, name: 'Ian Harris', role: 'Forward', skill: 83 },
    { id: 10, name: 'Julia Martin', role: 'Forward', skill: 85 },
    { id: 11, name: 'Kevin White', role: 'Forward', skill: 81 },
  ]
}

export default function SimulatePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Football Game Simulation</h1>
      <AIFootballGame homeTeam={teamA} awayTeam={teamB} />
    </div>
  )
}