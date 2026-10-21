import legal from './legal';
import site from './site';
import funding from './funding';
import services from './services';
import tools from './tools';

const en = {
  funding,
  legal,
  site,
  services,
  tools,
};

export type Dict = typeof en;
export default en;
