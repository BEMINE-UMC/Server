import { pool } from "../db.config.js";

// 템플릿 정보 얻기
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