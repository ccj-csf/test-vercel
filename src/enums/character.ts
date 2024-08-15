export enum PublishStatusEnum {
  PRIVATE = 0,
  PENDING = 1,
  REJECTED = 2,
  PUBLIC = 3,
  LIMITED = 4,
}

export enum CharacterTypeEnum {
  NULL = 0,
  TEXT = 1, // 文字模型
  VOICE = 2, // 语音模型
  MICROSOFT_VOICE = 3, // 微软语音模型
  UNITY_3D = 4, // Unity3D模型
  GEMSOUL = 5, // Gemsoul
  VOICE_CLONE = 6, // VoiceClone
  OPEN_AI_TTS = 7, // OpenAI-TTS
}
