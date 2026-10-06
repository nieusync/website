import legal from './legal';
import site from './site';
import funding from './funding';
import tools from './tools';

const en = {
  funding,
  legal,
  site,
  tools,
};

export type Dict = typeof en;
export default en;
