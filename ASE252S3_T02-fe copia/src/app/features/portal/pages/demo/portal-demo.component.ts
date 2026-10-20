import { Component } from '@angular/core';

type DemoRole = 'ALUMNO' | 'DOCENTE';
type AchievementLevel = 'AD' | 'A' | 'B' | 'C';

interface StudentEvaluation {
  area: string;
  competence: string;
  level: AchievementLevel;
  period: string;
  conclusion: string;
}

@Component({
  selector: 'app-portal-demo',
  standalone: false,
  templateUrl: './portal-demo.component.html',
  styleUrl: './portal-demo.component.css'
})
export class PortalDemoComponent {
  activeRole: DemoRole = 'ALUMNO';

  readonly studentEvaluations: StudentEvaluation[] = [
    { area: 'Matemática', competence: 'Resuelve problemas de cantidad', level: 'A', period: 'I bimestre', conclusion: 'Resuelve situaciones usando estrategias de cálculo y explica sus procedimientos.' },
    { area: 'Comunicación', competence: 'Escribe diversos tipos de textos', level: 'AD', period: 'I bimestre', conclusion: 'Organiza sus ideas con coherencia y adecúa el texto a distintos propósitos.' },
    { area: 'Ciencia y Tecnología', competence: 'Indaga mediante métodos científicos', level: 'B', period: 'I bimestre', conclusion: 'Formula preguntas y registra observaciones; requiere acompañamiento al interpretar resultados.' },
    { area: 'Ciencias Sociales', competence: 'Construye interpretaciones históricas', level: 'A', period: 'I bimestre', conclusion: 'Relaciona fuentes y hechos para explicar procesos históricos estudiados.' }
  ];

  selectRole(role: DemoRole): void {
    this.activeRole = role;
  }
}