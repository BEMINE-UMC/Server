import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

// 템플릿 존재 여부 확인하기
export const checkTemplateExists = async (templateId) => {
  const conn = await pool.getConnection();

  try {
    const [templates] = await conn.query(`SELECT * FROM template WHERE id = ?;`, templateId);

    if (templates.length === 0) { // 조회된 템플릿 데이터가 없다면
      return false;
    }

    return true;
  } catch (err) {
    throw new Error (
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 템플릿 status이 null인지 확인하기
export const checkTemplateStatusNull = async (templateId) => {
  const conn = await pool.getConnection();

  try {
    const [template] = await conn.query(`SELECT status FROM template WHERE id = ?;`, templateId);

    if(template[0].status === null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error (
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
}

// 템플릿 상세 정보 불러오기 (정보 얻기)
export const getDetailTemplateInfo = async (templateId) => { 
    const conn = await pool.getConnection();

    try {
      const [templateInfo] = await conn.query(`SELECT thumbnail, file_pdf, title, file_share_state, t_categoryId FROM template WHERE id = ?;`, [templateId]); 
      const [templateCategory] = await conn.query(`SELECT name FROM template_category WHERE id = (SELECT t_categoryId from template WHERE id = ?);`, [templateId]);

      return {
        templateId: templateId,
        thumbnail: templateInfo[0].thumbnail,
        file_pdf: templateInfo[0].file_pdf,
        title: templateInfo[0].title,
        file_share_state: templateInfo[0].file_share_state,
        t_categoryId: templateInfo[0].t_categoryId,
        t_categoryName: templateCategory[0].name
      };

    } catch (err) {
      throw new Error (
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
};

// 템플릿 파일 조회하기 (정보 얻기)
export const getTemplateFileInfo = async (userId, templateId) => {
  const conn = await pool.getConnection();
  try {
    let templateFile;

    /* 파일 저장 유무값을 불러오기 */
    const [templateShareState] = await conn.query(`SELECT file_share_state FROM template WHERE id = ?`, [templateId]);
    
    /* (비공개가 아닌 모든 file_share_state 경우에만) PDF 파일을 불러오기 */
    if (templateShareState[0].file_share_state === 'private' || templateShareState[0].file_share_state === '비공개'){
      return 'private';
    } else {
      [templateFile] = await conn.query(`SELECT file_pdf FROM template WHERE id = ?`, [templateId]);
    }

    /* 템플릿 좋아요 상태값을 불러오기 */
    let [templateLike] = await conn.query('SELECT status FROM liked_template WHERE user_id = ? AND template_id = ?', [userId, templateId]);
    if (!templateLike || templateLike.length === 0) { // 좋아요한 이력이 없다면
      templateLike = [{ status: false }];
    } else if (templateLike[0].status === null ) { // 조회된 템플릿 좋아요 여부 데이터가 없다면
      return null;
    }
    
    /* PDF파일, 파일 저장 유무값, 템플릿 좋아요 상태값을 묶어서 반환 */
    return {
      templateId: templateId,
      file_pdf: templateFile[0].file_pdf,
      file_share_state: templateShareState[0].file_share_state,
      like_status: templateLike[0].status
    };
  } catch (err) {
    throw new Error (
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 템플릿 삭제하기 
export const deleteTemplate = async (templateId) => {
  const conn = await pool.getConnection();

  try {
    /* status값 확인하기 */
    const [templateStatus] = await conn.query(`SELECT status FROM template WHERE id = ?;`, [templateId]);

    if(templateStatus[0].status === 'inactive' || templateStatus[0].status === '비활성'){
      return 'inactive';
    } else if (templateStatus[0].status === null){
      return null;
    }

    /* 템플릿 삭제: status 값과 inactive_date를 업데이트 */
    const [result] = await conn.query(
      `UPDATE template 
       SET status = 'inactive', 
           inactive_date = CURRENT_TIMESTAMP(6) 
       WHERE id = ? AND (status = 'active' OR status = '활성');`, // status은 null 가능함
      [templateId]
    );

    /* 업데이트 결과 반환 */
    const [newUpdates] = await conn.query(`SELECT id, status, inactive_date FROM template WHERE id = ?;`, [templateId]);

    return newUpdates[0];
    
  } catch (err) {
    throw new Error (
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const findPopularTemplates = async () => {
  const conn = await pool.getConnection();
  try {
      const query = `
          SELECT 
              t.id,
              t.title,
              t.thumbnail,
              COUNT(CASE WHEN lt.status = true THEN 1 END) as like_count
          FROM template t
          LEFT JOIN liked_template lt ON t.id = lt.template_id
          WHERE t.status = 'active'
          GROUP BY t.id, t.title, t.thumbnail
          ORDER BY like_count DESC, t.created_at DESC
          LIMIT 12
      `;

      const [templates] = await conn.query(query);
      return templates;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);  // 데이터베이스 연결 오류만 처리
}finally {
      conn.release();
  }
};

// 템플릿 생성하기
export const newTempalteCreate = async(data) =>{
  const template = await prisma.template.create({
    data:{
      title: data.title,
      userId: data.userId,
      filePDF: data.filePDF,
      fileShareState: data.fileShareState,
      tCategoryId: data.tCategoryId,
      thumbnail: data.thumbnail,
      updatedAt: new Date()
    }
  });

  return template;
}

// 템플릿 수정하기
export const existingTemplateUpdate = async(data) =>{
  const template = await prisma.template.update({
    where:{id: data.templateId},
    data:{
      title: data.title,
      filePDF: data.filePDF,
      fileShareState: data.fileShareState,
      tCategoryId: data.tCategoryId,
      thumbnail: data.thumbnail,
      updatedAt: new Date()
    }
  });

  return template;
}

//템플릿 좋아요 생성
export const postTemplateLike = async (userId, templateId) => {
  try {
          const existtemplateLike = await prisma.likedTemplate.findFirst({
              where: {
                  templateId: parseInt(templateId),
                  userId: parseInt(userId),
              },
          });

          if (existtemplateLike)
          {
            const updateLikeTemplate = await prisma.likedTemplate.update({
              where: {
                  id: existtemplateLike.id,
              },
              data: {
                  status: !existtemplateLike.status,
                  updatedAt: new Date(),
              },
          });

          return updateLikeTemplate;
          }

          const createTemplateLike = await prisma.likedTemplate.create({
              data: {
                  userId: parseInt(userId),
                  templateId: parseInt(templateId),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  status: true,
              }
          });

          return createTemplateLike;
      } catch (error) {
          console.error("Error in createUserTemplateLike: ", error);
          throw error;
      }

}

// 템플릿 목록 조회 (정보 얻기-로그인 전)
export const getAllTemplatesInfo = async (categoryId, offset, limit) => {
  const conn = await pool.getConnection();
  try {
      let templates;

      // 기본 쿼리 정의
      const baseQuery = `
          SELECT 
              t.created_at AS template_created_at,
              t.id AS template_id,
              t.title,
              t.thumbnail,
              u.id AS author_id,
              u.name AS author_name,
              tc.id AS category_id,
              tc.name AS category_name
          FROM template AS t
          LEFT JOIN user AS u ON t.user_id = u.id
          LEFT JOIN template_category AS tc ON t_categoryId = tc.id`; 

      /* 공통 조건1: soft-delete된 상태면 목록 조회에서 제외 */
      /* 공통 조건2: file_share_state이 비공개면 목록에 보이지 않음 */
      // 카테고리가 명시되지 않은 경우
      if (categoryId === undefined) {
          [templates] = await conn.query(
              `${baseQuery}
              WHERE (t.status = 'active' OR t.status = '활성') AND NOT (t.file_share_state = '비공개' OR t.file_share_state = 'private')
              ORDER BY t.created_at DESC
              LIMIT ? OFFSET ?`, 
              [limit, offset]
          );
      } else { // 카테고리가 명시된 경우
          const [categoryCheck] = await conn.query(
              `SELECT 1 FROM template_category WHERE id = ? LIMIT 1`,
              [categoryId]
          );
          if (categoryCheck.length === 0) {
              return null;
          }

          [templates] = await conn.query(
              `${baseQuery}
              WHERE (t.status = 'active' OR t.status = '활성') AND t.t_categoryId = ?  AND NOT (t.file_share_state = '비공개' OR t.file_share_state = 'private')
              ORDER BY t.created_at DESC
              LIMIT ? OFFSET ?`, 
              [categoryId, limit, offset]
          );
      }

      return templates;
  } catch (err) {
      throw new Error (
          `템플릿 목록 조회 중에 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
  } finally {
      conn.release();
  }
};

// 템플릿 목록 조회 (정보 얻기-로그인 후)
export const getAllTemplatesInfoLoggedIn = async (userId, categoryId, offset, limit) => {
  const conn = await pool.getConnection();
  try {
      let templates;

      // 기본 쿼리 정의
      const baseQuery = `
          SELECT 
              t.created_at AS template_created_at,
              t.id AS template_id,
              t.title,
              t.thumbnail,
              u.id AS author_id,
              u.name AS author_name,
              lt.status AS liked_status,
              tc.id AS category_id,
              tc.name AS category_name
          FROM template AS t
          LEFT JOIN user AS u ON t.user_id = u.id
          LEFT JOIN liked_template AS lt ON t.id = lt.template_id AND lt.user_id = ? AND lt.status = true
          LEFT JOIN template_category AS tc ON t_categoryId = tc.id`; 

      /* 공통 조건1: soft-delete된 상태면 목록 조회에서 제외 */
      /* 공통 조건2: file_share_state이 비공개면 목록에 보이지 않음 */
      // 카테고리가 명시되지 않은 경우
      if (categoryId === undefined) {
          [templates] = await conn.query(
              `${baseQuery}
              WHERE (t.status = 'active' OR t.status = '활성') AND NOT (t.file_share_state = '비공개' OR t.file_share_state = 'private')
              ORDER BY t.created_at DESC
              LIMIT ? OFFSET ?`, 
              [userId, limit, offset]
          );
      } else { // 카테고리가 명시된 경우
          const [categoryCheck] = await conn.query(
              `SELECT 1 FROM template_category WHERE id = ? LIMIT 1`,
              [categoryId]
          );
          if (categoryCheck.length === 0) {
              return null;
          }

          [templates] = await conn.query(
              `${baseQuery}
              WHERE (t.status = 'active' OR t.status = '활성') AND t.t_categoryId = ? AND NOT (t.file_share_state = '비공개' OR t.file_share_state = 'private')
              ORDER BY t.created_at DESC
              LIMIT ? OFFSET ?`, 
              [userId, categoryId, limit, offset]
          );
      }

      return templates;
  } catch (err) {
      throw new Error (
          `템플릿 목록 조회 중에 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
  } finally {
      conn.release();
  }
};
