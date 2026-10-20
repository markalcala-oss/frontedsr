import { ClassAssessmentMatrixComponent } from './class-assessment-matrix.component';

describe('ClassAssessmentMatrixComponent', () => {
  it('adds a session only to the selected competence unit', () => {
    const component = new ClassAssessmentMatrixComponent();
    const selectedUnit = component.unitsByCompetence[0].units[0];
    const otherUnit = component.unitsByCompetence[0].units[1];
    const otherCompetenceUnit = component.unitsByCompetence[1].units[0];

    component.addSession(selectedUnit);

    expect(selectedUnit.sessions).toEqual([1, 2, 3, 4]);
    expect(otherUnit.sessions).toEqual([1, 2, 3, 4]);
    expect(otherCompetenceUnit.sessions).toEqual([1, 2, 3, 4]);
    expect(selectedUnit.descriptions[4]).toBe('');
  });

  it('keeps session names independent within a unit', () => {
    const component = new ClassAssessmentMatrixComponent();
    const unit = component.unitsByCompetence[0].units[0];
    const uniqueTitle = 'Repaso de fracciones';
    const event = { target: { value: uniqueTitle } } as unknown as Event;

    component.updateSessionDescription(unit, 2, event);

    expect(unit.descriptions[2]).toBe(uniqueTitle);
    expect(unit.descriptions[1]).not.toBe(uniqueTitle);
    expect(unit.descriptions[3]).not.toBe(uniqueTitle);
  });

  it('stores each student session mark independently', () => {
    const component = new ClassAssessmentMatrixComponent();
    const student = component.roster[0];

    component.cycleSessionSymbol(student, 'quantity', 1, 1);

    expect(component.getSessionSymbol(student, 'quantity', 1, 1)).toBe('●');
    expect(component.getSessionSymbol(student, 'quantity', 1, 2)).toBe('');
    expect(component.getSessionSymbol(student, 'regularity', 1, 1)).toBe('');
  });
});