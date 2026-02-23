export type PlayerProfile =
    | 'Sweeper Keeper' | 'Shot Stopper'
    | 'Ball Playing Defender' | 'Stopper' | 'Wing Back' | 'Inverted Fullback'
    | 'Box to Box' | 'Deep Lying Playmaker' | 'Holding Midfielder' | 'Attacking Midfielder'
    | 'Target Man' | 'False 9' | 'Winger' | 'Inside Forward';

export interface Player {
    id: number;
    name: string;
    number: number;
    team: 'A' | 'B';
    x: number; // 0-100 percentage of field width
    y: number; // 0-100 percentage of field height
    baseX: number; // Tactical origin X
    baseY: number; // Tactical origin Y
    position: string;
    tacticalProfile?: PlayerProfile;
}

export interface Ball {
    x: number;
    y: number;
}

export interface FreeZone {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    timestamp: number;
    snapshotUrl?: string;
}

export interface MatchStats {
    possessionA: number;
    possessionB: number;
    freeZonesCount: number;
    matchTime: number; // seconds
    possessionHistory: { time: number; teamA: number; teamB: number }[];
}

export type ThemeId = 'neon' | 'light' | 'navy';

export interface ThemeOption {
    id: ThemeId;
    label: string;
    description: string;
}
