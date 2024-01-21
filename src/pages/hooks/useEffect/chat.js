export function createConnection(serverUrl, roomId) {
  return {
    connect () {
      return Promise.resolve(Date.now() + ' connecting to ' + roomId + 'room at ' + serverUrl)
    },
    disconnect() {
      return Promise.resolve(Date.now() + ' disconnected from ' + roomId + 'room at ' + serverUrl)
    }
  }
}