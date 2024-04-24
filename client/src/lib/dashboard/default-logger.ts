import { config } from '@/utils/dashboard/config';
import { createLogger } from '@/lib/dashboard/logger';

export const logger = createLogger({ level: config.logLevel });
