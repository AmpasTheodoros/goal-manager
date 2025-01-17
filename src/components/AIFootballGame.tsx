import React, { useRef, useEffect, useState } from 'react';
import { Team } from '../types/team';

interface Vector2D {
  x: number;
  y: number;
}

interface GamePlayer {
  id: number;
  name: string;
  role: string;
  skill: number;
  position: Vector2D;
  homePosition: Vector2D;
  velocity: Vector2D;
}

interface GameState {
  homePlayers: GamePlayer[];
  awayPlayers: GamePlayer[];
  ball: {
    position: Vector2D;
    velocity: Vector2D;
  };
  possession: 'home' | 'away' | null;
  score: {
    home: number;
    away: number;
  };
  time: number;
}

const FIELD_WIDTH = 100;
const FIELD_HEIGHT = 64;
const PLAYER_RADIUS = 1;
const BALL_RADIUS = 0.5;
const MAX_PLAYER_SPEED = 0.5;
const BALL_SPEED = 0.7;
const FRICTION = 0.98;

const initializeGameState = (homeTeam: Team, awayTeam: Team): GameState => {
  const formation442 = [
    { x: 10, y: 32 }, // Goalkeeper
    { x: 20, y: 10 }, { x: 20, y: 25 }, { x: 20, y: 39 }, { x: 20, y: 54 }, // Defenders
    { x: 40, y: 10 }, { x: 40, y: 25 }, { x: 40, y: 39 }, { x: 40, y: 54 }, // Midfielders
    { x: 60, y: 25 }, { x: 60, y: 39 } // Forwards
  ];

  const initializePlayers = (team: Team, isHome: boolean): GamePlayer[] =>
    team.players.slice(0, 11).map((player, index) => ({
      ...player,
      position: {
        x: isHome ? formation442[index].x : FIELD_WIDTH - formation442[index].x,
        y: formation442[index].y
      },
      homePosition: {
        x: isHome ? formation442[index].x : FIELD_WIDTH - formation442[index].x,
        y: formation442[index].y
      },
      velocity: { x: 0, y: 0 }
    }));

  return {
    homePlayers: initializePlayers(homeTeam, true),
    awayPlayers: initializePlayers(awayTeam, false),
    ball: {
      position: { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2 },
      velocity: { x: 0, y: 0 }
    },
    possession: null,
    score: { home: 0, away: 0 },
    time: 0
  };
};

const updatePlayerMovement = (player: GamePlayer, target: Vector2D): GamePlayer => {
  const dx = target.x - player.position.x;
  const dy = target.y - player.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0.1) {
    const speed = Math.min(MAX_PLAYER_SPEED, distance / 5);
    const vx = (dx / distance) * speed + (Math.random() - 0.5) * 0.1;
    const vy = (dy / distance) * speed + (Math.random() - 0.5) * 0.1;

    return {
      ...player,
      position: {
        x: Math.max(0, Math.min(FIELD_WIDTH, player.position.x + vx)),
        y: Math.max(0, Math.min(FIELD_HEIGHT, player.position.y + vy))
      },
      velocity: { x: vx, y: vy }
    };
  }

  return player;
};

