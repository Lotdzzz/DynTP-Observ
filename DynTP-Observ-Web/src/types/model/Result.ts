// 统一后端响应模型
export interface Result<T> {
    code: number     // 业务状态码
    msg: string  // 响应消息
    data: T          // 实际业务数据
}