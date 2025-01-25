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
    status: scrapedPost.status,
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

// 게시물 전체 조회 (로그인 전) (controller->service)
export const postToAllPosts = (query) => {
  return{
    categoryId: (query.categoryId == undefined ? undefined : parseInt(query.categoryId)),
    offset: (query.offset === undefined ? 0 : parseInt(query.offset)), // 기본값 부여
    limit: (query.limit === undefined ? 20 : parseInt(query.limit)) // 기본값 부여
  }
}

// 게시물 전체 조회 (로그인 후) (controller->service)
export const postToAllPostsLoggedIn = (user, query) => {
  return{
    userId: parseInt(user.userId), // 로그인 전용
    categoryId: (query.categoryId == undefined ? undefined : parseInt(query.categoryId)),
    offset: (query.offset === undefined ? 0 : parseInt(query.offset)), // 기본값 부여
    limit: (query.limit === undefined ? 20 : parseInt(query.limit)) // 기본값 부여
  }
}

// 게시물 전체 조회 (로그인 전) (controller->service)
export const responseFromAllPosts = (posts) => {
  return posts.map(post => {
    const postCreatedAt = new Date(post.post_created_at);

    return {
      postCreatedAt,
      postId: post.post_id,
      title: post.title,
      thumbnail: post.thumbnail,
      authorId: post.author_id,
      authorName: post.author_name,
      categoryId: post.category_id,
      categoryName: post.category_name
    }
  });
}

// 게시물 전체 조회 (로그인 후) (controller->service)
export const responseFromAllPostsLoggedIn = (posts) => {
  return posts.map(post => {
    const postCreatedAt = new Date(post.post_created_at);

    return {
      postCreatedAt,
      postId: post.post_id,
      title: post.title,
      thumbnail: post.thumbnail,
      authorId: post.author_id,
      authorName: post.author_name,
      categoryId: post.category_id,
      categoryName: post.category_name,
      likedStatus: post.liked_status === null ? false : Boolean(post.liked_status),  // liked_post 테이블에 없는 포스트는 null이므로 false으로 처리
      scrapStatus: post.scrap_status === null ? false : Boolean(post.scrap_status),  // scrap_post 테이블에 없는 포스트는 null이므로 false으로 처리
    }
  });
}