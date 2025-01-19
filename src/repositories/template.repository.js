import { pool } from "../db.config.js";

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

// 템플릿 전체 불러오기 (정보 얻기)
export const getTemplateInfo = async (templateId) => {
    const conn = await pool.getConnection();

    try {
      const [templates] = await pool.query(`SELECT * FROM template WHERE id = ?;`, templateId);

      console.log("\nDB에서 요청된 템플릿 정보를 얻습니다.");
      console.log(templates);

      if (templates.length === 0) { // 조회된 데이터가 없다면
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

// 템플릿 status 확인하기
export const checkTemplateStatus = async (templateId) => {
  const conn = await pool.getConnection();
  
  try {
    const [templateStatus] = await conn.query(`SELECT status FROM template WHERE id = ?;`, [templateId]);

    console.log(templateStatus[0].status);

    if(templateStatus[0].status === "inactive"){ // 이미 삭제되어 inactive한 템플릿이라면
      return null;
    }

    return templateStatus[0];

  } catch (err) {
    throw new Error (
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
}

// 템플릿 삭제하기 
export const deleteTemplate = async (teplateId) => {
  const conn = await pool.getConnection();

  try {
    console.log("이제 템플릿 삭제하자");
  } catch (err) {
    throw new Error (
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
}