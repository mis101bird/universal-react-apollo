let userName = '?'

export default {
  Query: {
    greeting: (parent, args, { dataSources, userName: newUserName }) => {
      if(newUserName) userName = newUserName
      return dataSources.messageApi.getContent(userName)
    }
  }
}
