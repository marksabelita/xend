import * as mongoose from 'mongoose';

const credentials =  {
  local: {
    username: 'markmark',
    password: '123mark',
    link: 'ds261648.mlab.com:61648/github'
  },
  test: {
    username: 'testtest',
    password: '123test',
    link: 'ds361768.mlab.com:61768/dbtest'
  }
}

export async function DBConnect(env='local'){
  const { username, password, link } = credentials[env]; 
  const TEST = `mongodb://${username}:${password}@${link}`
  
  return await mongoose.connect(TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
}