import express from 'express'
const router = express.Router()

router.get('^/$|/index(.html)?', (req, res) => {
    res.send('No access')
})

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

export default router
