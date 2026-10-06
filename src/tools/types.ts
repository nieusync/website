export const ANSWERS = ['yes', 'no', 'partial', 'toConfirm', 'na'] as const;
export type Answer = (typeof ANSWERS)[number];

/**
 * A statutory fine band.
 *
 * Labour fines are not euro figures in the statute: Código do Trabalho artigo
 * 554.º sets them in UC (unidade de conta processual), and the band moves with
 * the company's turnover and with negligence versus intent. So the unit is
 * explicit, and `bracket` names which turnover band the figures belong to.
 * Printing one euro range for every company would be precise and wrong.
 */
export interface Fine {
  /** Omitted where the statute sets only a ceiling, as the RGPD does. */
  min?: number;
  max: number;
  unit: 'EUR' | 'UC';
  /** Key into the tools dictionary, naming the turnover bracket and fault. */
  bracket?: string;
}

export interface Condition {
  key: string;
  is?: readonly Answer[];
  min?: number;
}

export interface Question {
  key: string;
  type: 'choice' | 'number';
  sourceUrl: string;
  checkedOn: string;
  when?: readonly Condition[];
  allowsNa?: boolean;
  finding?: {
    authority: string;
    article: string;
    fine?: Fine;
  };
}

export interface Framework {
  id: 'pme' | 'rgpc';
  sourceUrl: string;
  checkedOn: string;
  questions: readonly Question[];
}

export type ToolAnswers = Record<string, Answer | number | undefined>;
export type FindingStatus = 'possibleGap' | 'needsConfirmation' | 'notApplicable';

export interface Finding {
  question: Question;
  status: FindingStatus;
}
