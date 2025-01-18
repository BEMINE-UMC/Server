export const createdPostLikedDTO = (likedPost) => {
  return {
    userId: likedPost.userId,
    postId: likedPost.postId,
  }
}

export const createdGetOtherPostDTO = (postInfo) => {
  return {
    userId: postInfo.user_id,
    postId: postInfo.id,
    title: postInfo.title || "",
    picture: postInfo.picture || "",
  }
};

export const createdPostScrapedDTO = (scrapedPost) => {
  return {
    userId: scrapedPost.userId,
    postId: scrapedPost.postId,
  }
};

// 최근 본 게시물 조회 요청DTO
export const postToRecent = (params)=>{
  return{
    userId: parseInt(params.userId),
  }
}

// 최근 본 게시물 조회 응답 DTO
export const responseFromRecentPost = (userId,data)=>{

  return{
    userId: userId,
    post: data
  }
}

// 북마크한 게시물 조회 요청 DTO
export const postToScrap = (params) =>{
  return{
    userId: parseInt(params.userId),
  }
}

// 북마크한 게시물 조회 응답 DTO
export const responseFromScrapPost = (userId,data) =>{
  return{
    userId: userId,
    post: data
  }
}