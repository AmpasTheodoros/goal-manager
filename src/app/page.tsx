import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Soccer Manager Simulator</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/team" className="text-blue-500 hover:underline">Manage Team</Link></li>
          <li><Link href="/matches" className="text-blue-500 hover:underline">Matches</Link></li>
          <li><Link href="/league" className="text-blue-500 hover:underline">League Table</Link></li>
          <li><Link href="/simulate" className="text-blue-500 hover:underline">Simulate Match</Link></li>
        </ul>
      </nav>
    </div>
  )
}