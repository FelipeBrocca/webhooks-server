import {allowOrigins} from './allowOrigins.js'

export const corsOptions = {
    origin: (origin, callback) => {
        // Sin origin (ej. webhooks server-to-server) se permite.
        if (!origin) {
            return callback(null, true)
        }

        const normalizedOrigin = origin.replace(/\/$/, '')
        return callback(null, allowOrigins.includes(normalizedOrigin))
    },
    credentials: true,
    optionsSuccessStatus: 200
}
