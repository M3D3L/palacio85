export async function api(request, {session}) {
  if (request.method !== 'POST') {
    return new Response('Post necesaria para iniciar sesión', {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    });
  }

  if (!session) {
    return new Response('Almacenamiento de sesión no disponible.', {
      status: 400,
    });
  }

  await session.set('customerAccessToken', '');

  return new Response();
}
