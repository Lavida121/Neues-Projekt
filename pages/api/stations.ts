import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;
  const apiKey = "7c70651b-0129-99e3-e7f3-b28255ddd859";
  const radius = 5;

  try {
    const response = await fetch(
      `https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}&rad=${radius}&sort=dist&type=all&apikey=${apiKey}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Tankstellen.' });
  }
}
