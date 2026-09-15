import { ComplianceCheck } from './ComplianceCheck';
import { PME } from '../tools/pme';

export default function PmeCheck() {
  return <ComplianceCheck framework={PME} kind="pme" />;
}
