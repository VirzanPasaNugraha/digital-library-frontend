import { APP_CONFIG } from "../config/appConfig";

export const validateFile = (file) => {
  if (!APP_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) return false;
  if (file.size / (1024 * 1024) > APP_CONFIG.MAX_FILE_SIZE_MB) return false;
  return true;
};