const updateGameState = (prevState: GameState): GameState => {
  let newState = { ...prevState };

  // Update ball movement
  newState.ball.position.x += newState.ball.velocity.x;
  newState.ball.position.y += newState.ball.velocity.y;
  newState.ball.velocity.x *= FRICTION;
  newState.ball.velocity.y *= FRICTION;

  // Bounce ball off walls
  if (newState.ball.position.x <= BALL_RADIUS || newState.ball.position.x >= FIELD_WIDTH - BALL_RADIUS) {
    newState.ball.velocity.x *= -1;
  }
  if (newState.ball.position.y <= BALL_RADIUS || newState.ball.position.y >= FIELD_HEIGHT - BALL_RADIUS) {
    newState.ball.velocity.y *= -1;
  }

  // Check for goals
  if (newState.ball.position.x <= BALL_RADIUS) {
    newState.score.away++;
    newState.ball.position = { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2 };
    newState.ball.velocity = { x: 0, y: 0 };
  } else if (newState.ball.position.x >= FIELD_WIDTH - BALL_RADIUS) {
    newState.score.home++;
    newState.ball.position = { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2 };
    newState.ball.velocity = { x: 0, y: 0 };
  }

  // Update player movements
  const updatePlayers = (players: GamePlayer[], isHome: boolean) =>
    players.map(player => {
      let target: Vector2D;

      if (player.role === 'Goalkeeper') {
        target = player.homePosition; // Goalkeeper stays near the goal
      } else if (newState.possession === (isHome ? 'home' : 'away')) {
        target = {
          x: isHome ? Math.min(FIELD_WIDTH * 0.9, player.homePosition.x + 30) : Math.max(FIELD_WIDTH * 0.1, player.homePosition.x - 30),
          y: player.homePosition.y
        };
      } else {
        target = {
          x: newState.ball.position.x + (Math.random() - 0.5) * 20,
          y: newState.ball.position.y + (Math.random() - 0.5) * 20
        };
      }

      if (Math.abs(target.x - player.homePosition.x) > 40 || Math.abs(target.y - player.homePosition.y) > 40) {
        target = {
          x: (target.x + player.homePosition.x) / 2,
          y: (target.y + player.homePosition.y) / 2
        };
      }

      return updatePlayerMovement(player, target);
    });

  newState.homePlayers = updatePlayers(newState.homePlayers, true);
  newState.awayPlayers = updatePlayers(newState.awayPlayers, false);

  // Check for ball possession
  const checkPossession = (players: GamePlayer[], team: 'home' | 'away') => {
    for (let player of players) {
      const dx = player.position.x - newState.ball.position.x;
      const dy = player.position.y - newState.ball.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < PLAYER_RADIUS + BALL_RADIUS) {
        newState.possession = team;
        newState.ball.velocity.x = player.velocity.x * BALL_SPEED;
        newState.ball.velocity.y = player.velocity.y * BALL_SPEED;
        break;
      }
    }
  };

  checkPossession(newState.homePlayers, 'home');
  checkPossession(newState.awayPlayers, 'away');

  newState.time += 1;

  return newState;
};

const AIFootballGame: React.FC<{ homeTeam: Team; awayTeam: Team }> = ({ homeTeam, awayTeam }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(initializeGameState(homeTeam, awayTeam));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawField = () => {
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
      ctx.stroke();
    };

    const perspectiveTransform = (position: Vector2D) => {
      const scale = 0.8 + (position.x / FIELD_WIDTH) * 0.4;
      return {
        x: position.x * 10,
        y: position.y * 10 * scale
      };
    };

    const drawPlayers = (players: GamePlayer[], color: string) => {
      players.forEach(player => {
        const transformedPosition = perspectiveTransform(player.position);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(transformedPosition.x, transformedPosition.y, PLAYER_RADIUS * 10, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawBall = () => {
      const transformedPosition = perspectiveTransform(gameState.ball.position);
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(transformedPosition.x, transformedPosition.y, BALL_RADIUS * 10, 0, Math.PI * 2);
      ctx.fill();
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawField();
      drawPlayers(gameState.homePlayers, 'red');
      drawPlayers(gameState.awayPlayers, 'blue');
      drawBall();
      setGameState(prevState => updateGameState(prevState));
    };

    const intervalId = setInterval(gameLoop, 33); // ~30 fps

    return () => clearInterval(intervalId);
  }, [gameState]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">{homeTeam.name} vs {awayTeam.name}</h2>
        <p className="text-xl">
          {gameState.score.home} - {gameState.score.away}
        </p>
        <p>Time: {Math.floor(gameState.time / 60)}:{(gameState.time % 60).toString().padStart(2, '0')}</p>
      </div>
      <canvas ref={canvasRef} width={1000} height={640} className="border border-gray-300" />
    </div>
  );
};

export default AIFootballGame;
