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
// 게시글 상세조회 DTO
export const createPostDetailDTO = (post, isLiked) => {
  return {
      title: post.title,
      body: post.body,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      liked: isLiked
  }
};

// 좋아요 누른 게시물 조회 요청 DTO
export const createGetLikePostDTO = (user) => {
  return {
    userId: user.userId
  }
};

// 좋아요 누른 게시물 조회 응답 DTO
export const responseFromLikePost = (userId, data) =>{
  return{
    userId: userId,
    post: data
  }
}