//좋아요 누른 게시물 응답 dto
export const createdPostLikedDTO = (likedPost) => {
  return {
    id: likedPost.id,
    userId: likedPost.userId,
    postId: likedPost.postId,
    status: likedPost.status,
    createdAt: likedPost.createdAt,
    updatedAt: likedPost.updatedAt
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


//스크랩 한 게시물 응답 dto
export const createdPostScrapedDTO = (scrapedPost) => {
  return {
    id: scrapedPost.id,
    userId: scrapedPost.userId,
    postId: scrapedPost.postId,
    createdAt: scrapedPost.createdAt,
    updatedAt: scrapedPost.updatedAt
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