import type { Player, FreeZone, MatchStats } from '../types';

export const initialPlayers: Player[] = [
    // Team A (Left Side) - Formation: 4-2-3-1
    { id: 1, name: 'M. Neuer', number: 1, team: 'A', x: 5, y: 50, baseX: 5, baseY: 50, position: 'GK', tacticalProfile: 'Sweeper Keeper' },
    { id: 2, name: 'J. Kimmich', number: 6, team: 'A', x: 25, y: 15, baseX: 25, baseY: 15, position: 'RB', tacticalProfile: 'Inverted Fullback' },
    { id: 3, name: 'M. de Ligt', number: 4, team: 'A', x: 20, y: 38, baseX: 20, baseY: 38, position: 'CB', tacticalProfile: 'Ball Playing Defender' },
    { id: 4, name: 'D. Upamecano', number: 2, team: 'A', x: 20, y: 62, baseX: 20, baseY: 62, position: 'CB', tacticalProfile: 'Stopper' },
    { id: 5, name: 'A. Davies', number: 19, team: 'A', x: 25, y: 85, baseX: 25, baseY: 85, position: 'LB', tacticalProfile: 'Wing Back' },
    // Double pivot
    { id: 6, name: 'L. Goretzka', number: 8, team: 'A', x: 38, y: 35, baseX: 38, baseY: 35, position: 'CDM', tacticalProfile: 'Box to Box' },
    { id: 7, name: 'K. Laimer', number: 27, team: 'A', x: 38, y: 65, baseX: 38, baseY: 65, position: 'CDM', tacticalProfile: 'Holding Midfielder' },
    // Attackers
    { id: 8, name: 'S. Gnabry', number: 7, team: 'A', x: 65, y: 15, baseX: 65, baseY: 15, position: 'RW', tacticalProfile: 'Winger' },
    { id: 9, name: 'J. Musiala', number: 42, team: 'A', x: 55, y: 50, baseX: 55, baseY: 50, position: 'CAM', tacticalProfile: 'Attacking Midfielder' },
    { id: 10, name: 'L. Sané', number: 10, team: 'A', x: 65, y: 85, baseX: 65, baseY: 85, position: 'LW', tacticalProfile: 'Inside Forward' },
    { id: 11, name: 'H. Kane', number: 9, team: 'A', x: 72, y: 50, baseX: 72, baseY: 50, position: 'ST', tacticalProfile: 'False 9' },

    // Team B (Right Side) - Formation: 4-3-3 (Attack)
    { id: 12, name: 'T. Courtois', number: 1, team: 'B', x: 95, y: 50, baseX: 95, baseY: 50, position: 'GK', tacticalProfile: 'Shot Stopper' },
    { id: 13, name: 'D. Carvajal', number: 2, team: 'B', x: 75, y: 15, baseX: 75, baseY: 15, position: 'RB', tacticalProfile: 'Wing Back' },
    { id: 14, name: 'A. Rüdiger', number: 22, team: 'B', x: 80, y: 38, baseX: 80, baseY: 38, position: 'CB', tacticalProfile: 'Stopper' },
    { id: 15, name: 'E. Militão', number: 3, team: 'B', x: 80, y: 62, baseX: 80, baseY: 62, position: 'CB', tacticalProfile: 'Ball Playing Defender' },
    { id: 16, name: 'F. Mendy', number: 23, team: 'B', x: 75, y: 85, baseX: 75, baseY: 85, position: 'LB', tacticalProfile: 'Inverted Fullback' },
    // Midfield Trio
    { id: 17, name: 'F. Valverde', number: 15, team: 'B', x: 62, y: 25, baseX: 62, baseY: 25, position: 'CM', tacticalProfile: 'Box to Box' },
    { id: 18, name: 'A. Tchouaméni', number: 18, team: 'B', x: 68, y: 50, baseX: 68, baseY: 50, position: 'CDM', tacticalProfile: 'Holding Midfielder' },
    { id: 19, name: 'J. Bellingham', number: 5, team: 'B', x: 62, y: 75, baseX: 62, baseY: 75, position: 'CM', tacticalProfile: 'Box to Box' },
    // Front Three
    { id: 20, name: 'Rodrygo', number: 11, team: 'B', x: 35, y: 20, baseX: 35, baseY: 20, position: 'RW', tacticalProfile: 'Winger' },
    { id: 21, name: 'K. Benzema', number: 9, team: 'B', x: 28, y: 50, baseX: 28, baseY: 50, position: 'ST', tacticalProfile: 'Target Man' },
    { id: 22, name: 'Vinícius Jr.', number: 7, team: 'B', x: 35, y: 80, baseX: 35, baseY: 80, position: 'LW', tacticalProfile: 'Inside Forward' },
];

export const initialFreeZones: FreeZone[] = [
    { id: 1, x: 30, y: 5, width: 15, height: 12, timestamp: 234 },
    { id: 2, x: 70, y: 70, width: 12, height: 14, timestamp: 567 },
    { id: 3, x: 45, y: 40, width: 10, height: 10, timestamp: 890 },
    { id: 4, x: 15, y: 75, width: 14, height: 11, timestamp: 1123 },
    { id: 5, x: 80, y: 25, width: 11, height: 13, timestamp: 1456 },
];

