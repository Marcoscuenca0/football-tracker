import type { Player, Ball } from '../types';

export function generateTacticalCommentary(player: Player, ball: Ball, phase: 'BUILD_UP_A' | 'MIDFIELD' | 'ATTACK_A'): string {
    const { tacticalProfile, team, x, y } = player;

    if (!tacticalProfile) return "Observando movimientos...";

    // Dist to ball logic remains...

    // Distance to ball
    const distToBall = Math.sqrt(Math.pow(x - ball.x, 2) + Math.pow(y - ball.y, 2));
    const hasBall = distToBall < 2;

    switch (tacticalProfile) {
        case 'Sweeper Keeper':
            if (hasBall) return "Juega con los pies buscando iniciar desde atrás con seguridad.";
            if (distToBall > 30 && team === 'A' && x > 15) return "Adelanta su posición para actuar como líbero y cortar balones largos.";
            return "Mantiene la concentración, atento a las coberturas fuera del área.";

        case 'Ball Playing Defender':
            if (hasBall) return "Conduce para atraer la presión y liberar líneas de pase.";
            if (phase === 'BUILD_UP_A' && team === 'A' && Math.abs(y - 50) > 20) return "Se abre a la banda para ofrecer una salida limpia ante la presión.";
            return "Vigila la espalda de los mediocampistas y organiza la línea defensiva.";

        case 'Wing Back':
            if (phase === 'ATTACK_A' && team === 'A' && x > 60) return "Proyectado en ataque, buscando ganar línea de fondo para centrar.";
            if (phase === 'MIDFIELD' && Math.abs(y - 50) > 40) return "Da máxima amplitud al equipo, pisando la cal.";
            return "Repliega rápido para cerrar su banda.";

        case 'Box to Box':
            if (distToBall < 10) return "Presiona intensamente al portador del balón.";
            if (phase === 'ATTACK_A' && team === 'A' && x > 60) return "Llega desde segunda línea para sorprender en el área.";
            return "Recorre metros incansablemente para conectar defensa y ataque.";

        case 'Deep Lying Playmaker':
            if (hasBall) return "Levanta la cabeza buscando un cambio de orientación o pase filtrado.";
            if (phase === 'BUILD_UP_A' && team === 'A') return "Desciende entre centrales para iniciar la jugada.";
            return "Se ofrece constantemente como eje de la circulación.";

        case 'Winger':
            if (hasBall) return "Encara a su marcador buscando el desborde.";
            if (phase === 'ATTACK_A' && team === 'A') return "Tira la diagonal hacia el arco buscando el gol.";
            return "Mantiene la amplitud para estirar la defensa rival.";

        case 'Target Man':
            if (hasBall) return "Aguanta el balón de espaldas esperando la llegada de los volantes.";
            if (phase === 'ATTACK_A' && team === 'A') return "Fija a los centrales rivales en el área.";
            return "Busca ganar la posición para el juego aéreo.";

        case 'Inverted Fullback':
            if (phase === 'ATTACK_A' && team === 'A') return "Se cierra al medio campo para generar superioridad numérica.";
            return "Cierra espacios interiores para evitar contragolpes.";

        case 'False 9':
            if (phase === 'ATTACK_A' && team === 'A') return "Desciende a recibir para sacar a los centrales de zona.";
            return "Flota entre líneas buscando recibir libre.";

        default:
            return "Mantiene su posición táctica.";
    }
}
