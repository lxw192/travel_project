const prefix = `ws:`;

export function getConnectSocketKey(socketId: string) {
  return `${prefix}:connect:socketId_${socketId}`;
}


export function getOnlineSocketKey(socketId: string) {
  return `${prefix}:online:socketId_${socketId}`;
}

export function getOnlineUserKey(userId: string) {
  return `${prefix}:online:userId_${userId}`;
}

export function getUserFindSocketKey() {
  return `${prefix}:userId2socketId`;
}

export function getSocketFindUserKey() {
  return `${prefix}:socketId2userId`;
}

