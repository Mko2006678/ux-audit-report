/**
 * Vercel Serverless API: načte report z Airtable podle recordId.
 * GET /api/report?recordId=recXXX
 *
 * Env: AIRTABLE_API_KEY, AIRTABLE_BASE_ID
 */

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const recordId = req.query.recordId;
  if (!recordId || !recordId.startsWith('rec')) {
    return res.status(400).json({ error: 'Missing or invalid recordId (expected rec...)' });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    return res.status(500).json({ error: 'Server config: AIRTABLE_API_KEY or AIRTABLE_BASE_ID not set' });
  }

  const url = `https://api.airtable.com/v0/${baseId}/Reports/${recordId}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Report not found' });
      }
      return res.status(response.status).json({ error: data.error?.message || 'Airtable error' });
    }

    const fields = data.fields || {};
    const reportHtml = fields['Report HTML'] || '';
    const name = fields['Name'] || '';
    const projectCode = fields['Project Code'] || '';

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({
      reportHtml,
      name,
      projectCode,
    });
  } catch (err) {
    console.error('Report API error:', err);
    return res.status(500).json({ error: 'Failed to load report' });
  }
}
