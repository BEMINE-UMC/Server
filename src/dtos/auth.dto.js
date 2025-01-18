export const createdPostUserInfoDTO = (data) => {
    return {
      userId: data.id,
      name: data.name,
      created_at: data.created_at
    }
  };