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