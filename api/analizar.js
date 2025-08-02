export async function POST(request) {
  const data = await request.json();
  const { cvTexto, descripcionPuesto } = data;

  const prompt = `¿Qué tan compatible es este CV con la siguiente descripción de puesto?
  CV: ${cvTexto}
  Descripción del puesto: ${descripcionPuesto}
  Evaluá en porcentaje del 0 al 100 y da una breve justificación.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const completion = await res.json();
  return Response.json(completion.choices[0].message);
}