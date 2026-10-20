import { Component } from '@angular/core';

type AchievementLevel = 'AD' | 'A' | 'B' | 'C';

interface ClassAssignment {
  id: number;
  area: string;
  grade: string;
  section: string;
  schoolYear: string;
  studentCount: number;
}

interface TeacherEvaluation {
  assignmentId: number;
  student: string;
  competence: string;
  level: AchievementLevel | '';
  conclusion: string;
  saved: boolean;
}

@Component({
  selector: 'app-teacher-workspace',
  standalone: false,
  templateUrl: './teacher-workspace.component.html',
  styleUrl: './teacher-workspace.component.css'
})
export class TeacherWorkspaceComponent {
  selectedAssignmentId: number | null = null;
  readonly achievementLevels: AchievementLevel[] = ['AD', 'A', 'B', 'C'];

  readonly assignments: ClassAssignment[] = [
    { id: 301, area: 'Matemática', grade: '3.°', section: 'A', schoolYear: '2026', studentCount: 4 },
    { id: 302, area: 'Matemática', grade: '4.°', section: 'A', schoolYear: '2026', studentCount: 4 },
    { id: 303, area: 'Matemática', grade: '5.°', section: 'A', schoolYear: '2026', studentCount: 4 }
  ];

  readonly evaluations: TeacherEvaluation[] = [
    { assignmentId: 301, student: 'Lucía Mendoza', competence: 'Resuelve problemas de cantidad', level: '', conclusion: '', saved: false },
    { assignmentId: 301, student: 'Mateo Salazar', competence: 'Regularidad, equivalencia y cambio', level: 'A', conclusion: 'Explica patrones y verifica sus resultados con apoyo de representaciones.', saved: true },
    { assignmentId: 302, student: 'Camila Torres', competence: 'Resuelve problemas de forma y movimiento', level: 'AD', conclusion: 'Modela situaciones geométricas y justifica con precisión sus estrategias.', saved: true },
    { assignmentId: 302, student: 'Diego Rojas', competence: 'Resuelve problemas de cantidad', level: '', conclusion: '', saved: false },
    { assignmentId: 303, student: 'Sofía Vargas', competence: 'Regularidad, equivalencia y cambio', level: 'B', conclusion: 'Reconoce relaciones entre variables; debe fortalecer la argumentación.', saved: true },
    { assignmentId: 303, student: 'Andrés León', competence: 'Resuelve problemas de forma y movimiento', level: 'A', conclusion: 'Representa figuras y comunica los procedimientos empleados.', saved: true }
  ];

  get selectedAssignment(): ClassAssignment | null {
    return this.assignments.find((assignment) => assignment.id === this.selectedAssignmentId) ?? null;
  }

  get selectedEvaluations(): TeacherEvaluation[] {
    return this.evaluations.filter((evaluation) => evaluation.assignmentId === this.selectedAssignmentId);
  }

  get pendingCount(): number {
    const scope = this.selectedAssignmentId === null ? this.evaluations : this.selectedEvaluations;
    return scope.filter((evaluation) => !evaluation.level).length;
  }

  get totalStudents(): number {
    return this.assignments.reduce((total, assignment) => total + assignment.studentCount, 0);
  }

  openAssignment(id: number): void {
    this.selectedAssignmentId = id;
  }

  returnToAssignments(): void {
    this.selectedAssignmentId = null;
  }

  updateLevel(evaluation: TeacherEvaluation, event: Event): void {
    evaluation.level = (event.target as HTMLSelectElement).value as AchievementLevel | '';
    evaluation.saved = false;
  }

  updateConclusion(evaluation: TeacherEvaluation, event: Event): void {
    evaluation.conclusion = (event.target as HTMLTextAreaElement).value;
    evaluation.saved = false;
  }

  saveEvaluation(evaluation: TeacherEvaluation): void {
    if (evaluation.level && evaluation.conclusion.trim()) {
      evaluation.saved = true;
    }
  }
}