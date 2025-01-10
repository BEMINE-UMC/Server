// src/repositories/popular.template.repository.js
import { pool } from '../db.config.js';



export const findPopularTemplates = async (limit) => {
    // 좋아요 수가 많은 순으로, 좋아요가 없는 경우 최신 등록순으로 정렬하는 쿼리
    const TEMPLATES_LIMIT = 12;

    const query = `
        SELECT 
            t.id,
            t.title,
            t.thumbnail,
            t.created_at,
            u.name as user_name,
            u.photo as user_photo,
            COUNT(lt.id) as like_count
        FROM template t
        INNER JOIN user u ON t.user_id = u.id
        LEFT JOIN liked_template lt ON t.id = lt.template_id
        WHERE t.file_share_state = 'PUBLIC'
        GROUP BY t.id, t.title, t.thumbnail, t.created_at, u.name, u.photo
        ORDER BY like_count DESC, t.created_at DESC
        LIMIT ?
    `;

    try {
        const [rows] = await pool.query(query, [limit]);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};