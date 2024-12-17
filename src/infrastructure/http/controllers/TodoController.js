export default {
  index
}

async function index (req, res) {
  try {
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
