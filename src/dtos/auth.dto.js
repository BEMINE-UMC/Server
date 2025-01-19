export const createdPostUserInfoDTO = (data) => {
  return {
    userId: data.id,
    name: data.name,
    created_at: data.created_at
  }
};

export const createdGetLoginInfoDTO = (data, accessToken, refreshToken) => {
  return {
    created_at: data.created_at,
    accessToken,
    refreshToken
  }
};

export const createdGetRefreshTokenDTO = (refreshToken) => {
  return {
    accessToken: refreshToken
  }
};