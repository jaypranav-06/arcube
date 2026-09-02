/**
 * Arcube AI Room Redesign — Server API Handler (Node / Vite Middleware)
 */

import fs from 'fs';
import path from 'path';

// In-memory attempts store for local development (mirrors MySQL table)
const localAttempts = new Map();
const localLeads = [];

export function handleApiRoutes(req, res, next) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // 1. GET /api/check-attempts
  if (url.pathname === '/api/check-attempts' && req.method === 'GET') {
    const contact = url.searchParams.get('contact') || '';
    const fingerprint = url.searchParams.get('fingerprint') || '';

    const attempts = getAttemptsCount(contact, fingerprint);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      attemptsCount: attempts,
      remainingAttempts: Math.max(0, 2 - attempts),
      isBlocked: attempts >= 2
    }));
    return;
  }

  // 2. POST /api/generate-room
  if (url.pathname === '/api/generate-room' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const { name, contact, fingerprint, room_type, style, extra_note, image } = data;

        // Verify limit (2 attempts max)
        const currentCount = getAttemptsCount(contact, fingerprint);
        if (currentCount >= 2) {
          res.writeHead(429, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            blocked: true,
            attemptsCount: currentCount,
            message: 'You have reached your 2 free redesign attempts. Compare your designs or book a consultation.'
          }));
          return;
        }

        if (!image) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Please upload a room image.' }));
          return;
        }

        // Assemble strict prompt template as specified
        const noteAppend = extra_note ? ` Additional note: ${extra_note.trim()}.` : '';
        const prompt = `Redesign this ${room_type} in a ${style} style. Keep the room's architecture, camera angle, and perspective identical. Do not add people, text, logos, or unrelated objects.${noteAppend}`;

        // Attempt generation with 1 auto-retry
        let resultImage = null;
        let tries = 0;
        const maxTries = 2;

        const openRouterKey = process.env.OPENROUTER_API_KEY;

        while (tries < maxTries && !resultImage) {
          tries++;
          try {
            if (openRouterKey) {
              resultImage = await callOpenRouter(openRouterKey, image, prompt);
            } else {
              // High-end local demonstration transformation
              const demoImages = [
                '/images/after-luxury.jpg',
                '/images/sl-minimal-living.jpg',
                '/images/sl-bawa-dining.jpg'
              ];
              // Pick styling variation based on style
              resultImage = currentCount === 0 ? demoImages[0] : (style.toLowerCase().includes('minimal') ? demoImages[1] : demoImages[2]);
            }
          } catch (err) {
            console.error(`Generation attempt ${tries} failed:`, err.message);
          }
        }

        if (!resultImage) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            message: 'Image transformation failed. This attempt was not counted against your limit.'
          }));
          return;
        }

        // Successfully generated: Log attempt
        recordAttempt(contact, fingerprint, {
          name,
          contact,
          fingerprint,
          room_type,
          style,
          extra_note,
          image: resultImage,
          timestamp: new Date().toISOString()
        });

        const newCount = getAttemptsCount(contact, fingerprint);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          image: resultImage,
          roomType: room_type,
          style,
          promptUsed: prompt,
          attemptsCount: newCount,
          remainingAttempts: Math.max(0, 2 - newCount)
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Server error parsing request.' }));
      }
    });
    return;
  }

  // 3. POST /api/submit-lead
  if (url.pathname === '/api/submit-lead' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const lead = JSON.parse(body);
        localLeads.push({ ...lead, createdAt: new Date().toISOString() });
        console.log('New Redesign Lead Received:', lead);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Lead submitted successfully.' }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false }));
      }
    });
    return;
  }

  next();
}

function getAttemptsCount(contact, fingerprint) {
  let count = 0;
  for (const [key, record] of localAttempts.entries()) {
    if ((contact && record.contact === contact) || (fingerprint && record.fingerprint === fingerprint)) {
      count++;
    }
  }
  return count;
}

function recordAttempt(contact, fingerprint, data) {
  const key = `${contact || 'anon'}_${fingerprint || 'fp'}_${Date.now()}`;
  localAttempts.set(key, data);
}

async function callOpenRouter(apiKey, base64Image, prompt) {
  const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://arcube.lk',
      'X-Title': 'Arcube AI Studio'
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-exp:free', // Or Nano Banana 2 via OpenRouter
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${cleanBase64}` }
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter HTTP ${response.status}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  const match = content?.match(/https?:\/\/[^\s)]+\.(jpg|jpeg|png|webp)/i);
  return match ? match[0] : null;
}

