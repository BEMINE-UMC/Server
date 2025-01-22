import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

// 템플릿 존재 여부 확인하기
export const checkTemplateExists = async (templateId) => {
  const conn = await pool.getConnection();

  try {
    const [templates] = await conn.query(`SELECT * FROM template WHERE id = ?;`, templateId);

    if (templates.length === 0) { // 조회된 템플릿 데이터가 없다면
      return null;
    }

    return templates[0];
  } catch (err) {
    throw new Error (
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 템플릿 상세 정보 불러오기 (정보 얻기)
export const getDetailTemplateInfo = async (templateId) => { 
    const conn = await pool.getConnection();

    try {
      const [templates] = await conn.query(`SELECT * FROM template WHERE id = ?;`, templateId); 

      return templates[0];

    } catch (err) {
      throw new Error (
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
};

// 템플릿 단일 조회하기 (정보 얻기)
export const getTemplateFileInfo = async (userId, templateId) => {
  const conn = await pool.getConnection();
  try {
    /* PDF파일과 파일 저장 유무값을 불러오기 */
    const [templateInfo] = await conn.query(`SELECT file_pdf, file_ppt, file_share_state FROM template WHERE id = ?;`, [templateId]);
    /* 템플릿 좋아요 상태값을 불러오기 */
    const [templateLike] = await conn.query('SELECT status FROM liked_template WHERE user_id = ? AND template_id = ?', [userId, templateId]);
    if (templateLike.length === 0) { // 조회된 템플릿 좋아요 여부 데이터가 없다면
      return 0;
    } else if (templateLike[0].status === null ) {
      return null;
    }
    
    /* PDF파일, 파일 저장 유무값, 템플릿 좋아요 상태값을 묶어서 반환 */
    return {
      file_pdf: templateInfo[0].file_pdf,
      file_ppt: templateInfo[0].file_ppt,
      file_share_state: templateInfo[0].file_share_state,
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

    if(templateStatus[0].status === 'inactive'){
      return 'inactive';
    } else if (templateStatus[0].status === null){
      return null;
    }

    /* 템플릿 삭제: status 값과 inactive_date를 업데이트 */
    const [result] = await conn.query(
      `UPDATE template 
       SET status = 'inactive', 
           inactive_date = CURRENT_TIMESTAMP(6) 
       WHERE id = ? AND status = 'active';`, // status은 null 가능함
      [templateId]
    );

    /* 업데이트 결과 반환 */
    const [newUpdates] = await conn.query(`SELECT status, inactive_date FROM template WHERE id = ?;`, [templateId]);

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
              return null;    //여기에 status 변경하는 부분을 넣으면 괜찮지 않을까..?

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