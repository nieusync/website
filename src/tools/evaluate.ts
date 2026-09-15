import type { Finding, Framework, ToolAnswers } from './types';

const applies = (answers: ToolAnswers, key: string) => {
  const value = answers[key];
  return value === 'yes' || value === 'partial' || value === 'toConfirm' || typeof value === 'number';
};

export function isVisible(question: Framework['questions'][number], answers: ToolAnswers) {
  return question.when?.every((condition) => {
    const answer = answers[condition.key];
    if (condition.min !== undefined) return typeof answer === 'number' && answer >= condition.min;
    return condition.is ? typeof answer === 'string' && condition.is.includes(answer as never) : applies(answers, condition.key);
  }) ?? true;
}

export function evaluateFramework(framework: Framework, answers: ToolAnswers): Finding[] {
  return framework.questions
    .filter((question) => question.finding && isVisible(question, answers))
    .map((question) => {
      const answer = answers[question.key];
      if (answer === 'no' || answer === 'partial') return { question, status: 'possibleGap' };
      // Unanswered is silence, not a finding: an untouched page must not accuse
      // anyone of anything. Only an explicit "I need to check" is an unknown.
      if (answer === 'toConfirm') return { question, status: 'needsConfirmation' };
      return { question, status: 'notApplicable' };
    });
}
