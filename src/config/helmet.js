import Helmet from 'helmet';

//  The helmet middleware just sets response headers that improve application security
//  We don't use all of the provided header middleware because many of them don't apply to API based applications
//? https://www.npmjs.com/package/helmet
export const helmet = [Helmet.frameguard(), Helmet.hsts(), Helmet.noSniff(), Helmet.permittedCrossDomainPolicies()];