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
export const postToRecent = (user)=>{
  return{
    userId: parseInt(user.userId),
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
export const postToScrap = (user) =>{
  return{
    userId: parseInt(user.userId),
  }
}

// 북마크한 게시물 조회 응답 DTO
export const responseFromScrapPost = (userId,data) =>{
  return{
    userId: userId,
    post: data
  }
}

//검색 된 게시물 조회 응답 DTO
export const responseFromSearchedPost = (posts) => {
  return{
    data: posts
  }
  
}

// 게시물 전체 조회 (controller->service)
export const postToAllPosts = (user, data) =>{
  return{
    userId: parseInt(user.userId),
    categoryId: parseInt(data.categoryId),
    offset: parseInt(data.offset),
    limit: parseInt(data.limit)
  }
}