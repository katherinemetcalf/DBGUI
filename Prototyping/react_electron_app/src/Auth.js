// HARD CODED USER ACCOUNTS
// ********************************************************
// reasoning: At the time of development, Solvus Global
// is handing out accounts to specific partners to agrigate
// data for Project Blue. The simplest implementation is to
// hard code these accounts for MVP sake.

const accounts = [
  {
    org: 'test',
    username: 'admin',
    password: 'pass'
  },
  {
    org: 'Northeastern',
    username: '34bobcat',
    password: 'solvus3528'
  },
  {
    org: 'VRC',
    username: 'hofman881',
    password: 'solvus13198'
  },
  {
    org: 'MOOG',
    username: 'gilbert1',
    password: 'solvus211'
  },
  {
    org: 'ARL',
    username: 'gilbert1',
    password: 'solvus9899'
  },
  {
    org: 'KRI',
    username: 'green81',
    password: 'solvus99'
  },
  {
    org: 'UDRI',
    username: 'king411',
    password: 'solvus248'
  },
];

module.exports =  {
  login: function(credentials) {
    const org = credentials.org;
    const username = credentials.username;
    const password = credentials.password;
    let isValid = false;
    // search for matching credentials
    for (let i = 0; i < accounts.length; i++) {
      let cred = accounts[i];
      if (cred.org === org && cred.username === username && cred.password === password) {
        isValid = true;
        break;
      }
    }
    return {
      status: isValid
    }
  }
}
