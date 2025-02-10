import { createReader } from '@keystatic/core/reader'
import path from 'path'
import keystaticConfig from '../../keystatic.config'

/**
 * Instruct Next.js to include content directory in serverless function 😵
 * Without this Next.js wont be able to do static analysis and "content" directory will not be available in serverless function
 */
path.join(process.cwd(), 'public')

export const reader = createReader(process.cwd(), keystaticConfig)