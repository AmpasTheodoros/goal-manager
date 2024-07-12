import { Team } from '@/types/team'

interface MatchResult {
  homeGoals: number
  awayGoals: number
}

export function simulateMatch(homeTeam: Team, awayTeam: Team): MatchResult {
  const homeStrength = calculateTeamStrength(homeTeam)
  const awayStrength = calculateTeamStrength(awayTeam)

  const homeGoals = simulateGoals(homeStrength)
  const awayGoals = simulateGoals(awayStrength)

  return { homeGoals, awayGoals }
}

function calculateTeamStrength(team: Team): number {
  const totalSkill = team.players.reduce((sum, player) => sum + player.skill, 0)
  return totalSkill / team.players.length
}

function simulateGoals(teamStrength: number): number {
  const baseChance = teamStrength / 20 // Adjust this factor to balance goal scoring
  return Math.floor(Math.random() * baseChance)
}