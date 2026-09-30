const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY is not configured.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const whatsapp = String(body.whatsapp || '').trim();
  const company = String(body.company || '').trim();
  const message = String(body.message || '').trim() || 'Sem mensagem adicional.';

  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
  }

  try {
    const toEmail = process.env.RESEND_TO_EMAIL || 'webmaster@patrolservicos.com.br';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Patrol Serviços <onboarding@resend.dev>';

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Solicitação de orçamento - ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
          <p><strong>Nova solicitação de orçamento</strong></p>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || 'Não informado'}</p>
          <p><strong>Condomínio ou empresa:</strong> ${company || 'Não informado'}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `
    });

    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (error) {
    console.error('RESEND_SEND_ERROR', error);
    return res.status(500).json({
      error: 'Não foi possível enviar a mensagem no momento.',
      details: error.message || 'Unexpected error'
    });
  }
};
