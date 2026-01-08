
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `你是一位拥有20年经验的高级新能源汽车(NEV)维修专家。
你的专业领域包括：
1. 动力电池系统(BMS/电芯/PACK)故障诊断与均衡维护。
2. 驱动电机及控制器(MCU)的功率模块检测与冷却系统排查。
3. 高压配电系统(PDU/OBC/DCDC)的短路、绝缘性能分析。
4. 热管理系统(电池冷板/压缩机/PTC)的流道与逻辑分析。
5. 通讯总线(CAN/LIN)协议解析及干扰排查。

你的回答风格：
- 极度专业且具有实操性。
- 在给出建议前，务必强调安全操作规范（如佩戴绝缘手套、确认高压断电、测量余电）。
- 优先提供结构化的故障排查步骤。
- 如果用户描述模糊，请引导其提供具体的故障码(DTC)或测量数值。
- 严谨对待所有涉及高压(HV)的操作建议。`;

export const getAiResponse = async (messages: Message[], userImage?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Prepare contents for Gemini
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  // If there's an image in the latest request, add it to the last part
  if (userImage) {
    const lastMessage = contents[contents.length - 1];
    const base64Data = userImage.split(',')[1];
    lastMessage.parts.push({
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg'
      }
    } as any);
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "抱歉，专家目前无法响应，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络连接出现异常，或API请求超出限制。请检查网络并重试。";
  }
};