export const initialStats: MatchStats = {
    possessionA: 54,
    possessionB: 46,
    freeZonesCount: 5,
    matchTime: 2340,
    possessionHistory: [
        { time: 0, teamA: 50, teamB: 50 },
        { time: 5, teamA: 55, teamB: 45 },
        { time: 10, teamA: 52, teamB: 48 },
        { time: 15, teamA: 48, teamB: 52 },
        { time: 20, teamA: 58, teamB: 42 },
        { time: 25, teamA: 60, teamB: 40 },
        { time: 30, teamA: 54, teamB: 46 },
        { time: 35, teamA: 51, teamB: 49 },
        { time: 39, teamA: 54, teamB: 46 },
    ],
};

// Consolidated Game Engine
export function simulateMatch(players: Player[], ball: { x: number, y: number }, time: number): { players: Player[], ball: { x: number, y: number }, phase: 'BUILD_UP_A' | 'MIDFIELD' | 'ATTACK_A' } {
    const t = time / 1000;

    // 1. Determine Phase based on Ball Position
    // < 35: Team A Build-up / Team B High Press
    // 35-65: Midfield Battle
    // > 65: Team A Attack / Team B Low Block
    let phase: 'BUILD_UP_A' | 'MIDFIELD' | 'ATTACK_A' = 'MIDFIELD';
    if (ball.x < 35) phase = 'BUILD_UP_A';
    else if (ball.x > 65) phase = 'ATTACK_A';

    // 2. Update Ball Position (simulate passing/carrying)
    // Find nearest player to ball to determine possession
    let nearestDist = Infinity;
    let possessor: Player | null = null;

    for (const p of players) {
        const dist = Math.sqrt(Math.pow(p.x - ball.x, 2) + Math.pow(p.y - ball.y, 2));
        if (dist < nearestDist) {
            nearestDist = dist;
            possessor = p;
        }
    }

    let nextBall = { ...ball };

    // Ball movement logic
    if (possessor) {
        // If possessing, ball moves with player + slight dribble
        nextBall.x = possessor.x + Math.sin(t * 5) * 1.5;
        nextBall.y = possessor.y + Math.cos(t * 5) * 1.5;

        // Occasional pass (every ~3 seconds)
        if (Math.floor(t) % 3 === 0 && Math.random() > 0.7) {
            // Find teammate forward
            const teammates = players.filter(p => p.team === possessor?.team && p.id !== possessor.id);
            const forwardOption = teammates.find(p =>
                (possessor!.team === 'A' ? p.x > possessor!.x : p.x < possessor!.x) &&
                Math.abs(p.y - possessor!.y) < 30
            );

            if (forwardOption) {
                // "Pass" - move ball towards teammate (teleport for now, smoothing in UI handles it)
                nextBall.x = forwardOption.x;
                nextBall.y = forwardOption.y;
            }
        }
    } else {
        // Loose ball drifts
        nextBall.x += (Math.random() - 0.5);
    }

    // Keep ball in bounds
    nextBall.x = Math.max(2, Math.min(98, nextBall.x));
    nextBall.y = Math.max(2, Math.min(98, nextBall.y));

    // 3. Update Player Positions based on Phase
    const nextPlayers = players.map((p, i) => {
        let tacticalX = p.baseX;
        let tacticalY = p.baseY;

        // --- Team A Tactics (4-2-3-1) ---
        if (p.team === 'A') {
            if (phase === 'BUILD_UP_A') {
                // GK holds
                if (p.position === 'GK') { /* stays */ }
                // CBs split wide to receive
                else if (p.position === 'CB') { tacticalY = p.baseY < 50 ? 20 : 80; tacticalX = 10; }
                // FBs push high
                else if (['LB', 'RB'].includes(p.position)) { tacticalX += 15; }
                // Pivot drops centrally
                else if (['CDM'].includes(p.position)) { tacticalX -= 10; }
            } else if (phase === 'ATTACK_A') {
                // High line
                tacticalX += 20;
                // Compress vertically
                tacticalY = 50 + (p.baseY - 50) * 0.7;
            }
        }

        // --- Team B Tactics (4-3-3) ---
        if (p.team === 'B') {
            if (phase === 'BUILD_UP_A') {
                // High Press
                tacticalX -= 15;
            } else if (phase === 'ATTACK_A') {
                // Low Block (Park the bus)
                tacticalX = p.baseX * 0.7 + 100 * 0.3; // Compress towards own goal (right)
                // Narrow width
                tacticalY = 50 + (p.baseY - 50) * 0.6;
            }
        }

        // Apply Drift
        const phaseOffset = i * 0.7;
        const driftX = Math.sin(t * 0.5 + phaseOffset) * 2;
        const driftY = Math.cos(t * 0.4 + phaseOffset) * 2;

        // Move towards tactical position (lerp)
        const speed = 0.1; // 10% towards target per tick
        let nx = p.x + (tacticalX - p.x) * speed + driftX * 0.1;
        let ny = p.y + (tacticalY - p.y) * speed + driftY * 0.1;

        // Ball Attraction (if near)
        const distToBall = Math.sqrt(Math.pow(p.x - nextBall.x, 2) + Math.pow(p.y - nextBall.y, 2));
        if (distToBall < 15) {
            nx += (nextBall.x - nx) * 0.05;
            ny += (nextBall.y - ny) * 0.05;
        }

        return { ...p, x: nx, y: ny };
    });

    return { players: nextPlayers, ball: nextBall, phase };
}
