import { Component, Input } from '@angular/core';

type AchievementLevel = 'AD' | 'A' | 'B' | 'C' | '';
type SessionSymbol = '' | '●' | '✓' | '◆';

interface UnitSessions {
  id: number;
  name: string;
  sessions: number[];
  descriptions: Record<number, string>;
}

interface CompetencyGroup {
  id: string;
  name: string;
  units: UnitSessions[];
}

interface StudentRecord {
  sessionSymbols: Record<string, SessionSymbol>;
  finalLevel: AchievementLevel;
  conclusion: string;
}

interface RosterStudent {
  id: number;
  name: string;
  records: Record<string, StudentRecord>;
}

@Component({
  selector: 'app-class-assessment-matrix',
  standalone: false,
  templateUrl: './class-assessment-matrix.component.html',
  styleUrl: './class-assessment-matrix.component.css'
})
export class ClassAssessmentMatrixComponent {
  @Input() assignmentTitle = '3.° A';
  @Input() area = 'Matemática';
  @Input() schoolYear = '2026';

  readonly achievementLevels: AchievementLevel[] = ['AD', 'A', 'B', 'C'];
  readonly unitsByCompetence: CompetencyGroup[] = [
    {
      id: 'quantity',
      name: 'Resuelve problemas de cantidad',
      units: [
        this.createUnit(1, 'I UNIDAD', [1, 2, 3], ['Números naturales', 'Operaciones combinadas', 'Problemas con fracciones']),
        this.createUnit(2, 'II UNIDAD', [1, 2, 3, 4], ['Razones y proporciones', 'Porcentajes', 'Regla de tres', 'Situaciones de compra'])
      ]
    },
    {
      id: 'regularity',
      name: 'Resuelve problemas de regularidad, equivalencia y cambio',
      units: [
        this.createUnit(1, 'I UNIDAD', [1, 2, 3, 4], ['Patrones numéricos', 'Sucesiones', 'Expresiones algebraicas', 'Ecuaciones']),
        this.createUnit(2, 'II UNIDAD', [1, 2], ['Relaciones entre variables', 'Representación gráfica'])
      ]
    },
    {
      id: 'data',
      name: 'Resuelve problemas de gestión de datos e incertidumbre',
      units: [
        this.createUnit(1, 'I UNIDAD', [1, 2], ['Recolección de datos', 'Tablas de frecuencia']),
        this.createUnit(2, 'II UNIDAD', [1, 2, 3], ['Gráficos estadísticos', 'Medidas de tendencia', 'Probabilidad'])
      ]
    },
    {
      id: 'shape',
      name: 'Resuelve problemas de forma, movimiento y localización',
      units: [
        this.createUnit(1, 'I UNIDAD', [1, 2, 3], ['Ángulos y rectas', 'Polígonos', 'Perímetro y área']),
        this.createUnit(2, 'II UNIDAD', [1, 2, 3, 4], ['Transformaciones', 'Plano cartesiano', 'Sólidos geométricos', 'Escalas'])
      ]
    }
  ];

  readonly roster: RosterStudent[] = [
    this.createStudent(1, 'Lucía Mendoza'),
    this.createStudent(2, 'Mateo Salazar'),
    this.createStudent(3, 'Camila Torres'),
    this.createStudent(4, 'Diego Rojas')
  ];

  addSession(unit: UnitSessions): void {
    const nextSession = Math.max(0, ...unit.sessions) + 1;
    unit.sessions.push(nextSession);
    unit.descriptions[nextSession] = '';
  }

  updateSessionDescription(unit: UnitSessions, sessionNumber: number, event: Event): void {
    unit.descriptions[sessionNumber] = (event.target as HTMLInputElement).value;
  }

  sessionCount(competency: CompetencyGroup): number {
    return competency.units.reduce((count, unit) => count + unit.sessions.length, 0);
  }

  getSessionSymbol(student: RosterStudent, competencyId: string, unitId: number, sessionNumber: number): SessionSymbol {
    return student.records[competencyId].sessionSymbols[`${unitId}-${sessionNumber}`] ?? '';
  }

  cycleSessionSymbol(student: RosterStudent, competencyId: string, unitId: number, sessionNumber: number): void {
    const record = student.records[competencyId];
    const key = `${unitId}-${sessionNumber}`;
    const symbols: SessionSymbol[] = ['', '●', '✓', '◆'];
    const currentIndex = symbols.indexOf(record.sessionSymbols[key] ?? '');
    record.sessionSymbols[key] = symbols[(currentIndex + 1) % symbols.length];
  }

  updateFinalLevel(student: RosterStudent, competencyId: string, event: Event): void {
    student.records[competencyId].finalLevel = (event.target as HTMLSelectElement).value as AchievementLevel;
  }

  updateConclusion(student: RosterStudent, competencyId: string, event: Event): void {
    student.records[competencyId].conclusion = (event.target as HTMLTextAreaElement).value;
  }

  private createStudent(id: number, name: string): RosterStudent {
    const records: Record<string, StudentRecord> = {};
    for (const competency of this.unitsByCompetence) {
      records[competency.id] = { sessionSymbols: {}, finalLevel: '', conclusion: '' };
    }
    return { id, name, records };
  }

  private createUnit(id: number, name: string, sessions: number[], descriptions: string[]): UnitSessions {
    return {
      id,
      name,
      sessions,
      descriptions: Object.fromEntries(sessions.map((session, index) => [session, descriptions[index] ?? '']))
    };
  }
}