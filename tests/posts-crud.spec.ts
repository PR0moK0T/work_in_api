import { test, expect } from '@playwright/test';

test.describe('crud тесты', () => {
  
  test('GET /posts получение списка постов', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBe(100);
  });

  test('GET /posts/1 получение конкретного поста', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post).toMatchObject({
      id: 1,
      userId: 1,
    });
    expect(post.title).toBeTruthy();
  });

  test('POST /posts создание поста', async ({ request }) => {
    const newPost = {
      title: 'Тестовый заголовок',
      body: 'Текст поста',
      userId: 1,
    };

    const response = await request.post('/posts', {
      data: newPost,
    });
    expect(response.status()).toBe(201);

    const createdPost = await response.json();
    expect(createdPost).toMatchObject({
      ...newPost,
      id: 101,
    });
  });

  test('PUT /posts/1 полное обновление поста', async ({ request }) => {
    const updatedData = {
      id: 1,
      title: 'Обновленный заголовок',
      body: 'Полностью обновленный текст',
      userId: 1,
    };

    const response = await request.put('/posts/1', {
      data: updatedData,
    });
    expect(response.status()).toBe(200);

    const updatedPost = await response.json();
    expect(updatedPost).toEqual(updatedData);
  });

  test('PATCH /posts/1 частичное обновление заголовка', async ({ request }) => {
    const patchData = {
      title: 'Частично обновленный заголовок',
    };

    const response = await request.patch('/posts/1', {
      data: patchData,
    });
    expect(response.status()).toBe(200);

    const patchedPost = await response.json();
    expect(patchedPost.title).toBe(patchData.title);
    expect(patchedPost.id).toBe(1);
  });

  test('DELETE /posts/1 удаление поста', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual({});
  });
});
