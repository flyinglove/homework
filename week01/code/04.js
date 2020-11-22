const fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g, '_'),  fp.toLower)