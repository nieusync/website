import { ComplianceCheck } from './ComplianceCheck';
import { RGPC } from '../tools/rgpc';

export default function RgpcCheck() {
  return <ComplianceCheck framework={RGPC} kind="rgpc" />;
}
