export async function GET(request: Request) {
  console.log(request.credentials);
  return new Response('Erro');
}
